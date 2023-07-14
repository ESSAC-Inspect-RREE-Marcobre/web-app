import { CHECKPOINT_INITIAL_STATE, type Checkpoint } from '@/checkpoints/models/checkpoint.interface'
import { ROUTE_INITIAL_STATE, type Route } from '@/routes/models/route.interface'
import RoutesServices from '@/routes/services/route.service'
import Divider from '@/shared/ui/components/Divider'
import moment from 'moment'
import React, { useState, type ReactElement, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

const CheckpointView = (): ReactElement => {
  const [searchParams] = useSearchParams()
  const [route, setRoute] = useState<Route>(ROUTE_INITIAL_STATE)

  const [checkpoint, setCheckpoint] = useState<Checkpoint>(CHECKPOINT_INITIAL_STATE)

  const observationsWithImages = useMemo(() => {
    if (checkpoint === null) return []

    return checkpoint.observations.filter(observation => observation.imageEvidence !== null && observation.imageEvidence.length > 0)
  }, [checkpoint])

  useEffect(() => {
    const routesService = new RoutesServices()

    const routeId = searchParams.get('route-id') ?? ''
    if (routeId === '') return
    void routesService.findById(routeId)
      .then(response => {
        setRoute(response)

        const { reports } = response

        const report = reports[0]

        const checkpointId = searchParams.get('checkpoint-id') ?? ''
        if (checkpointId === '') return

        const checkpoint = report.checkpoints.find(checkpoint => checkpoint.id === checkpointId)
        if (checkpoint === undefined) return

        setCheckpoint(checkpoint)
      })
  }, [])

  return (
    <div>
      <div className='border-[1px] border-black border-b-0 mx-auto h-full mb-10 break-inside-avoid'>
        <div className='flex justify-center  border-b-[1px] border-black'>
          <div className='w-[30%] grid place-items-center border-r-[1px] border-black'>
            <div className='p-5'>
              <img src="./logo-header.png" alt="" width={250} />
            </div>
          </div>
          <div className='w-[30%] border-r-[1px] border-black'>
            <div className='border-b-[1px] border-black py-2 bg-blue-dark text-white'>
              <p className='text-center uppercase font-semibold'>Supervisión de unidad</p>
            </div>
            <div className='border-b-[1px] border-black'>
              <div className='px-2 flex gap-2 '>
                <p>Código:</p>
                <p >{route?.code}</p>
              </div>
            </div>
            <div className='border-b-[1px] border-black'>
              <p className='px-2'>Version: 2</p>
            </div>
            <div className=''>
              <div className='flex gap-2 px-2'>
                <p>Fecha de elaboración</p>
                <p></p>
                <p>{moment(route?.createdAt).format('DD/MM/YYYY')}</p>
              </div>
            </div>
          </div>
          <div className='w-[40%] flex flex-col border-r-[1px] border-black'>
            <div className='h-[65%] border-b-[1px] border-black grid place-items-center'>
              <p className='text-center uppercase font-semibold'>Inspección de {route.reports.length > 0 ? route.reports[0].reportType.name : ''}</p>
              <p></p>
            </div>
            <div className='h-[30%] grid place-items-center'>
              <p className=''>Área: Seguridad y Salud Ocupacional</p>
            </div>
          </div>
        </div>
        <div className='h-3'></div>
        <div className='flex border-t-[1px] border-b-[1px] border-black'>
          <div className='w-[20%] border-r-[1px] border-black bg-blue-dark text-white text-center'>
            <p className='uppercase py-3 px-2'>Inspector</p>
          </div>
          <div className='w-[50%] border-r-[1px] border-black'>
            <p className='py-3 px-2'>{checkpoint?.profile.name} {checkpoint?.profile.lastName}</p>
          </div>
          <div className='w-[10%] border-r-[1px] border-black bg-blue-dark text-white text-center'>
            <p className='uppercase py-3 px-2'>Fecha</p>
          </div>
          <div className='w-[20%]'>
            <p className='py-3 px-2'>{moment(checkpoint?.createdAt).format('DD/MM/YYYY, h:mm A')}</p>
          </div>
        </div>
        <div className='h-[1px] bg-gray-400 w-full my-4'></div>
        <div className='border-b-[1px] border-black bg-blue-dark text-white'>
          <div className='flex'>
            <div className='w-[40%] grid items-center border-white'>
              <p className='px-2'>Campo</p>
            </div>
            <div className='w-[60%] grid items-center border-l-[1px] border-white'>
              <p className='px-2'>Observación</p>
            </div>
          </div>
        </div>
        <div className='border-b-[1px] border-black'>
          {
            checkpoint.observations.length === 0 &&
            (
              <div className='flex'>
                <div className='py-1 w-[100%] grid items-center border-black'>
                  <p className='font-bold px-2'>Se especificó que no hay observaciones en la supervisión</p>
                </div>
              </div>
            )
          }
          {
            checkpoint.observations.map(observation => {
              return (
                <div key={observation.id} className='flex'>
                  <div className='py-1 w-[40%] grid items-center border-black'>
                    <div className='flex gap-3'>
                      <p className='py-1 px-2 font-semibold'>{observation.fieldName}</p>
                    </div>
                  </div>
                  <div className='py-1 w-[60%] grid items-center border-l-[1px] border-black'>
                    <p className='py-1 px-2 font-semibold'>{observation.message}</p>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className='break-inside-avoid'>
        <h2 className='uppercase font-semibold text-2xl'>Evidencias de la supervisión</h2>
        <Divider className='mt-2' />
        {
          observationsWithImages.length > 0 && (
            <div className='grid grid-cols-2 gap-10 '>
              {
                observationsWithImages.map((image) => {
                  return (
                    <div key={image.id} className='flex flex-col justify-start items-start break-inside-avoid'>
                      <p className='font-semibold'>{image.fieldName}</p>
                      <div className='h-[450px]'>
                        <img src={image.imageEvidence} alt='evidence' className='w-full h-full object-contain' />
                      </div>
                    </div>
                  )
                })
              }
            </div>
          )
        }
      </div>
    </div>
  )
}

export default CheckpointView
