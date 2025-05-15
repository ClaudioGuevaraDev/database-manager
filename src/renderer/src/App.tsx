import { HeroUIProvider } from '@heroui/react'
import { JSX } from 'react'

function App(): JSX.Element {
  return (
    <HeroUIProvider>
      <div></div>
    </HeroUIProvider>
  )
}

export default App
