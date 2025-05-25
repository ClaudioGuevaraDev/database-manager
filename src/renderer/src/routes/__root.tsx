import { HeroUIProvider } from '@heroui/react'
import useGetConnections from '@renderer/hooks/general/useGetConnections'
import useHandleInitialMode from '@renderer/hooks/general/useHandleInitialMode'
import { useSettingsStore } from '@renderer/store/settingsStore'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { JSX } from 'react'
import { Toaster } from 'sonner'

export const Route = createRootRoute({
  component: Root
})

function Root(): JSX.Element {
  useGetConnections()
  useHandleInitialMode()

  const { mode } = useSettingsStore()

  return (
    <>
      <HeroUIProvider>
        <main className="text-foreground bg-background w-full h-full min-h-screen">
          <Outlet />
          <Toaster
            richColors
            position="bottom-right"
            theme={mode === 'light' ? 'light' : mode === 'dark' ? 'dark' : 'system'}
          />
        </main>
      </HeroUIProvider>
    </>
  )
}
