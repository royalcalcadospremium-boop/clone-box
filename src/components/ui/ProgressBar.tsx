'use client'

import { cn } from '@/lib/utils'

// ═══════════════════════════════════════════════════════
// PROGRESS BAR
// ═══════════════════════════════════════════════════════

interface ProgressBarProps {
  progress: number
  label?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
  animated?: boolean
}

export function ProgressBar({ progress, label, size = 'md', className, animated }: ProgressBarProps) {
  const clamped = Math.min(Math.max(progress, 0), 100)

  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  }

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-medium text-white/60">{label}</span>
          <span className="text-xs tabular-nums text-white/40">{Math.round(clamped)}%</span>
        </div>
      )}
      <div
        className={cn(
          'w-full rounded-full overflow-hidden bg-white/[0.06]',
          sizeClasses[size]
        )}
      >
        <div
          className={cn(
            'h-full rounded-full gradient-purple transition-all duration-500 ease-out',
            animated && 'animate-pulse'
          )}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  )
}
