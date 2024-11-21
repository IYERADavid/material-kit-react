// app/api/users/user.model.ts
import { db } from '../../../lib/db';  // Assume 'db' is a utility that handles DB connection, e.g., with MySQL or ORM like Prisma
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';


// Function to hash a password before saving it to the database
const hashPassword = async (password: string) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
};

// Function to create a new user in the database
export async function createUser(name: string, email: string, password: string) {
    console.log("user reaached");
    
  const hashedPassword = await hashPassword(password);

  const [ result ] = await db.execute(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, hashedPassword]
  );
  return { id: (result as mysql.ResultSetHeader).insertId, name, email };
}

// Function to get all users from the database
export async function getAllUsers() {
  const [users] = await db.execute('SELECT * FROM users');
  return users;
}

// Function to get a user by ID from the database
export async function getUserById(id: string) {
  const [user] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
  return (user as mysql.RowDataPacket[]).length ? (user as mysql.RowDataPacket[])[0] : null;  // Return the first user, or null if not found
}
