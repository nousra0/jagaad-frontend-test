import { computed, ref } from 'vue'

export function useCurrency(locale = 'en-US') {
  // Reactive locale for dynamic locale changes
  const currentLocale = ref(locale)

  // Create a formatter for EUR currency
  const currencyFormatter = computed(() => new Intl.NumberFormat(currentLocale.value, {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }))

  // Create a formatter for general number formatting
  const numberFormatter = computed(() => new Intl.NumberFormat(currentLocale.value, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }))

  // Format price with currency symbol
  const formatCurrency = (price: string | number): string => {
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price
    return currencyFormatter.value.format(numericPrice)
  }

  // Format price without currency symbol (just the number)
  const formatPrice = (price: string | number): string => {
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price
    return numberFormatter.value.format(numericPrice)
  }

  // Format price with custom currency
  const formatCurrencyWithCode = (price: string | number, currencyCode: string): string => {
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price
    const formatter = new Intl.NumberFormat(currentLocale.value, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
    return formatter.format(numericPrice)
  }

  // Format price with custom locale and currency
  const formatCurrencyWithLocale = (price: string | number, currencyCode: string, locale: string): string => {
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
    return formatter.format(numericPrice)
  }

  // Change locale
  const setLocale = (newLocale: string) => {
    currentLocale.value = newLocale
  }

  return {
    formatCurrency,
    formatPrice,
    formatCurrencyWithCode,
    formatCurrencyWithLocale,
    setLocale,
    currentLocale: computed(() => currentLocale.value)
  }
} 