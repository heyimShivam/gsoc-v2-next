"use client";

import Link from "next/link";
import {
    ArrowRight,
    Sparkles,
    ChevronLeft,
    ChevronRight,
    Search,
    Grid2X2,
    List,
    Minus,
    SlidersHorizontal,
    X,
    ChevronDown,
    Database,
    UsersRound
} from "lucide-react";

import "./HomePageAnimationBG.css";

const organizations = [
    {
        name: "AFIplusplus",
        description: "State of the art fuzzing for better security",
        status: "Active",
        logo: "AF",
        tags: ["c/c++", "fuzzing", "instrumentation", "llvm"],
        years: "2020  2021  2022  2023"
    },
    {
        name: "aimacode",
        description: 'Code for the book "Artificial Intelligence: A Modern Approach"',
        status: "Inactive",
        logo: "AI",
        tags: ["ai", "java", "javascript", "python"],
        years: "2016  2017  2018  2019"
    },
    {
        name: "Alaska",
        description: "Many Traditions, One Alaska",
        status: "Inactive",
        logo: "AK",
        tags: ["dicom", "java", "matlab", "mysql"],
        years: "2024  2025"
    },
    {
        name: "Oppia foundation",
        description: "Free platform for interactive, tutor-like lessons",
        status: "Active",
        logo: "OP",
        tags: ["c/c++", "fuzzing", "instrumentation", "llvm"],
        years: "2016  2017  2018  2019  2020  2021  2022 203"
    },
    {
        name: "52°North",
        description: 'Innovative ideas & technologies in geoinformatics',
        status: "Active",
        logo: "NO",
        tags: ["ai", "java", "javascript", "python"],
        years: "2016  2017  2018  2019  2020  2021  2022"
    },
    {
        name: "Red Hen Lab",
        description: "Research on Multimodal Communication",
        status: "Inactive",
        logo: "RE",
        tags: ["dicom", "java", "matlab", "mysql"],
        years: "2024  2025"
    }
];

