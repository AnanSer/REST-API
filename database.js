import sqlite3 from "sqlite3";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import bcrypt from "bcryptjs";

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

      // Verify table exists
      db.get(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='users'",
        (err, row) => {
          if (err) {
            console.error("Error verifying table:", err);
          } else {
            console.log("Table verification:", row);
          }
        }
      );
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
