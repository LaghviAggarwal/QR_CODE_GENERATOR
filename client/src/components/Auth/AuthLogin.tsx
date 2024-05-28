import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  DEFAULT_PATH,
  REGISTRATION_PATH,
} from '../../utils/constants/routes.constant';

import { useSignInMutation } from '../../store/auth/authApi';

import { Button } from '../UI/Button/Button';
import { Icons } from '../UI/Icon/Icon';
import { AuthAction } from './AuthAction';
import { AuthInputs } from './AuthInputs';

import './Auth.scss';

export const AuthLogin = () => {
  const { control, handleSubmit, setError } = useForm();
  const navigate = useNavigate();
  const [signIn] = useSignInMutation();

  const signInUser = async (data: any) => {
    await signIn(data)
      .unwrap()
      .then(() => navigate(DEFAULT_PATH))
      .catch((error) => {
        setError('password', { type: 'custom', message: error.data.message });
        setError('email', { type: 'custom', message: error.data.message });
      });
  };

  return (
    <div className="auth">
      <div className="auth__inner">
        <div className="auth__container">
          <button className="auth__logo" onClick={() => navigate(DEFAULT_PATH)}>
            <Icons name="logo" size={75} color="none" />
          </button>

          <h2 className="auth__title subtitle">Login</h2>
          <p className="auth__text text text_small">
            Welcome! Enter your email address and password to log in to your
            account
          </p>

          <AuthInputs autoComplete="on" control={control} />

          <div className="auth__actions">
            <Button
              className="button_blue auth__button"
              clickHandler={handleSubmit(signInUser)}
            >
              To come in
            </Button>

            <AuthAction
              text="Don't have an account yet?"
              buttonText="Сreate"
              onClick={() => navigate(REGISTRATION_PATH)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
