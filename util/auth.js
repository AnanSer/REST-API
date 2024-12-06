import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    JWT_SECRET,
    { expiresIn: "24h" }
  );
}

export function verifyToken(token) {
  const decoded = jwt.verify(token, JWT_SECRET);
  return decoded;
}
