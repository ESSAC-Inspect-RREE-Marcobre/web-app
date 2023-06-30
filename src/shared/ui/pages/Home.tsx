import React, { type ReactElement, useEffect, useState } from 'react'
// import useMediaQuery from '@/shared/hooks/userMediaQuery'
import { type AppDispatch } from '@/shared/config/store'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../components/Button'
import { findAllRoutes, getDateRange, getLastDateRequest, getReports, getStatus } from '@/shared/config/store/features/routes-slice'
import { DateRange } from '@/shared/types/date-range'
import { useDateRange } from '@/shared/hooks/useDateRange'

import CustomDatePicker from '../components/CustomDatePicker'
import moment from 'moment'
import { STATUS } from '@/shared/config/store/types'

const Home = (): ReactElement => {
  const dispatch = useDispatch<AppDispatch>()

  const routeStatus = useSelector(getStatus)
  const reports = useSelector(getReports)
  const lastDateRequest = useSelector(getLastDateRequest)
  const dateRangeFromStore = useSelector(getDateRange)

  const [reportsByType, setReportsByType] = useState<Map<string, number>>(new Map<string, number>())
  const { startDate, endDate, handleEndDateChange, handleStartDateChange } = useDateRange({})

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const reportsJson = sessionStorage.getItem('routes-request')
    if (!reportsJson) {
      void dispatch(findAllRoutes({ dateRange: new DateRange(), profileId: '' }))
    }
  }, [reports])

  useEffect(() => {
    groupReportsByReportType()
  }, [reports])

  useEffect(() => {
    setIsLoading(routeStatus === STATUS.PENDING)
  }, [routeStatus])

  const findAll = (): void => {
    void dispatch(findAllRoutes({ dateRange: new DateRange({ dateEnd: endDate, dateStart: startDate }), profileId: '' }))
  }

  const groupReportsByReportType = (): void => {
    const reportsByReportType: Map<string, number> = new Map<string, number>()
    reports.forEach(report => {
      const name = report.reportType.name
      const value = reportsByReportType.get(name) ?? 0
      reportsByReportType.set(name, reportsByReportType.has(name) ? value + 1 : 1)
    })

    setReportsByType(reportsByReportType)
  }

  return (
    <div className='container-page'>
      <main>
        <h1 className='text-4xl font-bold'><span className='text-red-logo'>ESSAC</span>-RREE</h1>
        <div className='w-full border-b-2 mt-2 mb-4'></div>

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
                <p>{dateRangeFromStore.formattedStartDate()}</p>
                <p>A</p>
                <p>{dateRangeFromStore.formattedEndDate()}</p>
              </div>
            </div>
            <Button color='secondary' onClick={findAll} isLoading={isLoading}>Buscar recorridos</Button>
          </div>
        </div>

        <div className='mt-4'>
          <p className='uppercase font-semibold text-xl'>Cantidad de Reportes</p>
          {Array.from(reportsByType.entries()).length > 0
            ? (
              <div className='flex gap-5 mt-5'>
                {
                  Array.from(reportsByType.entries()).map(([key, value]) => {
                    return (
                      <div
                        className='inline-block p-8 bg-black text-white rounded-md text-center'
                        key={key}>
                        <p className='text-xl'>{key.toUpperCase()}</p>
                        <p className='text-2xl'>{value}</p>
                      </div>
                    )
                  })
                }
              </div>
              )
            : (
              <p className='uppercase mt-3 text-red font-semibold'>No hay recorridos registrados en ese rango de fecha</p>
              )
          }

        </div>
      </main>
    </div>
  )
}

export default Home
