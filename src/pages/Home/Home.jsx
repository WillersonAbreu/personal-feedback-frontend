import React, { useCallback, useEffect, useRef } from 'react';

// Ant design imports
import { message } from 'antd';

// Unform
import Input from '~/components/Unform/Input/Input';

// Services imports
import UserService from '~/services/api/User';
import AuthService from '~/services/api/Auth';

// Helpers
import { saveToken } from '~/helpers/AuthHelper';

// History
import { useHistory, Redirect } from 'react-router-dom';

// Redux
import { useDispatch } from 'react-redux';
import { Creators as AuthActions } from '~/store/ducks/Auth';

// Yup
import * as Yup from 'yup';

// Styles
import {
  Container,
  Content,
  FormsWrapper,
  FormSeparator,
  StyledForm,
  OrDiv,
  StyledButton,
} from './HomeStyles';

function Home() {
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  const history = useHistory();
  const loginFormRef = useRef(null);
  const registerFormRef = useRef(null);

  const isLogged = useCallback(() => {
    if (token) {
      return <Redirect to="/main" />;
    }
  }, [token]);

  useEffect(() => {
    isLogged();
  }, [token, isLogged]);

  const handleLogin = useCallback(
    async (loginData) => {
      try {
        const validationSchema = Yup.object().shape({
          email: Yup.string()
            .email('You must insert a valid email')
            .required('Is necessary insert the email'),
          password: Yup.string().required('Is necessary insert the password'),
        });

        // Remove all previous errors
        loginFormRef.current.setErrors({});

        await validationSchema.validate(loginData, {
          abortEarly: false,
        });

        const response = await AuthService.login(loginData);

        if (response.token) {
          saveToken(response.token);
          dispatch(AuthActions.authSuccess(response.token));
          message.success('Logged in successfully!');
          history.push('/main');
        }

        if (response.response) {
          message.error(response.response.data.error);
          return;
        }
      } catch (error) {
        // Showing validation errors on
        const validationErrors = {};
        if (error instanceof Yup.ValidationError) {
          error.inner.forEach((error) => {
            validationErrors[error.path] = error.message;
          });
          loginFormRef.current.setErrors(validationErrors);
        } else {
          message.error(error.message); //'Failed when trying to login!');
        }

        dispatch(AuthActions.authFail());
      }
    },
    [dispatch, history]
  );

  const handleRegister = useCallback(async (registerData, { reset }) => {
    try {
      // Remove all previous errors
      registerFormRef.current.setErrors({});

      // Schema to validate the form
      const schema = Yup.object({
        name: Yup.string().required('Is necessary insert an user name').min(3),
        email: Yup.string().email().required('Insert a valid email'),
        password: Yup.string()
          .required('Is necessary insert a password')
          .min(6),
        passwordConfirmation: Yup.string().when('password', (password, field) =>
          password
            ? field
                .required('The password confirmation does not match')
                .oneOf([Yup.ref('password')])
            : field
        ),
        about_user: Yup.string().required('Is necessary insert your role'),
      });

      // Validating the form
      await schema.validate(registerData, {
        abortEarly: false,
      });

      await UserService.create(registerData);
      message.success('User registered sucessfully!');
      reset();
    } catch (error) {
      // Showing validation errors on
      const validationErrors = {};
      if (error instanceof Yup.ValidationError) {
        error.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        registerFormRef.current.setErrors(validationErrors);
      } else {
        message.error(error.message);
      }
    }
  }, []);

  return (
    <Container>
      <Content>
        <FormsWrapper>
          <StyledForm ref={loginFormRef} name="login" onSubmit={handleLogin}>
            <h3>Login</h3>
            <Input name="email" placeholder="Your email" />
            <Input
              name="password"
              type="password"
              placeholder="Your password"
            />
            <StyledButton>Login</StyledButton>
          </StyledForm>
        </FormsWrapper>

        <FormSeparator>
          <OrDiv>
            <h1>OR</h1>
          </OrDiv>
        </FormSeparator>
        <FormsWrapper>
          <StyledForm
            ref={registerFormRef}
            name="login"
            onSubmit={handleRegister}
          >
            <h3>Register</h3>
            <Input name="name" placeholder="Your name" />
            <Input name="email" placeholder="Your email" />
            <Input
              name="password"
              type="password"
              placeholder="Your password"
            />
            <Input
              name="passwordConfirmation"
              placeholder="Confirm your password"
              type="password"
            />
            <Input name="about_user" placeholder="Your Role" />
            <StyledButton>Register</StyledButton>
          </StyledForm>
        </FormsWrapper>
      </Content>
    </Container>
  );
}

export default Home;
