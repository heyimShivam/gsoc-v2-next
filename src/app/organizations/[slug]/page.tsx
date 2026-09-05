"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import ContributorPreview from "@/components/ContributorPreview";
import LogoTile from "@/components/LogoTile";
import OverviewContent from "@/components/OverviewContent";
import ProjectPreview from "@/components/ProjectPreview";
import { SiteHeader } from "@/components/SiteHeader";
import TagContent from "@/components/TagContent";

import {
    ArrowLeft,
    ExternalLink,
    MapPin,
    Star,
    GitFork,
    CircleDot
} from "lucide-react";

type OrganizationDetails = {
    id: string;
    name: string;
    imageUrl: string;
    imageBackgroundColor: string;
    description: string;
    url: string | null;
    githubId: string | null;
    activeOrg: boolean;
    years: number[];
    categories: string[];
    topics: string[];
    technologies: string[];
    contactInfo: {
        ircChannel: string | null;
        contactEmail: string | null;
        mailingList: string | null;
        twitterUrl: string | null;
        blogUrl: string | null;
        facebookUrl: string | null;
    };
};

type Repository = {
    id: string;
    name: string;
    fullName: string;
    htmlUrl: string;
    description: string | null;
    language: string | null;
    stars: number;
    forks: number;
    openIssues: number;
    topics: string[];
};

type Project = {
    id: string;
    year: number;
    title: string;
    shortDescription: string;
    studentName: string;
    codeUrl: string | null;
    proposalId: string | null;
    projectUrl: string | null;
};

type Tab =
    | "Overview"
    | "Projects"
    | "Repositories"
    | "Technologies"
    | "Topics"
    | "Contributors";

