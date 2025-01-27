// components/theme-toggle.tsx
'use client'
import React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from './theme-provider'
import { Button } from '@/components/ui/button'


export function ThemeToggle() {
    const { setTheme, theme } = useTheme()

    const sound = React.useMemo(() => {
        if (typeof window !== 'undefined') {
            return new Audio('/click.m4a')
        }
        return null
    }, [])

    React.useEffect(() => {
        if (sound) {
            sound.load()
        }
        // Cleanup
        return () => {
            if (sound) {
                sound.remove()
            }
        }
    }, [sound])

    const handleToggle = React.useCallback(() => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(newTheme)

        // Play the appropriate sound


        if (sound) {
            // Reset the audio to start and play
            sound.currentTime = 0

            // Handle play() promise to avoid uncaught promise rejection
            const playPromise = sound.play()
            if (playPromise !== undefined) {
                playPromise.catch((error) => {
                    console.log('Audio playback failed:', error)
                })
            }
        }

    }, [theme, setTheme, sound,])
    return (
        <Button
            variant="outline"
            size="icon"
            onClick={handleToggle}
            className="relative"
        >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}