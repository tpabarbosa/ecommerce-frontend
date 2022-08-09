import styled from 'styled-components';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { ThemeStyled } from '../../../contexts/Theme/themeCSS.styles';
import { useState, useEffect } from 'react';

type IncreaseDecreaseQuantityProps = {
  onIncrease: (e: React.MouseEvent) => void;
  onDecrease: (e: React.MouseEvent) => void;
  onChange: (e: any) => void;
  value: number;
};

const Styled = {
  Wrapper: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--s);
  `,
  Input: styled.input`
    font-size: var(--xm);
    font-weight: bold;
    max-width: var(--xxl);
    border: 1px solid var(--p-color);
    padding: var(--xxs) 0;
    text-align: center;
  `,
  Button: styled(ThemeStyled.RoundButton).attrs({ size: 'large' })``,
};

const IncreaseDecreaseQuantity = ({
  onIncrease,
  onDecrease,
  onChange,
  value,
}: IncreaseDecreaseQuantityProps) => {
  const [inputValue, setInputValue] = useState(value);

  const handleIncrease = (e: React.MouseEvent) => {
    onIncrease(e);
  };

  const handleDecrease = (e: React.MouseEvent) => {
    onDecrease(e);
  };

  const handleChange = (e: any) => {
    const val = Number(e.target.value);
    setInputValue(e.target.value);
    if (val) {
      onChange(val);
    }
  };

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <Styled.Wrapper>
      <Styled.Button>
        <FaMinus onClick={handleDecrease} />
      </Styled.Button>
      <Styled.Input type={'text'} onChange={handleChange} value={inputValue} />

      <Styled.Button onClick={handleIncrease}>
        <FaPlus />
      </Styled.Button>
    </Styled.Wrapper>
  );
};

export default IncreaseDecreaseQuantity;
