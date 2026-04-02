import { formatTransactionSlashDate } from '@/utils/transactionDetailDate'

const MS_PER_DAY = 86_400_000

function startOfLocalDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

/**
 * First week (last 7 calendar days including today): weekday name (e.g. "Thursday").
 * Older entries: short US date with slashes (e.g. `4/1/26`).
 */
export function formatTransactionDateLabel(
  isoDate: string,
  reference: Date = new Date(),
): string {
  const tx = new Date(isoDate)
  const refStart = startOfLocalDay(reference).getTime()
  const txStart = startOfLocalDay(tx).getTime()
  const daysAgo = Math.floor((refStart - txStart) / MS_PER_DAY)

  if (daysAgo >= 0 && daysAgo < 7) {
    return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(tx)
  }

  return formatTransactionSlashDate(isoDate)
}
