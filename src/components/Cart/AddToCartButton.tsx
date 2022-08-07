import useCart from '../../contexts/Cart';
import { ThemeStyled } from '../../contexts/Theme/themeCSS.styles';
import useUser from '../../contexts/User';
import { IProduct } from '../../models';
import { useNavigate, useLocation } from 'react-router-dom';
import { parseRedirectUrl } from '../../helpers/parsers';

type AddToCartButtonProps = {
  product: IProduct;
};

const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const user = useUser();
  const cart = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddToCart = () => {
    if (!user.isLoggedIn) {
      navigate(
        parseRedirectUrl(
          '/login',
          location,
          'You must be logged in to add items to cart'
        )
      );
    } else {
      cart.addProduct(product);
    }
  };

  return (
    <ThemeStyled.TextButton onClick={handleAddToCart}>
      Add to Cart
    </ThemeStyled.TextButton>
  );
};

export default AddToCartButton;
