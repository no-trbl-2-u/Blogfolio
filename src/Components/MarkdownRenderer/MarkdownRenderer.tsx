/* Libraries */
import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import styled from '@emotion/styled';

/* Types */
interface MarkdownRendererProps {
    content: string;
    className?: string;
}

interface ImageWithLazyLoadingProps {
    src: string;
    alt: string;
    title?: string;
}

interface CodeBlockProps {
    children?: React.ReactNode;
    className?: string;
}

// TODO: Implement
// interface TaskListItemProps {
//     children: React.ReactNode;
//     [key: string]: any;
// }

interface ImageProps {
    src?: string;
    alt?: string;
    title?: string;
}

// TODO: Implement
// interface CodeProps {
//     children: React.ReactNode;
//     className?: string;
// }

interface PreProps {
    children?: React.ReactNode;
    [key: string]: any;
}

interface LiProps {
    children?: React.ReactNode;
    [key: string]: any;
}

/* Styled Components */
const MarkdownContainer = styled.article`
  line-height: 1.7;
  color: #374151;
  max-width: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  
  /* Typography Scale */
  font-size: 16px;
  
  /* Smooth scrolling for anchor links */
  scroll-behavior: smooth;
  
  /* Selection styling */
  ::selection {
    background: rgba(59, 130, 246, 0.2);
    color: #1f2937;
  }
  
  /* Focus styles for accessibility */
  *:focus {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
`;

/* Headings */
const StyledH1 = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: #111827;
  margin: 3rem 0 2rem 0;
  padding-bottom: 1rem;
  border-bottom: 3px solid #e5e7eb;
  line-height: 1.2;
  letter-spacing: -0.025em;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin: 2rem 0 1.5rem 0;
  }
`;

const StyledH2 = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin: 2.5rem 0 1.5rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #f3f4f6;
  line-height: 1.3;
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
    margin: 2rem 0 1rem 0;
  }
`;

const StyledH3 = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #374151;
  margin: 2rem 0 1rem 0;
  line-height: 1.4;
  
  @media (max-width: 768px) {
    font-size: 1.375rem;
    margin: 1.5rem 0 0.75rem 0;
  }
`;

const StyledH4 = styled.h4`
  font-size: 1.25rem;
  font-weight: 600;
  color: #4b5563;
  margin: 1.5rem 0 0.75rem 0;
  line-height: 1.4;
`;

const StyledH5 = styled.h5`
  font-size: 1.125rem;
  font-weight: 600;
  color: #6b7280;
  margin: 1.25rem 0 0.5rem 0;
  line-height: 1.4;
`;

const StyledH6 = styled.h6`
  font-size: 1rem;
  font-weight: 600;
  color: #9ca3af;
  margin: 1rem 0 0.5rem 0;
  line-height: 1.4;
`;

/* Paragraphs */
const StyledParagraph = styled.p`
  margin-bottom: 1.5rem;
  color: #374151;
  line-height: 1.7;
  
  /* Better spacing for consecutive paragraphs */
  & + & {
    margin-top: 1rem;
  }
`;

/* Links */
const StyledLink = styled.a`
  color: #3b82f6;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: all 0.2s ease;
  font-weight: 500;
  
  &:hover {
    color: #2563eb;
    border-bottom-color: #2563eb;
  }
  
  &:focus {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
    border-radius: 4px;
  }
  
  /* External link indicator */
  &[href^="http"]::after {
    content: " ↗";
    font-size: 0.875em;
    opacity: 0.7;
  }
`;

/* Code blocks */
const CodeBlockContainer = styled.div`
  position: relative;
  margin: 2rem 0;
  border-radius: 8px;
  overflow: hidden;
  background: #1f2937;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

const CodeBlockHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: #374151;
  border-bottom: 1px solid #4b5563;
  font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
  font-size: 0.875rem;
  color: #d1d5db;
`;

const LanguageLabel = styled.span`
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.05em;
`;

const CopyButton = styled.button`
  background: transparent;
  border: 1px solid #6b7280;
  color: #d1d5db;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #4b5563;
    border-color: #9ca3af;
    color: white;
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const StyledPre = styled.pre`
  margin: 0;
  padding: 1.5rem;
  overflow-x: auto;
  background: #1f2937;
  font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
  font-size: 0.875rem;
  line-height: 1.6;
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    height: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #374151;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #6b7280;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
  }
`;

const StyledCode = styled.code<{ className?: string }>`
  font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
  font-size: 0.875em;
  background: #f3f4f6;
  color: #dc2626;
  padding: 0.125rem 0.25rem;
  border-radius: 4px;
  border: 1px solid #e5e7eb;
  
  /* Inline code styling */
  ${props => props.className?.includes('language-') && `
    background: transparent;
    color: inherit;
    padding: 0;
    border: none;
    border-radius: 0;
  `}
`;

