import React, { useState } from "react";
import moment from "moment";
import { useHistory } from "react-router-dom";

function DVIRResults() {
  const history = useHistory();
  let resp = JSON.parse(localStorage.getItem("results"));
  let comment = localStorage.getItem("remark");

  const goBack = (e) => {
    e.preventDefault();
    history.push("/home");
  };
  if (resp === undefined || resp == 0) {
    return (
      <>
        <div className="zero">
          <button className="zero" onClick={goBack}>
            No Driver Data Found, click here to search
          </button>
        </div>
      </>
    );
  } else {
    return (
      <div
      // className="spread"
      >
        <div
        // className="test"
        >
          {resp.map((resp, index) => (
            <div
            // className="testtwo"
            >
              <div className="test" key={resp.id} value={resp.logType}>
                <div className="resultone">
                  Log Type ={" "}
                  {resp.logType === "PreTrip"
                    ? "Morning Entry"
                    : "Evening Entry"}
                </div>
                <div className="resulttwo">
                  Log Date = {moment(resp.dateTime).format("MM/DD/YYYY")}
                </div>
                <div>
                  {resp.driverRemark ? (
                    <div className="resultthree">
                      Driver Issue Remark is {resp.driverRemark}{" "}
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
                <div className="resultthree">
                  {resp.dVIRDefects ? "Defects detected/not repaired" : ""}
                </div>
                <div>
                  {resp.dVIRDefects ? (
                    resp.dVIRDefects.map((innerResp, index) =>
                      innerResp.defectRemarks.map((lastResp, index) => (
                        <div className="resultthree">
                          Defect is the {lastResp.remark}
                        </div>
                      ))
                    )
                  ) : (
                    <div className="resultfour">No Defects reported</div>
                  )}
                </div>
              </div>
            </div>
          ))}
          <button className="buttonsmallreturn" onClick={goBack}>
            Click to search drivers again.
          </button>
        </div>
      </div>
    );
  }
}

export default DVIRResults;

/* {resp.dVIRDefects.map((resp, index) => (
                <div>
                  {resp.defectRemarks.map((resp, index) => (
                    <div>{resp.remark}</div>
                  ))}
                </div>
              ))} */
