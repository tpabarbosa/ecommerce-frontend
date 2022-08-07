import styled, { css, keyframes } from 'styled-components';
import { FaExclamationCircle } from 'react-icons/fa';

const textAnimation = keyframes`
  0%{
    content: '!';
  }
  50%{
    content: '.';
  }
  `;

type ErrorMessageProps = {
  size?: 'small' | 'medium' | 'large' | 'extra-large';
  message: string;
};

const parseSize = (size?: 'small' | 'medium' | 'large' | 'extra-large') => {
  switch (size) {
    case 'small':
      return 'var(--s)';

    case 'medium':
      return 'var(--m)';
    case 'large':
      return 'var(--l)';
    case 'extra-large':
      return 'var(--xl)';
    default:
      return 'var(--m)';
  }
};

type WrapperProps = {
  size?: 'small' | 'medium' | 'large' | 'extra-large';
};

const Styled = {
  Wrapper: styled.div<WrapperProps>(
    ({ size }: WrapperProps) => css`
      display: flex;
      justify-content: center;
      align-items: center;
      overflow-x: hidden;
      font-size: ${parseSize(size)};
      margin: calc(0.5 * ${parseSize(size)}) auto;
      color: var(--alert-color);
      background-color: var(--alert-bg);

      svg {
        margin: calc(0.5 * ${parseSize(size)});
        margin-left: 0;
        font-size: ${parseSize(size)};
        width: calc(1 * ${parseSize(size)});
      }

      p {
        /* width: calc(4 * ${parseSize(size)}); */
      }
      p::after {
        animation: ${textAnimation} 2s linear infinite;
        content: '.';
        width: var(--xxl);
      }
    `
  ),
  Content: styled.div``,
};

const ErrorMessage = ({ size = 'medium', message }: ErrorMessageProps) => {
  return (
    <Styled.Wrapper size={size}>
      <FaExclamationCircle />
      <p>{message}</p>
    </Styled.Wrapper>
  );
};

export default ErrorMessage;
