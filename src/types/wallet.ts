export type TransactionType = 'Payment' | 'Credit'

export interface TransactionIcon {
  /** Dark background for the list/detail avatar (e.g. #1e3a5f). */
  backgroundColor: string
  /** Must match a key in `TRANSACTION_ICON_MAP` (Font Awesome solid). */
  iconKey: string
}

export interface Transaction {
  id: string
  type: TransactionType
  /** Positive number; sign for display comes from type (Payment → +). */
  amount: number
  name: string
  description: string
  /** ISO 8601 date string (UTC or offset). */
  date: string
  pending?: boolean
  /** Shown before the date when another person performed the transaction. */
  authorizedUserName?: string
  icon: TransactionIcon
}

export interface WalletConfig {
  maxCardLimitUsd: number
  cardBalanceUsd: number
  noPaymentDueMessage: string
}
