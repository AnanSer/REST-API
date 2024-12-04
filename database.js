import sqlite3 from "sqlite3";

const db = new sqlite3.Database("your-database.db");

// Create users table
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT  PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export default db;
