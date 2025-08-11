/* Libraries */
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';

// REMOVE ME
import TESTING_ARTICLE from '@Pages/BlogPage/Articles/080925';


/* Components */
import BlogHeader from '@Components/BlogHeader';

const BlogDetailPageContainer = styled.div`
    min-height: 100vh;
    background: linear-gradient(135deg, #f3f4f6 0%, #d1d5db 50%, #9ca3af 100%);
    position: relative;
`

const BlogContentContainer = styled.div`
    max-width: 1280px;
    margin: 0 auto;
    padding: 48px 24px;
    display: flex;
    text-wrap: balance:
    overflow: scroll;
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
            <BlogContentContainer>
                {/* REMOVE ME */}
                <TESTING_ARTICLE />
            </BlogContentContainer>
        </BlogDetailPageContainer>
    )
}

export default BlogDetailPage;