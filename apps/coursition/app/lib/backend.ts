import { treaty } from '@elysiajs/eden'
import type { App } from '../../../backend/src/index'

const backendUrl = process.env['BACKEND_URL'] || `http://localhost:${process.env['BACKEND_PORT'] || '3000'}`
export const app = treaty<App>(backendUrl)
