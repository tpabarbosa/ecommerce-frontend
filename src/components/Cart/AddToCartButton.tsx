import useCart from '../../contexts/Cart';
import { ThemeStyled } from '../../contexts/Theme/themeCSS.styles';
import useUser from '../../contexts/User';
import { IProduct } from '../../models';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { parseRedirectUrl } from '../../helpers/parsers';
import { useEffect, useState } from 'react';

type AddToCartButtonProps = {
  product: IProduct;
};

const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const user = useUser();
  const cart = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (!user.isLoggedIn) {
      navigate(
        parseRedirectUrl('/login', location, {
          message: 'You must be logged in to add items to cart',
          action: `addToCart:${product.id}`,
        })
      );
    } else {
      if (!isAdding) {
        setIsAdding(true);
        await cart.addProduct(product);
        setIsAdding(false);
      }
    }
  };

  useEffect(() => {
    if (searchParams && searchParams.has('action')) {
      const param = searchParams.get('action') as string;
      const [action, productId] = param.split(':');
      if (action === 'addToCart' && productId === product.id && !isAdding) {
        handleAddToCart().then(() => {
          let queryStr = '';
          searchParams.forEach((value, key) => {
            if (key !== 'action') {
              queryStr += `&${key}=${value}`;
            }
          });
          setSearchParams(queryStr, { replace: true });
        });
      }
    }
  }, [searchParams]);

  return (
    <ThemeStyled.TextButton onClick={handleAddToCart}>
      Add to Cart
    </ThemeStyled.TextButton>
  );
};

export default AddToCartButton;
