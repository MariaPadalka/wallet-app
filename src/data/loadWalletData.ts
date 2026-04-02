import type { Transaction, WalletConfig } from '@/types/wallet'
import { getTransactionIcon } from '@/data/iconMap'
import transactionsJson from '@/data/transactions.json'
import walletJson from '@/data/wallet.json'
import { getDailyPointsForDate } from '@/utils/dailyPoints'
import { formatPointsForDisplay } from '@/utils/pointsDisplay'

export interface CardBalanceSummary {
  maxCardLimitUsd: number
  cardBalanceUsd: number
  /** `maxCardLimitUsd - cardBalanceUsd` (two decimal places). */
  availableUsd: number
}

export interface DailyPointsSummary {
  rawPoints: number
  displayLabel: string
}

export interface WalletBootstrap {
  config: WalletConfig
  /** Newest first (10 items). */
  transactions: Transaction[]
  card: CardBalanceSummary
  dailyPoints: DailyPointsSummary
}

function roundMoney(n: number): number {
  return Math.round(n * 100) / 100
}

export function loadWalletConfig(): WalletConfig {
  return walletJson as WalletConfig
}

export function loadTransactions(): Transaction[] {
  const list = transactionsJson as Transaction[]
  for (const tx of list) {
    if (!getTransactionIcon(tx.icon.iconKey)) {
      throw new Error(`Unknown transaction iconKey: ${tx.icon.iconKey}`)
    }
  }
  return [...list].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )
}

export function getCardBalanceSummary(config: WalletConfig): CardBalanceSummary {
  const availableUsd = roundMoney(config.maxCardLimitUsd - config.cardBalanceUsd)
  return {
    maxCardLimitUsd: config.maxCardLimitUsd,
    cardBalanceUsd: config.cardBalanceUsd,
    availableUsd,
  }
}

export function getDailyPointsSummary(
  reference: Date = new Date(),
): DailyPointsSummary {
  const rawPoints = getDailyPointsForDate(reference)
  return {
    rawPoints,
    displayLabel: formatPointsForDisplay(rawPoints),
  }
}

/** Single entry point: JSON + derived card/points fields. */
export function loadWalletBootstrap(
  reference: Date = new Date(),
): WalletBootstrap {
  const config = loadWalletConfig()
  return {
    config,
    transactions: loadTransactions(),
    card: getCardBalanceSummary(config),
    dailyPoints: getDailyPointsSummary(reference),
  }
}
