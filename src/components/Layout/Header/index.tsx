import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeStyled } from '../../../contexts/Theme/themeCSS.styles';
import { ThemeToggler } from '../../../contexts/Theme/ThemeToggler';

const Styled = {
  Wrapper: styled(ThemeStyled.Box).attrs({ as: 'header', type: 'secondary' })`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--xs);
  `,
};
const Header = () => {
  return (
    <Styled.Wrapper>
      <ThemeStyled.NavLink>
        <Link to="/">My e-Commerce App</Link>
      </ThemeStyled.NavLink>
      <ThemeToggler />
    </Styled.Wrapper>
  );
};

export default Header;
