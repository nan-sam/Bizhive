import React from "react";
import AuthForm from "./AuthForm";

function Login(authAction) {
  return (
    <div>
      <h1>Login</h1>

      <AuthForm authAction={authAction} mode="login" />
    </div>
  );
}

export default Login;
