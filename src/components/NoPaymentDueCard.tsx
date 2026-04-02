import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function NoPaymentDueCard({ message }: { message: string }) {
  return (
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
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{message}</p>
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
  )
}
