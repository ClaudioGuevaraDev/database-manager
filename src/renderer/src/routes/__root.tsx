import { HeroUIProvider } from '@heroui/react'
import { ToastProvider } from '@heroui/toast'
import useGetConnections from '@renderer/hooks/general/useGetConnections'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { JSX } from 'react'

export const Route = createRootRoute({
  component: Root
})

function Root(): JSX.Element {
  useGetConnections()

  return (
    <>
      <HeroUIProvider>
        <main className="h-full min-h-screen w-full bg-background text-foreground">
          <Outlet />
          <ToastProvider placement="bottom-right" toastProps={{ timeout: 3000 }} />
        </main>
      </HeroUIProvider>
    </>
  )
}
