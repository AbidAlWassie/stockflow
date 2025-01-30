import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { db } from "@/db"
import { products } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import Link from "next/link"

async function getProducts() {
  return await db.select().from(products).orderBy(products.productId)
}

async function deleteProduct(productId: string) {
  "use server"
  await db.delete(products).where(eq(products.productId, productId))
  revalidatePath("/products")
}

export default async function ProductList() {
  const productList = await getProducts()

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Product List</h1>
        <Link href="/products/add">
          <Button>Add New Product</Button>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productList.map((product) => (
            <TableRow key={product.productId}>
              <TableCell>{product.name}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>{product.stockQuantity}</TableCell>
              <TableCell>
                <div className="space-x-2">
                  <Link href={`/products/edit/${product.productId}`}>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </Link>
                  <form action={deleteProduct.bind(null, product.productId)} className="inline">
                    <Button variant="destructive" size="sm" type="submit">
                      Delete
                    </Button>
                  </form>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

