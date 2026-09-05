export type OrganizationDetails = {
    id: string;
    name: string;
    imageUrl: string;
    imageBackgroundColor: string;
    description: string;
    url: string | null;
    githubId: string | null;
    activeOrg: boolean;
    years: number[];
    categories: string[];
    topics: string[];
    technologies: string[];
    contactInfo: {
        ircChannel: string | null;
        contactEmail: string | null;
        mailingList: string | null;
        twitterUrl: string | null;
        blogUrl: string | null;
        facebookUrl: string | null;
    };
};