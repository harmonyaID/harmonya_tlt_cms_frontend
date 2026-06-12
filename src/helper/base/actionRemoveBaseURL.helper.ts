const basenameRoute: string = import.meta.env.VITE_ROUTE_APP

const actionRemoveBaseURLHelper = (path: string): string =>
    path.replace(basenameRoute, '')

export default actionRemoveBaseURLHelper
