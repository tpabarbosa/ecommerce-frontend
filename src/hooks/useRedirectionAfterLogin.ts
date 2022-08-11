import { useEffect, useState } from 'react';
import useUser from '../contexts/User';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Buffer } from 'buffer';

const useRedirectionAfterLogin = () => {
  const user = useUser();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [redirectMessage, setRedirectMessage] = useState('');
  const [redirectionParams, setRedirectionParams] = useState('');

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

  useEffect(() => {
    if (location && location.search) {
      setRedirectionParams(location.search);
    }
  }, [location]);

  return { redirectMessage, redirectionParams };
};

export default useRedirectionAfterLogin;