/* Lists */
const StyledUl = styled.ul`
  margin: 1.5rem 0;
  padding-left: 2rem;
  
  li {
    margin-bottom: 0.75rem;
    line-height: 1.6;
  }
  
  /* Nested lists */
  ul, ol {
    margin: 0.75rem 0;
    padding-left: 1.5rem;
  }
`;

const StyledOl = styled.ol`
  margin: 1.5rem 0;
  padding-left: 2rem;
  counter-reset: list-counter;
  
  li {
    margin-bottom: 0.75rem;
    line-height: 1.6;
    counter-increment: list-counter;
    
    &::marker {
      color: #6b7280;
      font-weight: 600;
    }
  }
  
  /* Nested lists */
  ul, ol {
    margin: 0.75rem 0;
    padding-left: 1.5rem;
  }
`;

const StyledLi = styled.li<{ 'data-task'?: boolean }>`
  color: #374151;
  
  /* Task list styling */
  &[data-task] {
    list-style: none;
    padding-left: 0;
    
    &::before {
      content: "";
      display: inline-block;
      width: 1.25rem;
      height: 1.25rem;
      border: 2px solid #d1d5db;
      border-radius: 4px;
      margin-right: 0.75rem;
      vertical-align: middle;
      background: white;
      transition: all 0.2s ease;
    }
    
    &[data-task="true"]::before {
      background: #10b981;
      border-color: #10b981;
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='white' d='M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z'/%3e%3c/svg%3e");
      background-size: 0.75rem;
      background-position: center;
      background-repeat: no-repeat;
    }
  }
`;

/* Blockquotes */
const StyledBlockquote = styled.blockquote`
  margin: 2rem 0;
  padding: 1.5rem 2rem;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-left: 4px solid #3b82f6;
  border-radius: 0 8px 8px 0;
  position: relative;
  
  &::before {
    content: '"';
    position: absolute;
    top: 0.5rem;
    left: 1rem;
    font-size: 3rem;
    color: #3b82f6;
    opacity: 0.3;
    font-family: Georgia, serif;
  }
  
  p {
    margin: 0.5rem 0;
    color: #475569;
    font-style: italic;
    
    &:first-of-type {
      margin-top: 0;
    }
    
    &:last-of-type {
      margin-bottom: 0;
    }
  }
  
  /* Nested blockquotes */
  blockquote {
    margin: 1rem 0;
    padding: 1rem 1.5rem;
    background: white;
    border-left: 3px solid #94a3b8;
    
    &::before {
      display: none;
    }
  }
`;

/* Tables */
// TODO: Implements
// const TableContainer = styled.div`
//   margin: 2rem 0;
//   overflow-x: auto;
//   border-radius: 8px;
//   box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);

//   /* Custom scrollbar for tables */
//   &::-webkit-scrollbar {
//     height: 8px;
//   }

//   &::-webkit-scrollbar-track {
//     background: #f3f4f6;
//     border-radius: 4px;
//   }

//   &::-webkit-scrollbar-thumb {
//     background: #d1d5db;
//     border-radius: 4px;
//   }

//   &::-webkit-scrollbar-thumb:hover {
//     background: #9ca3af;
//   }
// `;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  font-size: 0.875rem;
  
  th, td {
    padding: 0.75rem 1rem;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
  }
  
  th {
    background: #f9fafb;
    font-weight: 600;
    color: #374151;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-size: 0.75rem;
    
    &:first-child {
      border-top-left-radius: 8px;
    }
    
    &:last-child {
      border-top-right-radius: 8px;
    }
  }
  
  td {
    color: #6b7280;
    
    &:first-child {
      font-weight: 500;
      color: #374151;
    }
  }
  
  tbody tr {
    transition: background-color 0.2s ease;
    
    &:hover {
      background: #f9fafb;
    }
    
    &:last-child td {
      border-bottom: none;
      
      &:first-child {
        border-bottom-left-radius: 8px;
      }
      
      &:last-child {
        border-bottom-right-radius: 8px;
      }
    }
  }
`;

/* Images */
const ImageContainer = styled.div`
  margin: 2rem 0;
  text-align: center;
  position: relative;
`;

const StyledImage = styled.img<{ $isLoaded: boolean; $isError: boolean }>`
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  opacity: ${props => props.$isLoaded ? 1 : 0};
  transform: ${props => props.$isLoaded ? 'scale(1)' : 'scale(0.98)'};
  
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
  
  ${props => props.$isError && `
    opacity: 0.7;
    filter: grayscale(100%);
  `}
`;

const ImagePlaceholder = styled.div<{ $isLoading: boolean }>`
  width: 100%;
  height: 300px;
  background: ${props => props.$isLoading
        ? 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 50%, #d1d5db 100%)'
        : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
    };
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$isLoading ? '#6b7280' : '#fef2f2'};
  font-size: 0.875rem;
  font-weight: 500;
  position: relative;
  overflow: hidden;
  
  ${props => props.$isLoading && `
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
      animation: shimmer 2s infinite;
    }
    
    @keyframes shimmer {
      0% { left: -100%; }
      100% { left: 100%; }
    }
  `}
