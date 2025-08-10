import React from 'react'
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useRef } from 'react';
import BlogCard from '@Components/BlogCard';


// Styled Components
const PageContainer = styled.div`
      min-height: 100vh;
      background: linear-gradient(135deg, #f3f4f6 0%, #d1d5db 50%, #9ca3af 100%);
      position: relative;
`;

const Header = styled.header`
      position: relative;
      overflow: hidden;
      background: linear-gradient(90deg, #1f2937 0%, #111827 100%);

      ::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 2px;
        height: 100%;
        background: rgba(255, 255, 255, 0.1);
        animation: scanline 8s infinite;
      }
`;

const HeaderContent = styled.div`
      max-width: 1280px;
      margin: 0 auto;
      padding: 48px 24px;
      position: relative;
      z-index: 10;
    `;

const BackButton = styled.button`
      display: flex;
      align-items: center;
      gap: 12px;
      color: #d1d5db;
      background: none;
      border: none;
      cursor: pointer;
      margin-bottom: 32px;
      transition: all 0.5s ease;
`;

const IconContainer = styled.div`
      padding: 8px;
      border: 1px solid #4b5563;
      transition: all 0.3s ease;
`;

const BackText = styled.span`
      font-size: 14px;
      font-weight: 300;
      letter-spacing: 2px;
      text-transform: uppercase;
      opacity: 0.8;
`;

const HeaderTitle = styled.div`
      text-align: center;
`;

const MainTitle = styled.h1`
      font-size: 48px;
      font-weight: 100;
      color: white;
      margin-bottom: 16px;
      letter-spacing: 8px;

      @media (max-width: 768px) {
          font-size: 32px !important;
          letter-spacing: 4px !important;
      }
`;

const Subtitle = styled.p`
      color: #9ca3af;
      font-size: 18px;
      font-weight: 300;
      max-width: 512px;
      margin: 0 auto;
      line-height: 1.7;
`;

const MainContent = styled.main`
      max-width: 1280px;
      margin: 0 auto;
      padding: 64px 24px;
      background: url('drop-cieling.png');
      background-size: 100% 100%;
      background-position: center;
      background-repeat: repeat;
`;

const CardGrid = styled.div`
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 48px;
`;

const mockPosts = [
  {
    image: "https://picsum.photos/200/300",
    title: "The Endless Hallway",
    summary: "Fluorescent lights hum overhead as we walk through corridors that seem to stretch beyond reason."
  },
  {
    image: "https://picsum.photos/200/301",
    title: "Empty Swimming Pool",
    summary: "The blue tiles reflect nothing but shadows in a space meant for joy, now holding only silence."
  },
  {
    image: "https://picsum.photos/200/302",
    title: "Between Floors",
    summary: "Stairwells that connect to nowhere, where footsteps echo in impossible acoustics."
  },
  {
    image: "https://picsum.photos/200/304",
    title: "The Waiting Room",
    summary: "Beige walls and outdated magazines in a place where time seems suspended indefinitely."
  },
  {
    image: "https://picsum.photos/200/305",
    title: "Parking Garage Level B",
    summary: "Concrete pillars extend into darkness, where every corner looks exactly the same."
  },
  {
    image: "https://picsum.photos/200/306",
    title: "After Hours Mall",
    summary: "Empty storefronts with grates pulled down, escalators running to serve no one."
  }
];

function BlogPage() {
  const navigate = useNavigate();

  // Refs for DOM elements
  const buttonRef = useRef<HTMLButtonElement>(null);
  const iconContainerRef = useRef<HTMLDivElement>(null);

  const handleBackClick = (): void => {
    navigate('/');
  };

  const handleMouseEnter = (): void => {
    if (buttonRef.current) {
      buttonRef.current.style.color = 'white';
    }
    if (iconContainerRef.current) {
      iconContainerRef.current.style.transform = 'rotate(180deg)';
      iconContainerRef.current.style.borderColor = '#9ca3af';
    }
  };

  const handleMouseLeave = (): void => {
    if (buttonRef.current) {
      buttonRef.current.style.color = '#d1d5db';
    }
    if (iconContainerRef.current) {
      iconContainerRef.current.style.transform = 'rotate(0deg)';
      iconContainerRef.current.style.borderColor = '#4b5563';
    }
  };

  return (
    <PageContainer>
      <Header className="header">
        <HeaderContent>
          <BackButton
            ref={buttonRef}
            onClick={handleBackClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <IconContainer ref={iconContainerRef}>
              <ArrowRight size={20} />
            </IconContainer>
            <BackText>Return to the surface</BackText>
          </BackButton>

          <HeaderTitle>
            <MainTitle>LIMINAL SPACES</MainTitle>
            <Subtitle>
              Journal entries, learning experiences, and short-stories
              from places that exist between destinations,
              where real-life and surrealism congregate.
            </Subtitle>
          </HeaderTitle>
        </HeaderContent>
      </Header>

      {/* Bottom Half */}
      <MainContent>
        <CardGrid>
          {/* TOOO: Wrap each card with a Route */}
          {mockPosts.map((post, index) => (
            <BlogCard
              key={index}
              image={post.image}
              title={post.title}
              summary={post.summary}
              index={index}
            />
          ))}
        </CardGrid>
      </MainContent>
    </PageContainer>

  );
}

export default BlogPage;
