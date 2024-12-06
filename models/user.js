import db from "../database.js";
import bcryptjs from "bcryptjs";

export async function createUser(userData) {
  const stmt = db.prepare(`
    INSERT INTO users (id, username, email, password)
    VALUES (?, ?, ?, ?)
  `);

  const userId = Math.random().toString(36).substr(2, 9);

  try {
    const bcryptjs = await import("bcryptjs");
    const hashedPassword = await bcryptjs.default.hash(userData.password, 10);

    console.log("Attempting to create user with:", {
      userId,
      username: userData.username,
      email: userData.email,
      hashedPassword: "***",
    });

    stmt.run(userId, userData.username, userData.email, hashedPassword);

    console.log("User created successfully with ID:", userId);

    return {
      id: userId,
      username: userData.username,
      email: userData.email,
    };
  } catch (error) {
    console.error("Error creating user - Full error:", error);
    console.error("User data received:", {
      username: userData.username,
      email: userData.email,
    });
    throw error;
  } finally {
    stmt.finalize();
  }
}

export function findUserByEmail(email) {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
      if (err) {
        console.error("Error finding user:", err);
        reject(err);
        return;
      }
      console.log("Found user:", row);
      resolve(row);
    });
  });
}

export async function verifyCredentials(email, password) {
  const user = await findUserByEmail(email);
  if (!user) return null;

  const isValid = await bcryptjs.compare(password, user.password);

  return isValid ? user : null;
}
