export const DATA_SERVICE_NAME_THEME_MODE: string =
   import.meta.env.VITE_STYLE_THEME_MODE || 'data-bs-theme'
export const DATA_THEME_NAME: string = import.meta.env.VITE_STYLE_THEME_MODE
   ? `data-bs-theme-${import.meta.env.VITE_STYLE_THEME_MODE}`
   : 'data-bs-theme'
