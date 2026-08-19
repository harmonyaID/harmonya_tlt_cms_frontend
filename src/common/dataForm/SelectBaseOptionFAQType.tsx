import SelectBaseOption from '@/common/dataForm/SelectBaseOption.tsx'
import { SelectBaseOptionProps } from '@/common/dataForm/type/selectOption.type.ts'
import useDataListHook from '@/hook/base/useDataList.hook.ts'
import {
    apiExperienceType,
    apiFAQType,
} from '@/service/api/contentManageSetting.api.ts'

const SelectBaseOptionFAQType = (props: SelectBaseOptionProps) => {
    const { __list, __isLoading } = useDataListHook({
        urlAPI: ({ search }) =>
            apiFAQType.list({ search, page: 0 }, 'tcSelectBaseOptionFAQType'),
    })

    return (
        <SelectBaseOption
            {...props}
            listStore={__list}
            disabled={__isLoading}
            isLoadingStore={__isLoading}
        />
    )
}

export default SelectBaseOptionFAQType
