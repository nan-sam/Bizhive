import React from "react";
import UserCard from "../components/Users/UserCard";

function Users({ users }) {
  return (
    <div className="user-container">
      {/* We're looping over the data and creating a book card for each piece of the data. */}
      {/* When looping over lists and creating UI from it, we need to give every instance of that UI a unique key */}
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
export default Users;
