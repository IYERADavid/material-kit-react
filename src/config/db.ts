// lib/db.ts
import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'vcard_eazy_link',
};

export const db = mysql.createPool(dbConfig);

// Example usage: db.execute('SELECT * FROM users');
