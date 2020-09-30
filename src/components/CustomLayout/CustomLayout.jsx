import React from 'react';

// Style imports
import { Container, ChildContainer } from './CustomLayoutStyles';

// Header import
import Header, { LogoWrapper } from '../Header/HeaderStyles';

export default function CustomLayout(props) {
  return (
    <Container>
      <Header>
        <LogoWrapper>
          <h1>Personal Feedback</h1>
        </LogoWrapper>
      </Header>
      <ChildContainer>{props.children}</ChildContainer>
    </Container>
  );
}
