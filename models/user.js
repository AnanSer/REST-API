import db from "../database.js";

export async function createUser(userData) {
  const stmt = db.prepare(`
    INSERT INTO users (id, username, email, password)
    VALUES (?, ?, ?, ?)
  `);

  const userId = Math.random().toString(36).substr(2, 9);

  try {
    const bcrypt = await import("bcryptjs");
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    stmt.run(userId, userData.username, userData.email, hashedPassword);
    return {
      id: userId,
      username: userData.username,
      email: userData.email,
    };
  } catch (error) {
    console.error("Error creating user:", error);
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

  const bcrypt = await import("bcryptjs");
  const isValid = await bcrypt.compare(password, user.password);

  return isValid ? user : null;
}
