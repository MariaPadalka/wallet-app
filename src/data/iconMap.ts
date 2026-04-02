import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
  faArrowsRotate,
  faBuildingColumns,
  faCartShopping,
  faCouch,
  faLaptop,
  faLeaf,
  faMugHot,
  faMusic,
  faPlane,
  faShirt,
} from '@fortawesome/free-solid-svg-icons'

/** Maps JSON `iconKey` → Font Awesome solid icon (standard “Icons” set). */
export const TRANSACTION_ICON_MAP = {
  couch: faCouch,
  buildingColumns: faBuildingColumns,
  cartShopping: faCartShopping,
  mugHot: faMugHot,
  plane: faPlane,
  leaf: faLeaf,
  arrowsRotate: faArrowsRotate,
  shirt: faShirt,
  music: faMusic,
  laptop: faLaptop,
} as const satisfies Record<string, IconDefinition>

export type TransactionIconKey = keyof typeof TRANSACTION_ICON_MAP

export function getTransactionIcon(
  key: string,
): IconDefinition | undefined {
  return TRANSACTION_ICON_MAP[key as TransactionIconKey]
}
