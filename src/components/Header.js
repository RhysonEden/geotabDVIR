import React from "react";
import Branches from "./Branches";
import Login from "./Login";
import DriverDropdown from "./DriverDropdown";
import Position from "./Position";
import Logout from "./Logout";
import Reset from "./Reset";
const Header = ({
  groupSelect,
  group,
  getGroup,
  setGroup,
  resp,
  device,
  setDevice,
  getDevice,
  value,
  userLongitude,
  userLatitude,
}) => {
  let key = localStorage.getItem("key");
  let user = localStorage.getItem("user");

  const wipe = (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location.reload();
  };

  if (!key) {
    return (
      <>
        <div className="headerthree">GeoTab DVIR Logs</div>
        <div className="headertwo">Please Login</div>
        <div className="headerfour">
          <div>Welcome! {user} </div>
          <span className="full">{/* <Logout />
            <Reset /> */}</span>
        </div>
      </>
    );
  } else {
    if (!groupSelect) {
      return (
        <>
          <div className="headerthree">GeoTab DVIR Logs</div>
          <div className="headertwo">
            <Branches group={group} getGroup={getGroup} setGroup={setGroup} />
          </div>
          <div className="headerfour">
            <div>Welcome! {user}</div>
            <span className="full">
              <Logout />
              <Reset />
            </span>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="headerthree">GeoTab DVIR Logs</div>
          <div className="headertwo">
            <DriverDropdown
              resp={resp}
              device={device}
              setDevice={setDevice}
              getDevice={getDevice}
              getGroup={getGroup}
            />
          </div>
          <div className="headerfour">
            <div>Welcome! {user} </div>
            <span className="full">
              <Logout />
              <Reset />
            </span>
          </div>
        </>
      );
    }
  }
};

export default Header;
