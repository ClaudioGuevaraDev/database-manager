import { HeroUIProvider } from '@heroui/react'
import { useTheme } from '@heroui/use-theme'
import useGetConnections from '@renderer/hooks/useGetConnections'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { JSX } from 'react'
import { Toaster } from 'sonner'

export const Route = createRootRoute({
  component: Root
})

function Root(): JSX.Element {
  const { theme } = useTheme()
  useGetConnections()

  return (
    <>
      <HeroUIProvider>
        <main className="text-foreground bg-background w-full h-full min-h-screen">
          <Outlet />
          <Toaster
            richColors
            position="bottom-right"
            theme={theme === 'light' ? 'light' : 'dark'}
          />
        </main>
      </HeroUIProvider>
    </>
  )
}
