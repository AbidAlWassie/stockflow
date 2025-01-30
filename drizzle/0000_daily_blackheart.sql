CREATE TABLE "expense_by_category" (
	"expense_by_category_id" varchar PRIMARY KEY NOT NULL,
	"expense_summary_id" varchar NOT NULL,
	"category" varchar NOT NULL,
	"amount" bigint NOT NULL,
	"date" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "expense_summary" (
	"expense_summary_id" varchar PRIMARY KEY NOT NULL,
	"total_expenses" double precision NOT NULL,
	"date" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "expenses" (
	"expense_id" varchar PRIMARY KEY NOT NULL,
	"category" varchar NOT NULL,
	"amount" double precision NOT NULL,
	"timestamp" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "products" (
	"product_id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"price" double precision NOT NULL,
	"rating" double precision,
	"stock_quantity" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "purchase_summary" (
	"purchase_summary_id" varchar PRIMARY KEY NOT NULL,
	"total_purchased" double precision NOT NULL,
	"change_percentage" double precision,
	"date" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "purchases" (
	"purchase_id" varchar PRIMARY KEY NOT NULL,
	"product_id" varchar NOT NULL,
	"timestamp" timestamp NOT NULL,
	"quantity" integer NOT NULL,
	"unit_cost" double precision NOT NULL,
	"total_cost" double precision NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sales" (
	"sale_id" varchar PRIMARY KEY NOT NULL,
	"product_id" varchar NOT NULL,
	"timestamp" timestamp NOT NULL,
	"quantity" integer NOT NULL,
	"unit_price" double precision NOT NULL,
	"total_amount" double precision NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sales_summary" (
	"sales_summary_id" varchar PRIMARY KEY NOT NULL,
	"total_value" double precision NOT NULL,
	"change_percentage" double precision,
	"date" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"user_id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"email" varchar NOT NULL
);
--> statement-breakpoint
ALTER TABLE "expense_by_category" ADD CONSTRAINT "expense_by_category_expense_summary_id_expense_summary_expense_summary_id_fk" FOREIGN KEY ("expense_summary_id") REFERENCES "public"."expense_summary"("expense_summary_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_product_id_products_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("product_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sales" ADD CONSTRAINT "sales_product_id_products_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("product_id") ON DELETE no action ON UPDATE no action;