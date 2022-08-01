import { ReactNode, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
// hooks
import useAuth from '../hooks/useAuth';

// ----------------------------------------------------------------------

type AuthGuardProps = {
  children: ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isInitialized } = useAuth();
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);
  const navigate = useNavigate();
  console.log(pathname);

  if (!isAuthenticated && isInitialized) {
    Swal.fire({
      title: 'You are not logged in',
      text: 'Click login button to Login',
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#CBC9C9',
      confirmButtonText: 'Login',
      cancelButtonText: 'Home'
    }).then((result: any) => {
      if (result.isConfirmed) {
        navigate(`/auth/login${pathname}`);
      } else {
        navigate('/', { replace: true });
      }
    });

    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    // return <Login />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}
