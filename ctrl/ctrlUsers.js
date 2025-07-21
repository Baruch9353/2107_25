import bcrypt from 'bcrypt';
import { addUser } from '../DAL/usersDal.js';

// Add User Controller - signup
export async function addUserController(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Missing username or password" });
  }
  const password_hash = await bcrypt.hash(password, 10);
  const result = await addUser(username, password_hash);
  if (result.alreadyExists) {
    return res.status(200).json({
      message: "User already exists",
      userId: result.userId,
    });
  }
  res.status(201).json({
    message: "User registered successfully",
    userId: result.userId,
  });
}

