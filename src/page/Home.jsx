import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const encodedUserData = localStorage.getItem("encodedUser");
    if (encodedUserData) {
      const decodedUserData = JSON.parse(atob(encodedUserData));
      setLoggedInUser(decodedUserData);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("encodedUser");
    setLoggedInUser(null);
    setShowSuccess(true);
    setMessage("Logout success");
  };

  return (
    <div className="container">
      {showSuccess && (
        <div className="success">
          <div className="message">
            <ion-icon name="checkmark-circle-outline"></ion-icon>
            <p>{message}</p>
          </div>
          <span className="close" onClick={() => setShowSuccess(false)}>
            <ion-icon name="close-outline"></ion-icon>
          </span>
        </div>
      )}
      {showError && (
        <div className="error">
          <div className="message">
            <ion-icon name="alert-circle-outline"></ion-icon>
            <p>{message}</p>
          </div>
          <span className="close" onClick={() => setShowError(false)}>
            <ion-icon name="close-outline"></ion-icon>
          </span>
        </div>
      )}
      <div className="wrapper" data-aos="fade">
        <div className="form-box">
          <div className="title">Welcome!</div>
          {loggedInUser ? (
            <div>
              <div className="font-bold" style={{ textTransform: "uppercase" }}>
                <h3 className="text-center">{loggedInUser.username}</h3>
                <hr />
                <button className="logout" onClick={logout}>
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link className="button" to="/Signin">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
