"use client";

import { useEffect, useRef } from "react";

import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import TagContent from "./TagContent";
import { OrganizationDetails } from "@/types/OrganizationDetails";
import { ProjectsPerYear } from "@/types/ProjectsPerYear";
import TopContributors from "./TopContributors";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler
);

export default function OverviewContent({
  data,
  projectsPerYear,
}: {
  data: OrganizationDetails;
  projectsPerYear: ProjectsPerYear[];
}) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  const totalProjects = projectsPerYear.reduce(
    (total, item) => total + item.totalProjects,
    0
  );

  useEffect(() => {
    if (!chartRef.current) return;

    // Sort years: 2016 → 2024
    const sortedProjects = [...projectsPerYear].sort(
      (a, b) => a.year - b.year
    );

    const chart = new Chart(chartRef.current, {
      type: "line",

      data: {
        // X Axis
        labels: sortedProjects.map((item) => item.year.toString()),

        datasets: [
          {
            label: "Projects Completed",

            // Y Axis
            data: sortedProjects.map((item) => item.totalProjects),

            borderColor: "#3B82F6",
            backgroundColor: "rgba(59, 130, 246, 0.12)",

            borderWidth: 2,
            tension: 0.4,
            fill: true,

            pointBackgroundColor: "#3B82F6",
            pointBorderColor: "#0B0F1A",
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: "#3B82F6",
          },
        ],
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
          legend: {
            display: false,
          },

          tooltip: {
            backgroundColor: "#111827",
            titleColor: "#FFFFFF",
            bodyColor: "#D1D5DB",
            padding: 12,
            displayColors: false,

            callbacks: {
              label: (context) => {
                return `${context.parsed.y} Projects`;
              },
            },
          },
        },

        scales: {
          x: {
            ticks: {
              color: "#9CA3AF",
            },

            grid: {
              color: "rgba(156, 163, 175, 0.12)",
            },

            border: {
              color: "rgba(156, 163, 175, 0.2)",
            },
          },

          y: {
            beginAtZero: true,

            ticks: {
              color: "#9CA3AF",
              stepSize: 1,
            },

            grid: {
              color: "rgba(156, 163, 175, 0.12)",
            },

            border: {
              color: "rgba(156, 163, 175, 0.2)",
            },
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, [projectsPerYear]);

  return (
    <div className="overview-grid">
      <article className="about-card">
        <h2>About</h2>

        <p>{data.description}</p>

        <div className="summary-stats">
          <div>
            <small>Years active</small>

            <b>
              {data.years[0]} - {data.years[data.years.length - 1]}
            </b>
          </div>

          <div>
            <small>Total projects</small>
            <b>{totalProjects}</b>
          </div>

          <div>
            <small>Total contributors</small>
            <b>87</b>
          </div>
        </div>
      </article>

      <article className="chart-card">
        <h2>Projects completed in previous years</h2>

        <div className="chart-container">
          <canvas ref={chartRef}></canvas>
        </div>
      </article>

      <TagContent
        title="Technologies"
        tags={data.technologies}
      />

      <TagContent
        title="Topics"
        tags={data.topics}
      />

      <TagContent
        title="Categories"
        tags={data.categories}
      />

      <TopContributors orgId={data.id} />
    </div>
  );
}