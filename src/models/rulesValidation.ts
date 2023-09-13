import { RegisterOptions } from 'react-hook-form';

interface Rules {
  [key: string]: RegisterOptions;
}

export const rules: Rules = {
  email: {
    required: 'Email is required',
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: 'Email is invalid',
    },
    minLength: {
      value: 4,
      message: 'Email must have at least 4 characters',
    },
    maxLength: {
      value: 50,
      message: 'Email must have less than 50 characters',
    },
  },
  password: {
    required: 'Password is required',
    minLength: {
      value: 6,
      message: 'Password must have at least 6 characters',
    },
    maxLength: {
      value: 20,
      message: 'Password must have less than 20 characters',
    },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
      message:
        'Password must have at least one lowercase letter, one uppercase letter and one number',
    },
  },
  name: {
    required: 'Name is required',
    maxLength: {
      value: 20,
      message: 'Name must have less than 20 characters',
    },
  },
  surname: {
    required: 'Surname is required',
    maxLength: {
      value: 20,
      message: 'Surname must have less than 20 characters',
    },
  },
};
