import pino from 'pino'

export const logger = pino({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  redact: {
    // Nunca logar PII
    paths: ['email', 'phone', 'cpf_cnpj', 'password', '*.email', '*.phone'],
    censor: '[REDACTED]',
  },
  formatters: {
    level(label) {
      return { level: label }
    },
  },
})
