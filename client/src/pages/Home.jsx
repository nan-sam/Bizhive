import BusinessPeople from "../assets/BusinessPeople.jpg";

const Home = ({ auth, authAction, logout, businesses, users, reviews }) => {
  return (
    <div>
      <h3>
        With reviews for {businesses.length} Businesses
        <br />
        Supported by {users.length} Users
        <br />
        With {reviews.length} Reviews and counting!
      </h3>
      <img
        className="business-image"
        src={BusinessPeople}
        // width={700}
        // height={500}
        alt="Business People"
      ></img>
      {/* {!auth.id ? (
        <>
          <AuthForm authAction={authAction} mode="login" />
          <AuthForm authAction={authAction} mode="register" />
        </>
      ) : null} */}
    </div>
  );
};

export default Home;
