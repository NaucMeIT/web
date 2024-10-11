import { v1 } from '@nmit-coursition/api/v1'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/test')({
  component: Home,
})

function Home() {
  const testQuery = v1.test.get.useQuery()
  return <div>{testQuery.data}</div>
}
