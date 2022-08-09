import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { ThemeStyled } from '../../contexts/Theme/themeCSS.styles';
import useUser from '../../contexts/User';
import { IProduct } from '../../models';
import { FaBookmark, FaCheckDouble } from 'react-icons/fa';
import TooltipBox from '../Layout/TooltipBox';

type ToogleToWishListButtonProps = {
  product: IProduct;
};

const Styled = {
  FavoriteButton: styled(ThemeStyled.RoundButton).attrs({
    size: 'custom',
    custom: '2.5rem',
  })<{ inWishList: boolean }>(
    ({ inWishList }) => css`
      position: absolute;
      top: 0;
      right: 0;
      margin: var(--xs);
      padding: var(--xs);
      text-align: center;
      color: ${inWishList ? 'gold' : ''};
    `
  ),
  Tooltip: styled.div`
    font-size: var(--m);
  `,
};

const ToogleToWishListButton = ({ product }: ToogleToWishListButtonProps) => {
  const user = useUser();
  const [inWishList, setInWishList] = useState(false);

  const handleToggleWishlist = () => {
    if (inWishList) {
      user.removeWishListProduct(product);
      setInWishList(false);
    } else {
      user.addWishListProduct(product);
      setInWishList(true);
    }
  };

  const isInWishlist = (prod: IProduct, wishList: IProduct[]) => {
    const isInList = wishList.find((item) => item.id === prod.id);
    if (isInList) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    setInWishList(isInWishlist(product, user.wishList));
  }, [user.wishList]);

  return (
    <Styled.FavoriteButton
      inWishList={inWishList}
      onClick={handleToggleWishlist}
    >
      <TooltipBox
        element={inWishList ? <FaCheckDouble /> : <FaBookmark />}
        tooltip={
          <Styled.Tooltip>
            {inWishList ? 'Remove from Wish List' : 'Add to Wish List'}
          </Styled.Tooltip>
        }
      />
    </Styled.FavoriteButton>
  );
};
export default ToogleToWishListButton;
