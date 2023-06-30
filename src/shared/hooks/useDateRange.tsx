import { useState } from 'react'

interface UseDateRangeObject {
  startDate: Date
  endDate: Date
  handleStartDateChange: (date: Date) => void
  handleEndDateChange: (date: Date) => void
}

interface UseDateRangeProps {
  initialStartDate?: Date
  initialEndDate?: Date
}

export const useDateRange = ({ initialStartDate = new Date(), initialEndDate = new Date() }: UseDateRangeProps): UseDateRangeObject => {
  const [startDate, setStartDate] = useState<Date>(initialStartDate)
  const [endDate, setEndDate] = useState<Date>(initialEndDate)

  const handleStartDateChange = (date: Date): void => {
    setStartDate(date)
  }

  const handleEndDateChange = (date: Date): void => {
    setEndDate(date)
  }

  return {
    startDate,
    endDate,
    handleStartDateChange,
    handleEndDateChange
  }
}
