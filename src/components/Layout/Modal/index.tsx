import { FaTimes } from 'react-icons/fa';
import styled from 'styled-components';
import { ThemeStyled } from '../../../contexts/Theme/themeCSS.styles';
import { IUseModal } from './useModal';

const Styled = {
  Wrapper: styled.div`
    display: flex;
    gap: var(--m);
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    visibility: hidden;
    transition: visibility 0.2s;

    &.active {
      visibility: visible;
    }
  `,
  Background: styled.div`
    background-color: rgba(25, 25, 25, 0.8);
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    opacity: 0;
    transition: opacity 0.4s;
    &.active {
      opacity: 1;
    }
  `,

  CloseButton: styled(ThemeStyled.RoundButton).attrs({ size: 'large' })`
    /* width: var(--l);
    height: var(--l); */
    margin-top: var(--xs);
    z-index: 3;
    transform: translateX(-100vw);
    transition: transform 0.4s;
    &.active {
      transform: none;
    }
  `,
};

type ModalProps = {
  modal: IUseModal;
  children: React.ReactNode;
};

const Modal = ({ modal, children }: ModalProps) => {
  const { isOpen, close } = modal;

  return (
    <Styled.Wrapper className={isOpen ? 'active' : ''}>
      <Styled.Background onClick={close} className={isOpen ? 'active' : ''} />
      {children}
      <Styled.CloseButton onClick={close} className={isOpen ? 'active' : ''}>
        <FaTimes />
      </Styled.CloseButton>
    </Styled.Wrapper>
  );
};

export default Modal;
