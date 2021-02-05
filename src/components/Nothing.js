import React from "react";

function List({
  resp,
  device,
  setDevice,
  getDevice,
  getGroup,
  groupDisplay,
  setGroupDisplay,
}) {
  return (
    <>
      {resp.map((resp, index) => (
        <option key={resp.id} value={resp.id}>
          {resp.name}
        </option>
      ))}
    </>
  );
}

export default List;
