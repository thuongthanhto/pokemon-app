'use client'

import { formUrlQuery } from '@/utils'
import { useRouter, useSearchParams } from 'next/navigation'

export const Pagination = ({ page, totalPages }: PaginationProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()!

  const handleNavigation = (type: 'prev' | 'next') => {
    const pageNumber = type === 'prev' ? page - 1 : page + 1

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: 'page',
      value: pageNumber.toString(),
    })

    router.push(newUrl, { scroll: false })
  }

  return (
    <div className="flex justify-center mt-16">
      <button
        className="mx-2 px-4 py-2 bg-blue-500 text-white rounded w-[150px] disabled:opacity-50"
        onClick={() => handleNavigation('prev')}
        disabled={Number(page) <= 1}
      >
        Prev
      </button>
      <p className="text-14 flex items-center px-2">
        {page} / {totalPages}
      </p>
      <button
        className="mx-2 px-4 py-2 bg-blue-500 text-white rounded w-[150px] disabled:opacity-50"
        onClick={() => handleNavigation('next')}
        disabled={Number(page) >= totalPages}
      >
        Next
      </button>
    </div>
  )
}
