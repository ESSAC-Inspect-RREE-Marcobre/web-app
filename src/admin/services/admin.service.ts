import { AppServices } from '@/shared/service/api.service'
import { type ExcelResponse } from '../responses/excel.response'

export class AdminService extends AppServices {
  constructor () {
    super({ baseUrl: 'admin', contentType: 'application/json' })
  }

  importUserExcel = async (file: any): Promise<ExcelResponse> => {
    return await this.post<ExcelResponse>('/import-user-excel', file)
      .then(response => response.data)
  }

  importVehicleExcel = async (file: any): Promise<ExcelResponse> => {
    return await this.post<ExcelResponse>('/import-vehicle-excel', file)
      .then(response => response.data)
  }

  importCartExcel = async (file: any): Promise<ExcelResponse> => {
    return await this.post<ExcelResponse>('/import-cart-excel', file)
      .then(response => response.data)
  }
}
