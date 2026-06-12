import currencyFormatter, { Options } from 'currency-formatter'

interface DataConfig {
    code: string
    symbol: string
    thousand: string
    decimal: string
    symbolOnLeft: boolean
    spaceBetweenAmountAndSymbol: boolean
    precision: number
}

const dataConfig: DataConfig = {
    code: 'ID',
    symbol: 'Rp ',
    thousand: '.',
    decimal: ',',
    symbolOnLeft: false,
    spaceBetweenAmountAndSymbol: true,
    precision: 0,
}

const currencyHelper = (
    value: string | number | any,
    config: Partial<Options> = {},
) =>
    currencyFormatter.format(value, {
        ...dataConfig,
        ...config,
    })

export default currencyHelper
