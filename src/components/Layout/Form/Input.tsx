import { useEffect, useState } from 'react';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import styled, { css } from 'styled-components';
import { ThemeStyled } from '../../../contexts/Theme/themeCSS.styles';

export interface IInput<T> {
  name: keyof T;
  label: string;
  type: 'text' | 'password';
}

type InputProps = {
  label: string;
  name: string;
  error: string | undefined;
  register: any;
  type?: 'text' | 'password';
};

type InputStyledProps = {
  hasError: boolean;
};

const Styled = {
  Wrapper: styled.fieldset`
    margin: var(--l) auto;
    display: flex;
    flex-direction: column;
    min-height: calc(1.85 * var(--xxl));
  `,
  InputWrapper: styled.div`
    position: relative;
  `,
  Input: styled.input<InputStyledProps>(
    ({ hasError }: InputStyledProps) => css`
      width: 92%;
      margin: 0 auto;
      padding: var(--xs) var(--s);
      font-size: var(--m);
      color: var(--t-color);
      background-color: var(--t-bg);
      border: 1px solid ${hasError ? 'var(--alert-color)' : 'var(--p-color)'};
      border-radius: 10px;
    `
  ),
  Label: styled.label`
    margin-right: var(--m);
    margin-bottom: var(--xs);
    font-size: var(--m);
    font-weight: bold;
  `,
  Error: styled.p`
    margin-top: var(--xxs);
    align-self: flex-start;
    color: var(--alert-color);
    background-color: var(--alert-bg);
    padding: 0 var(--xxs);
  `,
  ShowPassword: styled(ThemeStyled.RoundButton).attrs({
    size: 'custom',
    custom: '2rem',
  })`
    position: absolute;
    top: 0;
    left: 95%;
  `,
};

const Input = ({ label, name, error, register, type = 'text' }: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setInputType] = useState(type);

  useEffect(() => {
    if (type === 'password') {
      setInputType(!showPassword ? 'password' : 'text');
    }
  }, [showPassword, type]);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Styled.Wrapper>
      <Styled.Label htmlFor={name}>{label}</Styled.Label>
      <Styled.InputWrapper>
        <Styled.Input {...register} hasError={error} type={inputType} />
        {type === 'password' && (
          <Styled.ShowPassword type="button" onClick={handleShowPassword}>
            {showPassword ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
          </Styled.ShowPassword>
        )}
      </Styled.InputWrapper>
      <Styled.Error>{error}</Styled.Error>
    </Styled.Wrapper>
  );
};

export default Input;
