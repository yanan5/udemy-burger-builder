import ax from "axios";

export const AUTH_START = "AUTH_START";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";
export const AUTH_LOGOUT = "AUTH_LOGOUT";
export const SET_AUTH_REDIRECT_PATH = "SET_AUTH_REDIRECT_PATH";

export const authStart = () => ({
  type: AUTH_START,
});

export const authSuccess = (authData) => ({
  type: AUTH_SUCCESS,
  payload: {
    idToken: authData.idToken,
    userId: authData.localId
  },
});

export const authFail = (error) => ({
  type: AUTH_FAIL,
  payload: {
    error
  },
});

export const logout = () => ({
  type: AUTH_LOGOUT
})
export const checkAuthTimeout = (expirationTime) => dispatch => {
  setTimeout(() => dispatch(logout()), parseInt(expirationTime) * 1000)
}

export const auth = (email, password, isSignUp) => (dispatch) => {
  dispatch(authStart());
  let signUp = "signInWithPassword";
  if (isSignUp) {
    signUp = "signUp";
  }
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${signUp}?key=AIzaSyDOjFVwYcCEv1k1FumTipxjmxXqNKZzljE
  `;
  ax.post(url, { email, password, returnSecureToken: true })
    .then((res) => {
      dispatch(authSuccess(res.data));
      dispatch(checkAuthTimeout(res.data.expiresIn));
    })
    .catch((error) => {
      dispatch(authFail(error.response.data.error));
    });
};

export const setAuthRedirectPath = (path) => ({
  type: SET_AUTH_REDIRECT_PATH,
  payload: {
    path
  }
})
