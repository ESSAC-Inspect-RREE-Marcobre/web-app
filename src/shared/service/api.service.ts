import { AuthStore } from '@/auth/services/auth.store'
import axios, { type AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { StatusCodes } from 'http-status-codes'

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? '/api/v1'

export abstract class AppServices {
  _baseUrl: string
  _fullBaseApiURL: string
  _contentType: string

  constructor (config: { baseUrl: string, contentType: string }) {
    this._baseUrl = config.baseUrl
    this._contentType = config.contentType

    this._fullBaseApiURL = `${API_BASE_URL}/${this._baseUrl}`
    this.setHeader()
  }

  setHeader (): void {
    const token = new AuthStore().getToken()
    if (token) { axios.defaults.headers.common.Authorization = `Bearer ${token}` }

    axios.defaults.headers.common['Content-Type'] = this._contentType
  }

  removeHeader (): void {
    axios.defaults.headers.common = {}
  }

  protected async get <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return await axios.get(this._fullBaseApiURL + url, config)
      .then((response: AxiosResponse) => {
        return response
      })
      .catch(async (error: AxiosError) => {
        if (error.response?.status === StatusCodes.UNAUTHORIZED) {
          console.log(error)
        }
        return await Promise.reject(error.response)
      })
  }

  protected async post <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return await axios.post(this._fullBaseApiURL + url, data, config)
      .then((response: AxiosResponse) => {
        return response
      })
      .catch(async (error: AxiosError) => {
        if (error.response?.status === StatusCodes.UNAUTHORIZED) {
          console.log(error)
        }
        return await Promise.reject(error.response)
      })
  }

  protected async patch <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return await axios.patch(this._fullBaseApiURL + url, data, config)
      .then((response: AxiosResponse) => {
        return response
      })
      .catch(async (error: AxiosError) => {
        if (error.response?.status === StatusCodes.UNAUTHORIZED) {
          console.log(error)
        }
        return await Promise.reject(error.response)
      })
  }

  protected async put <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return await axios.put(this._fullBaseApiURL + url, data, config)
      .then((response: AxiosResponse) => {
        return response
      })
      .catch(async (error: AxiosError) => {
        if (error.response?.status === StatusCodes.UNAUTHORIZED) {
          console.log(error)
        }
        return await Promise.reject(error.response)
      })
  }

  protected async delete <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return await axios.delete(this._fullBaseApiURL + url, config)
      .then((response: AxiosResponse) => {
        return response
      })
      .catch(async (error: AxiosError) => {
        if (error.response?.status === StatusCodes.UNAUTHORIZED) {
          console.log(error)
        }
        return await Promise.reject(error.response)
      })
  }
}
