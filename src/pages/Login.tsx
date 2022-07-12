import React, { FormEvent, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControlLabel,
  FormGroup,
  Paper,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { Navigate } from 'react-router-dom';

import { OverlappingBox } from '../components/common/OverlappingBox';
import { AppRoutes } from '../utils/routes';
import { delay } from '../utils/helpers';

type LoginProps = {
  isLoggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

type FormFields = {
  username?: string;
  password?: string;
  rememberMe: boolean;
};

const MIN_USERNAME_LENGTH = 3;
const MIN_PASSWORD_LENGTH = 5;

const DEFAULT_VALUES: FormFields = {
  rememberMe: true,
};

const LOGO_PATH = process.env.PUBLIC_URL + '/static/images/logo64.png';

const Login = ({ isLoggedIn, setLoggedIn }: LoginProps) => {
  const [isPending, setPending] = useState(false);
  const [formValues, setFormValues] = useState(DEFAULT_VALUES);

  const [isUsernameError, setUsernameError] = useState(false);
  const [isPasswordError, setPasswordError] = useState(false);
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const handleInputChange = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;

    const name = target.name;
    const value = name === 'rememberMe' ? target.checked : target.value;

    name === 'username' ? setUsernameError(false) : setPasswordError(false);
    setFormErrors([]);

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const validateForm = (): boolean => {
    const status = { valid: true };
    const validationErrors: string[] = [];

    const username = formValues.username?.trim() ?? '';
    const password = formValues.password?.trim() ?? '';

    if (username.length < MIN_USERNAME_LENGTH) {
      validationErrors.push(
        `Login length can't be less than ${MIN_USERNAME_LENGTH} characters`,
      );

      status.valid = false;
      setUsernameError(true);
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      validationErrors.push(
        `Password length can't be less than ${MIN_PASSWORD_LENGTH} characters`,
      );

      status.valid = false;
      setPasswordError(true);
    }

    setFormErrors(validationErrors);
    return status.valid;
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const isFormValid = validateForm();

    if (!isFormValid) {
      return false;
    }

    setPending(true);
    await delay(1000);
    /**
     * IMPLEMENT ME
     */
    setLoggedIn(true);
    setPending(false);
  };

  /**
   * If already logged in - do nothing
   */
  if (isLoggedIn) {
    return <Navigate to={AppRoutes.Servers} />;
  }

  return (
    <OverlappingBox>
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          bgcolor: 'background.default',
        }}>
        <Box
          component="img"
          src={LOGO_PATH}
          alt="Logo"
          sx={{
            dispolay: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}></Box>
        <Paper
          variant="elevation"
          elevation={1}
          sx={{
            width: '100%',
            px: '5rem',
            py: '2rem',
            borderRadius: '.3rem',
            mt: '2rem',
            textAlign: 'center',
          }}>
          <Typography
            variant="h4"
            sx={{
              textTransform: 'uppercase',
            }}>
            Login
          </Typography>
          <Typography variant="body1" color="grey.600">
            Please enter your username and password
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              id="username"
              name="username"
              label="Username"
              variant="filled"
              fullWidth
              margin="dense"
              error={isUsernameError}
              onChange={handleInputChange}
            />
            <TextField
              id="password"
              name="password"
              label="Password"
              variant="filled"
              fullWidth
              margin="dense"
              type="password"
              error={isPasswordError}
              onChange={handleInputChange}
            />
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    id="remember-me"
                    name="rememberMe"
                    checked={formValues.rememberMe}
                    onChange={handleInputChange}
                  />
                }
                label="Remember me"
              />
            </FormGroup>
            {formErrors.length > 0 && (
              <Box sx={{ py: '.5rem', textAlign: 'left' }}>
                {formErrors.map((error, index) => {
                  return (
                    <Typography
                      variant="body1"
                      color="error.500"
                      key={`form-error-${index}`}>
                      {error}
                    </Typography>
                  );
                })}
              </Box>
            )}
            <Box sx={{ m: 1, position: 'relative' }}>
              <Button
                variant="contained"
                disabled={isPending}
                type="submit"
                size="large">
                Submit
              </Button>
              {isPending && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                  }}
                />
              )}
            </Box>
          </form>
        </Paper>
      </Container>
    </OverlappingBox>
  );
};

export { Login };
