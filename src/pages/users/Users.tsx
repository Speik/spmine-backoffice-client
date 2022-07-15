import React, { useEffect, useState } from 'react';
import { Box, Fab, IconButton, Stack } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { IUser } from '../../interfaces';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setUsersList } from '../../redux/actions/users-list-actions';

import { UserCreate } from './UserCreate';
import { UserEdit } from './UserEdit';

import { TableLoadingSkeleton } from '../../components/TableLoadingSkeleton';
import { fetchUsersList } from '../../services/api/endpoints';
import { delay } from '../../utils/helpers';
import { UserDelete } from './UserDelete';

const Users = () => {
  const [userOnEdit, setUserOnEdit] = useState<Partial<IUser>>({});
  const [userOnDelete, setUserOnDelete] = useState<Partial<IUser>>({});

  const [isCreatingUser, setCreatingUser] = useState(false);
  const [isEditingUser, setEditingUser] = useState(false);
  const [isDeletingUser, setDeletingUser] = useState(false);

  const usersList = useAppSelector((state) => state.usersList.data);
  const dispatch = useAppDispatch();

  const openUserEditor = (id: string) => {
    const targetUser = usersList.find((user) => user.id === id);

    if (!targetUser) {
      return;
    }

    setUserOnEdit(targetUser);
    setEditingUser(true);
  };

  const openUserDelete = (id: string) => {
    const targetUser = usersList.find((user) => user.id === id);

    if (!targetUser) {
      return;
    }

    setUserOnDelete(targetUser);
    setDeletingUser(true);
  };

  const USERS_PER_PAGE = 10;
  const USERS_COLUMNS_DEFINITIONS: GridColDef[] = [
    { field: 'username', headerName: 'Username', flex: 35 },
    { field: 'createdAt', headerName: 'Created At', flex: 25 },
    { field: 'updatedAt', headerName: 'Updated At', flex: 25 },
    {
      field: 'management',
      headerName: 'Management',
      flex: 10,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Stack direction="row" spacing={1}>
            <IconButton
              aria-label="edit"
              onClick={() => openUserEditor(params.row.id)}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={() => openUserDelete(params.row.id)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Stack>
        );
      },
    },
  ];

  useEffect(() => {
    (async () => {
      if (usersList.length) {
        return;
      }

      await delay(1000);

      const fetchedUsersList = await fetchUsersList();
      dispatch(setUsersList(fetchedUsersList));
    })();
  }, [dispatch]);

  return (
    <>
      <UserCreate isOpen={isCreatingUser} setOpen={setCreatingUser} />
      {isEditingUser && (
        <UserEdit
          user={userOnEdit as IUser}
          isOpen={isEditingUser}
          setOpen={setEditingUser}
        />
      )}
      {isDeletingUser && (
        <UserDelete
          user={userOnDelete as IUser}
          isOpen={isDeletingUser}
          setOpen={setDeletingUser}
        />
      )}
      <Box sx={{ pb: 4 }}>
        <Fab
          variant="extended"
          color="primary"
          aria-label="Create user"
          onClick={() => setCreatingUser(true)}>
          <AddIcon sx={{ mr: 1 }} />
          Create user
        </Fab>
      </Box>
      <DataGrid
        rows={usersList}
        autoHeight
        density="comfortable"
        columns={USERS_COLUMNS_DEFINITIONS}
        pageSize={USERS_PER_PAGE}
        rowsPerPageOptions={[USERS_PER_PAGE]}
        disableSelectionOnClick
        disableColumnMenu
        disableColumnSelector
        disableDensitySelector
        components={{
          LoadingOverlay: TableLoadingSkeleton,
        }}
        initialState={{
          sorting: {
            sortModel: [{ field: 'createdAt', sort: 'desc' }],
          },
        }}
        loading={usersList.length === 0}
        sx={{ minHeight: 456 }}
      />
    </>
  );
};

export { Users };
