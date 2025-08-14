/* Libraries */
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';

/* Components */
import BlogHeader from '@Components/BlogHeader';
import MarkdownRenderer from '@Components/MarkdownRenderer';

/* Hooks */
import useArticle from '@Hooks/useArticle';

const BlogDetailPageContainer = styled.div`
    min-height: 100vh;
    background: linear-gradient(135deg, #f3f4f6 0%, #d1d5db 50%, #9ca3af 100%);
    position: relative;
`;

const BlogContentContainer = styled.div`
    max-width: 1280px;
    margin: 0 auto;
    padding: 48px 24px;
    display: flex;
    text-wrap: balance;
`;

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
    font-size: 18px;
    color: #6b7280;
`;

const ErrorContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
    font-size: 18px;
    color: #dc2626;
`;

/* Blog Detail Page */
function BlogDetailPage() {
    const { slug } = useParams();
    const { content, isLoading, error } = useArticle(slug || '');

    useEffect(() => {
        document.title = `${slug?.toLowerCase()} | Blog`;
    }, [slug]);

    if (isLoading) {
        return (
            <BlogDetailPageContainer>
                <BlogHeader isExtended={false} />
                <BlogContentContainer>
                    <LoadingContainer>Loading article...</LoadingContainer>
                </BlogContentContainer>
            </BlogDetailPageContainer>
        );
    }

    if (error || !content) {
        return (
            <BlogDetailPageContainer>
                <BlogHeader isExtended={false} />
                <BlogContentContainer>
                    <ErrorContainer>
                        {error || 'Article not found'}
                    </ErrorContainer>
                </BlogContentContainer>
            </BlogDetailPageContainer>
        );
    }

    return (
        <BlogDetailPageContainer>
            <BlogHeader isExtended={false} />
            <BlogContentContainer>
                <MarkdownRenderer content={content} />
            </BlogContentContainer>
        </BlogDetailPageContainer>
    );
}

export default BlogDetailPage;