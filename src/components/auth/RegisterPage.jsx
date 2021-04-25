import React from "react";
import { Link } from "react-router-dom";

export const RegisterPage = () => {
  return (
    <>
      <h3 className="auth__title">Register</h3>
      <form>
        <input
          className="auth__input"
          type="text"
          name="name"
          autoComplete="off"
          placeholder="name"
        />

        <input
          className="auth__input"
          type="email"
          name="email"
          autoComplete="off"
          placeholder="email"
        />

        <input
          className="auth__input"
          type="password"
          name="password"
          autoComplete="off"
          placeholder="password"
        />

        <input
          className="auth__input"
          type="password"
          name="password_2"
          autoComplete="off"
          placeholder="confirm password"
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
