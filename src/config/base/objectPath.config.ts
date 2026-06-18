import { isEmpty } from 'lodash'

export const basenameRoute: string = '' //import.meta.env.VITE_ROUTE_APP || ''

export const pathBasenameRoute = (feature: string) => {
    return basenameRoute + '/' + feature
}

export const objectPathMenu = (
    name: string = '',
    uniq: string | number = ':id',
    edit: string = '/',
) => {
    const main = basenameRoute + '/' + name

    return {
        main,
        add: main + '/add',
        detail: (id: string | number = uniq) => main + '/' + id + '/detail',
        edit: (id: string | number = uniq) => main + '/' + id + '/edit',
    }
}

interface Feature {
    name: string
    path: string
    isMenuId?: boolean
}

export const objectPathEndPointAPI = (
    menu: string | number = '',
    addFeatures: Feature[] = [],
) => {
    const _menu = String(menu)

    const _configWithId = (menuId: string | number, name: string = '') =>
        _menu + '/' + menuId + name

    const features: { [key: string]: ((menuId: string) => string) | string } =
        {}
    if (!isEmpty(addFeatures)) {
        addFeatures.forEach((vm) => {
            const { name, path, isMenuId = false } = vm

            if (!isEmpty(name)) {
                features[name] = isMenuId
                    ? (menuId: string) => _configWithId(menuId, path)
                    : _menu + path
            }
        })
    }

    return {
        main: _menu,
        detail: (menuId: string | number) => _configWithId(menuId),
        update: (menuId: string | number, isSlasUpdate?: boolean) =>
            _configWithId(menuId, isSlasUpdate ? '/update' : ''),
        delete: (menuId: string | number) => _configWithId(menuId),
        ...features,
    }
}
