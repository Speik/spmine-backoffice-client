import React, { FormEvent, useState } from 'react';

import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Zoom,
} from '@mui/material';

import { TransitionProps } from '@mui/material/transitions';

import { IUser } from '../../interfaces';
import { useAppDispatch } from '../../redux/hooks';
import { editUser } from '../../redux/actions/users-list-actions';
import { delay } from '../../utils/helpers';

const MIN_USERNAME_LENGTH = Number(process.env.REACT_APP_MIN_USERNAME_LENGTH);
const MIN_PASSWORD_LENGTH = Number(
  process.env.REACT_APP_MIN_USER_PASSWORD_LENGTH,
);

type UserEditProps = {
  user: IUser;
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DialogTransition = React.forwardRef(function DialogTransition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Zoom ref={ref} {...props} />;
});

const UserEdit = ({ user, isOpen, setOpen }: UserEditProps) => {
  const dispatch = useAppDispatch();

  const defaultEditorValues = {
    username: user.username,
  };

  const [isPending, setPending] = useState(false);
  const [formValues, setFormValues] =
    useState<Partial<IUser>>(defaultEditorValues);

  const [isUsernameError, setUsernameError] = useState(false);
  const [isPasswordError, setPasswordError] = useState(false);

  const handleClose = () => {
    setFormValues({});
    setUsernameError(false);
    setPasswordError(false);
    setOpen(false);
  };

  const handleInputChange = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;

    name === 'username' ? setUsernameError(false) : setPasswordError(false);

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const validateForm = (): boolean => {
    const status = { valid: true };

    const username = formValues.username?.trim() ?? '';
    const password = formValues.password?.trim() ?? '';

    if (username.length < MIN_USERNAME_LENGTH) {
      status.valid = false;
      setUsernameError(true);
    }

    // Validate password only if any value speciifed
    if (password && password.length < MIN_PASSWORD_LENGTH) {
      status.valid = false;
      setPasswordError(true);
    }

    return status.valid;
  };

  const handleUserEdit = async () => {
    const isFormValid = validateForm();

    if (!isFormValid) {
      return false;
    }

    setPending(true);
    await delay(1000);

    dispatch(
      editUser(user.id, {
        username: String(formValues.username).trim(),
        updatedAt: new Date().toLocaleString(),
      }),
    );

    setPending(false);
    setFormValues(defaultEditorValues);
    handleClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      TransitionComponent={DialogTransition}>
      <DialogTitle>Edit {user?.username}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          If you do not want to change password, just left field empty
        </DialogContentText>
        <TextField
          id="username"
          name="username"
          label="Username"
          variant="filled"
          fullWidth
          margin="dense"
          error={isUsernameError}
          onChange={handleInputChange}
          defaultValue={user?.username}
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Box sx={{ my: 1, position: 'relative', display: 'inline-flex' }}>
          <Button
            variant="contained"
            disabled={isPending}
            onClick={handleUserEdit}>
            Edit
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
      </DialogActions>
    </Dialog>
  );
};

export { UserEdit };
