'use client'
export type Theme = 'dark' | 'light' | 'system'

// components/theme-provider.tsx


import React, { createContext, useContext, useEffect, useState } from 'react'

type ThemeProviderProps = {
    children: React.ReactNode
    defaultTheme?: Theme
    storageKey?: string
}

type ThemeProviderState = {
    theme: Theme
    setTheme: (theme: Theme) => void
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined)

export function ThemeProvider({
    children,
    defaultTheme = 'system',
    storageKey = 'ui-theme',
}: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(defaultTheme)


    useEffect(() => {
        const root = window.document.documentElement
        const savedTheme = localStorage.getItem(storageKey) as Theme | null

        if (savedTheme) {
            setTheme(savedTheme)
            root.classList.remove('light', 'dark')
            root.classList.add(savedTheme)
        }
    }, [storageKey])

    useEffect(() => {
        const root = window.document.documentElement

        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        const resolvedTheme = theme === 'system' ? systemTheme : theme

        root.classList.remove('light', 'dark')
        root.classList.add(resolvedTheme)
        localStorage.setItem(storageKey, theme)
    }, [theme, storageKey])



    return (
        <ThemeProviderContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeProviderContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext)
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}