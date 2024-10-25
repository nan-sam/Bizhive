import { Link } from "react-router-dom";

function Navigations({ auth, businesses, users, reviews }) {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/businesses">Businesses ({businesses.length})</Link>
      <Link to="/users">Users ({users.length})</Link>
      <Link to="/reviews">Reviews({reviews.length})</Link>
      <Link to="/createreview">Create Review</Link>
      {!auth && <Link to="/login">Login</Link>}

      {auth && <Link to="/account">My Account</Link>}
    </nav>
  );
}

export default Navigations;
