console.log('Product script loaded')

export function formatPrice(cents) {
  return `$${(cents / 100).toFixed(2)}`
}
