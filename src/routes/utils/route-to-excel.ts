import moment from 'moment'
import { type Route } from '../models/route.interface'

const formatDate = (date: string): string => {
  return moment(date).format('DD/MM/YYYY')
}

const formatTime = (date: string): string => {
  return moment(date).format('h:mm A')
}

export const routeToExcelRoute = (route: Route): Record<string, any> => {
  const { createdAt, startLocation, endLocation, materialType, materialAmount, code, isFull, vehicles, routeProfiles, startPernocte } = route

  const excelRoute = {
    CÓDIGO: code,
    FECHA: formatDate(createdAt),
    HORA: formatTime(createdAt),
    CONDUCTOR: '',
    COPILOTO: 'NO REGISTRADO',
    UNIDAD: '',
    'PLACA CABINA': '',
    ACOPLADO: '',
    'PLACA ACOPLADO': '',
    CONDICIÓN: isFull ? 'Cargado' : 'Vacío',
    'TIPO DE MATERIAL': materialType.length > 0 ? materialType : 'NO REGISTRADO',
    CANTIDAD: materialAmount.length > 0 ? materialAmount : 'NO REGISTRADO',
    EMPRESA: 'NO REGISTRADO',
    INICIO: startLocation,
    DESTINO: endLocation,
    PERNOCTE: startPernocte ? formatTime(startPernocte) : 'NO REGISTRADO'
  }

  vehicles.forEach((vehicle) => {
    if (vehicle.vehicleType.isCart) {
      excelRoute.ACOPLADO = vehicle.vehicleType.name
      excelRoute['PLACA ACOPLADO'] = vehicle.licensePlate
    } else {
      excelRoute.UNIDAD = vehicle.vehicleType.name
      excelRoute['PLACA CABINA'] = vehicle.licensePlate
    }
  })

  const routeProfile = routeProfiles.find(routeProfile => routeProfile.role === 'conductor')
  if (routeProfile) {
    const { profile } = routeProfile
    excelRoute.CONDUCTOR = `${profile.name} ${profile.lastName}`
  }

  const copilotProfile = routeProfiles.find(routeProfile => routeProfile.role === 'copiloto')
  if (copilotProfile) {
    const { profile } = copilotProfile
    excelRoute.COPILOTO = `${profile.name} ${profile.lastName}`
  } else if (route.copilotFullName !== null && route.copilotFullName.length > 0) {
    excelRoute.COPILOTO = route.copilotFullName
  }

  return excelRoute
}