export default function HomePageAnimationBG() {
    return (
        <section className="home-hero">
            {/* Main Content */}
            <div className="hero-content">
                {/* Badge */}
                <div className="hero-badge">
                    <Sparkles size={14} />
                    <span>OPEN SOURCE · GOOGLE SUMMER OF CODE</span>
                </div>

                {/* Heading */}
                <h1 className="hero-title">
                    Find Your Perfect
                    <span>GSoC Organization</span>
                </h1>

                {/* Description */}
                <p className="hero-description">
                    Explore past Google Summer of Code organizations,
                    discover technologies and projects, and find
                    opportunities that match your interests.
                </p>

                {/* Actions */}
                <div className="hero-actions">
                    <Link
                        href="/explore"
                        className="primary-button"
                    >
                        Explore Organizations
                        <ArrowRight size={19} />
                    </Link>

                    <Link
                        href="/guide"
                        className="secondary-button"
                    >
                        Learn More
                    </Link>
                </div>

                {/* Features */}
                <div className="heroFeatures">

                    <div className="heroFeature">

                        <div className="heroFeatureIcon">
                            <UsersRound size={30} strokeWidth={1.8} />
                        </div>

                        <div className="heroFeatureContent">
                            <strong>500+</strong>
                            <span>Organizations</span>
                        </div>

                    </div>

                    <div className="featureDivider" />

                    <div className="heroFeature">

                        <div className="heroFeatureIcon">
                            <Database size={30} strokeWidth={1.8} />
                        </div>

                        <div className="heroFeatureContent">
                            <strong>Multiple Years</strong>
                            <span>Historical Data</span>
                        </div>

                    </div>

                    <div className="featureDivider" />

                    <div className="heroFeature">

                        <div className="heroFeatureIcon">
                            <SlidersHorizontal size={30} strokeWidth={1.8} />
                        </div>

                        <div className="heroFeatureContent">
                            <strong>Smart Filters</strong>
                            <span>Find Your Match</span>
                        </div>

                    </div>

                </div>
            </div>

            {/* Explorer Preview */}
            <div className="explorer-preview-wrapper">
                <div className="browser-window">

                    {/* Chrome Top Bar */}
                    <div className="browser-toolbar">
                        <div className="browser-controls">
                            <span className="browser-dot browser-dot-red" />
                            <span className="browser-dot browser-dot-yellow" />
                            <span className="browser-dot browser-dot-green" />
                        </div>

                        <div className="browser-address">
                            <div className="browser-address-icon">
                                <Search size={13} />
                            </div>

                            <span>gsocorganization.com/explore</span>
                        </div>
                    </div>

                    {/* Explorer UI */}
                    <div className="browser-content">

                        {/* Sidebar */}
                        <aside className="preview-sidebar">
                            <div className="preview-sidebar-title">
                                Filters
                            </div>

                            <div className="preview-filter-search">
                                <Search size={14} />
                                <span>Search filters...</span>
                            </div>

                            <div className="preview-filter-section">
                                <div className="preview-filter-heading">
                                    <span>Years</span>
                                    <ChevronDown
                                        className={
                                            true
                                                ? "rotated"
                                                : ""
                                        }
                                        size={14}
                                    />
                                </div>

                                <div className="preview-years">
                                    {[
                                        "2019",
                                        "2020",
                                        "2021",
                                        "2022",
                                        "2023",
                                        "2024"
                                    ].map((year) => (
                                        <label key={year}>
                                            <span className="preview-checkbox" />
                                            {year}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="preview-filter-row">
                                <span>Categories</span>
                                <ChevronDown
                                    className={
                                        true
                                            ? ""
                                            : "rotated"
                                    }
                                    size={14}
                                />
                            </div>

                            <div className="preview-filter-row">
                                <span>Technologies</span>
                                <ChevronDown
                                    className={
                                        true
                                            ? ""
                                            : "rotated"
                                    }
                                    size={14}
                                />
                            </div>

                            <div className="preview-filter-row">
                                <span>Topics</span>
                                <ChevronDown
                                    className={
                                        true
                                            ? ""
                                            : "rotated"
                                    }
                                    size={14}
                                />
                            </div>

                            <div className="preview-filter-section preview-status">
                                <div className="preview-filter-heading">
                                    <span>Status</span>
                                    <ChevronDown
                                        className={
                                            true
                                                ? "rotated"
                                                : ""
                                        }
                                        size={14}
                                    />
                                </div>

                                <div className="status-item">
                                    <span className={`status-dot active-dot`} />
                                    Active
                                </div>

                                <div className="status-item">
                                    <span className={`status-dot inactive-dot`} />
                                    Inactive
                                </div>
                            </div>
                        </aside>

                        {/* Main Explorer */}
                        <main className="preview-main">

                            <div className="preview-header">
                                <div>
                                    <h2>500+ Organizations</h2>
                                    <p>
                                        Discover organizations participating in
                                        Google Summer of Code
                                    </p>
                                </div>

                                <div className="preview-view-actions">
                                    <button>
                                        <Grid2X2 size={16} />
                                    </button>

                                    <button>
                                        <List size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Search */}
                            <div className="preview-search">
                                <Search size={17} />
                                <span>Search organizations...</span>
                            </div>

                            {/* Cards */}
                            <div className="preview-cards">
                                {organizations.map((organization) => (
                                    <div
                                        className="preview-card"
                                        key={organization.name}
                                    >
                                        <div className="preview-card-logo">
                                            {organization.logo}
                                        </div>

                                        <div className="preview-card-body">
                                            <div className="preview-card-top">
                                                <h3>{organization.name}</h3>

                                                <span
                                                    className={`preview-status-badge ${organization.status === "Active"
                                                        ? "preview-active"
                                                        : "preview-inactive"
                                                        }`}
                                                >
                                                    {organization.status}
                                                </span>
                                            </div>

                                            <p>
                                                {organization.description}
                                            </p>

                                            <div className="preview-tags">
                                                {organization.tags.map((tag) => (
                                                    <span key={tag}>
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="preview-years-text">
                                                {organization.years}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            <div className="preview-pagination">
                                <button>
                                    <ChevronLeft size={15} />
                                </button>

                                <button className="active-page">1</button>

                                <button>2</button>

                                <button>3</button>

                                <span>...</span>

                                <button>84</button>

                                <button>
                                    <ChevronRight size={15} />
                                </button>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </section>
    );
}