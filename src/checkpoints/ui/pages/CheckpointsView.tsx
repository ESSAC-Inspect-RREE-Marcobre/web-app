import Button from '@/shared/ui/components/Button'
import React, { type ReactElement, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ReportsService } from '@/reports/services/reports.service'
import RoutesServices from '@/routes/services/route.service'
import { type Checkpoint } from '@/checkpoints/models/checkpoint.interface'
import { type Route } from '@/routes/models/route.interface'
import moment from 'moment'
import Divider from '@/shared/ui/components/Divider'
import EyeIcon from '@/shared/ui/assets/icons/EyeIcon'
import { useBooleanState } from '@/shared/hooks/useBooleanState'
import ShowImageEvidence from '../components/ShowImageEvidence'
import { type Observation } from '@/checkpoints/models/observation.interface'
import { CheckpointPDFServices } from '@/checkpoints/services/checkpoint.service'

const CheckpointsView = (): ReactElement => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([])
  const [route, setRoute] = useState<Route | null>(null)

  const [selectedCheckpoint, setSelectedCheckpoint] = useState<Checkpoint | null>(null)
  const [showImage, toggleShowImage] = useBooleanState()
  const [isPdfLoading, setIsPdfLoading] = useState(false)

  const [observationSelected, setObservationSelected] = useState<Observation | null>(null)

  useEffect(() => {
    const reportsService = new ReportsService()
    const routesService = new RoutesServices()

    const reportId = searchParams.get('report-id') ?? ''
    if (reportId === '') return
    void reportsService.findAllCheckpoints(reportId)
      .then((response) => {
        const aux = response
        aux.sort((a, b) => a.createdAt.localeCompare(b.createdAt))
        setCheckpoints(aux)

        if (aux.length > 0) {
          setSelectedCheckpoint(aux[0])
        }
      })

    const routeId = searchParams.get('route-id') ?? ''
    if (routeId === '') return
    void routesService.findById(routeId)
      .then(response => {
        setRoute(response)
      })
  }, [])

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const checkpointId = event.target.value
    const checkpoint = checkpoints.find(checkpoint => checkpoint.id === checkpointId)
    if (checkpoint === undefined) return
    setSelectedCheckpoint(checkpoint)
  }

  const handleImageSelected = (observation: Observation): void => {
    setObservationSelected(observation)
    toggleShowImage()
  }

  const handleExportPdf = (): void => {
    setIsPdfLoading(true)

    if (route === null || selectedCheckpoint == null) return

    const checkpointPDFService = new CheckpointPDFServices()
    void checkpointPDFService.exportPdf(selectedCheckpoint.id, route.code, route.id, selectedCheckpoint.checkpointNumber)
      .then(() => {
        setIsPdfLoading(false)
      })
  }

  return (
    <div className='container-page'>
      <div className='flex justify-between items-end'>
        <p className='uppercase text-2xl font-semibold'>Recorrido {route?.name}</p>

        <div className="flex gap-2">
          <Button color='primary' onClick={handleExportPdf} isLoading={isPdfLoading}>Exportar PDF</Button>
          <Button color='secondary' onClick={() => { navigate(-1) }}>Volver</Button>
        </div>
      </div>
      <div className='w-full border-b-2 mt-2'></div>

      <select
        className='w-[250px] mt-3 border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-400'
        onChange={handleSelectChange}>
        {
          checkpoints.map((checkpoint, index) => {
            return (
              <option key={checkpoint.id} value={checkpoint.id}>Supervisión #{index + 1}</option>
            )
          })
        }
      </select>

      <Divider />

      <div className='border-[1px] border-black border-b-0 mx-auto h-full mb-10'>
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
              <p className='text-center uppercase font-semibold'>Inspección de {route?.reports[0].reportType.name}</p>
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
            <p className='py-3 px-2'>{selectedCheckpoint?.profile.name} {selectedCheckpoint?.profile.lastName}</p>
          </div>
          <div className='w-[10%] border-r-[1px] border-black bg-blue-dark text-white text-center'>
            <p className='uppercase py-3 px-2'>Fecha</p>
          </div>
          <div className='w-[20%]'>
            <p className='py-3 px-2'>{moment(selectedCheckpoint?.createdAt).format('DD/MM/YYYY, h:mm A')}</p>
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
            selectedCheckpoint && selectedCheckpoint?.observations.length === 0 &&
            (
              <div className='flex'>
                <div className='py-1 w-[100%] grid items-center border-black'>
                  <p className='font-bold px-2'>Se especificó que no hay observaciones en la supervisión</p>
                </div>
              </div>
            )
          }
          {
            selectedCheckpoint?.observations.map(observation => {
              return (
                <div key={observation.id} className='flex'>
                  <div className='py-1 w-[40%] grid items-center border-black'>
                    <div className='flex gap-3'>
                      <p className='py-1 px-2 font-semibold'>{observation.fieldName}</p>
                      {observation.imageEvidence !== '' && <EyeIcon className='w-6 h-6 cursor-pointer transition-all hover:text-red' onClick={() => { handleImageSelected(observation) }}></EyeIcon>}
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

      {showImage && observationSelected && <ShowImageEvidence isOpen={showImage} imageUrl={observationSelected.imageEvidence} name={observationSelected.fieldName} onClose={toggleShowImage} />}

    </div>

  )
}

export default CheckpointsView
