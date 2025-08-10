import React from 'react';
import styled from '@emotion/styled';

const LayoutContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <LayoutContainer>
            <div>TODO - HEADER</div>
            <div>TODO - Routing</div>
            {children}
            <div>TODO - FOOTER</div>
        </LayoutContainer>
    )
}

export default Layout;