import styled from 'styled-components';
import { ThemeStyled } from '../../contexts/Theme/themeCSS.styles';

export const Wrapper = styled(ThemeStyled.PageContentWrapper)``;

export const Title = styled(ThemeStyled.Title)``;

export const Form = styled(ThemeStyled.Box).attrs({
  as: 'form',
  type: 'primary',
})`
  max-width: 400px;
  margin: var(--l) auto;
  padding: var(--l) var(--xxl);
  padding-top: var(--xl);
  background-color: var;
  border: 1px solid var(--s-color);
  border-radius: 20px;
`;

export const Button = styled(ThemeStyled.TextButton)``;
