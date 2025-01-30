import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import {
  expenseByCategory,
  expenses,
  expenseSummary,
  products,
  purchases,
  purchaseSummary,
  sales,
  salesSummary,
  users,
} from './schema';

// Initialize Postgres client
const sql = postgres(process.env.DATABASE_URL as string);
const db = drizzle(sql);

// Seed data
async function seed() {
  // Users
  await db.insert(users).values([
    { userId: '1', name: 'John Doe', email: 'john@example.com' },
    { userId: '2', name: 'Jane Smith', email: 'jane@example.com' },
    { userId: '3', name: 'Alice Brown', email: 'alice@example.com' },
  ]);

  // Products
  await db.insert(products).values([
    { productId: '101', name: 'Laptop', price: 1200.99, rating: 4.5, stockQuantity: 10 },
    { productId: '102', name: 'Smartphone', price: 799.49, rating: 4.3, stockQuantity: 15 },
    { productId: '103', name: 'Headphones', price: 199.99, rating: 4.7, stockQuantity: 25 },
  ]);

  // Sales
  await db.insert(sales).values([
    { saleId: '201', productId: '101', timestamp: new Date(), quantity: 2, unitPrice: 1200.99, totalAmount: 2401.98 },
    { saleId: '202', productId: '102', timestamp: new Date(), quantity: 1, unitPrice: 799.49, totalAmount: 799.49 },
  ]);

  // Purchases
  await db.insert(purchases).values([
    { purchaseId: '301', productId: '101', timestamp: new Date(), quantity: 5, unitCost: 1000.00, totalCost: 5000.00 },
    { purchaseId: '302', productId: '103', timestamp: new Date(), quantity: 10, unitCost: 150.00, totalCost: 1500.00 },
  ]);

  // Expenses
  await db.insert(expenses).values([
    { expenseId: '401', category: 'Marketing', amount: 500.00, timestamp: new Date() },
    { expenseId: '402', category: 'Rent', amount: 1200.00, timestamp: new Date() },
  ]);

  // Sales Summary
  await db.insert(salesSummary).values([
    { salesSummaryId: '501', totalValue: 3201.47, changePercentage: 5.2, date: new Date() },
  ]);

  // Purchase Summary
  await db.insert(purchaseSummary).values([
    { purchaseSummaryId: '601', totalPurchased: 6500.00, changePercentage: -2.1, date: new Date() },
  ]);

  // Expense Summary
  await db.insert(expenseSummary).values([
    { expenseSummaryId: '701', totalExpenses: 1700.00, date: new Date() },
  ]);

  // Expense By Category
  await db.insert(expenseByCategory).values([
    { expenseByCategoryId: '801', expenseSummaryId: '701', category: 'Marketing', amount: 500, date: new Date() },
    { expenseByCategoryId: '802', expenseSummaryId: '701', category: 'Rent', amount: 1200, date: new Date() },
  ]);
}

seed()
  .then(() => {
    console.log('Seeding complete');
  })
  .catch(console.error);
