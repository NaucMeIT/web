import { Elysia } from 'elysia'

new Elysia()
  .get('/', () => 'general kenobi')
  .get('/hi', () => 'hi')
  .listen(3000)
