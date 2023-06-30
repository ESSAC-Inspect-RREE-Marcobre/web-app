import React, { useRef, type ReactElement } from 'react'
import DatePicker from 'react-datepicker'
import CalendarIcon from '../assets/icons/CalendarIcon'

import 'react-datepicker/dist/react-datepicker.css'

interface CustomDatePickerProps {
  label: string
  date: Date
  handleChange: (date: Date) => void
  className?: string
}

const CustomDatePicker = ({ label, date, handleChange, className = '' }: CustomDatePickerProps): ReactElement => {
  const pickerRef = useRef(null)

  const handleClick = (): void => {
    if (pickerRef.current === null) return

    const { input } = pickerRef.current

    const inputHtml = input as HTMLInputElement

    inputHtml.click()
    inputHtml.focus()
  }

  return (
    <div className={className}>
      <p>{label}</p>
      <div
        onClick={handleClick}
        className='w-full border border- rounded py-2 px-3 text-gray-700 leading-tight flex justify-between cursor-pointer'>
        <div className=''>
          <DatePicker
            className=''
            selected={date}
            onChange={handleChange}
            showTimeSelect
            dateFormat='Pp'
            ref={pickerRef}
          />
        </div>
        <CalendarIcon />
      </div>
    </div>
  )
}

export default CustomDatePicker
