import React, { useState, useEffect } from "react";
import { loginUser } from "../api/index";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function Login() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [user, setUser] = React.useState(localStorage.getItem("user"));
  const history = useHistory();
  const users = username.toLowerCase();
  const pword = password.toLowerCase();

  const changeUser = (event) => {
    setUsername(event.target.value);
  };

  const changePassword = (event) => {
    setPassword(event.target.value);
  };

  const cancelCourse = () => {
    setUsername("");
    setPassword("");
    window.location.reload();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await loginUser(users, pword).then((resp) => {
        if (!resp) {
        } else {
          setUser(username);
          cancelCourse();
        }
      });
    } catch (err) {
      throw err;
    }
  };

  return (
    <div className="App">
      <form id="create">
        <input
          className="form-input"
          type="text"
          id="link"
          value={user}
          placeholder="Enter Username"
          onChange={changeUser}
        ></input>
        <input
          className="form-input"
          type="password"
          id="comment"
          value={password}
          placeholder="Enter Password"
          onChange={changePassword}
        ></input>
        <button className="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}
