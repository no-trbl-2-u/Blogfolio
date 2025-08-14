export interface BlogPost {
    image: string;
    title: string;
    summary: string;
    slug?: string;
    content?: string;
    date?: string;
    tags?: string[];
}

export interface ArticleData {
    content: string;
    title: string;
    date: string;
    summary: string;
    tags: string[];
}

export interface UseArticleReturn {
    content: string | null;
    isLoading: boolean;
    error: string | null;
    articleData: ArticleData | null;
}