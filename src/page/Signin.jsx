import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signin } from "../api/axios.js";

function Signin() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState(false);

  const [loggedInUser, setLoggedInUser] = useState(null);

  const logout = () => {
    localStorage.removeItem("encodedUser");
    setLoggedInUser(null);
    navigate("/");
    setShowSuccess(true);
    setMessage("Logout success");
  };

  useEffect(() => {
    const encodedUserData = localStorage.getItem("encodedUser");
    if (encodedUserData) {
      const decodedUserData = JSON.parse(atob(encodedUserData));
      setLoggedInUser(decodedUserData);
    }
  }, []);

  useEffect(() => {
    const rememberMeData = localStorage.getItem("rememberMe");
    if (rememberMeData) {
      const decodedCredentials = atob(rememberMeData).split(":");
      const username = decodedCredentials[0];
      const password = decodedCredentials[1];
      setUserData({
        ...userData,
        username: username,
        password: password,
        rememberMe: true,
      });
    }
  }, []);

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    rememberMe: false,
  });

  const Login = async (event) => {
    event.preventDefault();
    try {
      const response = await signin(userData);
      setLoggedInUser(response.data.user);
      const encodedUserData = btoa(JSON.stringify(response.data.user));
      localStorage.setItem("encodedUser", encodedUserData);
      if (userData.rememberMe) {
        const encodedCredentials = btoa(
          `${userData.username}:${userData.password}`
        );
        localStorage.setItem("rememberMe", encodedCredentials);
      } else {
        localStorage.removeItem("rememberMe");
      }

      setTimeout(() => {
        navigate("/Home");
      }, 800);
      setShowSuccess(true);
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setShowError(true);
      setMessage(error.response.data.message);
    }
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
      <div className="wrapper" data-aos="fade-right">
        <Link to="/Home" className="icon-home">
          <ion-icon name="home"></ion-icon>
        </Link>
        <div className="form-box">
          <div className="title">Login</div>
          <form onSubmit={Login}>
            <div className="input-box">
              <span className="icon">
                <ion-icon name="person-circle-outline"></ion-icon>
              </span>
              <input
                type="text"
                value={userData.username}
                onChange={(e) =>
                  setUserData({ ...userData, username: e.target.value })
                }
                required
              />
              <label htmlFor="">Username</label>
            </div>
            <div className="input-box">
              <span className="icon">
                <ion-icon name="lock-closed"></ion-icon>
              </span>
              <input
                type="password"
                value={userData.password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
                required
              />
              <label htmlFor="">Password</label>
            </div>
            <div className="remember">
              <div>
                <label className="remember-label">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={userData.rememberMe}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        rememberMe: e.target.checked,
                      })
                    }
                  />
                  Remember Me
                </label>
              </div>
            </div>
            <div>
              <button className="button" type="submit">
                Login
              </button>
            </div>
            <span className="register-link">
              Don't have an account? <Link to="/Register">Register</Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signin;
