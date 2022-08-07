import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeStyled } from '../../contexts/Theme/themeCSS.styles';
import useUser from '../../contexts/User';

const Logout = () => {
  const user = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user.isLoggedIn) {
      navigate('/');
    }
  }, [user.isLoggedIn]);

  return (
    <main>
      <ThemeStyled.PageContentWrapper>
        <ThemeStyled.Title>Are you sure you want to log out?</ThemeStyled.Title>
        <ThemeStyled.Title onClick={() => user.logout()}>
          <button>Yes</button>
        </ThemeStyled.Title>
        <ThemeStyled.Title>
          <Link to="/user">No</Link>
        </ThemeStyled.Title>
      </ThemeStyled.PageContentWrapper>
    </main>
  );
};

export default Logout;
