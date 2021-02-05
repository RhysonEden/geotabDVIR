const apiRouter = require("express");
const geoTab = apiRouter.Router();
require("dotenv").config();
const GeotabApi = require("mg-api-js");
const moment = require("moment");

geoTab.get("/", async (req, res) => {
  try {
    let databaseInsert = process.env.databaseInsert;
    let userNameInsert = process.env.userNameInsert;
    let passwordInsert = process.env.passwordInsert;
    let pathNameInsert = "https://my.geotab.com";
    let type = "Device";
    let results = 5000;
    const authentication = {
      credentials: {
        database: databaseInsert,
        userName: userNameInsert,
        password: passwordInsert,
      },
      path: pathNameInsert,
    };

    const api = new GeotabApi(authentication);

    let myCall = await api.call("Get", {
      typeName: type,
      resultsLimit: results,
    });
    res.send(myCall);
  } catch (err) {
    throw err;
  }
});

//Device Search
geoTab.get("/:id", async (req, res) => {
  try {
    const deviceId = req.params.id;
    // const groupId = "b19";
    const groupId = "bEA";
    console.log("running device id of ", deviceId);
    let databaseInsert = process.env.databaseInsert;
    let userNameInsert = process.env.userNameInsert;
    let passwordInsert = process.env.passwordInsert;
    let pathNameInsert = "https://my.geotab.com";
    const authentication = {
      credentials: {
        database: databaseInsert,
        userName: userNameInsert,
        password: passwordInsert,
      },
      path: pathNameInsert,
    };

    const api = new GeotabApi(authentication);

    let results = await api.call("Get", {
      typeName: "DeviceStatusInfo",
      search: {
        deviceSearch: { id: deviceId },
      },
    });

    console.log(finale, "finale");
    res.send(results);
  } catch (err) {
    throw err;
  }
});

//Testing Something

async function getStuff(groupId) {
  try {
    let databaseInsert = process.env.databaseInsert;
    let userNameInsert = process.env.userNameInsert;
    let passwordInsert = process.env.passwordInsert;
    let pathNameInsert = "https://my.geotab.com";
    const authentication = {
      credentials: {
        database: databaseInsert,
        userName: userNameInsert,
        password: passwordInsert,
      },
      path: pathNameInsert,
    };

    const api = new GeotabApi(authentication);
    console.log(groupId, "group");
    let resultsTwo = await api.call("Get", {
      typeName: "User",
      search: {
        userSearch: {
          id: groupId,
        },
      },
    });
    console.log("r2", resultsTwo);
    return resultsTwo;
  } catch (err) {
    throw err;
  }
}

//Group Search
// geoTab.get("/info/:group", async (req, res) => {
//   try {
//     console.log("group params", req.params.group);
//     const groupId = req.params.group;
//     let databaseInsert = process.env.databaseInsert;
//     let userNameInsert = process.env.userNameInsert;
//     let passwordInsert = process.env.passwordInsert;
//     let pathNameInsert = "https://my.geotab.com";
//     const authentication = {
//       credentials: {
//         database: databaseInsert,
//         userName: userNameInsert,
//         password: passwordInsert,
//       },
//       path: pathNameInsert,
//     };

//     const api = new GeotabApi(authentication);

//     let results = await api.call("Get", {
//       typeName: "Device",
//       search: {
//         groups: [{ id: groupId }],
//       },
// let results = await api.cal("Get", {
// typeName : "StatusData",
//                 search : {
//                     fromDate : now,
//                     toDate : now,
//                     diagnosticSearch : diagnostic,
//                     deviceSearch : device
//                 },
//     });

//     res.send(results);
//   } catch (err) {
//     throw err;
//   }
// });

