import {useNavigate} from 'react-router-dom';
import {useRecoilState} from 'recoil';

import {AuthService, LocalStorage} from '../api/services';
import {notificationState} from '../recoil/atoms';
import {ErrorNotification} from './index';
import {useState} from 'react';

const GuestLogin = () => {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [showNotification, setShowNotification] =
    useRecoilState(notificationState);

  const handleGuestSignIn = async () => {
    setLoading(true);
    try {
      const formData = {
        email: 'guest@email.com',
        password: 'Guest@1',
      };

      const response = await AuthService.signIn(formData);
      const {accessToken, refreshToken} = response?.data?.data || {};
      setLoading(false);
      LocalStorage.set('accessToken', accessToken);
      LocalStorage.set('refreshToken', refreshToken);

      navigate('/dashboard');
    } catch (error) {
      setShowNotification(true);
      let errorMessage = 'An unexpected error occurred.';

      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      console.log(errorMessage);
    } finally {
      setTimeout(() => setShowNotification(false), 2000);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
          <div className="border-primary-500 h-16 w-16 animate-spin rounded-full border-b-2 border-t-2"></div>
        </div>
      ) : (
        <button
          tabIndex="0"
          className="inline-flex h-10 w-full translate-y-0.5 items-center justify-center rounded-md px-4 py-1 text-sm font-medium ring-offset-background transition-colors hover:bg-accent/50 hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          onClick={handleGuestSignIn}
        >
          <div className="flex items-center space-x-2">
            <span>Sign In as Guest</span>
          </div>
        </button>
      )}
      {showNotification && (
        <ErrorNotification label="Sorry, guest sign-in is currently unavailable. Please try later." />
      )}
    </>
  );
};

export default GuestLogin;
