import workflow from '@convex-dev/workflow/convex.config'
import { defineApp } from 'convex/server'

const app = defineApp()
app.use(workflow)
export default app
