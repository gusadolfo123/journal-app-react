import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import validator from "validator";
import { startGoogleLogin, startLoginWithEmailPass } from "../../actions/auth";
import { removeError, setError } from "../../actions/ui";
import { useForm } from "../../hooks/useForm";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const { loading, msgError } = useSelector((state) => state.ui);

  const [formValues, handleInputChange] = useForm({
    email: "",
    password: "",
  });

  const { email, password } = formValues;

  const handleLogin = (e) => {
    e.preventDefault();
    if (isFormValid()) dispatch(startLoginWithEmailPass(email, password));
  };

  const handleLoginGoogle = () => {
    dispatch(startGoogleLogin());
  };

  const isFormValid = () => {
    if (email.trim().length === 0) {
      dispatch(setError("email is required"));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError("Email not valid"));
      return false;
    } else if (password.length < 5) {
      dispatch(setError("password should be a 6 characters"));
      return false;
    }

    dispatch(removeError());
    return true;
  };

  return (
    <>
      <h3 className="auth__title">Login</h3>
      <form onSubmit={handleLogin}>
        {msgError && <div className="auth__alert-error">{msgError}</div>}

        <input
          className="auth__input"
          type="email"
          name="email"
          autoComplete="off"
          placeholder="email"
          value={email}
          onChange={handleInputChange}
        />
        <input
          className="auth__input"
          type="password"
          name="password"
          autoComplete="off"
          placeholder="password"
          value={password}
          onChange={handleInputChange}
        />

        <button
          className="btn btn-primary btn-block"
          type="submit"
          disabled={loading}
        >
          Login
        </button>

        <div className="auth__social-networks">
          <p>Login with social networks</p>
          <div className="google-btn" onClick={handleLoginGoogle}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
          <Link className="link" to="/auth/register">
            Create new account
          </Link>
        </div>
      </form>
    </>
  );
};
