// TODO: Refactor to seperate components

import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BlogCard from '@Components/BlogCard';

function BlogPage() {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/');
    };

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

    const pageContainerStyle = {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f3f4f6 0%, #d1d5db 50%, #9ca3af 100%)',
        position: 'relative',
    };

    const headerStyle = {
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(90deg, #1f2937 0%, #111827 100%)',
    };

    const headerContentStyle = {
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '48px 24px',
        position: 'relative',
        zIndex: 10,
    };

    const backButtonStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        color: '#d1d5db',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        marginBottom: '32px',
        transition: 'all 0.5s ease',
    };

    const iconContainerStyle = {
        padding: '8px',
        border: '1px solid #4b5563',
        transition: 'all 0.3s ease',
    };

    const backTextStyle = {
        fontSize: '14px',
        fontWeight: '300',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        opacity: '0.8',
    };

    const headerTitleStyle = {
        textAlign: 'center',
    };

    const mainTitleStyle = {
        fontSize: '48px',
        fontWeight: '100',
        color: 'white',
        marginBottom: '16px',
        letterSpacing: '8px',
    };

    const subtitleStyle = {
        color: '#9ca3af',
        fontSize: '18px',
        fontWeight: '300',
        maxWidth: '512px',
        margin: '0 auto',
        lineHeight: '1.7',
    };

    const mainContentStyle = {
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '64px 24px',
        background: "url('drop-cieling.png')",
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat',
    };

    const cardGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '48px',
    };

    return (
        <>
            <style>{`
        .header::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 2px;
          height: 100%;
          background: rgba(255, 255, 255, 0.1);
          animation: scanline 8s infinite;
        }
          
        @media (max-width: 768px) {
          .main-title {
            font-size: 32px !important;
            letter-spacing: 4px !important;
          }
        }
      `}</style>

            <div style={pageContainerStyle}>
                <header style={headerStyle} className="header">
                    <div style={headerContentStyle}>
                        <button
                            style={backButtonStyle}
                            onClick={handleBackClick}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.color = 'white';
                                const iconContainer = e.currentTarget.querySelector('.icon-container');
                                if (iconContainer) {
                                    iconContainer.style.transform = 'rotate(180deg)';
                                    iconContainer.style.borderColor = '#9ca3af';
                                }
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.color = '#d1d5db';
                                const iconContainer = e.currentTarget.querySelector('.icon-container');
                                if (iconContainer) {
                                    iconContainer.style.transform = 'rotate(0deg)';
                                    iconContainer.style.borderColor = '#4b5563';
                                }
                            }}
                        >
                            <div style={iconContainerStyle} className="icon-container">
                                <ArrowLeft size={20} />
                            </div>
                            <span style={backTextStyle}>Return to the surface</span>
                        </button>

                        <div style={headerTitleStyle}>
                            <h1 style={mainTitleStyle} className="main-title">LIMINAL SPACES</h1>
                            <p style={subtitleStyle}>
                                Photographs and stories from places that exist between destinations,
                                where reality feels slightly off-kilter and familiar becomes strange.
                            </p>
                        </div>
                    </div>
                </header>

                {/* Bottom Half */}
                <main style={mainContentStyle}>
                    <div style={cardGridStyle}>
                        {mockPosts.map((post, index) => (
                            <BlogCard
                                key={index}
                                image={post.image}
                                title={post.title}
                                summary={post.summary}
                                index={index}
                            />
                        ))}
                    </div>
                </main>
            </div>
        </>
    );
}

export default BlogPage;
