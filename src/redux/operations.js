import axios from 'axios';
// import store from './store';
import {
  getContactsSucess,
  getContactsError,
  contactsRequest,
  postContactSucess,
  postContactError,
  deleteContactSucess,
  deleteContactError,
  registrationSucess,
  registrationError,
  loginUserSucess,
  loginUserError,
  logoutSucess,
  logoutError,
  getCurrentUserSucess,
  getCurrentUserError,
} from './actions';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';
const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

export const takeContactsFromServer = () => async (dispatch, getState) => {
  dispatch(contactsRequest());
  try {
    const { data } = await axios.get('/contacts');
    // .then(response =>
    dispatch(getContactsSucess(data));
    // )
  } catch (error) {
    dispatch(getContactsError(error));
    // );
  }
};
export const postContactToServer = e => async dispatch => {
  e.preventDefault();

  const name = e.currentTarget[0].value;
  const number = e.currentTarget[1].value;

  let prevContacts;
  try {
    prevContacts = await axios.get('/contacts');
  } catch (error) {
    console.log(error.message);
  }
  let allContactNames = prevContacts.data.reduce((accum, elem) => {
    accum.push(elem.name);
    return accum;
  }, []);
  if (allContactNames.includes(name)) {
    alert(`${name} is already in contacts`);
  } else {
    dispatch(contactsRequest());
    try {
      const { data } = await axios.post('/contacts', {
        name,
        number,
      });

      dispatch(postContactSucess(data));
    } catch (error) {
      dispatch(postContactError(error));
    }
  }
};
export const deleteContactFromServer = id => async dispatch => {
  dispatch(contactsRequest());
  try {
    await axios.delete(`/contacts/${id}`);
    dispatch(deleteContactSucess(id));
  } catch (error) {
    dispatch(deleteContactError(error));
  }
};

export const registerAUser = e => async dispatch => {
  e.preventDefault();

  const name = e.currentTarget[0].value;
  const email = e.currentTarget[1].value;
  const password = e.currentTarget[2].value;
  try {
    const { data } = await axios.post(`/users/signup`, {
      name,
      email,
      password,
    });
    token.set(data.token);
    token.unset();
    dispatch(registrationSucess(data));
  } catch (error) {
    dispatch(registrationError(error));
  }

  try {
    const { data } = await axios.post(`/users/login`, {
      email,
      password,
    });
    token.set(data.token);
    dispatch(loginUserSucess(data));
  } catch (error) {
    dispatch(loginUserError(error));
  }
};
export const loginOperation = e => async dispatch => {
  e.preventDefault();
  const email = e.currentTarget[0].value;
  const password = e.currentTarget[1].value;

  try {
    const { data } = await axios.post(`/users/login`, {
      email,
      password,
    });
    token.set(data.token);
    dispatch(loginUserSucess(data));
  } catch (error) {
    dispatch(loginUserError(error));
  }
};
export const logout = () => async dispatch => {
  try {
    await axios.post(`/users/logout`);
    token.unset();
    dispatch(logoutSucess());
  } catch (error) {
    dispatch(logoutError(error.message));
  }
};
export const getCurrentUser = () => async (dispatch, getState) => {
  const { isAutenticated, token: currentToken } = await getState();

  if (!isAutenticated) {
    return;
  }
  token.set(currentToken);
  // dispatch(getCurrentUserRequest());
  try {
    const response = await axios.get('/users/current');
    dispatch(getCurrentUserSucess(response.data));
  } catch (error) {
    dispatch(getCurrentUserError(error.message));
  }
};
