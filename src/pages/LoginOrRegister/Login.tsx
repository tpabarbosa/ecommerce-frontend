import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import * as Styled from './styles';
import Loading from '../../components/Layout/Loading';
import ErrorMessage from '../../components/Layout/ErrorMessage';
import { useState } from 'react';
import useUser from '../../contexts/User';
import { Link } from 'react-router-dom';
import useRedirectionAfterLogin from '../../hooks/useRedirectionAfterLogin';
import Input, { IInput } from '../../components/Layout/Form/Input';

const loginSchema = yup.object({
  email: yup.string().email().required().label('Email'),
  password: yup.string().required().min(8).label('Password'),
});

interface ILoginForm {
  email: string;
  password: string;
}

const inputs: IInput<ILoginForm>[] = [
  { name: 'email', label: 'Email', type: 'text' },
  { name: 'password', label: 'Password', type: 'password' },
];

const Login = () => {
  const user = useUser();
  const redirectionAfterLogin = useRedirectionAfterLogin();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
    }
  };

  const handleChange = () => {
    setErrorMessage('');
  };

  return (
    <Styled.Wrapper>
      {redirectionAfterLogin.redirectMessage && (
        <ErrorMessage
          message={redirectionAfterLogin.redirectMessage}
          size={'large'}
        />
      )}
      <Styled.Form onSubmit={handleSubmit(onSubmit)}>
        <Styled.Title>Login</Styled.Title>
        {inputs.map((input) => (
          <Input
            key={input.name}
            label={input.label}
            error={errors[input.name]?.message}
            name={input.name}
            type={input.type}
            register={register(input.name, {
              onChange: handleChange,
            })}
          />
        ))}

        {errorMessage && <ErrorMessage message={errorMessage} />}

        {isLoading ? (
          <Loading />
        ) : (
          <Styled.Button type="submit">Login</Styled.Button>
        )}
        <Link to={`/register${redirectionAfterLogin.redirectionParams}`}>
          I don't have an account
        </Link>
      </Styled.Form>
    </Styled.Wrapper>
  );
};
export default Login;
