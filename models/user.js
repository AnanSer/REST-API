import db from "../config/database.js";

export function createUser(userData) {
  const stmt = db.prepare(`
    INSERT INTO users (id, username, email, password)
    VALUES (?, ?, ?, ?)
  `);

  const userId = Math.random().toString(36).substr(2, 9);

  stmt.run(
    userId,
    userData.username,
    userData.email,
    userData.password // Remember to hash this in production!
  );

  return {
    id: userId,
    username: userData.username,
    email: userData.email,
  };
}

export function findUserByEmail(email) {
  const stmt = db.prepare("SELECT * FROM users WHERE email = ?");
  return stmt.get(email);
}
