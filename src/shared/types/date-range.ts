import moment from 'moment'

type Option = 'numeric' | '2-digit' | undefined

interface DateTimeFormatOptions {
  year: Option
  month: Option
  day: Option
}

export const LOCALE_OPTIONS: DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' }

export class DateRange {
  _dateStart: Date
  _dateEnd: Date

  constructor ({ dateStart = new Date(), dateEnd = new Date() } = {}) {
    this._dateStart = dateStart
    this._dateEnd = dateEnd
  }

  static fromJson = (json: any): DateRange => {
    const dateStart = json['date-start'] ? new Date(json['date-start']) : new Date()
    const dateEnd = json['date-end'] ? new Date(json['date-end']) : new Date()
    return new DateRange({ dateStart, dateEnd })
  }

  toObject = (): DateRangeObject => {
    return {
      'date-start': this.timestampDateStart(),
      'date-end': this.timestampDateEnd()
    }
  }

  timestampDateStart = (): number => this._dateStart.getTime()
  timestampDateEnd = (): number => this._dateEnd.getTime()

  formattedStartDate = (): string => moment(this._dateStart).format('DD/MM/YYYY')
  formattedEndDate = (): string => moment(this._dateEnd).format('DD/MM/YYYY')
}

export interface DateRangeObject {
  'date-start': number
  'date-end': number
}

export function UTCToLocalDateStringInput (date: Date): string {
  const dateString = date.toLocaleDateString('es-PE', LOCALE_OPTIONS)
  const values = dateString.split('/')
  return `${values[2]}-${values[1]}-${values[0]}`
}
