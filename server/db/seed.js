//When working with a database driven application, you will not have data in the beginning
//The database will be empty. To test CRUD functionality we need some dummy data to
//interact with.test
require("dotenv").config();

//Client is an object that represents the database and lets us do the things
//databases can
//In order to use this database object to interact with the database, we need to run a query
//SQL(Structured Query Language) is the language we're using to interact with our database
//Any type of interaction with the database is known as querying the database
//These are all aysnc operations - It takes time to the database to do this
//Anytime we'rre interacting with SQL and possibly using user input, it's
//best to use a library like pg which can render the input neutral via escape characters for example
//parsers can then figure it out
//We first need to seed our database
const pg = require("pg");
const client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/fsa_app_db"
);
const UUID = require("uuid");

const dropTables = async () => {
  try {
    await client.query(`DROP TABLE IF EXISTS users CASCADE`);
    await client.query(`DROP TABLE IF EXISTS business CASCADE`);
    await client.query(`DROP TABLE IF EXISTS reviews`);
  } catch (err) {
    console.log(err);
  }
};

const createTables = async () => {
  try {
    await client.query(`
    CREATE TABLE users(
      id UUID PRIMARY KEY,
      username VARCHAR(20) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    )`);

    await client.query(`
      CREATE TABLE business(
        id UUID PRIMARY KEY,
        businessname VARCHAR(40)
      )`);

    await client.query(`
      CREATE TABLE reviews(
      id UUID PRIMARY KEY,
      usersId UUID REFERENCES users(id),
      businessId UUID REFERENCES business(id)

      ) `);
  } catch (err) {
    console.log(err);
  }
};

const seedDatabase = async () => {
  try {
    client.connect();
    console.log("DROPPING TABLES...");
    await dropTables();
    console.log("TABLES DROPPED..");
    console.log("CREATING TABLES...");
    await createTables();
    console.log("TABLES SUCCESSFULLY CREATED");
  } catch (err) {
    console.log(err);
  } finally {
    client.end();
  }
};

seedDatabase();
