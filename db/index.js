const { Client } = require("pg");
const bcrypt = require("bcrypt");
const DB_NAME = "geotab";
const GeotabApi = require("mg-api-js");

const DB_URL =
  process.env.DATABASE_URL ||
  `postgressql://postgres:james@localhost:5432/${DB_NAME}`;

const client = new Client(DB_URL);

// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

async function createUser({ username, password, email }) {
  try {
    const result = await client.query(
      `
      INSERT INTO users(username, password, email)
      VALUES ($1, $2, $3);
    `,
      [username, password, email]
    );

    return result;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(userName) {
  try {
    console.log("Firing User by Username");
    const { rows } = await client.query(
      `
      SELECT *
      FROM users
      WHERE username = $1;
    `,
      [userName]
    );
    if (!rows || !rows.length) return null;
    const [user] = rows;
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUser({ username, password }) {
  console.log("running");
  if (!username || !password) {
    return;
  }

  try {
    const user = await getUserByUsername(username);
    if (!user) return;
    const matchingPassword = await bcrypt.compareSync(password, user.password);
    if (!matchingPassword) return;
    return user;
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  const { rows } = await client.query(
    `SELECT username, email
    FROM users;
  `
  );

  return rows;
}

async function getUsersByID(id) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT *
    FROM users
    WHERE id=$1;
    `,
      [id]
    );
    console.log("user", user);
    return user;
  } catch (error) {
    throw error;
  }
}

async function testAuth() {
  console.log("running Test Auth");

  const api = new GeotabApi(authentication);
  console.log("API AUTH", api);
  try {
    const data = await api.call("Get", {
      typeName: type,
      resultsLimit: results,
    });

    // Removing session ID from framework and storing it to something we can use
    // let { sessionId } = JSON.parse(
    //   window.localStorage.getItem("geotabAPI_credentials")
    // );
    // let { database } = JSON.parse(
    //   window.localStorage.getItem("geotabAPI_credentials")
    // );
    // console.log(sessionId);
    // localStorage.setItem("database", database);
    // localStorage.setItem("id", sessionId);
    // ----------------------------------------------------------------------------
    console.log("data", data);
    // return data;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  client,
  testAuth,
  getAllUsers,
  createUser,
  getUsersByID,
  getUserByUsername,
  getUser,
};
