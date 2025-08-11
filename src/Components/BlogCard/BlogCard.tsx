import React, { useCallback } from 'react';
import { Eye } from 'lucide-react'
import styled from '@emotion/styled'
import { useRef } from 'react'

interface BlogCardProps {
  image: string;
  title: string;
  summary: string;
  index: number;
}

// Different irregular shapes for each card
const SHAPES: readonly string[] = [
  'polygon(0% 0%, 85% 0%, 100% 15%, 100% 100%, 20% 100%, 0% 85%)',
  'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%, 0% 20%)',
  'polygon(0% 20%, 80% 0%, 100% 80%, 20% 100%, 0% 100%)',
  'polygon(0% 0%, 100% 20%, 100% 100%, 0% 80%)',
  'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)',
  'polygon(0% 0%, 100% 0%, 100% 85%, 85% 100%, 15% 100%, 0% 15%)'
]

const CardContainer = styled.div<{ $index: number }>`
      position: relative;
      cursor: pointer;
      transition: all 0.7s ease;
      clip-path: ${({ $index }) => SHAPES[$index % SHAPES.length]};
      filter: drop-shadow(8px 8px 16px rgba(0, 0, 0, 0.3));
      margin-top: ${({ $index }) => ($index % 3) * 8}px;
      animation: float-${({ $index }) => $index} 6s ease-in-out infinite;
  `

const CardContent = styled.div`
      background: #111827;
      height: 320px,
      position: relative,
      overflow: hidden,
  `

const ImageSection = styled.div`
      height: 192px;
      overflow: hidden;
      position: relative;
  `
const Image = styled.img`
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: all 1s ease;
  `

const ImageOverlay = styled.div`
      position: absolute;
      inset: 0;
      background: linear-gradient(to bottom, transparent, transparent, rgba(17, 24, 39, 0.3));
  `

const ContentSection = styled.div`
      background: #f3f4f6;
      height: 128px;
      padding: 16px;
      position: relative;
  `
const Title = styled.h3`
      font-size: 18px;
      font-weight: bold;
      color: #111827;
      margin-bottom: 8px;
      line-height: 1.3;
  `

const Summary = styled.p`
      font-size: 14px;
      color: #4b5563;
      line-height: 1.5;
      font-weight: 300;
  `
const HoverOverlay = styled.div`
      position: absolute;
      inset: 0;
      background: rgba(127, 29, 29, 0);
      transition: all 0.7s ease;
  `

const EyeIcon = styled(Eye)`
      position: absolute;
      bottom: 8px;
      right: 8px;
      opacity: 0.1;
      color: #6b7280;
      transition: opacity 0.2s ease;
      animation: glitch 3s infinite;
  `
// Card Component
function BlogCard(props: BlogCardProps) {
  const { image, title, summary, index } = props

  // Refs for DOM elements
  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const eyeRef = useRef<SVGSVGElement>(null)



  const handleMouseEnterCard = useCallback((): void => {
    // Now using refs instead of querySelector
    if (cardRef.current) {
      cardRef.current.style.transform = 'scale(1.05) rotate(1deg)';
    }
    if (imageRef.current) {
      imageRef.current.style.transform = 'scale(1.1)';
      imageRef.current.style.filter = 'brightness(0.5)';
    }
    if (overlayRef.current) {
      overlayRef.current.style.background = 'rgba(127, 29, 29, 0.05)';
    }
    if (eyeRef.current) {
      eyeRef.current.style.opacity = '0.4';
    }
  }, [])

  const handleMouseLeaveCard = useCallback((): void => {
    if (cardRef.current && cardRef.current.style) {
      cardRef.current.style.transform = 'scale(1) rotate(0deg)';
    }
    if (imageRef.current) {
      imageRef.current.style.transform = 'scale(1)';
      imageRef.current.style.filter = 'brightness(1)';
    }
    if (overlayRef.current) {
      overlayRef.current.style.background = 'rgba(127, 29, 29, 0)';
    }
    if (eyeRef.current) {
      eyeRef.current.style.opacity = '0.1';
    }
  }, [])

  return (
    <CardContainer
      $index={index}
      ref={cardRef}
      className="card-container"
      onMouseEnter={handleMouseEnterCard}
      onMouseLeave={handleMouseLeaveCard}
    >
      <CardContent>
        <ImageSection>
          <Image
            ref={imageRef}
            src={image}
            alt={title}
            className="card-image"
          />
          <ImageOverlay />
        </ImageSection>
        <ContentSection>
          <Title>{title}</Title>
          <Summary>{summary}</Summary>
          <EyeIcon ref={eyeRef} size={24} className="eye-icon" />
        </ContentSection>
        <HoverOverlay ref={overlayRef} />
      </CardContent>
    </CardContainer>
  )
}

export default BlogCard;