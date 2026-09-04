import { Organization } from "@/types/Organization";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const organizations: Organization[] = [
    { id: "52north", name: "52°North", initials: "52", description: "Researching smart spatial information and open geoinformatics.", years: "2016 – 2026", status: "Inactive", category: "Research", technologies: ["Java", "Python", "Web"], topics: ["Geospatial", "Data"], color: "cyan", stars: 210, people: 67 },
    { id: "aboutcode", name: "AboutCode", initials: "AC", description: "Open source data and licensing tools for everyone.", years: "2017 – 2026", status: "Active", category: "Developer Tools", technologies: ["Python", "JavaScript", "C++"], topics: ["Licensing", "Data"], color: "blue", stars: 210, people: 67 },
    { id: "accord", name: "Accord Project", initials: "AP", description: "Open source automation for trusted agreements.", years: "2020 – 2026", status: "Inactive", category: "Open Source", technologies: ["JavaScript", "React", "Web"], topics: ["Legal", "Automation"], color: "violet", stars: 65, people: 21 },
    { id: "aswf", name: "ASWF", initials: "AS", description: "Building an open ecosystem for visual effects and animation.", years: "2020 – 2022", status: "Active", category: "Media", technologies: ["Python", "C++", "OpenGL"], topics: ["Graphics", "Animation"], color: "orange", stars: 76, people: 28 },
    { id: "aerospace", name: "AerospaceResearch.net", initials: "AR", description: "Making space and aerospace research accessible to all.", years: "2017 – 2021", status: "Inactive", category: "Research", technologies: ["Python", "CI/CD", "Web"], topics: ["Space", "Science"], color: "green", stars: 54, people: 18 },
    { id: "openmesh", name: "OpenMesh", initials: "OM", description: "Modern tools and geometry processing for open research.", years: "2018 – 2025", status: "Active", category: "Developer Tools", technologies: ["C++", "Python", "Web"], topics: ["Graphics", "Research"], color: "pink", stars: 92, people: 40 },
];

export default function ProjectPreview() {
    return <div>
        <div className="section-heading">
            <div>
                <span className="eyebrow">
                    <span />
                    ORGANIZATION
                </span>
                <h2>
                    GSoC projects
                </h2>
            </div>
            <Link
                href="/projects"
                className="primary-button compact"
            >
                View all projects
                <ArrowRight size={16} />
            </Link>
        </div>
        <div className="mini-projects">
            {organizations.slice(0, 3).map((item, index) => <article key={item.id}><span>20{24 - index}</span><h3>{["Open geospatial API gateway", "Sensor data quality studio", "Spatial research workflow"][index]}</h3><p>Build useful open-source technology with the 52°North community.</p><div className="chips"><span>Python</span><span>Web</span><span>Data</span></div></article>)}
        </div>
    </div>;
}