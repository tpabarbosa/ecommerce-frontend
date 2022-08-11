import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import image from '../../assets/pinpng.com-website-under-construction-png-6238150.png';
import { ThemeStyled } from '../../contexts/Theme/themeCSS.styles';

const Styled = {
  Wrapper: styled(ThemeStyled.PageContentWrapper)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
      margin: var(--xxl);
    }
  `,
};

const UnderConstruction = () => {
  const location = useLocation();

  useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <main>
      <Styled.Wrapper>
        <ThemeStyled.Title>
          {location.pathname} is under construction
        </ThemeStyled.Title>
        <img src={image} alt="Under Construction" />
        <Outlet />
      </Styled.Wrapper>
    </main>
  );
};

export default UnderConstruction;
