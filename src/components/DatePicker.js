import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getSomeInfo } from "../api";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";

// let history = useHistory();
function DatePicker() {
  const alert = useAlert();
  const history = useHistory();
  const [date, setDate] = useState(new Date());
  const [tech, setTech] = useState("");
  let driver = localStorage.getItem("driver");

  const consoleTest = (e) => {
    // e.preventDefault();
    if (!driver) {
      alert.show("Please Select Driver");
    } else if (!date[0]) {
      alert.show("Start Date Not Selected");
    } else if (!date[1]) {
      alert.show("End Date Not Selected");
    } else {
      getSomeInfo(driver, date[0], date[1]).then((res) => {
        console.log(res);
        localStorage.setItem("results", JSON.stringify(res));
        history.push("/results");
      });
    }
  };

  const onChange = (date) => {
    setDate(date);
  };

  return (
    <div>
      <p>Select Date Range</p>
      <Calendar onChange={onChange} selectRange value={date} />
      <button className="submit" onClick={consoleTest}>
        Search
      </button>
    </div>
  );
}

export default DatePicker;
