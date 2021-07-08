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
 */

export default function Signup() {
  // Form State
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [dirty, setDirty] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);

  const signup = useSignup();
  const { setModalView, closeModal } = useUI();

  const handleSignup = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();

    if (!dirty && !disabled) {
      setDirty(true);
      handleValidation();
    }

    try {
      setLoading(true);
      setMessage('');
      await signup({
        email,
        firstName,
        lastName,
        password,
      });
      setLoading(false);
      closeModal();
    } catch ({ errors }) {
      setMessage(errors[0].message);
      setLoading(false);
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
      <form onSubmit={handleSignup} className="w-80 flex flex-col justify-between p-3 mx-auto">
        <div className="flex flex-col space-y-4">
          {message && <div className="text-red border border-red p-3">{message}</div>}
          <input placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />
          <input placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />
          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <span className="text-accents-8">
            <span className="leading-6 text-sm">
              <strong>Info</strong>: Passwords must be longer than 7 chars and include numbers.{' '}
            </span>
          </span>
          <div className="pt-2 w-full flex flex-col">
            <button type="submit" disabled={disabled}>
              Sign Up
            </button>
          </div>

          <span className="pt-1 text-center text-sm">
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