`;

const ImageCaption = styled.figcaption`
  margin-top: 0.75rem;
  font-size: 0.875rem;
  color: #6b7280;
  font-style: italic;
  text-align: center;
`;

/* Horizontal Rule */
const StyledHr = styled.hr`
  margin: 3rem 0;
  border: none;
  height: 2px;
  background: linear-gradient(90deg, transparent, #e5e7eb, transparent);
  border-radius: 1px;
`;

/* Emphasis and Strong */
const StyledEm = styled.em`
  font-style: italic;
  color: #4b5563;
`;

const StyledStrong = styled.strong`
  font-weight: 700;
  color: #1f2937;
`;

/* Strikethrough */
const StyledDel = styled.del`
  color: #9ca3af;
  text-decoration: line-through;
  text-decoration-color: #d1d5db;
`;

// TODO: Extract this into a separate file
/* Custom Components */
function ImageWithLazyLoading(props: ImageWithLazyLoadingProps) {
    const { src, alt, title } = props;
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const img = imgRef.current;
        if (!img) return;

        const handleLoad = (): void => {
            setIsLoaded(true);
            setIsLoading(false);
        };

        const handleError = (): void => {
            setIsError(true);
            setIsLoading(false);
        };

        img.addEventListener('load', handleLoad);
        img.addEventListener('error', handleError);

        return () => {
            img.removeEventListener('load', handleLoad);
            img.removeEventListener('error', handleError);
        };
    }, []);

    return (
        <ImageContainer>
            <StyledImage
                ref={imgRef}
                src={src}
                alt={alt}
                title={title}
                $isLoaded={isLoaded}
                $isError={isError}
                loading="lazy"
            />
            {isLoading && (
                <ImagePlaceholder $isLoading={true}>
                    Loading image...
                </ImagePlaceholder>
            )}
            {isError && (
                <ImagePlaceholder $isLoading={false}>
                    Failed to load image
                </ImagePlaceholder>
            )}
            {(title || alt) && (
                <ImageCaption>
                    {title || alt}
                </ImageCaption>
            )}
        </ImageContainer>
    );
}

function CodeBlock(props: CodeBlockProps) {
    const { children, className } = props;
    const [isCopied, setIsCopied] = useState<boolean>(false);
    const language = className?.replace('language-', '') || 'text';

    const handleCopy = async (): Promise<void> => {
        try {
            await navigator.clipboard.writeText(children as string);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy code:', err);
        }
    };

    return (
        <CodeBlockContainer>
            <CodeBlockHeader>
                <LanguageLabel>{language}</LanguageLabel>
                <CopyButton onClick={handleCopy}>
                    {isCopied ? 'Copied!' : 'Copy'}
                </CopyButton>
            </CodeBlockHeader>
            <StyledPre>
                <StyledCode className={className}>
                    {children}
                </StyledCode>
            </StyledPre>
        </CodeBlockContainer>
    );
}

/* Main Component */
function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
    return (
        <MarkdownContainer className={className}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                    h1: StyledH1,
                    h2: StyledH2,
                    h3: StyledH3,
                    h4: StyledH4,
                    h5: StyledH5,
                    h6: StyledH6,
                    p: StyledParagraph,
                    a: StyledLink,
                    code: StyledCode,
                    pre: ({ children, ...props }: PreProps) => {
                        const child = children as any;
                        if (child?.type === 'code') {
                            return <CodeBlock {...props}>{child.props.children}</CodeBlock>;
                        }
                        return <StyledPre {...props}>{children}</StyledPre>;
                    },
                    ul: StyledUl,
                    ol: StyledOl,
                    li: ({ children, ...props }: LiProps) => {
                        const taskMatch = (children as string)?.match(/^\[([ x])\]\s*(.*)/);
                        if (taskMatch) {
                            const isChecked = taskMatch[1] === 'x';
                            const text = taskMatch[2];
                            return (
                                <StyledLi data-task={isChecked} {...props}>
                                    {text}
                                </StyledLi>
                            );
                        }
                        return <StyledLi {...props}>{children}</StyledLi>;
                    },
                    blockquote: StyledBlockquote,
                    table: StyledTable,
                    thead: styled.thead``,
                    tbody: styled.tbody``,
                    tr: styled.tr``,
                    th: styled.th``,
                    td: styled.td``,
                    img: ({ src, alt, title }: ImageProps) => (
                        <ImageWithLazyLoading src={src || ''} alt={alt || ''} title={title} />
                    ),
                    hr: StyledHr,
                    em: StyledEm,
                    strong: StyledStrong,
                    del: StyledDel,
                }}
            >
                {content}
            </ReactMarkdown>
        </MarkdownContainer>
    );
}

export default MarkdownRenderer;
