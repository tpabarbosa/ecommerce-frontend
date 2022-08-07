import styled, {
  createGlobalStyle,
  css,
  ThemeProps,
  withTheme,
} from 'styled-components';

import { AppThemeType } from './theme.types';

const ThemeCSS = createGlobalStyle<ThemeProps<AppThemeType>>(
  ({ theme }) => css`
    :root {
      --p-bg: ${theme.primary.background};
      --p-color: ${theme.primary.color};
      --s-bg: ${theme.secondary.background};
      --s-color: ${theme.secondary.color};
      --t-bg: ${theme.tertiary.background};
      --t-color: ${theme.tertiary.color};
      --btn-bg: ${theme.button.background};
      --btn-color: ${theme.button.color};
      --alert-color: #f12323;
      --alert-bg: #ffefef;
      --xxs: 0.2rem;
      --xs: 0.5rem;
      --s: 0.8rem;
      --m: 1rem;
      --xm: 1.2rem;
      --l: 1.5rem;
      --xl: 2rem;
      --xxl: 3rem;
    }

    body {
      background-color: var(--p-bg);
      color: var(--p-color);
      font-family: 'Josefin Sans', sans-serif;
    }

    .link {
      cursor: pointer;
    }

    .link:visited {
      background-color: ${theme.link.visited.background};
      color: ${theme.link.visited.color};
    }

    .link:hover {
      background-color: ${theme.link.hover.background};
      color: ${theme.link.hover.color};
    }
  `
);
const NavLink = styled.div<ThemeProps<AppThemeType>>(
  ({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 var(--s);
    width: 100%;
    font-size: var(--xm);

    a {
      display: flex;
      gap: var(--s);
    }
    transition: all 0.3s;

    &:hover {
      background-color: ${theme.link.hover.background};
      color: ${theme.link.hover.color};
    }
  `
);

const Button = styled.button<ThemeProps<AppThemeType>>(
  ({ theme }) => css`
    background-color: ${theme.button.background};
    color: ${theme.button.color};
    transition: all 0.3s;
    cursor: pointer;

    &:hover {
      background-color: ${theme.button.hover.background};
      color: ${theme.button.hover.color};
    }

    &:disabled {
      background-color: ${theme.button.disabled.background};
      color: ${theme.button.disabled.color};
      cursor: default;
    }
  `
);

type RoundButtonProps = {
  size: 'x-small' | 'small' | 'medium' | 'large' | 'custom';
  custom?: string;
};

const roundButtonSize = (
  size: 'x-small' | 'small' | 'medium' | 'large' | 'custom',
  custom: string = 'var(--m)'
) => {
  switch (size) {
    case 'x-small':
      return css`
        width: var(--xs);
        height: var(--xs);
        font-size: calc(var(--xs) / 2);
      `;
    case 'small':
      return css`
        width: var(--s);
        height: var(--s);
        font-size: calc(var(--s) / 2);
      `;
    case 'medium':
      return css`
        width: var(--m);
        height: var(--m);
        font-size: calc(var(--m) / 2);
      `;
    case 'large':
      return css`
        width: var(--l);
        height: var(--l);
        font-size: calc(var(--l) / 2);
      `;
    case 'custom':
      return css`
        width: ${custom};
        height: ${custom};
        font-size: calc(${custom} / 2);
      `;
    default:
      return css`
        width: var(--m);
        height: var(--m);
        font-size: var(--s);
      `;
  }
};

const TextButton = styled(Button)`
  width: 80%;
  margin: var(--xm) 10%;
  padding: var(--xs);
  text-align: center;
  border-radius: 10px;
`;

const RoundButton = styled(Button)<RoundButtonProps>(
  ({ size, custom }: RoundButtonProps) => css`
    ${roundButtonSize(size, custom)}
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    box-shadow: inset 0 0 3px 2px var(--s-color);
  `
);

type BoxProps = {
  theme: ThemeProps<AppThemeType>;
  type: 'primary' | 'secondary' | 'tertiary';
};

const Box = styled.div<BoxProps>(
  ({ theme, type }) => css`
    background-color: ${theme[type].background};
    color: ${theme[type].color};
  `
);

const Separator = styled.div`
  width: 100%;
  margin: var(--s) auto;
  height: 1px;
  background-color: var(--t-color);
`;

const Title = styled.h2`
  font-size: var(--xl);
  font-weight: bold;
  text-align: center;
  margin-bottom: var(--m);
`;

const PageContentWrapper = styled(Box).attrs({
  as: 'section',
  type: 'secondary',
})`
  margin: var(--xl) auto;
  padding: var(--l) 0;
`;

export const ThemeStyled = {
  Button,
  TextButton,
  RoundButton,
  Box,
  NavLink,
  Separator,
  Title,
  PageContentWrapper,
};

export default withTheme(ThemeCSS);
