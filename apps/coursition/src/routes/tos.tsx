import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tos')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/tos"!</div>
}
