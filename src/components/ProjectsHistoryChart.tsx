import { useEffect, useRef } from "react";

import {
    Chart,
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
    Filler,
} from "chart.js";

import { ProjectsPerYear } from "@/types/ProjectsPerYear";

Chart.register(
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
    Filler
);

export default function ProjectsHistoryChart({
    projectsPerYear,
    compact = false,
}: {
    projectsPerYear: ProjectsPerYear[];
    compact?: boolean;
}) {
    const chartRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (!chartRef.current || projectsPerYear.length === 0) return;

        const sortedProjects = [...projectsPerYear].sort(
            (a, b) => a.year - b.year
        );

        const chart = new Chart(chartRef.current, {
            type: "line",

            data: {
                labels: sortedProjects.map((item) => item.year.toString()),

                datasets: [
                    {
                        label: "Projects Completed",

                        data: sortedProjects.map((item) => item.totalProjects),

                        borderColor: "#3B82F6",

                        borderWidth: 2,

                        tension: 0.42,

                        fill: true,

                        backgroundColor: (context) => {
                            const { ctx, chartArea } = context.chart;

                            if (!chartArea) {
                                return "rgba(59, 130, 246, 0.25)";
                            }

                            const gradient = ctx.createLinearGradient(
                                0,
                                chartArea.top,
                                0,
                                chartArea.bottom
                            );

                            gradient.addColorStop(0, "rgba(59, 130, 246, 0.38)");
                            gradient.addColorStop(0.55, "rgba(59, 130, 246, 0.14)");
                            gradient.addColorStop(1, "rgba(59, 130, 246, 0)");

                            return gradient;
                        },

                        pointRadius: 2,

                        pointHoverRadius: 5,

                        pointBackgroundColor: "#60A5FA",

                        pointBorderColor: "#0B0F1A",

                        pointBorderWidth: 2,

                        pointHoverBackgroundColor: "#FFFFFF",

                        pointHoverBorderColor: "#3B82F6",

                        pointHoverBorderWidth: 3,
                    },
                ],
            },

            options: {
                responsive: true,

                maintainAspectRatio: false,

                animation: {
                    duration: 700,
                },

                interaction: {
                    intersect: false,
                    mode: "index",
                },

                plugins: {
                    legend: {
                        display: false,
                    },

                    tooltip: {
                        backgroundColor: "#111827",

                        titleColor: "#FFFFFF",

                        bodyColor: "#CBD5E1",

                        displayColors: false,

                        padding: 10,

                        cornerRadius: 8,

                        callbacks: {
                            title: (context) => context[0].label,

                            label: (context) =>
                                `${context.parsed.y} Projects Completed`,
                        },
                    },
                },

                layout: {
                    padding: {
                        top: 8,
                        right: 8,
                        bottom: 0,
                        left: 0,
                    },
                },

                scales: {
                    x: {
                        grid: {
                            display: false,
                        },

                        border: {
                            display: false,
                        },

                        ticks: {
                            color: "#64748B",

                            font: {
                                size: 10,
                            },

                            maxRotation: 0,
                        },
                    },

                    y: {
                        display: false,

                        beginAtZero: true,

                        grid: {
                            display: false,
                        },

                        border: {
                            display: false,
                        },
                    },
                },
            },
        });

        return () => {
            chart.destroy();
        };
    }, [projectsPerYear, compact]);

    return (
        <div className="projects-mini-chart">
            <canvas ref={chartRef} />
        </div>
    );
}