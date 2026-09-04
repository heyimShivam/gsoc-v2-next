"use client";

import { SiteHeader } from "@/components/SiteHeader";
import { Search, ChevronDown, SlidersHorizontal, Filter, Grid2X2, List } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import AdvancedFilterModal from "@/components/AdvancedFilterModal";
import { OrgCard } from "@/components/OrgCard";
import { Organization } from "@/types/Organization";
import Pill from "@/components/Pill";
import Pagination from "@/components/Pagination";


type FilterSection = "categories" | "technologies" | "topics";

export default function ExplorerPage() {
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalOrganizations, setTotalOrganizations] = useState(0);
    const [searchOrgsName, setSearchOrgsName] = useState("");

    const fetchOrganizations = async () => {
        let reqBody = {
            // "technologies": [
            // "python"
            // ],
            // sortBy: "NAME",
            // "activeOrg": true,
            // sortDirection: "DESC"

            orgName: searchOrgsName,
            // years: [2018, 2020],
            years: [],
            // categories: ["s"],
            // topics,
            // technologies,
            // activeOrg: true,
            sortBy: "NAME",
            sortDirection: "ASC"
        };

        try {
            const response = await fetch(
                `http://localhost:8080/api/organizations?page=${currentPage}&size=6`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(reqBody)
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch organizations");
            }

            const responseData = await response.json();

            setOrganizations(responseData.data.content);
            setTotalPages(responseData.data.totalPages);
            setTotalOrganizations(responseData.data.totalRecords);
        } catch (error) {
            console.error("Error fetching organizations:", error);
        }
    };

    useEffect(() => {
        fetchOrganizations();
    }, [currentPage]);

    // Debouncing
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchOrganizations();
        }, 500);

        return () => {
            clearTimeout(timer);
        };
    }, [searchOrgsName]);

    function searchNewOrganizations(placeholderValue: string) {
        setSearchOrgsName(placeholderValue);
    }
    const years = ["Only in 2026", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"];
    const categoryOptions = Array.from(new Set(organizations.map((organization) => organization.category))).sort();
    const technologyOptions = Array.from(new Set(organizations.flatMap((organization) => organization.technologies))).sort();
    const topicOptions = Array.from(new Set(organizations.flatMap((organization) => organization.topics))).sort();


    const [filterQuery, setFilterQuery] = useState("");
    const [selectedYears, setSelectedYears] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
    const [status, setStatus] = useState<"Active" | "Inactive" | "Both">("Both");
    const [view, setView] = useState<"grid" | "list">("grid");
    const [sort, setSort] = useState("Relevance");
    const [filterOpen, setFilterOpen] = useState(false);
    const [yearsOpen, setYearsOpen] = useState(true);
    const [modal, setModal] = useState(false);
    const [statusOpen, setStatusOpen] = useState(true);
    const [sections, setSections] = useState<Record<FilterSection, boolean>>({ categories: false, technologies: false, topics: false });
    const normalizedFilterQuery = filterQuery.toLowerCase();
    const visibleYears = years.filter((year) => year.toLowerCase().includes(normalizedFilterQuery));
    const matchesFilterSearch = (option: string) => option.toLowerCase().includes(normalizedFilterQuery);
    const organizationMatchesYear = (organization: Organization, selectedYear: string) => {
        const organizationYears = organization.years.match(/\d{4}/g)?.map(Number) ?? [];
        if (!organizationYears.length)
            return false;
        const firstYear = Math.min(...organizationYears);
        const lastYear = Math.max(...organizationYears);
        const targetYear = selectedYear === "Only in 2026" ? 2026 : Number(selectedYear);
        return targetYear >= firstYear && targetYear <= lastYear;
    };
    const results = organizations;
    const toggleYear = (year: string) => setSelectedYears((old) => old.includes(year) ? old.filter((item) => item !== year) : [...old, year]);
    const toggleSelection = (value: string, setSelection: React.Dispatch<React.SetStateAction<string[]>>) => setSelection((old) => old.includes(value) ? old.filter((item) => item !== value) : [...old, value]);
    const clearFilters = () => { setSelectedYears([]); setSelectedCategories([]); setSelectedTechnologies([]); setSelectedTopics([]); setStatus("Both"); setFilterQuery(""); };
    const renderSelectableOptions = (options: string[], selected: string[], toggle: (option: string) => void) => {
        const matchingOptions = options.filter(matchesFilterSearch);
        return matchingOptions.length ? <div className="filter-options">
            {matchingOptions.map((option) => <Pill key={option} active={selected.includes(option)} onClick={() => toggle(option)}>{option}</Pill>)}
        </div> : <p className="filter-empty">
            No matching filters
        </p>;
    };
    const activeFilterCount = selectedYears.length + selectedCategories.length + selectedTechnologies.length + selectedTopics.length + (status === "Both" ? 0 : 1);

    return <main className="app-shell explorer-shell">
        <SiteHeader />
        <div className="explorer-layout">
            <aside className={filterOpen ? "filters open" : "filters"}>
                <div className="filters-title">
                    <h2>
                        Filters
                    </h2>
                    <button onClick={clearFilters}>
                        Clear all
                    </button>
                </div>
                <label className="filter-search">
                    <Search size={16} />
                    <input
                        value={filterQuery}
                        onChange={(event) => setFilterQuery(event.target.value)}
                        placeholder="Search filters..."
                    />
                </label>
                <section className="filter-section">
                    <button
                        className="section-toggle"
                        onClick={() => setYearsOpen(!yearsOpen)}
                    >
                        <strong>
                            Years
                        </strong>
                        <ChevronDown
                            className={yearsOpen ? "rotated" : ""}
                            size={16}
                        />
                    </button>
                    {yearsOpen && visibleYears.map((year) => <label className="check-row" key={year}><input type="checkbox" checked={selectedYears.includes(year)} onChange={() => toggleYear(year)} /><span>{year}</span></label>)}
                    {yearsOpen && !visibleYears.length && <p className="filter-empty">No matching years</p>}
                </section>
                {([['categories', 'Categories', categoryOptions, selectedCategories, (option: string) => toggleSelection(option, setSelectedCategories)], ['technologies', 'Technologies', technologyOptions, selectedTechnologies, (option: string) => toggleSelection(option, setSelectedTechnologies)], ['topics', 'Topics', topicOptions, selectedTopics, (option: string) => toggleSelection(option, setSelectedTopics)]] as const).map(([id, label, options, selected, toggle]) => <section className="filter-section collapsed" key={id}>
                    <button className="section-toggle" onClick={() => setSections({ ...sections, [id]: !sections[id] })}><strong>{label}</strong><ChevronDown className={sections[id] ? "rotated" : ""} size={16} /></button>
                    {sections[id] && renderSelectableOptions(options, selected, toggle)}
                </section>)}
                <section className="filter-section">
                    <button
                        className="section-toggle"
                        onClick={() => setStatusOpen(!statusOpen)}
                    >
                        <strong>
                            Status
                        </strong>

                        <ChevronDown
                            className={statusOpen ? "rotated" : ""}
                            size={16}
                        />
                    </button>

                    {statusOpen && (
                        <>
                            {["Active", "Inactive", "Both"].map((item) => (
                                <label
                                    className="radio-row"
                                    key={item}
                                >
                                    <input
                                        type="radio"
                                        name="status"
                                        checked={status === item}
                                        onChange={() =>
                                            setStatus(item as "Active" | "Inactive" | "Both")
                                        }
                                    />

                                    <span
                                        className={`status-dot ${item.toLowerCase()}-dot`}
                                    />

                                    {item}
                                </label>
                            ))}
                        </>
                    )}
                </section>
                <button
                    className="primary-button filter-apply"
                    onClick={() => setModal(true)}
                >
                    <SlidersHorizontal size={17} />
                    Advanced filters
                    {activeFilterCount > 0 && <span className="filter-count">{activeFilterCount}</span>}
                </button>
            </aside>
            <section className="explorer-content">
                <div className="mobile-filter-row">
                    <button
                        className="secondary-button"
                        onClick={() => setFilterOpen(!filterOpen)}
                    >
                        <Filter size={16} />
                        Filters
                    </button>
                    <button
                        className="secondary-button"
                        onClick={() => setModal(true)}
                    >
                        Advanced
                    </button>
                </div>
                <div className="explorer-heading">
                    <div>
                        <h1>
                            {totalOrganizations} Organizations
                        </h1>
                        <p>
                            Discover organizations participating in Google Summer of Code
                        </p>
                    </div>
                    <div className="view-controls">
                        <label className="sort-control">
                            Sort by:
                            <select
                                value={sort}
                                onChange={(event) => setSort(event.target.value)}
                            >
                                <option>
                                    Name
                                </option>
                                <option>
                                    Popularity
                                </option>
                            </select>
                        </label>
                        <button
                            className={view === "grid" ? "view-button active" : "view-button"}
                            onClick={() => setView("grid")}
                            aria-label="Grid view"
                        >
                            <Grid2X2 size={18} />
                        </button>
                        <button
                            className={view === "list" ? "view-button active" : "view-button"}
                            onClick={() => setView("list")}
                            aria-label="List view"
                        >
                            <List size={18} />
                        </button>
                    </div>
                </div>
                <label className="wide-search">
                    <Search size={20} />
                    <input
                        value={searchOrgsName}
                        onChange={(event) => searchNewOrganizations(event.target.value)}
                        placeholder="Search organizations..."
                    />
                </label>
                <div className={view === "grid" ? "organization-grid" : "organization-list"}>
                    {results.map((org) => <OrgCard key={org.id} org={org} list={view === "list"} />)}
                </div>

                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

                {!results.length && <div className="empty-state">No organizations match this sample query.</div>}
            </section>
        </div>
        {modal && <AdvancedFilterModal close={() => setModal(false)} clearFilters={clearFilters} selectedYears={selectedYears} selectedCategories={selectedCategories} selectedTechnologies={selectedTechnologies} selectedTopics={selectedTopics} status={status} toggleYear={toggleYear} toggleCategory={(category) => toggleSelection(category, setSelectedCategories)} toggleTechnology={(technology) => toggleSelection(technology, setSelectedTechnologies)} toggleTopic={(topic) => toggleSelection(topic, setSelectedTopics)} setStatus={setStatus} />}
    </main>;
}