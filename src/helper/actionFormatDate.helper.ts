'use client'
import moment, { Moment, unitOfTime } from 'moment'

export const actionFormatDateStrict = (
    value: string | Moment = '',
    format: string = 'DD MMM YYYY',
    baseFormat: string = 'DD/MM/YYYY',
) => {
    return moment(value, baseFormat).format(format)
}

export const oneTypeFormatDate = (
    value: string | moment.Moment = '',
    baseFormat: string = 'DD/MM/YYYY',
) => {
    return moment(value).format(baseFormat)
}

export const formatDateByTlt = (value) => {
    let dataValue = value

    if (value) {
        dataValue = moment(value, 'DD/MM/YYYY')
    }

    return value ? oneTypeFormatDate(dataValue, 'D MMMM YYYY') : '-'
}

export const formatDateTimeByTlt = (value) => {
    let dataValue = value

    if (value) {
        dataValue = moment(value, 'DD/MM/YYYY HH:mm')
    }

    return value ? oneTypeFormatDate(dataValue, 'DD MMMM YYYY HH:mm') : '-'
}

export const dateDifference = (
    fromDate: string,
    toDate: string,
    unitOfTime: unitOfTime.Diff = 'months',
    formatDefault: string = 'YYYY-MM',
) => {
    // ========== BASE FORMAT
    const baseFormat = 'DD/MM/YYYY'
    const baseFromDate = moment(fromDate, baseFormat, true)
    const baseToDate = moment(toDate, baseFormat, true)

    // ========== FORMAT TO CALCULATE
    const convertFromDate = oneTypeFormatDate(baseFromDate, formatDefault)
    const convertToDate = oneTypeFormatDate(baseToDate, formatDefault)

    // Start date
    const startDate = moment(convertFromDate)

    // End date
    const endDate = moment(convertToDate)

    // Calculate the difference in unitOfTime (months)
    const calculate = endDate.diff(startDate, unitOfTime)

    // console.log('calculate: ', calculate)

    return calculate
}
