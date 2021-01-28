import React, { useState, useEffect } from "react";
// import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import Test from "./components/Test";
import "./App.css";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  // useEffect(() => {
  //   axios
  //     .post(`http://localhost:5000/auth/is_verified`, {
  //       header: { jwt_token: localStorage.token },
  //     })
  //     .then((res) => {
  //       const parseRes = res.json();
  //       console.log(parseRes);
  //       parseRes === true ? setIsAuth(true) : setIsAuth(false);
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);
  // async function authChecker(){
  //       axios
  //     .post(`http://localhost:5000/auth/is_verified`, {
  //       header: { jwt_token: localStorage.token },
  //     })
  //     .then((res) => {
  //       const parseRes = await res.json();
  //       console.log(parseRes);
  //       parseRes === true ? setIsAuth(true) : setIsAuth(false);
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
  const checkAuthenticated = async () => {
    try {
      const res = await fetch(
        "https://pharrprojectserver.herokuapp.com/auth/is_verified",
        {
          method: "POST",
          headers: { token: localStorage.token },
        }
      );

      const parseRes = await res.json();

      parseRes === true ? setIsAuth(true) : setIsAuth(false);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    checkAuthenticated();
  }, []);
  const setAuth = (toggle) => {
    setIsAuth(toggle);
  };
  return (
    <div className="App">
      <Router>
        <div className="container">
          <Switch>
            <Route
              exact
              path="/login"
              render={(props) =>
                !isAuth ? (
                  <Login {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            />
            <Route
              exact
              path="/register"
              render={(props) =>
                !isAuth ? (
                  <Register {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/dashboard"
              render={(props) =>
                isAuth ? (
                  <Dashboard {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route exact path="/">
              <Test />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
