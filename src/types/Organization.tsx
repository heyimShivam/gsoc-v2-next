export type Organization = {
    activeOrg: boolean;
    description: string;
    githubID: string;
    id: string;
    imageBackgroundColor: string;
    imageUrl: string;
    name: string;
    technologies: string[];
    years: string[];
    category: string[];
    topics: string[];
    width: number;
    height: number;
};

export type organizationImage = {
    imageBackgroundColor: string;
    imageUrl: string;
    name: string;
    width: number;
    height: number;
}