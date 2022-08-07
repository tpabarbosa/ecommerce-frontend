import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Footer from './Footer';
import Header from './Header';
import NavLine from './NavLine';
import { useEffect } from 'react';
import useUser from '../../contexts/User';

const Styled = {
  Wrapper: styled.div`
    width: calc(100vw - (100vw - 100%));
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow-x: hidden;
  `,
  Content: styled.div``,
};

const Layout = () => {
  const user = useUser();
  const location = useLocation();

  useEffect(() => {
    user.assureIsLoggedIn();
  }, [location]);

  return (
    <Styled.Wrapper>
      <Styled.Content>
        <Header />
        <NavLine />
        <Outlet />
      </Styled.Content>
      <Footer />
    </Styled.Wrapper>
  );
};

export default Layout;
