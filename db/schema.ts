import { relations } from 'drizzle-orm';
import { bigint, doublePrecision, integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  userId: varchar('user_id').primaryKey(),
  name: varchar('name').notNull(),
  email: varchar('email').notNull(),
});

export const products = pgTable('products', {
  productId: varchar('product_id').primaryKey(),
  name: varchar('name').notNull(),
  price: doublePrecision('price').notNull(),
  rating: doublePrecision('rating'),
  stockQuantity: integer('stock_quantity').notNull(),
});

export const sales = pgTable('sales', {
  saleId: varchar('sale_id').primaryKey(),
  productId: varchar('product_id').notNull().references(() => products.productId),
  timestamp: timestamp('timestamp').notNull(),
  quantity: integer('quantity').notNull(),
  unitPrice: doublePrecision('unit_price').notNull(),
  totalAmount: doublePrecision('total_amount').notNull(),
});

export const purchases = pgTable('purchases', {
  purchaseId: varchar('purchase_id').primaryKey(),
  productId: varchar('product_id').notNull().references(() => products.productId),
  timestamp: timestamp('timestamp').notNull(),
  quantity: integer('quantity').notNull(),
  unitCost: doublePrecision('unit_cost').notNull(),
  totalCost: doublePrecision('total_cost').notNull(),
});

export const expenses = pgTable('expenses', {
  expenseId: varchar('expense_id').primaryKey(),
  category: varchar('category').notNull(),
  amount: doublePrecision('amount').notNull(),
  timestamp: timestamp('timestamp').notNull(),
});

export const salesSummary = pgTable('sales_summary', {
  salesSummaryId: varchar('sales_summary_id').primaryKey(),
  totalValue: doublePrecision('total_value').notNull(),
  changePercentage: doublePrecision('change_percentage'),
  date: timestamp('date').notNull(),
});

export const purchaseSummary = pgTable('purchase_summary', {
  purchaseSummaryId: varchar('purchase_summary_id').primaryKey(),
  totalPurchased: doublePrecision('total_purchased').notNull(),
  changePercentage: doublePrecision('change_percentage'),
  date: timestamp('date').notNull(),
});

export const expenseSummary = pgTable('expense_summary', {
  expenseSummaryId: varchar('expense_summary_id').primaryKey(),
  totalExpenses: doublePrecision('total_expenses').notNull(),
  date: timestamp('date').notNull(),
});

export const expenseByCategory = pgTable('expense_by_category', {
  expenseByCategoryId: varchar('expense_by_category_id').primaryKey(),
  expenseSummaryId: varchar('expense_summary_id').notNull().references(() => expenseSummary.expenseSummaryId),
  category: varchar('category').notNull(),
  amount: bigint('amount', { mode: 'number' }).notNull(),
  date: timestamp('date').notNull(),
});

// Define relations
export const productsRelations = relations(products, ({ many }) => ({
  sales: many(sales),
  purchases: many(purchases),
}));

export const expenseSummaryRelations = relations(expenseSummary, ({ many }) => ({
  expenseByCategory: many(expenseByCategory),
}));
