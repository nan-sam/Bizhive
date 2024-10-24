require("dotenv").config();

const pg = require("pg");
// const client = new pg.Client(process.env.DATABASE_URL);
const client = require("./client");
const { createUser } = require("./auth");
const { createBusiness } = require("./business");
const { createReview } = require("./reviews");

const users = [
  { username: "moe", password: "m_pw" },
  { username: "lucy", password: "l_pw" },
  { username: "ethyl", password: "e_pw" },
  { username: "curly", password: "c_pw" },
  { username: "katt", password: "k_pw" },
];

const businesses = [
  {
    businessname: "Cabbages and Roses",
    type: "clothing",
    businessimage:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjYOyng8rRtc_kLahk0Py-5nL4Ud0cfo3UTW_U2Upiq72dNvUuVAw2VLEqklQVTZ9opYXuRf1db1vayqmueLRFSP0QlgpRZh_hwo0ul90KTcf07U_iUW6PPj3rUeNn0vHKhq4aKKx4y8an5/s1600/FullSizeRender.jpg",
  },
  {
    businessname: "Gardner and Beedle",
    type: "liquor",
    businessimage:
      "https://property-images-uk.s3.eu-west-2.amazonaws.com/i/c7efd777b6e2f7d32aa85c44c68a45fd.jpg",
  },
  {
    businessname: "The Royal Oak",
    type: "pub",
    businessimage:
      "https://cloudfront.sketchanet.com/u/245088/images/3840/1535044011jke7353.jpg",
  },
  {
    businessname: "Pythouse Kitchen and Gardens",
    type: "restaurant",
    businessimage:
      "https://images.squarespace-cdn.com/content/v1/597853a8d2b8576d2caa6efa/1696416773392-7STWY0ZWRV3J3F6M1TIE/Roast-76.jpg",
  },
  {
    businessname: "The Beckford Arms",
    type: "pub",
    businessimage:
      "https://images.mrandmrssmith.com/images/480x327/6471005-the-beckford-arms-hotel-wiltshire-united-kingdom.jpg",
  },
  {
    businessname: "Number One Bruton",
    type: "hotel",
    businessimage:
      "https://numberonebruton.com/wp-content/uploads/2024/05/townhouse-04.jpg",
  },
  {
    businessname: "Flowers and Twine",
    type: "florist",
  },
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
        type VARCHAR(40),
        businessimage VARCHAR(255) DEFAULT 'https://images.pexels.com/photos/8872548/pexels-photo-8872548.jpeg'
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
