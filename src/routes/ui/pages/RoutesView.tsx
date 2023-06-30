import React, { useState, useEffect, type ReactElement, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { findAllRoutes, getDateRange, getLastDateRequest, getRoutes, getStatus } from '@/shared/config/store/features/routes-slice'
import { STATUS } from '@/shared/config/store/types'
import { type AppDispatch } from '@/shared/config/store'
import Button from '@/shared/ui/components/Button'

import RoutesTable from './RoutesTable'
import { DateRange } from '@/shared/types/date-range'
import Divider from '@/shared/ui/components/Divider'
import { type Route } from '@/routes/models/route.interface'
import { generateExcel } from '@/routes/utils/json-to-sheet'
import { routeToExcelRoute } from '@/routes/utils/route-to-excel'
import { useDateRange } from '@/shared/hooks/useDateRange'
import CustomDatePicker from '@/shared/ui/components/CustomDatePicker'
import moment from 'moment'

const RoutesView = (): ReactElement => {
  // const routeServices = new RoutesServices()
  const dispatch = useDispatch<AppDispatch>()

  const routes = useSelector(getRoutes)
  const lastDateRequest = useSelector(getLastDateRequest)
  const routeStatus = useSelector(getStatus)
  const dateRangeStore = useSelector(getDateRange)

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showFilter, setShowFilter] = useState<boolean>(false)
  const [isExportingExcel, setIsExportingExcel] = useState<boolean>(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errorMessage, setErrorMessage] = useState<string>('')

  const routesFiltered = useRef<Route[]>(routes)

  const { startDate, endDate, handleEndDateChange, handleStartDateChange } = useDateRange({ initialEndDate: dateRangeStore._dateEnd, initialStartDate: dateRangeStore._dateStart })

  const setRoutesFiltered = (routes: Route[]): void => {
    routesFiltered.current = routes
  }

  const exportExcel = (): void => {
    setIsExportingExcel(true)
    // console.log(routesFiltered.current)
    void generateExcel(routesFiltered.current.map(routeToExcelRoute))
      .finally(() => {
        setTimeout(() => {
          setIsExportingExcel(false)
        }, 2000)
      })
  }

  useEffect(() => {
    const routesJson = sessionStorage.getItem('routes-request')
    if (!routesJson) {
      void dispatch(findAllRoutes({ dateRange: new DateRange(), profileId: '' }))
    }
  }, [])

  useEffect(() => {
    setIsLoading(routeStatus === STATUS.PENDING)
  }, [routeStatus])

  const findAll = (): void => {
    void dispatch(findAllRoutes({ dateRange: new DateRange({ dateEnd: endDate, dateStart: startDate }), profileId: '' }))
      .catch(error => {
        const { message } = error.data
        setErrorMessage(message.toUpperCase())
      })
  }

  return (
    <div>
      <div className='mt-4 mb-2 flex justify-between items-center'>
        <h1 className="font-bold text-3x text-left  uppercase text-3xl">Recorridos</h1>
        <div className='flex gap-2'>
          {routes.length > 0 && <Button color='primary' onClick={() => { setShowFilter(!showFilter) }}>{showFilter ? 'Ocultar filtros' : 'Mostrar filtros'}</Button>}
          {routes.length > 0 && <Button color='secondary' onClick={exportExcel} isLoading={isExportingExcel}>Exportar Excel</Button>}
        </div>
      </div>
      <Divider></Divider>
      <p className='font-medium uppercase'>Filtro</p>
      <div className='flex gap-7 items-center justify-between mt-2'>
          <div className='grid grid-cols-2 w-3/5 gap-5'>
            <CustomDatePicker
              label='Fecha Inicio'
              date={startDate}
              handleChange={handleStartDateChange}
            />
            <CustomDatePicker
              label='Fecha Fin'
              date={endDate}
              handleChange={handleEndDateChange}
            />
          </div>

          <div className='flex gap-3 justify-end items-center w-2/5'>
            <div>
              <p className='font-bold'>Fecha de última búsqueda</p>
              <p>{lastDateRequest !== null ? moment(lastDateRequest).format('DD/MM/YYYY hh:mm a') : ''}</p>
              <p className='font-bold'>Rango de fecha solicitada</p>
              <div className='flex gap-2 font-semibold'>
                <p>{dateRangeStore.formattedStartDate()}</p>
                <p>A</p>
                <p>{dateRangeStore.formattedEndDate()}</p>
              </div>
            </div>
            <Button color='secondary' onClick={findAll} isLoading={isLoading}>Buscar recorridos</Button>
          </div>
        </div>

      <div className='mb-6'></div>

      <RoutesTable routes={routes} showFilter={showFilter} setRoutesFiltered={setRoutesFiltered} />

    </div>
  )
}

export default RoutesView
