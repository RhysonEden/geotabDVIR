const bcrypt = require("bcrypt");
const SALT_COUNT = 10;
const {
  client,
  getAllUsers,
  createUser,
  getUsersByID,
  getUserByUsername,
} = require("./index");

async function createTables() {
  try {
    await client.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          username varchar UNIQUE NOT NULL,
          password varchar NOT NULL,
          email varchar NOT NULL
        );
      `);
  } catch (error) {
    throw error;
  }
}

async function dropTables() {
  try {
    console.log("Starting to drop tables...");
    await client.query(`
      DROP TABLE IF EXISTS users;
      `);

    console.log("Finished dropping tables!");
  } catch (error) {
    console.error("Error dropping tables!");
    throw error;
  }
}

async function createInitialUsers() {
  try {
    console.log("Starting to create users...");

    await new Promise((resolve, reject) => {
      console.log("First User");
      bcrypt.hash("gft2021", SALT_COUNT, async function (err, hashedPassword) {
        const david = await createUser({
          username: "david",
          password: hashedPassword,
          email: "test1@yahoo.com",
        });
        resolve();
        console.log("Completed");
      });
    });

    await new Promise((resolve, reject) => {
      console.log("Second User");
      bcrypt.hash("gft2021", SALT_COUNT, async function (err, hashedPassword) {
        const james = await createUser({
          username: "james",
          password: hashedPassword,
          email: "test2@yahoo.com",
        });
        resolve();
        console.log("Completed");
      });
    });

    await new Promise((resolve, reject) => {
      console.log("Third User");
      bcrypt.hash("gft2021", SALT_COUNT, async function (err, hashedPassword) {
        const chris = await createUser({
          username: "chris",
          password: hashedPassword,
          email: "test3@yahoo.com",
        });
        resolve();
        console.log("Completed");
      });
    });

    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();
    console.log;
  } catch (error) {
    throw error;
  }
}

async function testDB() {
  try {
    await dropTables();
    await createTables();
    await createInitialUsers();
    const userArman = await getUserByUsername("david");
    const userJames = await getUserByUsername("james");
    const userRobin = await getUserByUsername("chris");
    const users = await getAllUsers();
    const user1 = await getUsersByID(1);
    console.log("All users", users);
  } catch (error) {
    console.error(error);
  } finally {
    client.end();
  }
}

rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());
