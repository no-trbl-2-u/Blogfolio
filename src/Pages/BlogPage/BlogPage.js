// TODO: Refactor to seperate components

import { ArrowLeft, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Card Component
function Card(props) {
    const { image, title, summary, index } = props;

    // Different irregular shapes for each card
    const shapes = [
        'polygon(0% 0%, 85% 0%, 100% 15%, 100% 100%, 20% 100%, 0% 85%)',
        'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%, 0% 20%)',
        'polygon(0% 20%, 80% 0%, 100% 80%, 20% 100%, 0% 100%)',
        'polygon(0% 0%, 100% 20%, 100% 100%, 0% 80%)',
        'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)',
        'polygon(0% 0%, 100% 0%, 100% 85%, 85% 100%, 15% 100%, 0% 15%)'
    ];

    const clipPath = shapes[index % shapes.length];

    const cardContainerStyle = {
        position: 'relative',
        cursor: 'pointer',
        transition: 'all 0.7s ease',
        clipPath,
        filter: 'drop-shadow(8px 8px 16px rgba(0, 0, 0, 0.3))',
        marginTop: `${(index % 3) * 8}px`,
        animation: `float-${index} 6s ease-in-out infinite`,
    };

    const cardContentStyle = {
        background: '#111827',
        height: '320px',
        position: 'relative',
        overflow: 'hidden',
    };

    const imageSectionStyle = {
        height: '192px',
        overflow: 'hidden',
        position: 'relative',
    };

    const imageStyle = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transition: 'all 1s ease',
    };

    const imageOverlayStyle = {
        position: 'absolute',
        inset: '0',
        background: 'linear-gradient(to bottom, transparent, transparent, rgba(17, 24, 39, 0.3))',
    };

    const contentSectionStyle = {
        background: '#f3f4f6',
        height: '128px',
        padding: '16px',
        position: 'relative',
    };

    const titleStyle = {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: '8px',
        lineHeight: '1.3',
        letterSpacing: '1px',
    };

    const summaryStyle = {
        fontSize: '14px',
        color: '#4b5563',
        lineHeight: '1.5',
        fontWeight: '300',
    };

    const hoverOverlayStyle = {
        position: 'absolute',
        inset: '0',
        background: 'rgba(127, 29, 29, 0)',
        transition: 'all 0.7s ease',
    };

    const eyeIconStyle = {
        position: 'absolute',
        bottom: '8px',
        right: '8px',
        opacity: '0.2',
        color: '#6b7280',
        transition: 'opacity 0.5s ease',
        animation: 'glitch 3s infinite',
    };

    return (
        <div
            style={cardContainerStyle}
            className="card-container"
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05) rotate(1deg)';
                const img = e.currentTarget.querySelector('.card-image');
                const overlay = e.currentTarget.querySelector('.hover-overlay');
                const eye = e.currentTarget.querySelector('.eye-icon');
                if (img) {
                    img.style.transform = 'scale(1.1)';
                    img.style.filter = 'brightness(0.5)';
                }
                if (overlay) {
                    overlay.style.background = 'rgba(127, 29, 29, 0.05)';
                }
                if (eye) {
                    eye.style.opacity = '0.4';
                }
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                const img = e.currentTarget.querySelector('.card-image');
                const overlay = e.currentTarget.querySelector('.hover-overlay');
                const eye = e.currentTarget.querySelector('.eye-icon');
                if (img) {
                    img.style.transform = 'scale(1)';
                    img.style.filter = 'brightness(1)';
                }
                if (overlay) {
                    overlay.style.background = 'rgba(127, 29, 29, 0)';
                }
                if (eye) {
                    eye.style.opacity = '0.2';
                }
            }}
        >
            <div style={cardContentStyle}>
                <div style={imageSectionStyle}>
                    <img
                        src={image}
                        alt={title}
                        style={imageStyle}
                        className="card-image"
                    />
                    <div style={imageOverlayStyle}></div>
                </div>

                <div style={contentSectionStyle}>
                    <h3 style={titleStyle}>{title}</h3>
                    <p style={summaryStyle}>{summary}</p>
                    <Eye size={16} style={eyeIconStyle} className="eye-icon" />
                </div>

                <div style={hoverOverlayStyle} className="hover-overlay"></div>
            </div>
        </div>
    );
}

function BlogLayout() {
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
            image: "https://picsum.photos/200/300",
            title: "Empty Swimming Pool",
            summary: "The blue tiles reflect nothing but shadows in a space meant for joy, now holding only silence."
        },
        {
            image: "https://picsum.photos/200/300",
            title: "Between Floors",
            summary: "Stairwells that connect to nowhere, where footsteps echo in impossible acoustics."
        },
        {
            image: "https://picsum.photos/200/300",
            title: "The Waiting Room",
            summary: "Beige walls and outdated magazines in a place where time seems suspended indefinitely."
        },
        {
            image: "https://picsum.photos/200/300",
            title: "Parking Garage Level B",
            summary: "Concrete pillars extend into darkness, where every corner looks exactly the same."
        },
        {
            image: "https://picsum.photos/200/300",
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
    };

    const cardGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '48px',
    };

    return (
        <>
            <style>{`
        @keyframes float-0 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-3px) rotate(0.5deg); }
        }
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-2px) rotate(-0.3deg); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-4px) rotate(0.7deg); }
        }
        @keyframes float-3 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-1px) rotate(-0.5deg); }
        }
        @keyframes float-4 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-3px) rotate(0.4deg); }
        }
        @keyframes float-5 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-2px) rotate(-0.6deg); }
        }
        @keyframes glitch {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        @keyframes scanline {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100vw); }
        }
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

                <main style={mainContentStyle}>
                    <div style={cardGridStyle}>
                        {mockPosts.map((post, index) => (
                            <Card
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

export default BlogLayout;
