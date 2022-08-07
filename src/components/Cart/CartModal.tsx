import styled from 'styled-components';

import { ThemeStyled } from '../../contexts/Theme/themeCSS.styles';
import Modal from '../Layout/Modal';
import { IUseModal } from '../Layout/Modal/useModal';
import CartContent from './CartContent';

const Styled = {
  CartModalBox: styled(ThemeStyled.Box).attrs({ as: 'nav', type: 'tertiary' })`
    width: 80vw;
    max-width: 600px;
    overflow-y: auto;
    padding: var(--m);
    padding-bottom: var(--xxl);
    z-index: 2;
    transform: translateX(-100%);
    transition: transform 0.4s;
    &.active {
      transform: none;
    }
  `,
};

type CartModalProps = {
  modal: IUseModal;
};

const CartModal = ({ modal }: CartModalProps) => {
  const { isOpen } = modal;

  return (
    <Modal modal={modal}>
      <Styled.CartModalBox className={isOpen ? 'active' : ''}>
        <CartContent />
      </Styled.CartModalBox>
    </Modal>
  );
};

export default CartModal;
