import { useState, useEffect } from 'react'
import { useLocation, useSearchParams } from 'react-router'
import { isEmpty } from 'lodash'
import useDataDetailHook from './base/useDataDetail.hook'
import { DataConfigDetailSearchParam } from './type/hook.type'

const useDataDetailSearchParamHook = ({
    urlAPI = async () => ({}),
    list = [],
    keyParam = 'id',
    keyFindBy = 'uuid',
    isUsePreviousSelected = true,
}: DataConfigDetailSearchParam) => {
    const location = useLocation()

    const [selectedData, setSelectedData] = useState<any>({})
    const [searchParams, setSearchParams] = useSearchParams()

    const { __detail, __isLoading, __actionUpdate } = useDataDetailHook({
        urlAPI: () => urlAPI(selectedData?.[keyFindBy]),
        isCallAPI: !isEmpty(selectedData),
        triggerBy: selectedData?.[keyFindBy],
    })

    const _handleUpdateSelectedData = (newData: object | any = {}) => {
        setSelectedData((prevState) => {
            return {
                ...prevState,
                ...newData,
            }
        })
    }

    useEffect(() => {
        if (searchParams.has(keyParam)) {
            const dataBy = searchParams.get(keyParam)
            const productJustification = list.find(
                (vm) => vm[keyFindBy] === dataBy,
            )

            if (!isEmpty(productJustification)) {
                setSelectedData(productJustification)
            }
        }

        if (!isEmpty(location.state?.selectedData) && isUsePreviousSelected) {
            setSearchParams({ id: location.state?.selectedData?.[keyFindBy] })
        }
    }, [searchParams, list])

    return {
        __detail,
        __isLoading,
        __selectedDataDetail: selectedData,
        __actionSetSearchParams: setSearchParams,
        __actionUpdate,
        __actionUpdateSelectedData: _handleUpdateSelectedData,
    }
}

export default useDataDetailSearchParamHook
