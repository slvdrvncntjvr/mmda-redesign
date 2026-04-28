import { cn } from "@/lib/utils"

export type TrafficStatus = "light" | "moderate" | "heavy"

const labels: Record<TrafficStatus, string> = {
  light: "Light",
  moderate: "Moderate",
  heavy: "Heavy",
}

const styles: Record<TrafficStatus, string> = {
  light: "border-status-light/30 bg-status-light-bg text-status-light",
  moderate: "border-status-moderate/30 bg-status-moderate-bg text-status-moderate",
  heavy: "border-status-heavy/30 bg-status-heavy-bg text-status-heavy",
}

const dotStyles: Record<TrafficStatus, string> = {
  light: "bg-status-light",
  moderate: "bg-status-moderate",
  heavy: "bg-status-heavy",
}

export function StatusBadge({
  status,
  label,
  className,
}: {
  status: TrafficStatus
  label?: string
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm border px-1.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.12em]",
        styles[status],
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", dotStyles[status])} aria-hidden />
      {label ?? labels[status]}
    </span>
  )
}
