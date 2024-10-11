import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/test')({
  component: Home,
})

function Home() {
  return <div>Test</div>
}
