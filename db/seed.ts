import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { customer, products } from './schema';

// Initialize Postgres client
const sql = postgres(process.env.DATABASE_URL as string);  // Ensure DATABASE_URL is set in your .env file
const db = drizzle({ client: sql });

// Seed data
async function seed() {
  // Customers
  await db.insert(customer).values([
    { customerId: 1, customerName: 'Abid Al Wassie', nickname: 'Abid', location: 'Domar', phone: null },
    { customerId: 2, customerName: 'Fahmid Al Wassie', nickname: 'Fahmid', location: 'Domar', phone: null },
    { customerId: 3, customerName: 'Shumon Sayed', nickname: 'Shumon', location: 'Rangpur', phone: null },
  ]);

  // Products
  await db.insert(products).values([
    { productId: 1, brand: 'Berger', productName: 'SPD', color: 'White', size: '18 liter', price: 520, quantity: 7 },
    { productId: 2, brand: 'Berger', productName: 'SPD', color: 'Off White', size: '18 liter', price: 520, quantity: 5 },
    { productId: 3, brand: 'Berger', productName: 'SPD', color: 'Ocean Blue', size: '18 liter', price: 520, quantity: 1 },
    { productId: 4, brand: 'Berger', productName: 'SPD', color: 'Cream', size: '18 liter', price: 520, quantity: 1 },
    { productId: 5, brand: 'Berger', productName: 'SPD', color: 'Crystal Green N', size: '18 liter', price: 520, quantity: 1 },
    { productId: 427, brand: 'Dulux', productName: 'Birat Sealer WT', color: 'None', size: '9.1 liter', price: 500, quantity: 1 },
    { productId: 428, brand: 'Dulux', productName: 'Birat Sealer WC', color: 'None', size: '18 liter', price: 500, quantity: 1 },
    { productId: 429, brand: 'Dulux', productName: 'Birat Sealer WC', color: 'None', size: '3.64 liter', price: 500, quantity: 13 },
    { productId: 430, brand: 'Dulux', productName: 'Birat Sealer WC', color: 'None', size: '9.1 liter', price: 450, quantity: 3 },
  ]);
}

seed()
  .then(() => {
    console.log('Seeding complete');
  })
  .catch(console.error);
