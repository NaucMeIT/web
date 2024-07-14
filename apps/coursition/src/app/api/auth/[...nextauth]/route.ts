import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const auth = (cred: Record<'username' | 'password', string>): boolean => {
  const user = { username: 'coursition', password: '12345678' }
  return cred.username === user.username && cred.password === user.password
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'coursition' },
        password: { label: 'Password', type: '12345678' },
      },
      async authorize(_, req) {
        if (req?.query && auth(req.query)) {
          return {
            id: '',
            name: '',
            email: null,
            image: null,
          }
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
  },
})

export { handler as GET, handler as POST }
