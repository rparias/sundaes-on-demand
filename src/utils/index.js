export function convertFirstLetterToUpperCase(string) {
  return string[0].toUpperCase() + string.slice(1).toLowerCase()
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount)
}
