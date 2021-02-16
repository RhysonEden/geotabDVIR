import React, { useState, useEffect } from "react";
import DriverDropdown from "./DriverDropdown";
import {
  getGroupInfo,
  getSomething,
  getSomethingElse,
  getSomeInfo,
} from "../api";
import Position from "./Position";
import DVIRResults from "./DVIRResults";
import {
  BrowserRouter as Router,
  Switch,
  Link,
  useHistory,
  Route,
} from "react-router-dom";
import Login from "./Login";
import Header from "./Header";
import DatePicker from "./DatePicker";
const App = () => {
  const [message, setMessage] = useState([]);
  const [resp, setResp] = useState([]);
  const [device, setDevice] = useState("");
  const [group, setGroup] = useState("");
  const [groupDisplay, setGroupDisplay] = useState([]);
  const [position, setPosition] = useState([]);
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [userLatitude, setUserLatitude] = useState("");
  const [userLongitude, setUserLongitude] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const history = useHistory();
  let key = localStorage.getItem("key");
  let groupSelect = localStorage.getItem("group");
  let dateStart = new Date(2021, 0, 1);
  let dateEnd = new Date();
  // Keeping here in case we want to get users coordinates
  const componentDidMount = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setUserLatitude(position.coords.latitude);
      setUserLongitude(position.coords.longitude);
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  };

  // useEffect(() => {
  //   componentDidMount();
  //   .then((response) => {
  //     setMessage(response.message);
  //   })
  //   .catch((error) => {
  //     setMessage(error.message);
  //   });
  // });

  const getDevice = (e) => {
    e.preventDefault();
    localStorage.removeItem("driver");
    getSomeInfo(device, startDate, endDate).then((res) => {
      console.log("Results!", res);
    });
  };

  const getGroup = (e) => {
    e.preventDefault();
    getGroupInfo(group).then((response) => {
      setResp(response);
      history.push("/home");
    });
  };

  return (
    <>
      <div className="top">
        <Header
          key={key}
          groupSelect={groupSelect}
          group={group}
          setGroup={setGroup}
          resp={resp}
          device={device}
          setDevice={setDevice}
          getDevice={getDevice}
          getGroup={getGroup}
          position={position}
          userLatitude={userLatitude}
          userLongitude={userLongitude}
        />
      </div>
      <Router>
        <Switch>
          {/* <Route path="/"> */}
          <div className="main">
            {key === null && <Route path="/home" component={Login} />}
            {key !== null && <Route path="/home" component={DatePicker} />}
            <Route path="/results" component={DVIRResults} />
          </div>
        </Switch>
      </Router>
    </>
  );
};
export default App;
