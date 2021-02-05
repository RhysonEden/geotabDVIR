import React, { useState } from "react";

function Branches({ group, setGroup, getGroup }) {
  const [test, setTest] = useState("");
  let resp = [
    { value: "b278f", id: "MA" },
    {
      value: "b2791",
      id: "Knoxville",
    },
    { value: "b2792", id: "Nashville" },
    { value: "b2793", id: "Greensboro" },
    { value: "b2794", id: "Atlanta" },
    { value: "b2795", id: "Columbia" },
    { value: "b2796", id: "Charlotte" },
    { value: "b2797", id: "Raleigh" },
    { value: "b2790", id: "SE" },
    { value: "b2798", id: "Savannah" },
    { value: "b2799", id: "Birmingham" },
    { value: "b279A", id: "Pensacola" },
    { value: "b279B", id: "Jacksonville" },
    { value: "b279C", id: "Sanford" },
    { value: "b279D", id: "Tampa" },
    { value: "b279E", id: "Ft. Myers" },
    { value: "b279F", id: "Ft. Lauderdale" },
    { value: "b27A0", id: "Tallahassee" },
    { value: "b27A2", id: "Construction" },
    { value: "b27A1", id: "Communications" },
  ];

  const set = (e) => {
    setGroup(e.target.value);
  };

  return (
    <>
      <select className="select" onChange={set}>
        <option value="1">Select Group From Below</option>
        {resp.map((resp, index) => (
          <option key={resp.value} value={resp.value}>
            {resp.id}
          </option>
        ))}
      </select>
      <button className="submitbranch" onClick={getGroup}>
        Get Branch
      </button>
    </>
  );
}

export default Branches;
