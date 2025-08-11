export interface BlogPost {
    image: string;
    title: string;
    summary: string;
    slug?: string;
    content?: string;
    date?: string;
    tags?: string[];
}
