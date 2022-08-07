import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styled, { css } from 'styled-components';
import { ThemeStyled } from '../../contexts/Theme/themeCSS.styles';
import Loading from '../../components/Layout/Loading';
import { useEffect, useState } from 'react';
import useUser from '../../contexts/User';
import ErrorMessage from '../../components/Layout/ErrorMessage';
import { useNavigate } from 'react-router-dom';

const loginSchema = yup.object({
  firstname: yup.string().required().min(2).label('Firstname'),
  lastname: yup.string().required().min(2).label('Lastname'),
  email: yup.string().email().required().label('Email'),
  password: yup.string().required().min(8).label('Password'),
  passwordConfirmation: yup
    .string()
    .required()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

interface IRegisterForm {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  passwordConfirmation: string;
}

type InputProps = {
  hasError: boolean;
};

const Styled = {
  Wrapper: styled(ThemeStyled.Box).attrs({
    as: 'section',
    type: 'secondary',
  })`
    margin: var(--xl) auto;
    padding: var(--l) 0;
  `,
  Title: styled(ThemeStyled.Title)``,
  Form: styled(ThemeStyled.Box).attrs({
    as: 'form',
    type: 'primary',
  })`
    max-width: 400px;
    margin: var(--l) auto;
    padding: var(--l) var(--xxl);
    padding-top: var(--xl);
    background-color: var;
    border: 1px solid var(--s-color);
    border-radius: 20px;
  `,
  InputWrapper: styled.fieldset`
    margin: var(--l) auto;
    display: flex;
    flex-direction: column;
    min-height: calc(1.85 * var(--xxl));
  `,
  Input: styled.input<InputProps>(
    ({ hasError }: InputProps) => css`
      width: 80%;
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
};

const Register = () => {
  const user = useUser();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterForm>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: IRegisterForm) => {
    setIsLoading(true);
    setErrorMessage('');
    const message = await user.register(
      data.email,
      data.password,
      data.firstname,
      data.lastname
    );
    if (message) {
      setErrorMessage(message);
    } else {
      setIsLoading(false);
    }
  };

  const handleChange = () => {
    setErrorMessage('');
  };

  useEffect(() => {
    if (user.isLoggedIn) {
      navigate('/user');
    }
  }, [user.isLoggedIn]);

  useEffect(() => {
    if (user.isLoggedIn) {
      navigate('/user');
    }
  }, []);

  return (
    <ThemeStyled.PageContentWrapper>
      <Styled.Form onSubmit={handleSubmit(onSubmit)}>
        <Styled.Title>Create an account</Styled.Title>

        <Styled.InputWrapper>
          <Styled.Label htmlFor={'firstname'}>First Name</Styled.Label>
          <Styled.Input
            {...register('firstname', {
              onChange: handleChange,
            })}
            hasError={errors.firstname?.message || errorMessage ? true : false}
          />
          <Styled.Error>{errors.firstname?.message}</Styled.Error>
        </Styled.InputWrapper>

        <Styled.InputWrapper>
          <Styled.Label htmlFor={'lastname'}>Last Name</Styled.Label>
          <Styled.Input
            {...register('lastname', {
              onChange: handleChange,
            })}
            hasError={errors.lastname?.message || errorMessage ? true : false}
          />
          <Styled.Error>{errors.lastname?.message}</Styled.Error>
        </Styled.InputWrapper>

        <Styled.InputWrapper>
          <Styled.Label htmlFor={'email'}>Email</Styled.Label>
          <Styled.Input
            {...register('email', {
              onChange: handleChange,
            })}
            hasError={errors.email?.message || errorMessage ? true : false}
          />
          <Styled.Error>{errors.email?.message}</Styled.Error>
        </Styled.InputWrapper>

        <Styled.InputWrapper>
          <Styled.Label htmlFor={'password'}>Password</Styled.Label>
          <Styled.Input
            type="password"
            hasError={errors.password?.message || errorMessage ? true : false}
            {...register('password', {
              onChange: handleChange,
            })}
          />
          <Styled.Error>{errors.password?.message}</Styled.Error>
        </Styled.InputWrapper>

        <Styled.InputWrapper>
          <Styled.Label htmlFor={'passwordConfirmation'}>
            Password Confirmation
          </Styled.Label>
          <Styled.Input
            type="password"
            hasError={
              errors.passwordConfirmation?.message || errorMessage
                ? true
                : false
            }
            {...register('passwordConfirmation', {
              onChange: handleChange,
            })}
          />
          <Styled.Error>{errors.passwordConfirmation?.message}</Styled.Error>
        </Styled.InputWrapper>

        {errorMessage && <ErrorMessage message={errorMessage} />}

        {isLoading ? (
          <Loading />
        ) : (
          <ThemeStyled.TextButton type="submit">
            Register
          </ThemeStyled.TextButton>
        )}
      </Styled.Form>
    </ThemeStyled.PageContentWrapper>
  );
};
export default Register;
