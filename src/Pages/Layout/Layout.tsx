import React from 'react';
import styled from '@emotion/styled';

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
            <div>TODO - HEADER</div>
            <div>TODO - Routing</div>
            {children}
        </LayoutContainer>
    )
}

export default Layout;