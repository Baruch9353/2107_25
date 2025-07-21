import bcrypt from 'bcrypt';
import { verifiedUsers } from './verifiedUsers.js';
import { addUser, getUserByUsername } from '../DAL/usersDal.js';

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


// Verify Controller
export async function verifyController(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("Missing username or password");
  }
  const user = await getUserByUsername(username);
  if (!user) {
    return res.status(401).send("Unauthorized");
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(401).send("Unauthorized");
  }
  verifiedUsers[username] = true;
  console.log(verifiedUsers);
  res.status(200).send("Verified");
}

