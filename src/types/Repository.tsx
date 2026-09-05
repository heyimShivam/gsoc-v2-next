export type Repository = {
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