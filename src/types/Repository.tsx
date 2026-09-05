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

export interface RepositoryApiData {
    content: Repository[];
    page: number;
    size: number;
    totalRecords: number;
    totalPages: number;
    first: boolean;
    last: boolean;
}

export interface RepositoryResponse {
    data: RepositoryApiData;
}