export type Organization = {
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