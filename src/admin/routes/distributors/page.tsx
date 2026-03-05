import { useMemo, useState } from "react"
import { defineRouteConfig } from "@medusajs/admin-sdk"
import { TagSolid } from "@medusajs/icons"
import { 
  Container,
} from "@medusajs/ui"
import { 
  // ...
  Heading,
  createDataTableColumnHelper,
  DataTable,
  DataTablePaginationState,
  useDataTable,
} from "@medusajs/ui"
import { useQuery } from "@tanstack/react-query"
import { sdk } from "../../lib/sdk"

type Distributor = {
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zip: string
  country: string
}
type DistributorsResponse = {
  distributors: Distributor[]
  count: number
  limit: number
  offset: number
}

const columnHelper = createDataTableColumnHelper<Distributor>()

const columns = [
  columnHelper.accessor("name", {
    header: "Name",
  }),
  columnHelper.accessor("email", {
    header: "Email",
  }),
  columnHelper.accessor("phone", {
    header: "Phone",
  }),
  columnHelper.accessor("address", {
    header: "Address",
  }),
  columnHelper.accessor("city", {
    header: "City",
  }),
  columnHelper.accessor("state", {
    header: "State",
  }),
  columnHelper.accessor("zip", {
    header: "Zip",
  }),
  columnHelper.accessor("country", {
    header: "Country",
  })
]


const DistributorsPage = () => {
    
const limit = 15
const [pagination, setPagination] = useState<DataTablePaginationState>({
  pageSize: limit,
  pageIndex: 0,
})
const offset = useMemo(() => {
  return pagination.pageIndex * limit
}, [pagination])

const { data, isLoading } = useQuery<DistributorsResponse>({
  queryFn: () => sdk.client.fetch(`/admin/distributors`, {
    query: {
      limit,
      offset,
    },
  }),
  queryKey: [["distributors", limit, offset]],
})
console.log(data)
const table = useDataTable({
  columns,
  data: data?.distributors || [],
  getRowId: (row) => row.name,
  rowCount: data?.count || 0,
  isLoading,
  pagination: {
    state: pagination,
    onPaginationChange: setPagination,
  },
})
  return (
    <Container className="divide-y p-0">
      <DataTable instance={table}>
        <DataTable.Toolbar className="flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
            <Heading>Distributors</Heading>
        </DataTable.Toolbar>
        <DataTable.Table />
        <DataTable.Pagination />
    </DataTable>
    </Container>
  )
}

export const config = defineRouteConfig({
  label: "Distributors",
  icon: TagSolid,
})

export default DistributorsPage