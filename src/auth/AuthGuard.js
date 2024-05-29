import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// components
import LoadingScreen from '../components/loading-screen';
// import SplashPage from '../pages/users';
import { useAuthContext } from './useAuthContext';
// config
import { PATH_PAGE } from '../routes/paths';

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default function AuthGuard({ children }) {
  const { isAuthenticated, isInitialized } = useAuthContext();

  const { pathname, push } = useRouter();

  const [requestedLocation, setRequestedLocation] = useState(null);

  useEffect(() => {
    if (requestedLocation && pathname !== requestedLocation) {
      push(requestedLocation);
    }
    if (isAuthenticated) {
      setRequestedLocation(null);
    }
  }, [isAuthenticated, pathname, push, requestedLocation]);

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    // return <Login />;
    push(PATH_PAGE.users.root);
    return null;
  }

  return <> {children} </>;
}
