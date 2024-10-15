import AuthForm from "../components/AuthForm";
import { Link } from "react-router-dom";

function Register({ authAction }) {
  return (
    <div>
      <h1>Register</h1>
      <>
        <AuthForm authAction={authAction} mode="register" />
        <p>
          Already registered?
          <Link to="/login">Login</Link>
        </p>
      </>
    </div>
  );
}

export default Register;
