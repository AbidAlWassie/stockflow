// app/page.tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { db } from "@/db"
import { products } from "@/db/schema"
import { revalidatePath } from "next/cache"
import { v4 as uuidv4 } from "uuid"



export default async function Home() {

  async function addProduct(formData: FormData) {
    "use server"
    const name = formData.get("name") as string
    const price = Number.parseFloat(formData.get("price") as string)

    if (name && !isNaN(price)) {
      await db.insert(products).values({
        productId: uuidv4(),
        name,
        price,
        stockQuantity: 0,
      })
      revalidatePath("/")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Add New Product</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={addProduct} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" name="name" placeholder="Enter product name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input id="price" name="price" type="number" step="0.01" placeholder="Enter price" />
              </div>
              <Button type="submit">Add Product</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Product List</CardTitle>
          </CardHeader>
          <CardContent>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
