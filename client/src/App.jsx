import { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Register from "./pages/Register";
import Users from "./pages/Users";
import Businesses from "./pages/Businesses";
import CreateReview from "./components/Users/CreateReview";
import Home from "./pages/Home";
import Login from "./pages/Login";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function App() {
  const [auth, setAuth] = useState({});
  const [users, setUsers] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [reviews, setReviews] = useState([]);
  // const [token, setToken] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBusinesses = async () => {
      const response = await axios.get(`${BASE_URL}/business`);
      const businesses = response.data;

      setBusinesses(businesses);
    };
    fetchBusinesses();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(`${BASE_URL}/users`);
      const users = response.data;

      setUsers(users);
    };
    fetchUsers();
  }, []);

  // useEffect(() => {
  //   attemptLoginWithToken();
  // }, []);

  //If mode === login, navigate the user to their account page after
  //signing in.
  //If mode === register, nvaigate the user home after successful registration

  const attemptLoginWithToken = async () => {
    const token = window.localStorage.getItem("token");
    if (token) {
      alert("Login successful");
      setAuth(token);
      navigate("/users");
    } else {
      window.localStorage.removeItem("token");
    }
  };

  const authAction = async (credentials, mode) => {
    const response = await fetch(`${BASE_URL}/auth/${mode}`, {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (response.ok) {
      window.localStorage.setItem("token", json.token);
      attemptLoginWithToken();
      //navigate to account page
    } else {
      throw json;
    }
  };

  const logout = () => {
    window.localStorage.removeItem("token");
    setAuth({});
  };

  return (
    <>
      <h1>Acme Business Reviews</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/businesses">Businesses ({businesses.length})</Link>
        <Link to="/users">Users ({users.length})</Link>
        {auth.id ? (
          <Link to="/createReview">Create Review</Link>
        ) : (
          <Link to="/">Login</Link>
        )}
      </nav>
      {auth.id && <button onClick={logout}>Logout {auth.username}</button>}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              authAction={authAction}
              auth={auth}
              businesses={businesses}
              users={users}
              reviews={reviews}
            />
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/businesses"
          element={<Businesses businesses={businesses} />}
        />
        <Route path="/users" element={<Users users={users} />} />
        {!!auth.id && <Route path="/createReview" element={<CreateReview />} />}
      </Routes>
    </>
  );
}

export default App;
