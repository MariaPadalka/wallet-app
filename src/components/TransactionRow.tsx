import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import { getTransactionIcon } from '@/data/iconMap'
import type { Transaction } from '@/types/wallet'
import { formatTransactionAmount } from '@/utils/formatMoney'
import { formatTransactionDateLabel } from '@/utils/transactionDateDisplay'

export function TransactionRow({ tx }: { tx: Transaction }) {
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
