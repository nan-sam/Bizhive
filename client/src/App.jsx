import { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navigations from "./components/Navigations";
import Account from "./pages/Account";
import Register from "./pages/Register";
import Reviews from "./pages/Reviews";
import Users from "./pages/Users";
import Businesses from "./pages/Businesses";
import CreateReview from "./pages/CreateReview";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function App() {
  const [auth, setAuth] = useState({});
  const [users, setUsers] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [reviews, setReviews] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    attemptLoginWithToken();
  }, []);

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

  const attemptLoginWithToken = async () => {
    const token = window.localStorage.getItem("token");

    if (token) {
      const response = await axios.get(`${BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setAuth(response.data);
        navigate("/");
      } else {
        window.localStorage.removeItem("token");
      }
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
      <Navigations
        auth={auth}
        businesses={businesses}
        users={users}
        reviews={reviews}
      />
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
        <Route
          path="/register"
          element={
            <Register authAction={authAction} setAuth={setAuth} auth={auth} />
          }
        />
        <Route
          path="/login"
          element={
            <Login authAction={authAction} setAuth={setAuth} auth={auth} />
          }
        />
        <Route
          path="/businesses"
          element={<Businesses businesses={businesses} />}
        />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/reviews" element={<Reviews reviews={reviews} />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/account" element={<Account auth={auth} />} />
          <Route
            path="/createreview"
            element={
              <CreateReview
                auth={auth}
                businesses={businesses}
                reviews={reviews}
              />
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
