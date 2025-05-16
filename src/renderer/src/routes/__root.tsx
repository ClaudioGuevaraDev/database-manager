import { HeroUIProvider } from '@heroui/react'
import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <>
      <HeroUIProvider>
        <main className="text-foreground bg-background w-full h-full min-h-screen">
          <Outlet />
        </main>
      </HeroUIProvider>
    </>
  )
})
