import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import validator from "validator";
import { startRegisterWithEmailPassword } from "../../actions/auth";
import { removeError, setError } from "../../actions/ui";
import { useForm } from "../../hooks/useForm";

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const { msgError } = useSelector((state) => state.ui);

  const [formValues, handleInputChange] = useForm({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formValues;

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(name, email, password, password2);

    if (isFormValid()) {
      dispatch(startRegisterWithEmailPassword(email, password, name));
    }
  };

  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(setError("name is required"));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError("Email not valid"));
      return false;
    } else if (password !== password2 || password.length < 5) {
      dispatch(setError("password should be a 6 characters"));
      return false;
    }

    dispatch(removeError());
    return true;
  };

  return (
    <>
      <h3 className="auth__title">Register</h3>
      <form onSubmit={handleRegister}>
        {msgError && <div className="auth__alert-error">{msgError}</div>}

        <input
          className="auth__input"
          type="text"
          name="name"
          autoComplete="off"
          placeholder="name"
          onChange={handleInputChange}
          value={name}
        />

        <input
          className="auth__input"
          type="email"
          name="email"
          autoComplete="off"
          placeholder="email"
          onChange={handleInputChange}
          value={email}
        />

        <input
          className="auth__input"
          type="password"
          name="password"
          autoComplete="off"
          placeholder="password"
          onChange={handleInputChange}
          value={password}
        />

        <input
          className="auth__input"
          type="password"
          name="password2"
          autoComplete="off"
          placeholder="confirm password"
          onChange={handleInputChange}
          value={password2}
        />

        <button className="btn btn-primary btn-block" type="submit">
          Register
        </button>

        <div className="auth__social-networks">
          <Link className="link" to="/auth/login">
            Already register?
          </Link>
        </div>
      </form>
    </>
  );
};
