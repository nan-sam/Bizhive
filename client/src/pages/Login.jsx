import AuthForm from "../components/Forms/AuthForm";
import { Link } from "react-router-dom";

function Login({ authAction }) {
  return (
    <div>
      <h1>Login</h1>
      <>
        <AuthForm authAction={authAction} mode="login" />
        <p>
          Don't have an account?
          <Link to="/register">Sign up now</Link>
        </p>
      </>
    </div>
  );
}

export default Login;
