import NextAuth, { NextAuthOptions, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"


export const OPTIONS: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credential",
            credentials: {
                username: {
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
                const user: User = {
                    id: "1",
                    name: "halisson",
                }
                if (credentials?.username === "halisson") {
                    return user
                }
                return null


            },
        })
    ]

}

const handler = NextAuth(OPTIONS)

export { handler as GET, handler as POST }