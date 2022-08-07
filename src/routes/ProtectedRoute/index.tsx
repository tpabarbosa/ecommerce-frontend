import { Navigate, useLocation } from 'react-router-dom';
import { parseRedirectUrl } from '../../helpers/parsers';
type ProtectedProps = {
  condition: boolean;
  children: JSX.Element;
  redirectTo?: string;
};

const ProtectedRoute = ({
  condition,
  children,
  redirectTo,
}: ProtectedProps) => {
  const location = useLocation();

  const fallback = () => {
    if (redirectTo) {
      return <Navigate to={parseRedirectUrl('/login', location)} />;
    }
    return null;
  };

  return <>{condition ? children : fallback()}</>;
};

export default ProtectedRoute;
