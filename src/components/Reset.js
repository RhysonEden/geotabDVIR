import React from "react";
import { useHistory } from "react-router-dom";

function Reset() {
  const history = useHistory();
  const wipe = (e) => {
    e.preventDefault();
    localStorage.removeItem("group");
    localStorage.removeItem("results");
    localStorage.removeItem("driver");
    history.push("/");
    window.location.reload();

    console.log("reset");
  };
  return (
    <button className="buttonsmall" onClick={wipe}>
      Reset
    </button>
  );
}

export default Reset;
