import { useState } from 'react'
import {
    ModeLayoutBox,
    ModeLayoutListInObject,
} from '@/common/misc/OptionModeLayoutList.tsx'
import {
    getLocalStorage,
    setLocalStorage,
} from '@/helper/base/localStorage.helper.ts'
import {
    UseDisplayModeLayoutType,
    DirectoryDisplayModelType,
} from '@/hook/dev/type/useDisplayModeLayout.type.ts'

const useDisplayModeLayout = (passKey: string) => {
    const KEY_LS: string = passKey

    const [dataDisplayMode, setDisplayMode] =
        useState<UseDisplayModeLayoutType>(
            getLocalStorage(KEY_LS)
                ? ModeLayoutListInObject[getLocalStorage(KEY_LS)]
                : ModeLayoutBox,
        )

    const _handleDisplayModeWithCache = (
        passData: DirectoryDisplayModelType = {} as DirectoryDisplayModelType,
    ) => {
        setLocalStorage(KEY_LS, passData?.id || '')
        setDisplayMode(passData)
    }

    return {
        __dataDisplayMode: dataDisplayMode,
        __setDisplayMode: _handleDisplayModeWithCache,
    }
}

export default useDisplayModeLayout
