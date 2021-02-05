import React, { useState } from "react";
import moment from "moment";
import DriverDropdown from "./DriverDropdown";

function DVIRResults() {
  let resp = JSON.parse(localStorage.getItem("results"));
  let comment = localStorage.getItem("remark");
  if (resp === undefined || resp == 0) {
    return <div className="zero">No Driver Data Found</div>;
  } else {
    return (
      <div className="spread">
        <div>
          {resp.map((resp, index) => (
            <div className="test">
              <div key={resp.id} value={resp.id}>
                <div className="resultone">
                  Log Type ={" "}
                  {resp.logType === "PreTrip"
                    ? "Morning Entry"
                    : "Evening Entry"}
                </div>
                <div className="resulttwo">
                  Log Date = {moment(resp.dateTime).format("MM/DD/YYYY")}
                </div>
                {/* -----------------------Temp Fix ------------------------------- */}
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
                {/* -------------------Temp Fix End-------------------------------- */}
                <div>
                  {resp.dVIRDefects
                    ? resp.dVIRDefects.map((innerResp, index) =>
                        innerResp.defectRemarks.map((lastResp, index) => (
                          <div className="resultthree">
                            Defect is the {lastResp.remark}
                          </div>
                        ))
                      )
                    : "No Defects reported"}
                </div>
              </div>
            </div>
          ))}
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
