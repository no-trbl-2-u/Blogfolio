/* Libraries */
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';

/* Components */
import BlogHeader from '@Components/BlogHeader';

const BlogDetailPageContainer = styled.div`
    min-height: 100vh;
    background: linear-gradient(135deg, #f3f4f6 0%, #d1d5db 50%, #9ca3af 100%);
    position: relative;
`
/* Blog Detail Page */
function BlogDetailPage() {
    const { slug } = useParams();

    useEffect(() => {
        document.title = `${slug?.toLowerCase()} | Blog`;
    }, [slug])

    return (
        <BlogDetailPageContainer>
            <BlogHeader isExtended={false} />
        </BlogDetailPageContainer>
    )
}

export default BlogDetailPage;