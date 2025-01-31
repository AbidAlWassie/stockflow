import { routeConfig } from "@/lib/routes"
import { usePathname } from "next/navigation"

export function useRouteInfo() {
  const pathname = usePathname()
  return routeConfig[pathname] || null
}

