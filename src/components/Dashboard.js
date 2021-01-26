import React, { useState, useEffect } from "react";

function Dashboard({ setAuth }) {
  const [name, setName] = useState("");
  async function getName() {
    try {
      const res = await fetch("http://localhost:5000/dashboard", {
        method: "POST",
        headers: { token: localStorage.token },
      });

      const parseData = await res.json();
      // console.log(parseData.user_name);
      setName(parseData.user_name);
    } catch (err) {
      console.error(err.message);
    }
  }
  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getName();
  }, []);
  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Welcome {name}</h2>
      <button onClick={(e) => logout(e)}>Logout</button>
    </div>
  );
}

export default Dashboard;
