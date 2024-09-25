//When setting up a db application you need to set up tables (where you can CRUD)
//Our Node app now has this client object and this object interacts directly with the database
//
const { Client } = require("pg");

const db = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

console.log(db);
module.exports = db;
