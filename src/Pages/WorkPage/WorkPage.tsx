import React from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

interface WorkItem {
  title: string;
  description: string;
  tags: string[];
  slug: string;
}

/* Styled Components */
const WorkPageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
`;

const MainTitle = styled.h1`
  font-size: 4rem;
  font-weight: 100;
  color: #1e293b;
  letter-spacing: 8px;
  text-align: center;
  margin-bottom: 2rem;
  text-shadow: 
    0 0 10px rgba(0, 0, 0, 0.3),
    0 0 20px rgba(0, 0, 0, 0.2),
    0 0 30px rgba(0, 0, 0, 0.1),
    2px 2px 4px rgba(0, 0, 0, 0.4),
    -2px -2px 4px rgba(0, 0, 0, 0.2),
    2px -2px 4px rgba(0, 0, 0, 0.2),
    -2px 2px 4px rgba(0, 0, 0, 0.2);
  opacity: 0.8;
  animation: fadeInUp 1s ease-out;

  @media (max-width: 768px) {
    font-size: 2.5rem;
    letter-spacing: 4px;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
    letter-spacing: 2px;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  font-weight: 300;
  color: #64748b;
  letter-spacing: 2px;
  text-align: center;
  max-width: 600px;
  line-height: 1.6;
  margin-bottom: 3rem;
  animation: fadeInUp 1s ease-out 0.3s both;

  @media (max-width: 768px) {
    font-size: 1rem;
    letter-spacing: 1px;
  }
`;

const WorkGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 0 1rem;
  }
`;

const WorkCard = styled.div<{ $index: number }>`
  cursor: pointer;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  animation: fadeInUp 0.8s ease-out ${props => 0.5 + props.$index * 0.1}s both,
             float-${props => props.$index % 6} 6s ease-in-out infinite;
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.1),
      0 0 0 1px rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.9);
  }

  &:hover h3 {
    color: #3b82f6;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const WorkTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
  letter-spacing: 1px;
  transition: color 0.3s ease;
`;

const WorkDescription = styled.p`
  font-size: 1rem;
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const WorkTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
`;

const Tag = styled.span`
  background: linear-gradient(135deg, #e2e8f0, #cbd5e1);
  color: #475569;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.5px;
`;

const ComingSoonBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
  animation: glitch 3s infinite;
`;

/* Work Items Data */
const workItems = [
  {
    title: 'Orbiting Planets',
    description: 'An implementation of the orbital mechanics of planets in the solar system',
    tags: ['React', 'Node.js', 'TypeScript', 'three.js', 'Animation'],
    slug: 'orbital'
  }
];

function WorkPage(): React.JSX.Element {
  const navigate = useNavigate();
  return (
    <WorkPageContainer>
      <MainTitle>WORK PORTFOLIO</MainTitle>
      <Subtitle>
        Some work, all play
      </Subtitle>
      <WorkGrid>
        {workItems.map((item, index) => (
          <WorkCard key={index} $index={index} onClick={() => navigate(`/work/${item.slug}`)}>
            <ComingSoonBadge>Coming Soon</ComingSoonBadge>
            <WorkTitle>{item.title}</WorkTitle>
            <WorkDescription>{item.description}</WorkDescription>
            <WorkTags>
              {item.tags.map((tag, tagIndex) => (
                <Tag key={tagIndex}>{tag}</Tag>
              ))}
            </WorkTags>
          </WorkCard>
        ))}
      </WorkGrid>
    </WorkPageContainer>
  );
}

export default WorkPage;