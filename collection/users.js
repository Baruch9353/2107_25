import { connectToMongo } from "../DB/mongoClient.js";

// Connects to the DB and returns collection
export async function usersCollection() {
  const db = await connectToMongo();
  return db.collection("users");
}