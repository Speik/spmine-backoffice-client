import React, { useState } from 'react';

import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Zoom,
} from '@mui/material';

import { TransitionProps } from '@mui/material/transitions';

import { IUser } from '../../interfaces';
import { useAppDispatch } from '../../redux/hooks';
import { deleteUser } from '../../redux/actions/users-list-actions';
import { delay } from '../../utils/helpers';

type UserDeleteProps = {
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

const UserDelete = ({ user, isOpen, setOpen }: UserDeleteProps) => {
  const dispatch = useAppDispatch();
  const [isPending, setPending] = useState(false);

  const handleClose = () => setOpen(false);

  const handleUserDelete = async () => {
    setPending(true);
    await delay(1000);

    dispatch(deleteUser(user.id));

    setPending(false);
    handleClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      TransitionComponent={DialogTransition}>
      <DialogTitle>Delete {user?.username}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You are about to completely delete user{' '}
          <strong>{user?.username}</strong>. Are you shure?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Box sx={{ my: 1, position: 'relative', display: 'inline-flex' }}>
          <Button
            variant="contained"
            disabled={isPending}
            onClick={handleUserDelete}>
            Confirm
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

export { UserDelete };
