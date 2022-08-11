import { useEffect, useState } from 'react';
import { parseRedirectUrl } from '../helpers/parsers';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import useUser from '../contexts/User';

type UseRequireLoginActionProps = {
  actionCb: () => void | Promise<void>;
  message: string;
  actionName?: string;
  actionValue?: string;
};

const useRequireLoginAction = ({
  actionCb,
  message,
  actionName,
  actionValue,
}: UseRequireLoginActionProps) => {
  const user = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isExecuting, setIsExecuting] = useState(false);
  const [isExecutingAfterRedirection, setIsExecutingAfterRedirection] =
    useState(false);

  const handle = async () => {
    if (!user.isLoggedIn) {
      navigate(
        parseRedirectUrl('/login', location, {
          message,
          action: `${actionName}:${actionValue}`,
        })
      );
    } else {
      if (!isExecuting) {
        setIsExecuting(true);
        await actionCb();
        setIsExecuting(false);
      }
    }
  };

  useEffect(() => {
    if (searchParams && searchParams.has('action')) {
      const param = searchParams.get('action') as string;
      const [action, value] = param.split(':');
      if (
        action === actionName &&
        value === actionValue &&
        !isExecuting &&
        !isExecutingAfterRedirection
      ) {
        setIsExecutingAfterRedirection(true);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (isExecutingAfterRedirection) {
      handle().then(() => {
        let queryStr = '';
        searchParams.forEach((val, key) => {
          if (key !== 'action') {
            queryStr += `&${key}=${val}`;
          }
        });
        setSearchParams(queryStr, { replace: true });
        setIsExecutingAfterRedirection(false);
      });
    }
  }, [isExecutingAfterRedirection]);

  return { isExecuting, isExecutingAfterRedirection, handle };
};

export default useRequireLoginAction;
