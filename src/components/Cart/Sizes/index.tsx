import styled, { css } from 'styled-components';
import { ICartProduct } from '../../../contexts/Cart/cart.interfaces';
import { ISize } from '../../../models';
import { useState, useEffect } from 'react';
import useCart from '../../../contexts/Cart';

type SizesProps = {
  item: ICartProduct;
};

const Styled = {
  Sizes: styled.fieldset<{ border: boolean }>(
    ({ border }) => css`
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--xm);
      border: 1px solid ${border ? 'var(--alert-color)' : 'transparent'};
      padding: var(--xs);
      flex-wrap: wrap;
      margin: var(--m) 0;

      span {
        line-height: var(--l);
      }
      input {
        margin-left: var(--m);
        padding: var(--xs);
      }

      div {
        display: inline;
        margin-left: var(--xs);
      }
    `
  ),
  Alert: styled.div`
    margin: var(--xs);
    font-size: var(--m);
    color: var(--alert-color);
    background-color: var(--alert-bg);
  `,
};

const Sizes = ({ item }: SizesProps) => {
  const cart = useCart();
  const [checked, setChecked] = useState<boolean[]>();

  const handleSetSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked: boolean[] = item.product.sizes.map((size) => {
      if ((size as ISize).id === e.target.value) {
        return true;
      }
      return false;
    });

    setChecked(newChecked);
    cart.setItemSize(item, e.target.value);
  };

  useEffect(() => {
    const newChecked: boolean[] = item.product.sizes.map(
      (size) => item.size?.id === (size as ISize).id
    );
    setChecked(newChecked);
  }, []);

  return (
    <Styled.Sizes border={!item.size}>
      <strong>Size</strong>
      {item.product.sizes &&
        item.product.sizes.map((s, index) => {
          const size = s as ISize;
          return (
            <span key={`size-${index}-${item.item_id}`}>
              <input
                onChange={handleSetSize}
                type="radio"
                name={`size-${index}-${item.item_id}`}
                value={size.id}
                checked={checked ? checked[index] : false}
              />
              <div>{size.name}</div>
            </span>
          );
        })}
      {!item.size && <Styled.Alert> Please choose a size</Styled.Alert>}
    </Styled.Sizes>
  );
};

export default Sizes;
