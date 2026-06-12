import { DATA_THEME_NAME } from '@/config/base/themeMode.config'
import { LS_MODE_THEME } from '@/config/localStrorage.config'

// Tipe untuk theme, bisa disesuaikan jika ada lebih banyak jenis tema
type Theme = 'light' | 'dark' | 'auto'

// Fungsi untuk mendapatkan mode tema dari localStorage
export const themeMode = (): string | null =>
   localStorage.getItem(LS_MODE_THEME)

// Fungsi untuk menyimpan mode tema ke localStorage
export const setThemeMode = (theme: string): void =>
   localStorage.setItem(LS_MODE_THEME, theme)

// Fungsi untuk mendapatkan tema yang diinginkan oleh pengguna
export const getPreferredTheme = (): Theme => {
   const storedTheme = themeMode()
   if (storedTheme) {
      return storedTheme as Theme
   }

   return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
}

// Fungsi untuk mengatur mode tema
export const settingThemeMode = (theme: Theme): void => {
   if (theme === 'auto') {
      document.documentElement.setAttribute(
         DATA_THEME_NAME,
         window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light',
      )
   } else {
      document.documentElement.setAttribute(DATA_THEME_NAME, theme)
   }

   setThemeMode(theme)
}
