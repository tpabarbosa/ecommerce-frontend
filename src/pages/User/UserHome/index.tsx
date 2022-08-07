import { ThemeStyled } from '../../../contexts/Theme/themeCSS.styles';
// import styled from 'styled-components';
import useUser from '../../../contexts/User';
import { Link } from 'react-router-dom';

const UserHome = () => {
  const user = useUser();

  return (
    <ThemeStyled.PageContentWrapper>
      <ThemeStyled.Title>Welcome, {user.firstname}!!</ThemeStyled.Title>

      <Link to="/user/cart">
        <ThemeStyled.TextButton>Cart</ThemeStyled.TextButton>
      </Link>

      <Link to="/user/wishlist">
        <ThemeStyled.TextButton>Wish List</ThemeStyled.TextButton>
      </Link>

      <ThemeStyled.TextButton onClick={() => user.logout()}>
        Logout
      </ThemeStyled.TextButton>
    </ThemeStyled.PageContentWrapper>
  );
};

export default UserHome;
