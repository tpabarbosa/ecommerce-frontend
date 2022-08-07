import CartContent from '../../../components/Cart/CartContent';
import { ThemeStyled } from '../../../contexts/Theme/themeCSS.styles';

const Cart = () => {
  return (
    <ThemeStyled.PageContentWrapper>
      <CartContent />
    </ThemeStyled.PageContentWrapper>
  );
};

export default Cart;
