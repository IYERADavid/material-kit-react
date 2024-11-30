import { db } from '../../../config/db';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import { randomUUID } from "crypto";
import { updateUser } from '@/types/user';

const hashPassword = async (password: string) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
};

// Function to create a new user in the database
export async function createUser(name: string, email: string, password: string) {
    
  const hashedPassword = await hashPassword(password);

  const token = randomUUID();
  const userType = 5;
  const currentDateTime = new Date().toISOString();
  const isOnline = "no";
  const status = "active";

  const [ result ] = await db.execute(
    `
    INSERT INTO system_users (names, email, password, token, user_type, savedDate, isOnline, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `,
    [name, email, hashedPassword, token , userType, currentDateTime, isOnline, status ]
  );

  // console.log(result);
  return { id: (result as mysql.ResultSetHeader).insertId, token };
}

// Function to get all users from the database
export async function getAllUsers() {
  const [users] = await db.execute('SELECT * FROM users');
  return users;
}

// Function to get a user by ID from the database
export async function getUserByToken(token: string) {
  console.log(token);
  
  const [user] = await db.execute('SELECT * FROM system_users WHERE token = ?', [token]);
  return (user as mysql.RowDataPacket[]).length ? (user as mysql.RowDataPacket[])[0] : null;  // Return the first user, or null if not found
}

export async function getUserById(id: number) {
  const [user] =  await db.execute('SELECT * FROM system_users WHERE id = ?', [id]);
  return (user as mysql.RowDataPacket[]).length ? (user as mysql.RowDataPacket[])[0] : null;  // Return the first user, or null if not found
}

export async function updateUserById(user: updateUser) {

  const id  =  user.userId;
  const names = user.names;
  const email = user.email;
  const phone =  user.phone;
  
  const [result]: any = await db.execute('UPDATE system_users SET names = ?, email = ?, phone = ? WHERE id = ?', [names, email, phone, id ]);
  if (result.affectedRows === 0) { return null; }
  // Retrieve the updated user
  const [updatedUser] = await db.execute('SELECT * FROM system_users WHERE id = ?',[id]);
  return (updatedUser as mysql.RowDataPacket[])[0] || null;
}

export async function signUserIn(authDetails: { email: string; password: string }) {
  const { email, password } = authDetails;

  try {
    // Fetch user by email
    const [rows]: any = await db.execute('SELECT * FROM system_users WHERE email = ?', [email]);

    if (rows.length === 0) {
      return { success: false, message: 'User not found' };
    }

    const user = rows[0];

    // Check if the provided password matches the stored hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return { success: false, message: 'Invalid password' };
    }

    // console.log(user);
    // User authenticated successfully
    return { success: true, user: user };
  } catch (error) {
    console.error('Error signing in user:', error);
    return { success: false, message: 'An error occurred while signing in' };
  }
}