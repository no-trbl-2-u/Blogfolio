import React from 'react';
import styled from '@emotion/styled';
import BlogHeader from '@Components/BlogHeader';

const LayoutContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`

function Layout({ children, defaultLayout = false }: { children: React.ReactNode, defaultLayout?: boolean }) {

    if (!defaultLayout) {
        return (
            <LayoutContainer>
                {children}
            </LayoutContainer>
        )
    }
    return (
        <LayoutContainer>
            <BlogHeader isExtended />
            {children}
        </LayoutContainer>
    )
}

export default Layout;