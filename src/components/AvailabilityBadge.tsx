interface AvailabilityBadgeProps {
  available: boolean
}

export function AvailabilityBadge({ available }: AvailabilityBadgeProps) {
  return (
    <span
      className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
        available
          ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300'
          : 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300'
      }`}
    >
      {available ? 'Available' : 'Unavailable'}
    </span>
  )
}
