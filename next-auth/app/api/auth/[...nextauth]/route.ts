import { PrismaClient } from "@prisma/client"
import NextAuth, { NextAuthOptions, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"


export const OPTIONS: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credential",
            credentials: {
                email: {
                    label: "user",
                    type: "text",
                    placeholder: "email"
                },
                password: {
                    label: "user",
                    type: "password",
                    placeholder: "email"
                }

            },
            async authorize(credentials) {
                const prisma = new PrismaClient()
                const user = await prisma.user.findUnique({ where: { email: credentials?.email } })
                console.log(user)
                if (user) {
                    if (credentials?.password === user?.password) {
                        return {
                            id: user?.id,
                            name: user?.name,
                            email: user?.email
                        }
                    }
                }
                return null
            },
        })
    ]

}

const handler = NextAuth(OPTIONS)

export { handler as GET, handler as POST }