export default function OrganizationDetailPage() {
    const params = useParams();

    const organizationId = params.slug as
        | string
        | undefined;

    const [organization, setOrganization] =
        useState<OrganizationDetails | null>(
            null
        );

    const [repositories, setRepositories] =
        useState<Repository[]>([]);

    const [projects, setProjects] =
        useState<Project[]>([]);

    const [tab, setTab] =
        useState<Tab>("Overview");

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState<string | null>(null);

    useEffect(() => {
        if (!organizationId) {
            return;
        }

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const organizationResponse =
                    await fetch(
                        `http://localhost:8080/api/organizations/${organizationId}`
                    );

                if (!organizationResponse.ok) {
                    throw new Error(
                        "Failed to fetch organization"
                    );
                }

                const organizationData =
                    await organizationResponse.json();

                setOrganization(
                    organizationData.data
                );

                /*
                 * These endpoints belong to the same
                 * organization, so fetch them here too.
                 *
                 * Existing hardcoded components such as
                 * OverviewContent and ContributorPreview
                 * are still kept below.
                 */
                const [
                    repositoriesResponse,
                    projectsResponse
                ] = await Promise.all([
                    fetch(
                        `http://localhost:8080/api/repositories/${organizationId}?size=50`
                    ),
                    fetch(
                        `http://localhost:8080/api/projects/${organizationId}?page=1&size=24`
                    )
                ]);

                if (repositoriesResponse.ok) {
                    const repositoriesData =
                        await repositoriesResponse.json();

                    setRepositories(
                        repositoriesData.data.content
                    );
                }

                if (projectsResponse.ok) {
                    const projectsData =
                        await projectsResponse.json();

                    setProjects(
                        projectsData.data.content
                    );
                }
            } catch (error) {
                console.error(
                    "Error fetching organization data:",
                    error
                );

                setError(
                    "Unable to load organization details."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [organizationId]);

    if (loading) {
        return (
            <main className="app-shell detail-shell">
                <SiteHeader />

                <section className="detail-content">
                    <div className="empty-state">
                        Loading organization...
                    </div>
                </section>
            </main>
        );
    }

    if (error || !organization) {
        return (
            <main className="app-shell detail-shell">
                <SiteHeader />

                <section className="detail-content">
                    <div className="empty-state">
                        {error ??
                            "Organization not found."}
                    </div>
                </section>
            </main>
        );
    }

    const statusText =
        organization.activeOrg
            ? "Active"
            : "Inactive";

    return (
        <main className="app-shell detail-shell">
            <SiteHeader />

            <section className="detail-top">
                <Link
                    href="/explore"
                    className="back-link"
                >
                    <ArrowLeft size={15} />
                    Back to organizations
                </Link>

                <div className="detail-profile">
                    {/*
                     * LogoTile is preserved.
                     *
                     * We pass a small object that matches
                     * the organization information it
                     * normally needs.
                     */}
                    <LogoTile
                        org={{
                            id: organization.id,
                            name: organization.name,
                            initials:
                                organization.name
                                    .slice(0, 2)
                                    .toUpperCase(),
                            description:
                                organization.description,
                            years:
                                organization.years.join(
                                    " – "
                                ),
                            status:
                                statusText,
                            category:
                                organization
                                    .categories[0] ??
                                "",
                            technologies:
                                organization.technologies,
                            topics:
                                organization.topics,
                            color: "blue",
                            stars: 0,
                            people: 0
                        }}
                    />

                    <div>
                        <div className="title-line">
                            <h1>
                                {
                                    organization.name
                                }
                            </h1>

                            <span
                                className={
                                    organization.activeOrg
                                        ? "status done"
                                        : "status inactive-status"
                                }
                            >
                                {statusText}
                            </span>
                        </div>

                        {/*
                         * Keep the existing hardcoded
                         * subtitle/details here because
                         * there is no corresponding field
                         * in your organization endpoint.
                         */}
                        <h2>
                            52°North Spatial
                            Information Research
                            GmbH
                        </h2>

                        <p>
                            Innovative ideas &
                            technologies in
                            geoinformatics
                        </p>

                        <div className="metadata">
                            {organization.url && (
                                <a
                                    href={
                                        organization.url
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <ExternalLink
                                        size={15}
                                    />

                                    {
                                        organization.url
                                    }
                                </a>
                            )}

                            {organization.githubId && (
                                <a
                                    href={`https://github.com/${organization.githubId}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <ExternalLink
                                        size={15}
                                    />

                                    GitHub
                                </a>
                            )}

                            <span>
                                <MapPin
                                    size={15}
                                />

                                Münster, Germany
                            </span>
                        </div>
                    </div>

                    <div className="org-actions">
                        <button className="primary-button compact">
                            Follow
                        </button>

                        {organization.url && (
                            <a
                                href={
                                    organization.url
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="icon-button"
                                aria-label="Open organization website"
                            >
                                <ExternalLink
                                    size={17}
                                />
                            </a>
                        )}
                    </div>
                </div>

                <div className="detail-tabs">
                    {[
                        "Overview",
                        "Projects",
                        "Repositories",
                        "Technologies",
                        "Topics",
                        "Contributors"
                    ].map((item) => (
                        <button
                            key={item}
                            className={
                                tab === item
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                setTab(
                                    item as Tab
                                )
                            }
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </section>

            <section className="detail-content">
                {/*
                 * Kept exactly as your existing
                 * hardcoded component.
                 */}
                {tab === "Overview" && (
                    <OverviewContent />
                )}

                {/*
                 * Projects now use your backend
                 * projects endpoint.
                 */}
                {tab === "Projects" && (
                    <>
                        {projects.length === 0 ? (
                            /*
                             * Keep your existing hardcoded
                             * ProjectPreview as fallback.
                             */
                            <ProjectPreview />
                        ) : (
                            <section>
                                <div className="detail-section">
                                    <h2>
                                        GSoC Projects
                                    </h2>

                                    <p>
                                        {
                                            projects.length
                                        }{" "}
                                        projects
                                    </p>
                                </div>

                                <div className="organization-grid">
                                    {projects.map(
                                        (
                                            project
                                        ) => (
                                            <article
                                                className="org-card"
                                                key={
                                                    project.id
                                                }
                                            >
                                                <div className="org-card-header">
                                                    <span className="status">
                                                        {
                                                            project.year
                                                        }
                                                    </span>
                                                </div>

                                                <div className="org-card-body">
                                                    <h3>
                                                        {
                                                            project.title
                                                        }
                                                    </h3>

                                                    <p>
                                                        {
                                                            project.shortDescription
                                                        }
                                                    </p>

                                                    <strong>
                                                        {
                                                            project.studentName
                                                        }
                                                    </strong>
                                                </div>

                                                <div className="org-card-footer">
                                                    {project.projectUrl && (
                                                        <a
                                                            href={
                                                                project.projectUrl
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            Project
                                                        </a>
                                                    )}

                                                    {project.codeUrl && (
                                                        <a
                                                            href={
                                                                project.codeUrl
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            Code
                                                        </a>
                                                    )}
                                                </div>
                                            </article>
                                        )
                                    )}
                                </div>
                            </section>
                        )}
                    </>
                )}

                {/*
                 * Repositories use your backend
                 * repositories endpoint.
                 */}
                {tab ===
                    "Repositories" && (
                        <section>
                            <div className="detail-section">
                                <h2>
                                    GitHub
                                    Repositories
                                </h2>

                                <p>
                                    {
                                        repositories.length
                                    }{" "}
                                    repositories
                                </p>
                            </div>

                            {!repositories.length ? (
                                <div className="empty-state">
                                    No repositories
                                    found.
                                </div>
                            ) : (
                                <div className="organization-grid">
                                    {repositories.map(
                                        (
                                            repository
                                        ) => (
                                            <article
                                                className="org-card"
                                                key={
                                                    repository.id
                                                }
                                            >
                                                <div className="org-card-body">
                                                    <h3>
                                                        {
                                                            repository.fullName
                                                        }
                                                    </h3>

                                                    <p>
                                                        {
                                                            repository.description
                                                        }
                                                    </p>

                                                    <div className="metadata">
                                                        <span>
                                                            <Star
                                                                size={
                                                                    15
                                                                }
                                                            />

                                                            {
                                                                repository.stars
                                                            }
                                                        </span>

                                                        <span>
                                                            <GitFork
                                                                size={
                                                                    15
                                                                }
                                                            />

                                                            {
                                                                repository.forks
                                                            }
                                                        </span>

                                                        <span>
                                                            <CircleDot
                                                                size={
                                                                    15
                                                                }
                                                            />

                                                            {
                                                                repository.openIssues
                                                            }
                                                        </span>

                                                        {repository.language && (
                                                            <span>
                                                                {
                                                                    repository.language
                                                                }
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                {repository
                                                    .topics
                                                    .length >
                                                    0 && (
                                                        <div className="org-card-footer">
                                                            {repository.topics
                                                                .slice(
                                                                    0,
                                                                    5
                                                                )
                                                                .map(
                                                                    (
                                                                        topic
                                                                    ) => (
                                                                        <span
                                                                            key={
                                                                                topic
                                                                            }
                                                                            className="tag"
                                                                        >
                                                                            {
                                                                                topic
                                                                            }
                                                                        </span>
                                                                    )
                                                                )}
                                                        </div>
                                                    )}

                                                <div className="org-card-footer">
                                                    <a
                                                        href={
                                                            repository.htmlUrl
                                                        }
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        View
                                                        on
                                                        GitHub
                                                    </a>
                                                </div>
                                            </article>
                                        )
                                    )}
                                </div>
                            )}
                        </section>
                    )}

                {/*
                 * These use the backend organization
                 * endpoint instead of hardcoded tags.
                 */}
                {tab === "Technologies" && (
                    <TagContent
                        title="Technologies"
                        tags={
                            organization.technologies
                        }
                    />
                )}

                {tab === "Topics" && (
                    <TagContent
                        title="Research topics"
                        tags={
                            organization.topics
                        }
                    />
                )}

                {/*
                 * Existing hardcoded contributor
                 * component is preserved.
                 */}
                {tab === "Contributors" && (
                    <ContributorPreview />
                )}
            </section>
        </main>
    );
}