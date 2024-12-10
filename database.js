// database.js

import sqlite3 from "sqlite3";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPath = join(__dirname, "database.sqlite");

console.log("Database path:", dbPath);

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database:", err);
    process.exit(1);
  }

  console.log("Database connected successfully");

  // Enable foreign keys
  db.run("PRAGMA foreign_keys = ON");

  // Create users table if it doesn't exist
  db.run(
    `
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `,
    (err) => {
      if (err) {
        console.error("Error creating users table:", err);
        return;
      }
      console.log("Users table ready");
    }
  );

  // Create events table if it doesn't exist
  db.run(
    `
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      address TEXT,
      date TEXT NOT NULL,
      user_id INTEGER,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `,
    (err) => {
      if (err) {
        console.error("Error creating events table:", err);
        return;
      }
      console.log("Events table ready");
    }
  );
});

// Test query to verify database is working
db.get("SELECT sqlite_version()", (err, row) => {
  if (err) {
    console.error("Database test query failed:", err);
  } else {
    console.log("SQLite version:", row);
  }
});

export default db;
