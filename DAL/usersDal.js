import { usersCollection } from "../collection/users.js";

// Add User if not existing
export async function addUser(username, password_hash) {
  const collection = await usersCollection();
  const existing = await collection.findOne({ username });
  if (existing) {
    return { alreadyExists: true, userId: existing._id };
  }
  const result = await collection.insertOne({ username, password_hash });
  return { alreadyExists: false, userId: result.insertedId };
}


