"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
    Menu,
    Search,
    Sparkles,
    X,
} from "lucide-react";

const navItems = [
    { label: "Explore", href: "/explore" },
    { label: "About", href: "/about" },
    { label: "Guide", href: "/guide" }
];

export function SiteHeader({ landing = false }: { landing?: boolean }) {
    const pathname = usePathname();
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);
    const [topQuery, setTopQuery] = useState("");

    return (
        <header className="site-header">
            <Link href="/" className="brand" aria-label="GSoC Hub home">
                <span className="brand-mark"><Sparkles size={20} /></span>
                <span>GSoC <b>Hub</b></span>
            </Link>
            <nav className={menuOpen ? "main-nav open" : "main-nav"} aria-label="Main navigation">
                {navItems.map((item) => {
                    const active = pathname === item.href;
                    return <Link className={active ? "active" : ""} href={item.href} key={item.label} onClick={() => setMenuOpen(false)}>{item.label}</Link>;
                })}
            </nav>
            <div className="header-actions">
                {landing ? <button className="icon-button" aria-label="Search"><Search size={19} /></button> : <form className="top-search" onSubmit={(event) => { event.preventDefault(); router.push(`/explore${topQuery ? `?q=${encodeURIComponent(topQuery)}` : ""}`); }}><Search size={15} /><input value={topQuery} onChange={(event) => setTopQuery(event.target.value)} placeholder="Search organizations..." aria-label="Search organizations" /></form>}
                {landing ? <Link className="sign-in" href="#signin">Sign in</Link> : <button className="avatar" aria-label="Open profile">S</button>}
                <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
            </div>
        </header>
    );
}