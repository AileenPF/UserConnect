import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../api/axios.js";

function Signup() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState(false);

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    termsAgreed: false,
  });

  const Register = async (event) => {
    event.preventDefault();
    try {
      const response = await signup(userData);
      setShowSuccess(true);
      setMessage(response.data.message);
      setTimeout(() => {
        navigate("/Login");
      }, 800);
    } catch (error) {
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
      <div className="wrapper" data-aos="fade-left">
        <Link to="/Home" className="icon-home">
          <ion-icon name="home"></ion-icon>
        </Link>

        <div className="form-box">
          <div className="title">Register</div>
          <form onSubmit={Register}>
            <div>
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
                  <ion-icon name="mail-outline"></ion-icon>
                </span>
                <input
                  type="email"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                  required
                />
                <label htmlFor="">Email address</label>
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
                      checked={userData.termsAgreed}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          termsAgreed: e.target.checked,
                        })
                      }
                    />
                    I agree to the terms & conditions
                  </label>
                </div>
              </div>
            </div>

            <div>
              <button className="button" type="submit">
                Register
              </button>
            </div>
            <span className="register-link">
              Don't have an account? <Link to="/Signin">Login</Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
