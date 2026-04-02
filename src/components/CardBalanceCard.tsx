import { formatUsd } from '@/utils/formatMoney'

export function CardBalanceCard({
  balanceUsd,
  availableUsd,
}: {
  balanceUsd: number
  availableUsd: number
}) {
  return (
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
        {formatUsd(balanceUsd)}
      </p>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
        {formatUsd(availableUsd)} Available
      </p>
    </div>
  )
}
