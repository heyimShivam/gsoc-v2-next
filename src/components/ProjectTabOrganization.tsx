"use client";

import "@/css/ProjectTab.css";

import { useEffect, useMemo, useState } from "react";
import { ProjectsPerYear } from "@/types/ProjectsPerYear";

import ProjectsHistoryChart from "./ProjectsHistoryChart";

interface ProjectDetails {
    id: string;
    year: number;
    title: string;
    shortDescription?: string;
    studentName?: string;
}

interface SelectedYearProjectResponse {
    data?: {
        content?: Record<string, ProjectDetails[]>;
        first?: boolean;
        last?: boolean;
        page?: number;
        size?: number;
        totalPages?: number;
        totalRecords?: number;
    };
}

export default function ProjectTabOrganization({
    projectsPerYear,
    organizationId,
}: {
    projectsPerYear: ProjectsPerYear[];
    organizationId: string;
}) {
    /* Sort years: Latest → Oldest */
    const years = useMemo(() => {
        return [...projectsPerYear].sort((a, b) => b.year - a.year);
    }, [projectsPerYear]);

    /* Latest year selected by default */
    const [selectedYear, setSelectedYear] = useState<number | null>(null);

    const [projects, setProjects] = useState<ProjectDetails[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    /* Select first year automatically */
    useEffect(() => {
        if (years.length > 0 && selectedYear === null) {
            setSelectedYear(years[0].year);
        }
    }, [years, selectedYear]);

    /* Fetch projects when year changes */
    useEffect(() => {
        if (selectedYear === null) return;

        const controller = new AbortController();

        async function getProjects() {
            try {
                setLoading(true);
                setError(false);
                setProjects([]);

                const response = await fetch(
                    `http://localhost:8080/api/projects/${organizationId}?page=1&size=100`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json",
                        },

                        body: JSON.stringify({
                            title: "",
                            year: selectedYear,
                        }),

                        signal: controller.signal,
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch projects");
                }

                const responseData: SelectedYearProjectResponse = await response.json();

                console.log("Projects response:", responseData);

                const projectsForYear =
                    responseData?.data?.content?.[String(selectedYear)] ?? [];

                setProjects(projectsForYear);
            } catch (err) {
                if (err instanceof Error && err.name === "AbortError") {
                    return;
                }

                console.error("ProjectDetails fetch error:", err);

                setError(true);
                setProjects([]);
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        getProjects();

        return () => {
            controller.abort();
        };
    }, [selectedYear, organizationId]);

    /* No project years */
    if (years.length === 0) {
        return (
            <section className="projects-tab">
                <div className="projects-empty">
                    <div className="empty-icon">📁</div>

                    <h3>No project history available</h3>

                    <p>This organization does not have any project data yet.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="projects-tab">
            {/* ================= HEADER ================= */}

            <div className="projects-header">

                <div className="projects-heading">

                    <span className="projects-eyebrow">
                        GSoC PROJECTS
                    </span>

                    <h2>GSoC Past Projects</h2>

                    <p>
                        Explore projects completed by this organization during
                        Google Summer of Code.
                    </p>


                    {/* ================= YEAR PAGINATION ================= */}

                    <div className="year-pagination">
                        {years.map((item) => {
                            const isActive = selectedYear === item.year;

                            return (
                                <button
                                    key={item.year}
                                    type="button"
                                    onClick={() => setSelectedYear(item.year)}
                                    className={`year-button ${isActive ? "active" : ""}`}
                                >
                                    <span className="year-text">{item.year}</span>

                                    <span className="project-count">
                                        {item.totalProjects}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="projects-header-chart">
                    <ProjectsHistoryChart
                        projectsPerYear={projectsPerYear}
                        compact={true}
                    />

                </div>

            </div>

            {/* ================= CONTENT ================= */}

            <div className="projects-content">
                {/* Loading */}

                {loading && <ProjectShimmer />}

                {/* Error */}

                {!loading && error && (
                    <div className="projects-state">
                        <div className="state-icon error-icon">!</div>

                        <h3>Unable to load projects</h3>

                        <p>
                            Something went wrong while loading projects for{" "}
                            <strong>{selectedYear}</strong>.
                        </p>

                        <button
                            type="button"
                            className="retry-button"
                            onClick={() => {
                                if (selectedYear !== null) {
                                    const currentYear = selectedYear;

                                    setSelectedYear(null);

                                    setTimeout(() => {
                                        setSelectedYear(currentYear);
                                    }, 0);
                                }
                            }}
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Empty */}

                {!loading && !error && projects.length === 0 && (
                    <div className="projects-state">
                        <div className="state-icon">◫</div>

                        <h3>No projects found</h3>

                        <p>
                            No projects are available for{" "}
                            <strong>{selectedYear}</strong>.
                        </p>
                    </div>
                )}

                {/* Projects */}

                {!loading && !error && projects.length > 0 && (
                    <>
                        <div className="projects-result-info">
                            <span>
                                Showing <strong>{projects.length}</strong> projects
                            </span>

                            <span className="result-year">
                                {selectedYear}
                            </span>
                        </div>

                        <div className="projects-grid">
                            {projects.map((project, index) => (
                                <article
                                    key={project.id}
                                    className="project-card"
                                >
                                    {/* Card top */}

                                    <div className="project-card-header">
                                        <span className="project-year-badge">
                                            {project.year}
                                        </span>

                                        <span className="project-number">
                                            #{String(index + 1).padStart(2, "0")}
                                        </span>
                                    </div>

                                    {/* ProjectDetails title */}

                                    <h3>{project.title}</h3>

                                    {/* Description */}

                                    {project.shortDescription && (
                                        <p className="project-description">
                                            {project.shortDescription}
                                        </p>
                                    )}

                                    {/* Footer */}

                                    <div className="project-footer">
                                        {project.studentName && (
                                            <div className="student-info">
                                                <div className="student-avatar">
                                                    {project.studentName
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </div>

                                                <div>
                                                    <span>Contributor</span>

                                                    <strong>{project.studentName}</strong>
                                                </div>
                                            </div>
                                        )}

                                        <span className="project-arrow">→</span>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}

/* =====================================================
   SIMPLE SHIMMER UI
===================================================== */

function ProjectShimmer() {
    return (
        <div className="projects-grid">
            {Array.from({ length: 6 }).map((_, index) => (
                <div
                    className="project-card project-skeleton"
                    key={index}
                >
                    <div className="skeleton-row">
                        <div className="shimmer shimmer-badge" />

                        <div className="shimmer shimmer-number" />
                    </div>

                    <div className="shimmer shimmer-title" />

                    <div className="shimmer shimmer-line" />

                    <div className="shimmer shimmer-line short" />

                    <div className="skeleton-footer">
                        <div className="shimmer shimmer-avatar" />

                        <div className="shimmer shimmer-name" />
                    </div>
                </div>
            ))}
        </div>
    );
}