// -----------------------TESTTTTTT-------------------
geoTab.get("/info/:group", async (req, res) => {
  try {
    let result;
    console.log("group params", req.params.group);
    const groupId = req.params.group;
    let databaseInsert = process.env.databaseInsert;
    let userNameInsert = process.env.userNameInsert;
    let passwordInsert = process.env.passwordInsert;
    let pathNameInsert = "https://my.geotab.com";
    const authentication = {
      credentials: {
        database: databaseInsert,
        userName: userNameInsert,
        password: passwordInsert,
      },
      path: pathNameInsert,
    };

    const api = new GeotabApi(authentication);

    let results = await api.call("Get", {
      typeName: "User",
      search: {
        companyGroups: [{ id: groupId }],
      },
    });
    res.send(results);
  } catch (err) {
    throw err;
  }
});

geoTab.get("/info/driver/:driver/:start/:end", async (req, res) => {
  try {
    let finale = [];
    // console.log("request params", req.params.start);
    let startDate = req.params.start;
    let endDate = req.params.end;
    // console.log("start date", startDate);
    let start = moment(startDate).format("YYYY, MM, DD");
    let end = moment(endDate).format("YYYY, MM, DD");
    console.log("start", start);
    console.log("end", end);
    const driverNameId = req.params.driver;
    // console.log("group params", driverNameId);
    let databaseInsert = process.env.databaseInsert;
    let userNameInsert = process.env.userNameInsert;
    let passwordInsert = process.env.passwordInsert;
    let pathNameInsert = "https://my.geotab.com";
    const authentication = {
      credentials: {
        database: databaseInsert,
        userName: userNameInsert,
        password: passwordInsert,
      },
      path: pathNameInsert,
    };

    const api = new GeotabApi(authentication);

    let fromName = async function (driverId) {
        api.call(
          "Get",
          {
            typeName: "DVIRLog",
            search: {
              userSearch: {
                id: driverId,
              },
              fromDate: start,
              toDate: end,
              trailerSearch: null,
            },
            resultsLimit: 500,
          },
          async function (result) {
            // result = result[0];
            if (result) {
              // need to get result returned ---------------------------
              // console.log("Lat/Long", result);
              res.send(result);
              return result;
            } else {
              let result = { bearing: 0 };
              res.send(result);
            }
          },
          console.error
        );
      },
      getIdFromName = async function (driverName) {
        api.call(
          "Get",
          {
            typeName: "User",
            search: {
              name: "%" + driverName + "%",
            },
          },
          async function (result) {
            // Returns a list, get the first item
            result = result[0];
            if (result) {
              console.log("Driver: " + result.name);

              let finale = await fromName(result.id);
              return finale;
            } else {
              console.log("Driver not found!");
            }
          },
          console.error
        );
      };
    //}
    await getIdFromName(driverNameId);
    // console.log("results", finale);
  } catch (err) {
    throw err;
  }
});

// async function fromName(driverId) {
//   let databaseInsert = process.env.databaseInsert;
//   let userNameInsert = process.env.userNameInsert;
//   let passwordInsert = process.env.passwordInsert;
//   let pathNameInsert = "https://my.geotab.com";
//   const authentication = {
//     credentials: {
//       database: databaseInsert,
//       userName: userNameInsert,
//       password: passwordInsert,
//     },
//     path: pathNameInsert,
//   };
//   const api = new GeotabApi(authentication);
//   try {
//     api.call(
//       "Get",
//       {
//         typeName: "DeviceStatusInfo",
//         search: {
//           userSearch: {
//             id: driverId,
//           },
//         },
//       },
//       async function (result) {
//         result = result[0];
//         if (result) {
//           // need to get result returned ---------------------------
//           console.log("Lat/Long", result);
//           res.send(result);
//           return result;
//         } else {
//           let result = { bearing: 0 };
//           res.send(result);
//         }
//       },
//       console.error
//     );
//   } catch (err) {
//     throw err;
//   }
// }
// function callData() {
//   let startDate = new Date().toISOString();
//   let apiCalls = [];
//   let lastVersions = [null, null, null];
//   apiCalls.push([
//     "GetFeed",
//     {
//       typeName: "LogRecord",
//       fromVersion: lastVersions[0],
//       search: {
//         fromDate: startDate,
//       },
//     },
//   ]);
//   console.log(apiCalls);
// }

// callData();
module.exports = geoTab;
