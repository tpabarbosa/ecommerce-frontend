import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Styled = {
  Wrapper: styled.main``,
};

const User = () => {
  return (
    <Styled.Wrapper>
      {/* <Header /> */}
      {/* <NavLine /> */}
      <Outlet />
      {/* </Styled.Content> */}
      {/* <Footer /> */}
    </Styled.Wrapper>
  );
};

export default User;
