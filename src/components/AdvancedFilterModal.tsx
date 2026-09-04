import { X } from "lucide-react";
import { useState } from "react";
import Pill from "./Pill";

type Organization = {
    id: string;
    name: string;
    initials: string;
    description: string;
    years: string;
    status: "Active" | "Inactive";
    category: string;
    technologies: string[];
    topics: string[];
    color: string;
    stars: number;
    people: number;
};
const organizations: Organization[] = [
    { id: "52north", name: "52°North", initials: "52", description: "Researching smart spatial information and open geoinformatics.", years: "2016 – 2026", status: "Inactive", category: "Research", technologies: ["Java", "Python", "Web"], topics: ["Geospatial", "Data"], color: "cyan", stars: 210, people: 67 },
    { id: "aboutcode", name: "AboutCode", initials: "AC", description: "Open source data and licensing tools for everyone.", years: "2017 – 2026", status: "Active", category: "Developer Tools", technologies: ["Python", "JavaScript", "C++"], topics: ["Licensing", "Data"], color: "blue", stars: 210, people: 67 },
    { id: "accord", name: "Accord Project", initials: "AP", description: "Open source automation for trusted agreements.", years: "2020 – 2026", status: "Inactive", category: "Open Source", technologies: ["JavaScript", "React", "Web"], topics: ["Legal", "Automation"], color: "violet", stars: 65, people: 21 },
    { id: "aswf", name: "ASWF", initials: "AS", description: "Building an open ecosystem for visual effects and animation.", years: "2020 – 2022", status: "Active", category: "Media", technologies: ["Python", "C++", "OpenGL"], topics: ["Graphics", "Animation"], color: "orange", stars: 76, people: 28 },
    { id: "aerospace", name: "AerospaceResearch.net", initials: "AR", description: "Making space and aerospace research accessible to all.", years: "2017 – 2021", status: "Inactive", category: "Research", technologies: ["Python", "CI/CD", "Web"], topics: ["Space", "Science"], color: "green", stars: 54, people: 18 },
    { id: "openmesh", name: "OpenMesh", initials: "OM", description: "Modern tools and geometry processing for open research.", years: "2018 – 2025", status: "Active", category: "Developer Tools", technologies: ["C++", "Python", "Web"], topics: ["Graphics", "Research"], color: "pink", stars: 92, people: 40 },
];
const years = ["Only in 2026", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"];
const categoryOptions = Array.from(new Set(organizations.map((organization) => organization.category))).sort();
const technologyOptions = Array.from(new Set(organizations.flatMap((organization) => organization.technologies))).sort();
const topicOptions = Array.from(new Set(organizations.flatMap((organization) => organization.topics))).sort();
type FilterSection = "categories" | "technologies" | "topics";


type AdvancedFilterModalProps = {
    close: () => void;
    clearFilters: () => void;
    selectedYears: string[];
    selectedCategories: string[];
    selectedTechnologies: string[];
    selectedTopics: string[];
    status: string;
    toggleYear: (year: string) => void;
    toggleCategory: (category: string) => void;
    toggleTechnology: (technology: string) => void;
    toggleTopic: (topic: string) => void;
    setStatus: (status: string) => void;
};

export default function AdvancedFilterModal({ close, clearFilters, selectedYears, selectedCategories, selectedTechnologies, selectedTopics, status, toggleYear, toggleCategory, toggleTechnology, toggleTopic, setStatus }: AdvancedFilterModalProps) {
    const [tab, setTab] = useState("Years");
    const tabs = ["Years", "Categories", "Technologies", "Topics", "Status"];
    const options = tab === "Categories" ? categoryOptions : tab === "Technologies" ? technologyOptions : topicOptions;
    const selected = tab === "Categories" ? selectedCategories : tab === "Technologies" ? selectedTechnologies : selectedTopics;
    const toggle = tab === "Categories" ? toggleCategory : tab === "Technologies" ? toggleTechnology : toggleTopic;
    return <div
        className="modal-backdrop"
        role="dialog"
        aria-modal="true"
        aria-labelledby="advanced-filter-title"
    >
        <div className="advanced-modal">
            <div className="modal-title">
                <h2 id="advanced-filter-title">
                    Advanced Filters
                </h2>
                <button
                    onClick={close}
                    aria-label="Close advanced filters"
                >
                    <X />
                </button>
            </div>
            <div className="modal-body">
                <nav aria-label="Advanced filter groups">
                    {tabs.map((item) => <button key={item} onClick={() => setTab(item)} className={tab === item ? "active" : ""}>{item}</button>)}
                </nav>
                <div className="modal-options">
                    <h3>
                        Select
                        {tab}
                    </h3>
                    {tab === "Years" && <div className="year-grid">{years.map((year) => <label className="check-row" key={year}><input type="checkbox" checked={selectedYears.includes(year)} onChange={() => toggleYear(year)} />{year}</label>)}</div>}
                    {tab === "Status" && <div className="choice-grid">{["Active", "Inactive", "Both"].map((item) => <Pill key={item} active={status === item} onClick={() => setStatus(item)}>{item}</Pill>)}</div>}
                    {tab !== "Years" && tab !== "Status" && <div className="choice-grid">{options.map((item) => <Pill key={item} active={selected.includes(item)} onClick={() => toggle(item)}>{item}</Pill>)}</div>}
                </div>
            </div>
            <div className="modal-footer">
                <button
                    className="text-button"
                    onClick={clearFilters}
                >
                    Clear all
                </button>
                <span />
                <button
                    className="secondary-button"
                    onClick={close}
                >
                    Cancel
                </button>
                <button
                    className="primary-button"
                    onClick={close}
                >
                    Apply filters
                </button>
            </div>
        </div>
    </div>;
}