import styled, { css, keyframes } from 'styled-components';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const iconAnimation = keyframes`
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
  `;

const textAnimation = keyframes`
  0%{
    content: '.';
  }
  25%{
    content: '..';
  }
  50%{
    content: '...';
  }
  75%{
    content: '';
  }
  `;

type LoadingProps = {
  size?: 'small' | 'medium' | 'large' | 'extra-large';
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

const Styled = {
  Wrapper: styled.div<LoadingProps>(
    ({ size }: LoadingProps) => css`
      display: flex;
      justify-content: center;
      align-items: center;
      overflow-x: hidden;
      font-size: ${parseSize(size)};
      margin: calc(0.5 * ${parseSize(size)}) auto;

      svg {
        animation: ${iconAnimation} 1.5s linear infinite;
        margin: calc(0.5 * ${parseSize(size)});
        margin-left: 0;
        font-size: ${parseSize(size)};
        width: calc(1 * ${parseSize(size)});
      }

      p {
        width: calc(3.5 * ${parseSize(size)});
      }
      p::after {
        animation: ${textAnimation} 2s linear infinite;
        content: '';
        width: var(--xxl);
      }
    `
  ),
  Content: styled.div``,
};

const Loading = ({ size = 'medium' }: LoadingProps) => {
  return (
    <Styled.Wrapper size={size}>
      <AiOutlineLoading3Quarters />
      <p>Loading</p>
    </Styled.Wrapper>
  );
};

export default Loading;
