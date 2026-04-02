import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getTransactionById } from '@/data/loadWalletData'
import { formatUsd } from '@/utils/formatMoney'
import { formatTransactionDetailDateTime } from '@/utils/transactionDetailDate'

export function TransactionDetail() {
  const { transactionId } = useParams<{ transactionId: string }>()
  const navigate = useNavigate()
  const goToList = () => navigate('/')

  const tx = useMemo(
    () => (transactionId ? getTransactionById(transactionId) : undefined),
    [transactionId],
  )

  if (!tx) {
    return (
      <div className="min-h-svh bg-[#F2F2F7] px-4 pt-6 dark:bg-zinc-950">
        <button
          type="button"
          onClick={goToList}
          className="flex min-h-11 min-w-11 items-center justify-center rounded-lg text-[#007AFF] active:bg-black/5 active:opacity-80 dark:active:bg-white/10"
          aria-label="Назад до списку транзакцій"
        >
          <FontAwesomeIcon icon={faChevronLeft} className="h-6 w-6" />
        </button>
        <p className="mt-8 text-center text-zinc-600 dark:text-zinc-400">
          Transaction not found.
        </p>
      </div>
    )
  }

  const statusLabel = tx.pending ? 'Pending' : 'Approved'
  const paymentLabel = tx.paymentMethod ?? 'Wallet debit card'

  return (
    <div className="min-h-svh bg-[#F2F2F7] dark:bg-zinc-950">
      <header className="px-4 pt-3 pb-2">
        <button
          type="button"
          onClick={goToList}
          className="-ms-2 flex min-h-11 min-w-11 items-center justify-center rounded-lg text-[#007AFF] active:bg-black/5 active:opacity-80 dark:active:bg-white/10"
          aria-label="Назад до списку транзакцій"
        >
          <FontAwesomeIcon icon={faChevronLeft} className="h-6 w-6" />
        </button>
      </header>

      <main className="mx-auto max-w-md px-4 pb-12">
        <div className="pt-2 text-center">
          <p className="text-4xl font-bold tracking-tight text-black dark:text-zinc-50">
            {formatUsd(tx.amount)}
          </p>
          <p className="mt-2 text-base text-[#8E8E93] dark:text-zinc-400">
            {tx.name}
          </p>
          <p className="mt-0.5 text-base text-[#8E8E93] dark:text-zinc-400">
            {formatTransactionDetailDateTime(tx.date)}
          </p>
        </div>

        <div className="mt-10 rounded-2xl bg-white p-4 dark:bg-zinc-900">
          <p className="text-base font-bold text-black dark:text-zinc-50">
            Status: {statusLabel}
          </p>
          <p className="mt-1 text-base text-[#8E8E93] dark:text-zinc-400">
            {paymentLabel}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[#8E8E93] dark:text-zinc-400">
            {tx.description}
          </p>
          {tx.authorizedUserName ? (
            <p className="mt-2 text-sm text-[#8E8E93] dark:text-zinc-400">
              Authorized user: {tx.authorizedUserName}
            </p>
          ) : null}
          <hr className="my-4 border-gray-200 dark:border-zinc-700" />
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-base font-bold text-black dark:text-zinc-50">
              Total
            </span>
            <span className="text-base font-bold tabular-nums text-black dark:text-zinc-50">
              {formatUsd(tx.amount)}
            </span>
          </div>
        </div>
      </main>
    </div>
  )
}
