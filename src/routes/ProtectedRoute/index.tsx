import { Navigate, useLocation } from 'react-router-dom';
import { parseRedirectUrl } from '../../helpers/parsers';
type ProtectedProps = {
  condition: boolean;
  children: JSX.Element;
  redirectTo: string;
  options?: { message?: string; action?: string };
};

const ProtectedRoute = ({
  condition,
  children,
  redirectTo,
  options,
}: ProtectedProps) => {
  const location = useLocation();

  const fallback = () => {
    return <Navigate to={parseRedirectUrl(redirectTo, location, options)} />;
  };

  return <>{condition ? children : fallback()}</>;
};

export default ProtectedRoute;
