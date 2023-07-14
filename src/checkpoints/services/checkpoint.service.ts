
import { AppServices } from '@/shared/service/api.service'
import { type Checkpoint } from '../models/checkpoint.interface'

export default class CheckpointsServices extends AppServices {
  constructor () {
    super({ baseUrl: 'checkpoints', contentType: 'application/json' })
  }

  findById = async (id: string): Promise<Checkpoint> => {
    return await this.get<Checkpoint>(`/${id}`)
      .then(response => response.data)
  }
}

export class CheckpointPDFServices extends AppServices {
  constructor () {
    super({ baseUrl: 'checkpoints', contentType: 'application/pdf' })
  }

  exportPdf = async (id: string, routeCode: string, routeId: string, checkpointNumber: number): Promise<void> => {
    await this.get<any>(`/${id}/generate-pdf?routeCode=${routeCode}&routeId=${routeId}`, {
      responseType: 'blob'
    })
      .then(response => {
        const blob = new Blob([response.data], { type: 'application/pdf' })
        const downloadUrl = URL.createObjectURL(blob)
        const link = document.createElement('a')

        const name = `${routeCode}-supervision-${checkpointNumber}`.toUpperCase()

        link.href = downloadUrl
        link.download = `${name}.pdf`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      })
  }
}
