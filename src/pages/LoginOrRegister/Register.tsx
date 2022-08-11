import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import * as Styled from './styles';
import Loading from '../../components/Layout/Loading';
import { useState } from 'react';
import useUser from '../../contexts/User';
import ErrorMessage from '../../components/Layout/ErrorMessage';
import { Link } from 'react-router-dom';
import useRedirectionAfterLogin from '../../hooks/useRedirectionAfterLogin';
import Input, { IInput } from '../../components/Layout/Form/Input';

const registerSchema = yup.object({
  firstname: yup.string().required().min(2).label('Firstname'),
  lastname: yup.string().required().min(2).label('Lastname'),
  email: yup.string().email().required().label('Email'),
  password: yup.string().required().min(8).label('Password'),
  passwordConfirmation: yup
    .string()
    .required()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .label('Password confirmation'),
});

interface IRegisterForm {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  passwordConfirmation: string;
}

const inputs: IInput<IRegisterForm>[] = [
  { name: 'email', label: 'Email', type: 'text' },
  { name: 'password', label: 'Password', type: 'password' },
  {
    name: 'passwordConfirmation',
    label: 'Password confirmation',
    type: 'password',
  },
  { name: 'firstname', label: 'Firstname', type: 'text' },
  { name: 'lastname', label: 'Lastname', type: 'text' },
];

const Register = () => {
  const user = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const redirectionAfterLogin = useRedirectionAfterLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterForm>({
    resolver: yupResolver(registerSchema),
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
      setIsLoading(false);
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
        <Styled.Title>Create an account</Styled.Title>
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
          <Styled.Button type="submit">Register</Styled.Button>
        )}
        <Link to={`/login${redirectionAfterLogin.redirectionParams}`}>
          I have an account
        </Link>
      </Styled.Form>
    </Styled.Wrapper>
  );
};
export default Register;
