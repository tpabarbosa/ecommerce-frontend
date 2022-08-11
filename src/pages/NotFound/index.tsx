import { ThemeStyled } from '../../contexts/Theme/themeCSS.styles';

const NotFound = () => {
  return (
    <main>
      <ThemeStyled.PageContentWrapper>
        <ThemeStyled.Title>Error 404</ThemeStyled.Title>
        <ThemeStyled.Title>
          Woops... Looks like this page doesn't exist.
        </ThemeStyled.Title>
      </ThemeStyled.PageContentWrapper>
    </main>
  );
};

export default NotFound;
