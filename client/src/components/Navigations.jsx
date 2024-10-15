import { Link } from "react-router-dom";

function Navigations({ auth, businesses, users }) {
  return (
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
  );
}

export default Navigations;
