import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import styled from '@emotion/styled';

interface MarkdownRendererProps {
  content: string;
}

/* Adjust Styles for Markdown Rendering */
const MarkdownContainer = styled.div`
  line-height: 1.6;
  color: #374151;
  
  h1, h2, h3, h4, h5, h6 {
    color: #111827;
    margin-top: 2rem;
    margin-bottom: 1rem;
    font-weight: 600;
  }
  
  h1 { font-size: 2rem; }
  h2 { font-size: 1.75rem; }
  h3 { font-size: 1.5rem; }
  
  p {
    margin-bottom: 1rem;
  }

  ul, ol {
    margin: 1rem 0;
    padding-left: 2rem;
  }
  
  li {
    margin-bottom: 0.5rem;
  }
  
  a {
    color: #7c3aed;
    text-decoration: underline;
    
    &:hover {
      color: #5b21b6;
    }
  }
`;

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <MarkdownContainer>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
      >
        {content}
      </ReactMarkdown>
    </MarkdownContainer>
  );
}

export default MarkdownRenderer;