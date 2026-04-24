'use client'

import { useEffect, useState } from 'react'
import { ProgressBar } from './ProgressBar'
import { Loader2, Sparkles } from 'lucide-react'

interface LoadingScreenProps {
  steps?: string[]
  currentStep?: number
  customMessage?: string
}

const DEFAULT_STEPS = [
  'Inicializando...',
  'Conectando à plataforma...',
  'Processando dados...',
  'Finalizando...',
]

export function LoadingScreen({ steps = DEFAULT_STEPS, currentStep = 0, customMessage }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const target = ((currentStep + 1) / steps.length) * 100
    setProgress(target)
  }, [currentStep, steps.length])

  const activeMessage = customMessage ?? steps[currentStep] ?? steps[steps.length - 1]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#080808]/90 backdrop-blur-sm">
      <div className="w-full max-w-md mx-4 space-y-6">
        {/* Icon animation */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-[#ffff00]/20 blur-xl rounded-full animate-pulse" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl gradient-purple">
              <Sparkles className="h-7 w-7 text-white animate-pulse" />
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="text-center space-y-2">
          <h3 className="text-lg font-bold text-white">{activeMessage}</h3>
          <p className="text-sm text-white/40">
            Etapa {currentStep + 1} de {steps.length}
          </p>
        </div>

        {/* Progress bar */}
        <ProgressBar progress={progress} size="md" animated />

        {/* Steps indicator */}
        <div className="flex justify-center gap-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i <= currentStep ? 'w-6 gradient-purple' : 'w-1.5 bg-white/10'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// Simple inline loader for buttons/cards
export function InlineLoader({ text = 'Carregando...' }: { text?: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-white/60">
      <Loader2 className="h-4 w-4 animate-spin text-[#ffff56]" />
      <span>{text}</span>
    </div>
  )
}
