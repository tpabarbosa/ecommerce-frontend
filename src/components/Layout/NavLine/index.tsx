import { useEffect } from 'react';
import styled from 'styled-components';
import { FaBars, FaSignInAlt, FaSignOutAlt, FaBookmark } from 'react-icons/fa';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ThemeStyled } from '../../../contexts/Theme/themeCSS.styles';
import CartButton from '../../Cart/CartButton';
import useModal from '../Modal/useModal';
import CartModal from '../../Cart/CartModal';
import MenuModal from './MenuModal';
import useUser from '../../../contexts/User';
import ProtectedContent from '../ProtectedContent';
import { SearchBox } from '../SearchBox';
import useWindowSize from '../../../hooks/useWindowSize';

const Styled = {
  Wrapper: styled(ThemeStyled.Box).attrs({ as: 'section', type: 'tertiary' })`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--s) var(--xm);
  `,
  Button: styled.button`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: var(--xs);
    font-size: var(--xm);
  `,
  CartButtonWrapper: styled.div`
    padding: 0 var(--s);
    display: flex;
    gap: var(--m);
  `,
};
const NavLine = () => {
  const user = useUser();
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const menuModal = useModal();
  const cartModal = useModal();
  const [windowWidth] = useWindowSize();

  useEffect(() => {
    menuModal.close();
    cartModal.close();
  }, [params, searchParams]);

  return (
    <>
      {windowWidth <= 768 && (
        <Styled.Wrapper>
          <SearchBox />
        </Styled.Wrapper>
      )}
      <Styled.Wrapper>
        <Styled.Button onClick={menuModal.toggle}>
          <FaBars />
        </Styled.Button>
        <MenuModal modal={menuModal} />
        {windowWidth > 768 && <SearchBox />}

        <Styled.CartButtonWrapper>
          <ProtectedContent condition={user.isLoggedIn}>
            <Styled.Button onClick={() => navigate('/user/wishlist')}>
              <FaBookmark />
            </Styled.Button>
            <CartButton onClick={cartModal.toggle} />
            <Styled.Button onClick={() => navigate('/logout')}>
              <FaSignOutAlt />
            </Styled.Button>
          </ProtectedContent>

          <ProtectedContent condition={!user.isLoggedIn}>
            <Styled.Button onClick={() => navigate('/login')}>
              <FaSignInAlt />
            </Styled.Button>
          </ProtectedContent>
        </Styled.CartButtonWrapper>
        <CartModal modal={cartModal} />
      </Styled.Wrapper>
    </>
  );
};

export default NavLine;
