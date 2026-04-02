import type { TransactionType } from '@/types/wallet'

export function formatUsd(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

/** Payment shows leading `+`, Credit shows leading `-`. */
export function formatTransactionAmount(
  type: TransactionType,
  amount: number,
): string {
  const formatted = formatUsd(amount)
  return type === 'Payment' ? `+${formatted}` : `${formatted}`
}
