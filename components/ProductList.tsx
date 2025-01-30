// components/ProductList.tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Product = {
  productId: string
  name: string
  price: number
}

export default function ProductList({ products }: { products: Product[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.productId}>
            <TableCell>{product.name}</TableCell>
            <TableCell>${product.price.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
