import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);
/**
 * @type {Db | null}
 */
let db;

/**
 * @returns {Promise<Db>}
 */

export async function connectToMongo() {
  if (!db) {
    await client.connect();
    db = client.db("CipherNet");
    console.log("Connected to MongoDB");
  }
  return db;
};

await connectToMongo();