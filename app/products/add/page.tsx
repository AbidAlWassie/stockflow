// app/products/add/page.tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { db } from "@/db"
import { products } from "@/db/schema"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { v4 as uuidv4 } from "uuid"

async function addProduct(formData: FormData) {
  "use server"
  const name = formData.get("name") as string
  const price = Number.parseFloat(formData.get("price") as string)
  const stockQuantity = Number.parseInt(formData.get("stockQuantity") as string)

  if (name && !isNaN(price) && !isNaN(stockQuantity)) {
    await db.insert(products).values({
      productId: uuidv4(),
      name,
      price,
      stockQuantity,
    })
    revalidatePath("/products")
    redirect("/products")
  }
}

export default function AddProduct() {
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      <form action={addProduct} className="space-y-4">
        <div>
          <Label htmlFor="name">Product Name</Label>
          <Input id="name" name="name" required />
        </div>
        <div>
          <Label htmlFor="price">Price</Label>
          <Input id="price" name="price" type="number" step="0.01" required />
        </div>
        <div>
          <Label htmlFor="stockQuantity">Initial Stock</Label>
          <Input id="stockQuantity" name="stockQuantity" type="number" required />
        </div>
        <Button type="submit">Add Product</Button>
      </form>
    </div>
  )
}

