import React from "react";

function Logout() {
  const wipe = (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location.reload();
  };
  return (
    <button className="buttonsmall" onClick={wipe}>
      Logout
    </button>
  );
}

export default Logout;
