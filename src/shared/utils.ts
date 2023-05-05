export const capitalize = (str: string): string => {
  return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

export const isDate = (date: string): boolean => {
  return !isNaN(Date.parse(date))
}
