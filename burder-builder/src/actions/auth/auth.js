import ax from "axios";

export const AUTH_START = "AUTH_START";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";
export const AUTH_LOGOUT = "AUTH_LOGOUT";
export const AUTH_USER = "AUTH_USER";
export const AUTH_CHECK_TIMEOUT = "AUTH_CHECK_TIMEOUT";
export const AUTH_INITIATE_LOGOUT = "AUTH_INITIATE_LOGOUT";
export const SET_AUTH_REDIRECT_PATH = "SET_AUTH_REDIRECT_PATH";
export const authStart = () => ({
  type: AUTH_START,
});

export const authSuccess = (idToken, localId) => ({
  type: AUTH_SUCCESS,
  payload: {
    idToken,
    userId: localId,
  },
});

export const authFail = (error) => ({
  type: AUTH_FAIL,
  payload: {
    error,
  },
});

export const logout = () => ({
  type: AUTH_INITIATE_LOGOUT,
});
export const logoutSucceed = () => ({
  type: AUTH_LOGOUT,
});
export const checkAuthTimeout = (expirationTime) => ({
  type: AUTH_CHECK_TIMEOUT,
  expirationTime,
});

export const auth = (email, password, isSignUp) => ({
  type: AUTH_USER,
  email,
  password,
  isSignUp
});

export const setAuthRedirectPath = (path) => ({
  type: SET_AUTH_REDIRECT_PATH,
  payload: {
    path,
  },
});

export const authCheckState = () => (dispatch) => {
  const token = localStorage.getItem("token");
  if (!token) {
    dispatch(logout());
  } else {
    const expirationDate = new Date(localStorage.getItem("expirationDate"));
    if (expirationDate > new Date()) {
      const userId = localStorage.getItem("userId");
      dispatch(authSuccess(token, userId));
      dispatch(
        checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    } else {
      dispatch(logout());
    }
  }
};
