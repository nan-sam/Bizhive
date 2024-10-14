const Users = ({ users }) => {
  return (
    <div>
      <h1>Placeholder for Users {users.length}</h1>
      {users.map((user) => (
        <p>{user.username}</p>
      ))}
    </div>
  );
};

export default Users;
