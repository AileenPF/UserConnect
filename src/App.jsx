import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import Home from "./page/Home";
import Sigup from "./page/Sigup";
import Signin from "./page/Signin";

import Theme from "./Theme";

function App() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <Router>
      <Theme />
      <Routes>
        <Route path="/" element={<Navigate to="/Home" />} />
        <Route
          path="/Home"
          element={
            <>
              <Home />
            </>
          }
        />
        <Route
          path="/Sigup"
          element={
            <>
              <Sigup />
            </>
          }
        />
        <Route
          path="/Signin"
          element={
            <>
              <Signin />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
