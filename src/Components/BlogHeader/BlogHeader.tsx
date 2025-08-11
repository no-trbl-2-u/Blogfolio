/* Libraries */
import React, { useCallback, useRef, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/* Types */
interface BlogHeaderProps {
  isExtended?: boolean;
}

/* Styled Components */
const Header = styled.header<{ $isExtended: boolean; $isAnimating: boolean }>`
      position: relative;
      overflow: hidden;
      background: linear-gradient(90deg, #1f2937 0%, #111827 100%);
      transition: max-height 0.8s cubic-bezier(0.4, 0, 0.2, 1);
      min-height: ${({ $isExtended }) => $isExtended ? 'auto' : '100px'};
      max-height: ${({ $isExtended, $isAnimating }) =>
    $isExtended ? '800px' : ($isAnimating ? '100px' : '500px')
  };

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

const HeaderContent = styled.div<{ $isExtended: boolean }>`
      max-width: 1280px;
      margin: 0 auto;
      padding: 24px;
      position: relative;
      z-index: 10;
      transition: padding 0.8s cubic-bezier(0.4, 0, 0.2, 1);
`;

const BackButton = styled.button<{ $isExtended: boolean }>`
      display: flex;
      align-items: center;
      gap: 12px;
      color: #d1d5db;
      background: none;
      border: none;
      cursor: pointer;
      margin-bottom: ${({ $isExtended }) => $isExtended ? '32px' : '0'};
      transition: all 0.5s ease, margin-bottom 0.8s cubic-bezier(0.4, 0, 0.2, 1);
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

const HeaderTitle = styled.div<{ $isExtended: boolean; $isAnimating: boolean }>`
      text-align: center;
      overflow: hidden;
      transition: opacity 0.6s ease, transform 0.6s ease, max-height 0.8s cubic-bezier(0.4, 0, 0.2, 1);
      pointer-events: ${({ $isExtended }) => $isExtended ? 'auto' : 'none'};
      opacity: ${({ $isExtended, $isAnimating }) =>
    $isExtended ? '1' : ($isAnimating ? '0' : '1')
  };
      transform: ${({ $isExtended, $isAnimating }) =>
    $isExtended ? 'translateY(0)' : ($isAnimating ? 'translateY(-20px)' : 'translateY(0)')
  };
      max-height: ${({ $isExtended, $isAnimating }) =>
    $isExtended ? '200px' : ($isAnimating ? '0' : '200px')
  };
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

/* Main Component */
function BlogHeader({ isExtended = true }: BlogHeaderProps) {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);

  // Refs for DOM elements
  const buttonRef = useRef<HTMLButtonElement>(null);
  const iconContainerRef = useRef<HTMLDivElement>(null);

  // Handle animation when isExtended prop changes
  useEffect(() => {
    if (!isExtended) {
      // Start animation after a brief delay to ensure initial render
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
    }
  }, [isExtended]);

  const handleBackClick = useCallback((): void => {
    /* If the header is extended, go home, otherwise go back to the blog */
    if (isExtended) {
      navigate('/');
    } else {
      navigate('/blog')
    }
  }, [navigate, isExtended]);

  const handleMouseEnter = useCallback((): void => {
    if (buttonRef.current) {
      buttonRef.current.style.color = 'white';
    }
    if (iconContainerRef.current) {
      iconContainerRef.current.style.transform = 'rotate(180deg)';
      iconContainerRef.current.style.borderColor = '#9ca3af';
    }
  }, []);

  const handleMouseLeave = useCallback((): void => {
    if (buttonRef.current) {
      buttonRef.current.style.color = '#d1d5db';
    }
    if (iconContainerRef.current) {
      iconContainerRef.current.style.transform = 'rotate(0deg)';
      iconContainerRef.current.style.borderColor = '#4b5563';
    }
  }, []);

  return (
    <Header $isExtended={isExtended} $isAnimating={isAnimating}>
      <HeaderContent $isExtended={isExtended}>
        <BackButton
          ref={buttonRef}
          onClick={handleBackClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          $isExtended={isExtended}
        >
          <IconContainer ref={iconContainerRef}>
            <ArrowRight size={20} />
          </IconContainer>
          <BackText>Return to the surface</BackText>
        </BackButton>

        <HeaderTitle $isExtended={isExtended} $isAnimating={isAnimating}>
          <MainTitle>LIMINAL SPACES</MainTitle>
          <Subtitle>
            Journal entries, learning experiences, and short-stories
            from places that exist between destinations,
            where real-life and surrealism congregate.
          </Subtitle>
        </HeaderTitle>
      </HeaderContent>
    </Header>
  );
}

export default BlogHeader;