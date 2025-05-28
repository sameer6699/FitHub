import { MongoClient, Db } from 'mongodb';

const MONGODB_URI = 'mongodb://localhost:27017';
const DB_NAME = 'FitHub';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db(DB_NAME);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export async function getUserCollection() {
  const { db } = await connectToDatabase();
  return db.collection('User');
}

export async function findUserByEmail(email: string) {
  const collection = await getUserCollection();
  return collection.findOne({ email });
}

export async function createUser(userData: any) {
  const collection = await getUserCollection();
  const result = await collection.insertOne(userData);
  return result;
}

export async function validateUser(email: string, password: string) {
  const collection = await getUserCollection();
  const user = await collection.findOne({ email, password });
  return user;
} 