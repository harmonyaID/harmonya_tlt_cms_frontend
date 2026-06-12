declare global {
   interface Window {
      globalBootstrap: any
   }
}

const loadBootstrapHelper = async (): Promise<any> => {
   if (!window.globalBootstrap) {
      const dataBootstrap: any = await import(
         'bootstrap/dist/js/bootstrap.bundle.js'
      )
      window.globalBootstrap = dataBootstrap
   }
   return window.globalBootstrap
}

export default loadBootstrapHelper
