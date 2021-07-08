import { Layout } from '@components/common';
import { Container } from '@components/ui';
import React from 'react';
import useLogin from '@framework/auth/use-login';
import { useUI } from '@components/ui/context';
import { validate } from 'email-validator';

/*
 * TODO:
 * 1. Implement React Form Hook for form handling and validation.
 * 2. Code cleanup
 */

export default function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [dirty, setDirty] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const { setModalView, closeModal } = useUI();

  const login = useLogin();

  const handleLogin = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();

    if (!dirty && !disabled) {
      setDirty(true);
      handleValidation();
    }

    try {
      setMessage('');
      await login({
        email,
        password,
      });
      closeModal();
    } catch ({ errors }) {
      setMessage(errors[0].message);
    }
  };

  const handleValidation = React.useCallback(() => {
    // Test for Alphanumeric password
    const validPassword = /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(password);

    // Unable to send form unless fields are valid.
    if (dirty) {
      setDisabled(!validate(email) || password.length < 7 || !validPassword);
    }
  }, [email, password, dirty]);

  React.useEffect(() => {
    handleValidation();
  }, [handleValidation]);

  return (
    <Container>
      <form onSubmit={handleLogin} className="w-80 flex flex-col justify-between p-3 mx-auto">
        <div className="flex flex-col space-y-3">
          {message && (
            <div className="text-red border border-red p-3">
              {message}. Did you {` `}
              <a
                className="text-accent-9 inline font-bold hover:underline cursor-pointer"
                onClick={() => setModalView('FORGOT_VIEW')}
              >
                forgot your password?
              </a>
            </div>
          )}
          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

          <button type="submit" disabled={disabled}>
            Log In
          </button>
          <div className="pt-1 text-center text-sm">
            <span className="text-accents-7">Don't have an account?</span>
            {` `}
            <a
              className="text-accent-9 font-bold hover:underline cursor-pointer"
              onClick={() => setModalView('SIGNUP_VIEW')}
            >
              Sign Up
            </a>
          </div>
        </div>
      </form>
    </Container>
  );
}

Login.Layout = Layout;
