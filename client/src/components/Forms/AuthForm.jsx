import { useState, useEffect } from "react";

const AuthForm = ({ authAction, mode = "" }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (ev) => {
    ev.preventDefault();
    try {
      await authAction({ username, password }, mode);
    } catch (ex) {
      setError(ex.error);
    }
  };
  return (
    <form onSubmit={submit}>
      {!!error && <div className="error">{error}</div>}
      <input
        value={username}
        placeholder="username"
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <input
        value={password}
        type="password"
        placeholder="password"
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button type="submit">{mode}</button>
    </form>
  );
};

export default AuthForm;
