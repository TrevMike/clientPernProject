import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
function Register({ setAuth }) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
  });
  const { email, password, name } = inputs;
  function handleInput(e) {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }
  //   function testing(e) {
  //     e.preventDefault();
  //     const data = { email, password, name };
  //     axios
  //       .post(`http://localhost:5000/auth/register`, {
  //         headers: {
  //           "Content-type": "application/json",
  //         },
  //         body: JSON.stringify(data),
  //       })
  //       .then((res) => {
  //         const parseRes = res.text();
  //         console.log(parseRes);
  //         console.log(res.data);
  //         console.log(res.header);
  //         console.log(res.config);
  //       })
  //       .catch((err) => {
  //         // console.log(res.body);
  //         console.log(err);
  //       });
  //   }

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password, name };

      const response = await fetch(
        "https://pharrprojectserver.herokuapp.com/auth/register",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      console.log(body);
      //   console.log(response.json());
      const parseRes = await response.json();
      console.log(parseRes.token);

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
      } else {
        setAuth(false);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          name="name"
          placeholder="name"
          value={name}
          onChange={(e) => handleInput(e)}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={(e) => handleInput(e)}
        />
        <input
          type="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={(e) => handleInput(e)}
        />
        <button>Submit</button>
      </form>
      <Link to="/login">login</Link>
    </div>
  );
}

export default Register;
