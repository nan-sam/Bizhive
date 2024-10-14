import AuthForm from "./AuthForm";

function Register(authAction) {
  return (
    <div>
      <h1>Register</h1>
      <>
        <AuthForm authAction={authAction} mode="register" />
      </>
    </div>
  );
}

export default Register;
