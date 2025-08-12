import React, { createContext, useMemo, useState, useEffect } from 'react'
import { createTheme, ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import rtlPlugin from 'stylis-plugin-rtl'
import { prefixer } from 'stylis'

export const ColorModeContext = createContext({ mode: 'light', toggleColorMode: () => {} })

// Emotion cache with RTL support
const createRtlCache = () =>
  createCache({ key: 'mui-rtl', stylisPlugins: [prefixer, rtlPlugin] })

export default function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => localStorage.getItem('color-mode') || 'light')

  useEffect(() => {
    localStorage.setItem('color-mode', mode)
  }, [mode])

  const toggleColorMode = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'))

  const theme = useMemo(
    () =>
      createTheme({
        direction: 'rtl',
        palette: {
          mode,
          primary: { main: '#1976d2' },
        },
        typography: {
          fontFamily: 'Noto Naskh Arabic, Noto Sans Arabic, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
        },
      }),
    [mode]
  )

  const cache = useMemo(() => createRtlCache(), [])

  return (
    <CacheProvider value={cache}>
      <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </MuiThemeProvider>
      </ColorModeContext.Provider>
    </CacheProvider>
  )
}
