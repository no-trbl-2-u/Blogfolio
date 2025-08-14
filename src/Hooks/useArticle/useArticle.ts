/* Libraries */
import { useState, useEffect } from 'react';

/* Types */
import { UseArticleReturn, ArticleData } from "@Types";

/* Main Hook */
export function useArticle(slug: string): UseArticleReturn {
    const [content, setContent] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [articleData, setArticleData] = useState<ArticleData | null>(null);

    useEffect(() => {
        if (!slug) {
            setError('No slug provided');
            setIsLoading(false);
            return;
        }

        const loadArticle = async (): Promise<void> => {
            try {
                setIsLoading(true);
                setError(null);

                // Fetch the markdown file from the public directory
                const response = await fetch(`/articles/${slug}.md`);

                if (!response.ok) {
                    throw new Error(`Failed to load article: ${response.status} ${response.statusText}`);
                }

                const markdownContent = await response.text();

                // For now, we'll use a simple approach - you can enhance this later
                // with frontmatter parsing if needed
                const articleData: ArticleData = {
                    content: markdownContent,
                    title: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                    date: new Date().toISOString().split('T')[0], // Default date
                    summary: 'Article content loaded dynamically',
                    tags: ['dynamic', 'loaded']
                };

                setContent(markdownContent);
                setArticleData(articleData);
            } catch (err) {
                console.error('Failed to load article:', err);
                setError(`Failed to load article: ${slug}`);
            } finally {
                setIsLoading(false);
            }
        };

        loadArticle();
    }, [slug]);

    return {
        content,
        isLoading,
        error,
        articleData
    };
}

export default useArticle;