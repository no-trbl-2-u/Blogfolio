import styled from '@emotion/styled';

const LandingPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`
const VideoBackgroundContainer = styled.div`
    position: absolute;
    top: 100;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
`

const VideoElement = styled.video`
  position: absolute;
  top: 100;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

function LandingPage() {
    return (
        <LandingPageContainer>
            <VideoBackgroundContainer>
                <VideoElement autoPlay muted loop playsInline>
                    <source src="/liminal-background.mp4" type="video/mp4" />
                </VideoElement >
            </VideoBackgroundContainer>
        </LandingPageContainer>
    )
}

export default LandingPage;