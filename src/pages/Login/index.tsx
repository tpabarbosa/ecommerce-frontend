import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styled, { css } from 'styled-components';
import { ThemeStyled } from '../../contexts/Theme/themeCSS.styles';
import Loading from '../../components/Layout/Loading';
import { useState, useEffect } from 'react';
import useUser from '../../contexts/User';
import ErrorMessage from '../../components/Layout/ErrorMessage';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { Buffer } from 'buffer';

const loginSchema = yup.object({
  email: yup.string().email().required().label('Email'),
  password: yup.string().required().min(8).label('Password'),
});

interface ILoginForm {
  email: string;
  password: string;
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

const Login = () => {
  const user = useUser();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [redirectMessage, setRedirectMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: ILoginForm) => {
    setIsLoading(true);
    setErrorMessage('');
    const msg = await user.login(data.email, data.password);
    if (msg) {
      setIsLoading(false);
      setErrorMessage(msg);
    } else {
      setIsLoading(false);
      // navigate('/user');
    }
  };

  const handleChange = () => {
    setErrorMessage('');
  };

  useEffect(() => {
    if (user.isLoggedIn) {
      if (searchParams && searchParams.has('redirect')) {
        const base64 = searchParams.get('redirect') as string;
        const url = Buffer.from(base64, 'base64').toString('utf-8');
        navigate(url);
        return;
      } else {
        navigate('/user');
      }
    }
  }, [user.isLoggedIn]);

  useEffect(() => {
    if (searchParams && searchParams.has('msg')) {
      const msg = searchParams.get('msg') as string;

      setRedirectMessage(Buffer.from(msg, 'base64').toString('utf-8'));
    } else {
      setRedirectMessage('');
    }
  }, [searchParams]);

  return (
    <ThemeStyled.PageContentWrapper>
      {redirectMessage && (
        <ErrorMessage message={redirectMessage} size={'large'} />
      )}
      <Styled.Form onSubmit={handleSubmit(onSubmit)}>
        <Styled.Title>Login</Styled.Title>
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

        {errorMessage && <ErrorMessage message={errorMessage} />}

        {isLoading ? (
          <Loading />
        ) : (
          <ThemeStyled.TextButton type="submit">Login</ThemeStyled.TextButton>
        )}
        <Link to="/register">I don't have an account</Link>
      </Styled.Form>
    </ThemeStyled.PageContentWrapper>
  );
};
export default Login;
