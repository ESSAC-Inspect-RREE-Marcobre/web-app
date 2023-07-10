import moment from 'moment'

export const capitalize = (str: string): string => {
  return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

export const isDate = (date: string): boolean => {
  return !isNaN(Date.parse(date))
}

export const formatDate = (date: string): string => {
  return moment(date).format('DD/MM/YYYY')
}

export const formatDateTime = (date: string): string => {
  return moment(date).format('DD/MM/YYYY HH:mm A')
}

export const formatTime = (date: string): string => {
  return moment(date).format('HH:mm A')
}
