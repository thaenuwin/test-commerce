import { Layout } from '@components/common';
import { Container } from '@components/ui';
import React from 'react';
import { useUI } from '@components/ui/context';
import { validate } from 'email-validator';
import Link from 'next/link';
import useSignup from '@framework/auth/use-signup';

/*
 * TODO:
 * 1. Implement React Form Hook for form handling and validation.
 * 2. Code cleanup
 * 3. Research about Forgot Password API
 */

export default function Signup() {
  // Form State
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [dirty, setDirty] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);

  const { setModalView, closeModal } = useUI();

  const handleResetPassword = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();

    if (!dirty && !disabled) {
      setDirty(true);
      handleValidation();
    }
  };

  const handleValidation = React.useCallback(() => {
    // Unable to send form unless fields are valid.
    if (dirty) {
      setDisabled(!validate(email));
    }
  }, [email, dirty]);

  React.useEffect(() => {
    handleValidation();
  }, [handleValidation]);

  return (
    <Container>
      <form onSubmit={handleResetPassword} className="w-80 flex flex-col justify-between p-3 mx-auto">
        <div className="flex flex-col space-y-4">
          {message && <div className="text-red border border-red p-3">{message}</div>}

          <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} type="email" />
          <div className="pt-2 w-full flex flex-col">
            <button type="submit" disabled={disabled}>
              Recover Password
            </button>
          </div>

          <span className="pt-3 text-center text-sm">
            <span className="text-accents-7">Do you have an account?</span>
            {` `}
            <Link href="/login">
              <span className="text-accent-9 font-bold hover:underline cursor-pointer">Log In</span>
            </Link>
          </span>
        </div>
      </form>
    </Container>
  );
}

Signup.Layout = Layout;
