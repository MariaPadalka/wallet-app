import { faCheck, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTransactionIcon } from '@/data/iconMap'
import { loadWalletBootstrap } from '@/data/loadWalletData'
import type { Transaction } from '@/types/wallet'
import { formatTransactionAmount, formatUsd } from '@/utils/formatMoney'
import { formatTransactionDateLabel } from '@/utils/transactionDateDisplay'

const LATEST_TRANSACTIONS_LIMIT = 10

function TransactionRow({ tx }: { tx: Transaction }) {
  const navigate = useNavigate()
  const icon = getTransactionIcon(tx.icon.iconKey)
  const dateLabel = formatTransactionDateLabel(tx.date)
  const subtitlePrimary = tx.pending
    ? `Pending - ${tx.description}`
    : tx.description
  const subtitleMeta = tx.authorizedUserName
    ? `${tx.authorizedUserName} — ${dateLabel}`
    : dateLabel

  return (
    <li className="border-b border-gray-100 last:border-b-0 dark:border-zinc-800">
      <button
        type="button"
        onClick={() => navigate(`/transaction/${tx.id}`)}
        className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-gray-50/80 active:bg-gray-100/80 dark:hover:bg-zinc-800/50 dark:active:bg-zinc-800"
      >
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white shadow-sm"
          style={{ backgroundColor: tx.icon.backgroundColor }}
          aria-hidden
        >
          {icon ? (
            <FontAwesomeIcon icon={icon} className="h-5 w-5" />
          ) : null}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <p className="min-w-0 flex-1 truncate text-base font-bold leading-tight text-zinc-900 dark:text-zinc-50">
              {tx.name}
            </p>
            <span className="shrink-0 text-base font-bold tabular-nums text-zinc-900 dark:text-zinc-50">
              {formatTransactionAmount(tx.type, tx.amount)}
            </span>
          </div>
          <p
            className="mt-0.5 truncate text-sm leading-snug text-slate-500 dark:text-slate-400"
            title={subtitlePrimary}
          >
            {subtitlePrimary}
          </p>
          <p className="mt-1 text-xs leading-snug text-slate-500 dark:text-slate-400">
            {subtitleMeta}
          </p>
        </div>
        <FontAwesomeIcon
          icon={faChevronRight}
          className="h-4 w-4 shrink-0 self-center text-slate-300 dark:text-slate-600"
          aria-hidden
        />
      </button>
    </li>
  )
}

export function TransactionsList() {
  const boot = useMemo(() => loadWalletBootstrap(), [])
  const { config, card, dailyPoints, transactions } = boot
  const [showAllTransactions, setShowAllTransactions] = useState(false)

  const hasMoreTransactions = transactions.length > LATEST_TRANSACTIONS_LIMIT
  const visibleTransactions = showAllTransactions
    ? transactions
    : transactions.slice(0, LATEST_TRANSACTIONS_LIMIT)

  return (
    <div className="mx-auto min-h-svh max-w-md bg-[#F2F2F7] px-4 pb-10 pt-6 dark:bg-zinc-950">
      <section
        className="mb-6 grid grid-cols-2 gap-3 auto-rows-auto"
        aria-label="Account summary"
      >
        <div
          className="row-start-1 col-start-1 flex flex-col rounded-2xl bg-white p-4 dark:bg-zinc-900"
          aria-labelledby="card-balance-heading"
        >
          <h2
            id="card-balance-heading"
            className="text-sm font-semibold text-zinc-600 dark:text-zinc-400"
          >
            Card Balance
          </h2>
          <p className="mt-2 text-3xl font-bold tabular-nums tracking-tight text-zinc-900 dark:text-zinc-50">
            {formatUsd(card.cardBalanceUsd)}
          </p>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            {formatUsd(card.availableUsd)} Available
          </p>
        </div>

        <div
          className="row-start-2 col-start-1 flex flex-col rounded-2xl bg-white p-4 dark:bg-zinc-900"
          aria-labelledby="daily-points-heading"
        >
          <h2
            id="daily-points-heading"
            className="text-sm font-semibold text-zinc-600 dark:text-zinc-400"
          >
            Daily Points
          </h2>
          <p className="mt-2 text-sm font-medium tabular-nums text-zinc-500 dark:text-zinc-400">
            {dailyPoints.displayLabel}
          </p>
        </div>

        <div
          className="row-span-2 row-start-1 col-start-2 flex flex-col justify-between gap-3 self-stretch rounded-2xl bg-white p-4 dark:bg-zinc-900"
          aria-labelledby="no-payment-heading"
        >
          <div>
            <h2
              id="no-payment-heading"
              className="text-sm font-bold text-zinc-900 dark:text-zinc-50"
            >
              No Payment Due
            </h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {config.noPaymentDueMessage}
            </p>
          </div>
          <div className="flex justify-end pt-1">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-700"
              aria-hidden
            >
              <FontAwesomeIcon
                icon={faCheck}
                className="h-8 text-zinc-900 dark:text-zinc-100"
              />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="transactions-heading">
        <h2
          id="transactions-heading"
          className="mb-3 px-1 text-base font-bold text-zinc-900 dark:text-zinc-50"
        >
          Latest Transactions
        </h2>
        <div className="overflow-hidden rounded-2xl bg-white dark:bg-zinc-900">
          <ul className="list-none p-0">
            {visibleTransactions.map((tx) => (
              <TransactionRow key={tx.id} tx={tx} />
            ))}
          </ul>
          {hasMoreTransactions ? (
            <div className="border-t border-gray-100 dark:border-zinc-800">
              <button
                type="button"
                onClick={() =>
                  setShowAllTransactions((prev) => !prev)
                }
                className="w-full py-3.5 text-center text-sm font-semibold text-zinc-900 transition-colors hover:bg-gray-50 active:bg-gray-100 dark:text-zinc-100 dark:hover:bg-zinc-800 dark:active:bg-zinc-800/80"
              >
                {showAllTransactions
                  ? 'Show less'
                  : 'Show more'}
              </button>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  )
}
