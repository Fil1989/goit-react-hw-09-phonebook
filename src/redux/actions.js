import { createAction } from '@reduxjs/toolkit';
export const handleFilterChange = createAction('form/handleFilterChange', e => {
  return {
    payload: { name: e.currentTarget.name, value: e.currentTarget.value },
  };
});
export const handleDelete = createAction('form/handleDelete');

export const contactsRequest = createAction('Server/Request');

export const getContactsSucess = createAction('Server/GetSucess');
export const getContactsError = createAction('Server/GetError');

export const postContactSucess = createAction('Server/PostSucess');
export const postContactError = createAction('Server/PostError');

export const deleteContactSucess = createAction('Server/DeleteSucess');
export const deleteContactError = createAction('Server/DeleteError');

export const registrationSucess = createAction('Server/RegistrationSucess');
export const registrationError = createAction('Server/RegistrationError');

export const loginUserSucess = createAction('Server/LoginUserSucess');
export const loginUserError = createAction('Server/LoginUserError');

export const logoutSucess = createAction('Server/LogoutSucess');
export const logoutError = createAction('Server/LogoutError');

export const getCurrentUserSucess = createAction('Server/GetUserSucess');
export const getCurrentUserError = createAction('Server/GetUserError');
