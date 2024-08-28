const { db } = require('@vercel/postgres');
const { getClient } = require('./pg-local');
 
// ...
 
async function main() {
  const client = process.env.LOCAL_VERCEL_POSTGRES ? await getClient() : await db.connect();
 
  await seedUsers(client);
  await seedCustomers(client);
  await seedInvoices(client);
  await seedRevenue(client);
 
  await client.end();
}