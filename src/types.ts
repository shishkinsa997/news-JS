export interface Response {
    status: string;
    sources: Source[];
}

export interface Source {
    id: string | null;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface ResponseNews {
    status: string;
    totalResults: number;
    articles: Article[];
}

export interface Article {
    source: {
        id: string | null;
        name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export enum Endpoint {
    Sources = 'sources',
    Everything = 'everything'
}