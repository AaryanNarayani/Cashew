import {set, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useEffect, useState} from 'react';

import {signInSchema, signUpSchema} from '../validators/formValidators';
import {Input, Button, InputPassword} from './index';

const AuthForm = ({onSubmit, buttonText, isSignUp}) => {
  const [isLoading , setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: {errors, isValid},
    setFocus,
    setError,
    reset,
  } = useForm({
    resolver: zodResolver(isSignUp ? signUpSchema : signInSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    isSignUp ? setFocus('name') : setFocus('email');
  }, [isSignUp, setFocus]);

  const onSubmitHandler = async data => {
    try {
      setLoading(true);
      await onSubmit(data);
      setLoading(false);
      reset();
    } catch (error) {
      let errorMessage = 'An unexpected error occurred. Please try again.';

      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      setError('message', {
        type: 'manual',
        message: errorMessage,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="w-full">
      <div className="flex-col space-y-4">
        {isSignUp && (
          <div className="flex flex-col space-y-1">
            <label
              className="w-full text-sm font-medium text-gray-400"
              htmlFor="name"
            >
              Name
            </label>
            <Input
              props={register('name')}
              type="text"
              placeholder=""
              error={errors.name?.message}
              id="name"
            />
          </div>
        )}

        <div className="flex flex-col space-y-1">
          <label
            className="w-full text-sm font-medium text-gray-400"
            htmlFor="email"
          >
            Email Address
          </label>
          <Input
            props={register('email')}
            type="email"
            placeholder="your@email.com"
            error={errors.email?.message}
            id="email"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label
            className="w-full text-sm font-medium text-gray-400"
            htmlFor="password"
          >
            Password
          </label>
          <InputPassword
            props={register('password')}
            type="password"
            placeholder=""
            error={errors.password?.message}
            id="password"
          />

          {isSignUp && !errors.password && (
            <span className="block pl-1 pt-1 text-xs font-normal leading-tight text-gray-400">
              Ensure it&apos;s at least 6 characters
            </span>
          )}
        </div>

        {isSignUp && (
          <div className="flex flex-col space-y-1">
            <label
              className="w-full text-sm font-medium text-gray-400"
              htmlFor="confirmPassword"
            >
              Confirm password
            </label>

            <Input
              props={register('confirmPassword')}
              type="password"
              placeholder=""
              error={errors.confirmPassword?.message}
              id="confirmPassword"
            />

            {!errors.confirmPassword && (
              <span className="block pl-1 pt-1 text-xs font-normal leading-tight text-gray-400">
                Type your password again
              </span>
            )}
          </div>
        )}
        {isLoading ? (
          <div className="flex justify-center">
            <div className="inline-block size-9 animate-spin rounded-full border-[5px] border-gray-200 border-t-primary dark:border-gray-600 dark:border-t-primary"></div>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <Button
            label={buttonText}
            fullWidth
            roundedCorners="md"
            isDisabled={!isValid}
          />
        )}
        
      </div>

      {errors.message && (
        <p className="mt-4 text-center text-xs font-normal leading-tight text-red-400">
          {errors.message.message}
        </p>
      )}
    </form>
  );
};

export default AuthForm;
