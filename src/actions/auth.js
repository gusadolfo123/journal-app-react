import { types } from "../types/types";
import { firebase, googleAuthProvider } from "../firebase/firebase-config";
import { uiFinishLoading, uiStartLoading } from "./ui";

import Swal from "sweetalert2";

export const startLoginWithEmailPass = (email, password) => {
  return (dispatch) => {
    dispatch(uiStartLoading());
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
        dispatch(uiFinishLoading());
      })
      .catch((e) => {
        console.log(e);
        dispatch(uiFinishLoading());
        Swal.fire("Error", e.message, "error");
      });
  };
};

export const startGoogleLogin = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
      })
      .catch((err) => Swal.fire("Error", err.message, "error"));
  };
};

export const startRegisterWithEmailPassword = (email, password, name) => {
  return (dispatch) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({ displayName: name });
        dispatch(login(user.uid, user.displayName));
      })
      .catch((e) => Swal.fire("Error", e.message, "error"));
  };
};

export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
});

export const startLogout = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signOut()
      .catch((err) => console.log(err));

    dispatch(logout());
  };
};

export const logout = () => ({
  type: types.logout,
});
