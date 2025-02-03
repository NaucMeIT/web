import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/pp')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/pp"!</div>
}
