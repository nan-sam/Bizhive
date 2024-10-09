require("dotenv").config();

const pg = require("pg");
// const client = new pg.Client(process.env.DATABASE_URL);
const client = require("./client");
const { createUser } = require("./auth");
const { createBusiness } = require("./business");

const users = [
  { username: "moe", password: "m_pw" },
  { username: "lucy", password: "l_pw" },
  { username: "ethyl", password: "e_pw" },
  { username: "curly", password: "c_pw" },
  { username: "katt", password: "k_pw" },
];

const businesses = [
  { businessname: "Flowers and Twine", type: "florist" },
  { businessname: "Gardner and Beedle", type: "liquor" },
  { businessname: "The Greater Good", type: "pub" },
  { businessname: "Provenance", type: "food" },
  { businessname: "The Beckford Arms", type: "pub" },
];

//If using foreign keys, if your table relies on another table, you can't drop it
//Unless you cascade
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
      firstname VARCHAR(64),
      lastname VARCHAR(64),
      email VARCHAR(64), 
      username VARCHAR(20) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    )`);

    await client.query(`
      CREATE TABLE business(
        id UUID PRIMARY KEY,
        businessname VARCHAR(64),
        type VARCHAR(40)
      )`);

    await client.query(`
    CREATE TABLE reviews(
      usersId UUID REFERENCES users(id),
      businessId UUID REFERENCES business(id),
      review VARCHAR(1022),
      rating INTEGER CHECK(rating>=1 AND rating<=5)
      ) `);
  } catch (err) {
    console.log(err);
  }
};

const insertUsers = async () => {
  try {
    for (const user of users) {
      await createUser(user);
    }
  } catch (err) {
    console.log(err);
  }
};

const insertBusiness = async () => {
  try {
    for (const business of businesses) {
      await createBusiness(business);
    }
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
    console.log("INSERTING USERS");
    await insertUsers();
    console.log("USERS SUCCESSFULLY ADDED");
    console.log("INSERTING BUSINESS");
    await insertBusiness();

    console.log("BUSINESS SUCCESSFULLY INSERTED");
  } catch (err) {
    console.log(err);
  } finally {
    client.end();
  }
};

seedDatabase();
