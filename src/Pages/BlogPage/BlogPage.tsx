/* Libraries */
import React from 'react';
import styled from '@emotion/styled';

/* Components */
import BlogHeader from '@Components/BlogHeader';
import BlogCard from '@Components/BlogCard';
import articles from '@Hooks/useArticle/articleIndex';

/* Types */
import { BlogPost } from '@Types';

// Styled Components
const PageContainer = styled.div`
      min-height: 100vh;
      background: linear-gradient(135deg, #f3f4f6 0%, #d1d5db 50%, #9ca3af 100%);
      position: relative;
`

const MainContent = styled.main`
      max-width: 1280px;
      margin: 0 auto;
      padding: 64px 24px;
      background: url('drop-ceiling.png');
      background-size: 100% 100%;
      background-position: center;
      background-repeat: repeat;
`

const CardGrid = styled.div`
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 48px;
`

function BlogPage() {
  return (
    <PageContainer>
      <BlogHeader isExtended />
      <MainContent>
        <CardGrid>
          {/* TODO: Wrap each card with a Route */}
          {articles.map((post: BlogPost, index: number) => (
            <BlogCard
              key={index}
              index={index}
              slug={post.slug}
              image={post.image}
              title={post.title}
              summary={post.summary}
            />
          ))}
        </CardGrid>
      </MainContent>
    </PageContainer>

  )
}

export default BlogPage;
