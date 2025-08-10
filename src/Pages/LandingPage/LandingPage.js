import styled from '@emotion/styled';
import Layout from '@Pages/Layout';
import { useNavigate } from 'react-router-dom';

const LandingPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    position: relative;
`

const VideoBackgroundContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
`

const VideoElement = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const TextOverlayContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    gap: 2rem;
    z-index: 10;
    width: 100%;
    max-width: 1200px;
    padding: 0 8vw;
`

// const TextOverlay = styled.div<{ delay?: number }>`
const TextOverlay = styled.div`
    cursor: pointer;
    color: rgba(249, 25, 0, 0.31);
    font-weight: 600;
    font-size: 5vw;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    text-shadow: 1px 1px 2px rgba(248, 107, 107, 0.5);
    opacity: 0;
    animation: fadeInUp 1.2s ease-out forwards;
    animation-delay: ${props => props.delay || 0}s;
    
    &:hover {
        transition: all 0.3s ease;
        text-shadow:
        -1px -1px 1px rgba(255, 255, 255, 0.1),
         1px -1px 1px rgba(255, 255, 255, 0.1),
        -1px 1px 0 rgba(255, 255, 255, 0.1),
        1px 1px 0 rgba(255, 255, 255, 0.1),
        3px 3px 4px rgba(255, 17, 17, 0.31);
    }
`

// const Subtitle = styled.div<{ delay?: number }>`
//     color: rgba(255, 255, 255, 0.8);
//     font-size: 1.2rem;
//     font-weight: 200;
//     letter-spacing: 0.1em;
//     text-align: center;
//     margin-top: 0.5rem;
//     opacity: 0;
//     animation: fadeInUp 1.2s ease-out forwards;
//     animation-delay: ${props => props.delay || 0}s;
// `

function LandingPage() {
    const navigate = useNavigate();

    const handleBlogClick = () => {
        navigate('/blog');
    };

    const handleWorkClick = () => {
        navigate('/work');
    };

    return (
        <Layout>
            <LandingPageContainer>
                <VideoBackgroundContainer>
                    <VideoElement autoPlay muted loop playsInline>
                        <source src="/liminal-background.mp4" type="video/mp4" />
                    </VideoElement >
                </VideoBackgroundContainer>

                <TextOverlayContainer>
                    <div>
                        <TextOverlay delay={0.3} onClick={handleWorkClick}>Work</TextOverlay>
                        {/* <Subtitle delay={0.6}>Showcasing my creative journey</Subtitle> */}
                    </div>

                    <div>
                        <TextOverlay
                            delay={0.3}
                            onClick={handleBlogClick}
                        >
                            Blog
                        </TextOverlay>
                        {/* <Subtitle delay={1.2}>Thoughts, insights & discoveries</Subtitle> */}
                    </div>
                </TextOverlayContainer>
            </LandingPageContainer>
        </Layout>
    )
}

export default LandingPage;