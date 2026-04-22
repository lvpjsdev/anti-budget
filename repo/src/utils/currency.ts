const CURRENCY_FORMATS: Record<string, { symbol: string; locale: string }> = {
  USD: { symbol: '$', locale: 'en-US' },
  EUR: { symbol: '€', locale: 'de-DE' },
  GBP: { symbol: '£', locale: 'en-GB' },
  RUB: { symbol: '₽', locale: 'ru-RU' },
  INR: { symbol: '₹', locale: 'en-IN' },
  JPY: { symbol: '¥', locale: 'ja-JP' },
  CNY: { symbol: '¥', locale: 'zh-CN' },
  KRW: { symbol: '₩', locale: 'ko-KR' },
  BRL: { symbol: 'R$', locale: 'pt-BR' },
  MXN: { symbol: '$', locale: 'es-MX' },
}

export function formatCurrency(amount: number, currencyCode?: string): string {
  const code = currencyCode || 'USD'
  const format = CURRENCY_FORMATS[code] || CURRENCY_FORMATS.USD

  return new Intl.NumberFormat(format.locale, {
    style: 'currency',
    currency: code,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}
