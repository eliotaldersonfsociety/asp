import { db } from './lib/db';
import { users } from './lib/schema';
import { eq } from 'drizzle-orm';

async function checkUsers() {
  const allUsers = await db.select().from(users);
  console.log('Total users:', allUsers.length);
  allUsers.forEach(u => {
    console.log(`- ID: ${u.id}, Email: ${u.email}, Role: ${u.role}`);
  });
}

checkUsers().catch(console.error);
