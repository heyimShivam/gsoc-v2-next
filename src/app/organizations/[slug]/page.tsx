"use client";

import ContributorPreview from "@/components/ContributorPreview";
import LogoTile from "@/components/LogoTile";
import OverviewContent from "@/components/OverviewContent";
import ProjectPreview from "@/components/ProjectPreview";
import { SiteHeader } from "@/components/SiteHeader";
import TagContent from "@/components/TagContent";
import { Organization } from "@/types/Organization";
import { ArrowLeft, ExternalLink, MapPin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const organizations: Organization[] = [
    { id: "52north", name: "52°North", initials: "52", description: "Researching smart spatial information and open geoinformatics.", years: "2016 – 2026", status: "Inactive", category: "Research", technologies: ["Java", "Python", "Web"], topics: ["Geospatial", "Data"], color: "cyan", stars: 210, people: 67 },
    { id: "aboutcode", name: "AboutCode", initials: "AC", description: "Open source data and licensing tools for everyone.", years: "2017 – 2026", status: "Active", category: "Developer Tools", technologies: ["Python", "JavaScript", "C++"], topics: ["Licensing", "Data"], color: "blue", stars: 210, people: 67 },
    { id: "accord", name: "Accord Project", initials: "AP", description: "Open source automation for trusted agreements.", years: "2020 – 2026", status: "Inactive", category: "Open Source", technologies: ["JavaScript", "React", "Web"], topics: ["Legal", "Automation"], color: "violet", stars: 65, people: 21 },
    { id: "aswf", name: "ASWF", initials: "AS", description: "Building an open ecosystem for visual effects and animation.", years: "2020 – 2022", status: "Active", category: "Media", technologies: ["Python", "C++", "OpenGL"], topics: ["Graphics", "Animation"], color: "orange", stars: 76, people: 28 },
    { id: "aerospace", name: "AerospaceResearch.net", initials: "AR", description: "Making space and aerospace research accessible to all.", years: "2017 – 2021", status: "Inactive", category: "Research", technologies: ["Python", "CI/CD", "Web"], topics: ["Space", "Science"], color: "green", stars: 54, people: 18 },
    { id: "openmesh", name: "OpenMesh", initials: "OM", description: "Modern tools and geometry processing for open research.", years: "2018 – 2025", status: "Active", category: "Developer Tools", technologies: ["C++", "Python", "Web"], topics: ["Graphics", "Research"], color: "pink", stars: 92, people: 40 },
];

export default function OrganizationDetailPage() {
    const [tab, setTab] = useState("Overview"); const org = organizations[0]; const content = {
        Overview: <OverviewContent />, Projects: <ProjectPreview />, Technologies: <TagContent
            title="Technologies"
            tags={["JavaScript", "Java", "Web Services", "OGC Standards", "Python", "React", "Android", "Big Data"]}
        />, Topics: <TagContent
            title="Research topics"
            tags={["Geoinformatics", "Sensor Web", "Web-based Geoprocessing", "Spatial Data", "Earth Observation", "Open Data"]}
        />, Contributors: <ContributorPreview />
    }[tab]; return <main className="app-shell detail-shell">
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
                <LogoTile org={org} />
                <div>
                    <div className="title-line">
                        <h1>
                            52°North
                        </h1>
                        <span className="inactive">
                            Inactive
                        </span>
                    </div>
                    <h2>
                        52°North Spatial Information Research GmbH
                    </h2>
                    <p>
                        Innovative ideas & technologies in geoinformatics
                    </p>
                    <div className="metadata">
                        <a href="#">
                            <ExternalLink size={15} />
                            https://www.52north.org
                        </a>
                        <span>
                            <MapPin size={15} />
                            Münster, Germany
                        </span>
                    </div>
                </div>
                <div className="org-actions">
                    <button className="primary-button compact">
                        Follow
                    </button>
                    <button className="icon-button">
                        <ExternalLink size={17} />
                    </button>
                </div>
            </div>
            <div className="detail-tabs">
                {["Overview", "Projects", "Technologies", "Topics", "Contributors"].map((item) => <button key={item} className={tab === item ? "active" : ""} onClick={() => setTab(item)}>{item}</button>)}
            </div>
        </section>
        <section className="detail-content">
            {content}
        </section>
    </main>;
}