import { PrismaClient } from '@prisma/client';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const OPTIONS: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credential',
      credentials: {
        email: {
          label: 'user',
          type: 'text',
          placeholder: 'email',
        },
        password: {
          label: 'user',
          type: 'password',
          placeholder: 'email',
        },
      },
      async authorize(credentials) {
        const prisma = new PrismaClient();
        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials?.email },
          });

          if (user) {
            if (credentials?.password === user?.password) {
              return {
                id: user?.id,
                name: user?.name,
                email: user?.email,
                role: 'admin',
              };
            }
          }
          return null;
        } finally {
          prisma.$disconnect();
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
    signOut: '/logout',
  },

  callbacks: {
    // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    // If you want to use the role in client components
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
};

const handler = NextAuth(OPTIONS);

export { handler as GET, handler as POST };
