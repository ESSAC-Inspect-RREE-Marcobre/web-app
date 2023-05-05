export const goToGoogleMapsPage = (locationString: string): void => {
  const location = locationString.split(',')
  const [latitude, longitude] = [location[0], location[1]]

  const link = `http://maps.google.com/maps?z=12&t=m&q=loc:${latitude}+${longitude}`

  window.open(link, '_blank', 'noopener,noreferrer')
}

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' })
}
