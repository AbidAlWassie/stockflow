export type RouteConfig = {
  label: string
  parent?: {
    label: string
    href: string
  }[]
}

export const routeConfig: Record<string, RouteConfig> = {
  "/": {
    label: "Home",
  },
  "/products": {
    label: "Products",
    parent: [
      {
        label: "Home",
        href: "/",
      },
    ],
  },
  "/products/add": {
    label: "Add Product",
    parent: [
      {
        label: "Home",
        href: "/",
      },
      {
        label: "Products",
        href: "/products",
      },
    ],
  },
  "/sales": {
    label: "Orders List",
    parent: [
      {
        label: "Home",
        href: "/",
      },
    ],
  },
  "/sales/add": {
    label: "Add Order",
    parent: [
      {
        label: "Home",
        href: "/",
      },
      {
        label: "Sales",
        href: "/sales",
      },
    ],
  },
  "/expenses": {
    label: "Expenses List",
    parent: [
      {
        label: "Home",
        href: "/",
      },
    ],
  },
  "/expenses/add": {
    label: "Add Expense",
    parent: [
      {
        label: "Home",
        href: "/",
      },
      {
        label: "Expenses",
        href: "/expenses",
      },
    ],
  },
  "/settings": {
    label: "Settings",
    parent: [
      {
        label: "Home",
        href: "/",
      },
    ],
  },
}

