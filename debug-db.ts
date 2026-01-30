import { db } from './lib/db';
import { users } from './lib/schema';
import { eq } from 'drizzle-orm';
import dotenv from 'dotenv';

dotenv.config();

async function checkUsers() {
  console.log('DB URL:', process.env.TURSO_DATABASE_URL);
  try {
    const allUsers = await db.select().from(users);
    console.log('Total users:', allUsers.length);
    allUsers.forEach(u => {
      console.log(`- ID: ${u.id}, Email: ${u.email}, Role: ${u.role}`);
    });
  } catch (err) {
    console.error('Error querying DB:', err);
  }
}

checkUsers().catch(console.error);
