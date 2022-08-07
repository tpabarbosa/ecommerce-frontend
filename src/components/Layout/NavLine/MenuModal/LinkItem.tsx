import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeStyled } from '../../../../contexts/Theme/themeCSS.styles';

type LinkItemProps = {
  text?: string;
  to: string;
  icon?: React.ReactElement;
};

const Styled = {
  Wrapper: styled(ThemeStyled.NavLink).attrs({ as: 'li' })`
    padding: var(--s);
  `,
};

const MenuItem = ({ to, text, icon }: LinkItemProps) => {
  return (
    <Styled.Wrapper>
      <Link to={to}>
        {icon}
        <h3>{text}</h3>
      </Link>
    </Styled.Wrapper>
  );
};

export default MenuItem;
