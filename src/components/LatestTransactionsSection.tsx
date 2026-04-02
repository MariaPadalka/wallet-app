import { useState } from 'react'
import type { Transaction } from '@/types/wallet'
import { TransactionRow } from '@/components/TransactionRow'

const DEFAULT_LIMIT = 10

export function LatestTransactionsSection({
  transactions,
  initialVisibleCount = DEFAULT_LIMIT,
}: {
  transactions: Transaction[]
  initialVisibleCount?: number
}) {
  const [showAll, setShowAll] = useState(false)
  const hasMore = transactions.length > initialVisibleCount
  const visible = showAll
    ? transactions
    : transactions.slice(0, initialVisibleCount)

  return (
    <section aria-labelledby="transactions-heading">
      <h2
        id="transactions-heading"
        className="mb-3 px-1 text-base font-bold text-zinc-900 dark:text-zinc-50"
      >
        Latest Transactions
      </h2>
      <div className="overflow-hidden rounded-2xl bg-white dark:bg-zinc-900">
        <ul className="list-none p-0">
          {visible.map((tx) => (
            <TransactionRow key={tx.id} tx={tx} />
          ))}
        </ul>
        {hasMore ? (
          <div className="border-t border-gray-100 dark:border-zinc-800">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="w-full py-3.5 text-center text-sm font-semibold text-zinc-900 transition-colors hover:bg-gray-50 active:bg-gray-100 dark:text-zinc-100 dark:hover:bg-zinc-800 dark:active:bg-zinc-800/80"
            >
              {showAll ? 'Show less' : 'Show more'}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  )
}
