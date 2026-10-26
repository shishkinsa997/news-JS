export interface Response {
    status: string;
    sources: Sources[];
}

export interface Sources {
    id: string | null;
    name: string;
}
