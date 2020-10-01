import React from 'react';

// Style imports
import { Container, ChildContainer } from './CustomLayoutStyles';

// Header import
import Header, { LogoWrapper, RightContainer } from '../Header/HeaderStyles';

import { Creators as UserActions } from '~/store/ducks/User';
import { Creators as AuthActions } from '~/store/ducks/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { removeToken } from '~/helpers/AuthHelper';

export default function CustomLayout(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector(({ auth }) => auth.token);

  function handleLogout() {
    dispatch(UserActions.clearUser());
    dispatch(AuthActions.authLogout());
    removeToken();
    history.push('/');
  }

  return (
    <Container>
      <Header>
        <LogoWrapper>
          <h1>Personal Feedback</h1>
        </LogoWrapper>
        {token && (
          <RightContainer>
            <h3 onClick={handleLogout}>Logout</h3>
          </RightContainer>
        )}
      </Header>
      <ChildContainer>{props.children}</ChildContainer>
    </Container>
  );
}
