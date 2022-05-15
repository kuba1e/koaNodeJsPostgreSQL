const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "yakov7832",
  host: "todos.cmlcukizfal3.us-east-1.rds.amazonaws.com",
  port: 5432,
  database: "todoDB",
});

module.exports = pool;
