import { describe, it, expect, beforeEach } from 'vitest'
import { useCurrency } from '@/composables/useCurrency'

describe('useCurrency', () => {
  let currency: ReturnType<typeof useCurrency>

  beforeEach(() => {
    currency = useCurrency()
  })

  describe('formatCurrency', () => {
    it('should format string price with EUR currency', () => {
      const result = currency.formatCurrency('29.99')
      expect(result).toMatch(/€\s*29\.99/)
    })

    it('should format number price with EUR currency', () => {
      const result = currency.formatCurrency(29.99)
      expect(result).toMatch(/€\s*29\.99/)
    })

    it('should handle zero price', () => {
      const result = currency.formatCurrency(0)
      expect(result).toMatch(/€\s*0\.00/)
    })

    it('should handle large numbers', () => {
      const result = currency.formatCurrency(1234567.89)
      expect(result).toMatch(/€\s*1,234,567\.89/)
    })
  })

  describe('formatPrice', () => {
    it('should format string price without currency symbol', () => {
      const result = currency.formatPrice('29.99')
      expect(result).toBe('29.99')
    })

    it('should format number price without currency symbol', () => {
      const result = currency.formatPrice(29.99)
      expect(result).toBe('29.99')
    })

    it('should handle zero price', () => {
      const result = currency.formatPrice(0)
      expect(result).toBe('0.00')
    })

    it('should handle large numbers', () => {
      const result = currency.formatPrice(1234567.89)
      expect(result).toBe('1,234,567.89')
    })
  })

  describe('formatCurrencyWithCode', () => {
    it('should format USD currency correctly', () => {
      const result = currency.formatCurrencyWithCode('29.99', 'USD')
      expect(result).toMatch(/\$\s*29\.99/)
    })

    it('should format EUR currency correctly', () => {
      const result = currency.formatCurrencyWithCode('29.99', 'EUR')
      expect(result).toMatch(/€\s*29\.99/)
    })

    it('should format GBP currency correctly', () => {
      const result = currency.formatCurrencyWithCode('29.99', 'GBP')
      expect(result).toMatch(/£\s*29\.99/)
    })

    it('should handle number input', () => {
      const result = currency.formatCurrencyWithCode(29.99, 'USD')
      expect(result).toMatch(/\$\s*29\.99/)
    })

    it('should handle zero price', () => {
      const result = currency.formatCurrencyWithCode(0, 'USD')
      expect(result).toMatch(/\$\s*0\.00/)
    })
  })

  describe('formatCurrencyWithLocale', () => {
    it('should format with US locale and USD currency', () => {
      const result = currency.formatCurrencyWithLocale('29.99', 'USD', 'en-US')
      expect(result).toMatch(/\$\s*29\.99/)
    })

    it('should format with German locale and EUR currency', () => {
      const result = currency.formatCurrencyWithLocale('29.99', 'EUR', 'de-DE')
      expect(result).toMatch(/29,99\s*€/)
    })

    it('should format with French locale and EUR currency', () => {
      const result = currency.formatCurrencyWithLocale('29.99', 'EUR', 'fr-FR')
      expect(result).toMatch(/29,99\s*€/)
    })

    it('should handle number input', () => {
      const result = currency.formatCurrencyWithLocale(29.99, 'USD', 'en-US')
      expect(result).toMatch(/\$\s*29\.99/)
    })
  })

  describe('setLocale', () => {
    it('should change the current locale', () => {
      expect(currency.currentLocale.value).toBe('en-US')
      
      currency.setLocale('de-DE')
      expect(currency.currentLocale.value).toBe('de-DE')
    })

    it('should update formatting after locale change', () => {
      // Initial formatting
      const initialResult = currency.formatCurrency('29.99')
      expect(initialResult).toMatch(/€\s*29\.99/)
      
      // Change locale
      currency.setLocale('de-DE')
      
      // Formatting should reflect new locale
      const newResult = currency.formatCurrency('29.99')
      expect(newResult).toMatch(/29,99\s*€/)
    })
  })

  describe('currentLocale', () => {
    it('should be reactive', () => {
      expect(currency.currentLocale.value).toBe('en-US')
      
      currency.setLocale('fr-FR')
      expect(currency.currentLocale.value).toBe('fr-FR')
    })
  })

  describe('Edge cases', () => {
    it('should handle invalid price strings', () => {
      const result = currency.formatCurrency('invalid')
      expect(result).toMatch(/€\s*NaN/)
    })

    it('should handle negative numbers', () => {
      const result = currency.formatCurrency(-29.99)
      expect(result).toMatch(/€\s*-29\.99|-\s*€\s*29\.99/)
    })

    it('should handle very small numbers', () => {
      const result = currency.formatCurrency(0.01)
      expect(result).toMatch(/€\s*0\.01/)
    })

    it('should handle very large numbers', () => {
      const result = currency.formatCurrency(999999999.99)
      expect(result).toMatch(/€\s*999,999,999\.99/)
    })
  })

  describe('Custom locale initialization', () => {
    it('should initialize with custom locale', () => {
      const customCurrency = useCurrency('de-DE')
      expect(customCurrency.currentLocale.value).toBe('de-DE')
    })

    it('should format with custom locale from initialization', () => {
      const customCurrency = useCurrency('de-DE')
      const result = customCurrency.formatCurrency('29.99')
      expect(result).toMatch(/29,99\s*€/)
    })
  })
}) 