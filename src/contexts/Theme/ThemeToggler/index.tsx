import { BsMoonFill, BsSunFill } from 'react-icons/bs';
import styled, { css, ThemeProps } from 'styled-components';
import { AppThemeType, ThemeMode } from '../../Theme/theme.types';
import useTheme from '../../Theme/';
import { ThemeStyled } from '../themeCSS.styles';
type ThemeButtonProps = {
  mode: ThemeMode;
  theme: ThemeProps<AppThemeType>;
};
const SIZE = `var(--l)`;

const Styled = {
  ThemeButtonWrapper: styled.section<ThemeButtonProps>(
    ({ theme, mode }) => css`
      width: calc(2 * ${SIZE});
      min-height: ${SIZE};
      cursor: pointer;
      background-color: var(--p-bg);
      border-radius: 30px;
      padding-left: ${mode === 'light' ? '0' : SIZE};
      box-shadow: inset 0 0 11px 2px var(--p-color);

      &:hover {
        background-color: var(--t-bg);
        color: var(--t-color);

        button {
          background-color: ${theme.button.hover.background};
          color: ${theme.button.hover.color};
        }
      }
    `
  ),
  Button: styled(ThemeStyled.RoundButton).attrs({ size: 'large' })`
    /* width: ${SIZE};
    height: ${SIZE};
    font-size: calc(${SIZE} / 2); */
    border-radius: 50%;
  `,
};

export const ThemeToggler = () => {
  const [mode, toggler] = useTheme();

  return (
    <Styled.ThemeButtonWrapper mode={mode} onClick={toggler}>
      <Styled.Button>
        {mode === 'light' ? (
          <BsSunFill aria-label="toggle to dark mode" data-icon="sun" />
        ) : (
          <BsMoonFill aria-label="toggle to light mode" data-icon="moon" />
        )}
      </Styled.Button>
    </Styled.ThemeButtonWrapper>
  );
};
