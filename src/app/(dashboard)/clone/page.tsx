'use client'

import { useState } from 'react'
import { StepUpload } from './step-1-upload/StepUpload'
import { StepConfig } from './step-2-config/StepConfig'
import { StepPrompt } from './step-3-prompt/StepPrompt'
import { StepResult } from './step-4-result/StepResult'
import { CheckCircle2 } from 'lucide-react'

export type CloneState = {
  referenceVideoUrl?: string
  referenceVideoSourceUrl?: string
  style?: string
  duration?: number
  resolution?: string
  aspectRatio?: string
  cameraMovement?: string
  language?: string
  music?: string
  productImageUrl?: string
  productDescription?: string
  promptGenerated?: string
  promptFinal?: string
  videoId?: string
}

const steps = [
  { number: 1, label: 'Vídeo de referência' },
  { number: 2, label: 'Configuração' },
  { number: 3, label: 'Prompt IA' },
  { number: 4, label: 'Resultado' },
]

export default function ClonePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [state, setState] = useState<CloneState>({})

  function updateState(updates: Partial<CloneState>) {
    setState((prev) => ({ ...prev, ...updates }))
  }

  function nextStep() {
    setCurrentStep((s) => Math.min(s + 1, 4))
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black">Clonar vídeo viral</h1>
        <p className="mt-1 text-sm text-white/50">
          Cole um viral, configure, e receba um vídeo com seu produto em 2 minutos
        </p>
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-2">
        {steps.map((step, i) => (
          <div key={step.number} className="flex items-center gap-2 flex-1">
            <div className="flex items-center gap-2 shrink-0">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition ${
                  step.number < currentStep
                    ? 'bg-[#ffff00] text-black'
                    : step.number === currentStep
                    ? 'border-2 border-[#ffff00] text-[#ffff00]'
                    : 'border border-white/10 text-white/30'
                }`}
              >
                {step.number < currentStep ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  step.number
                )}
              </div>
              <span
                className={`hidden sm:block text-sm font-medium ${
                  step.number === currentStep
                    ? 'text-white'
                    : step.number < currentStep
                    ? 'text-[#ffff00]'
                    : 'text-white/30'
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`h-px flex-1 transition ${
                  step.number < currentStep ? 'bg-[#ffff00]' : 'bg-white/10'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div>
        {currentStep === 1 && (
          <StepUpload
            state={state}
            onUpdate={updateState}
            onNext={nextStep}
          />
        )}
        {currentStep === 2 && (
          <StepConfig
            state={state}
            onUpdate={updateState}
            onNext={nextStep}
          />
        )}
        {currentStep === 3 && (
          <StepPrompt
            state={state}
            onUpdate={updateState}
            onNext={nextStep}
          />
        )}
        {currentStep === 4 && (
          <StepResult state={state} />
        )}
      </div>
    </div>
  )
}
