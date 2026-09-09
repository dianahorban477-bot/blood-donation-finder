import { useMemo, useState } from 'react'

export const usePagination = <T>(items: T[], itemsPerPage: number) => {
  const [requestedPage, setPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage))
  const page = Math.min(Math.max(requestedPage, 1), totalPages)
  const paginatedItems = useMemo(() => {
    const start = (page - 1) * itemsPerPage

    return items.slice(start, start + itemsPerPage)
  }, [items, itemsPerPage, page])

  return {
    page,
    paginatedItems,
    setPage,
    totalPages,
  }
}
