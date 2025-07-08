import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    providers: [
        Github({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            allowDangerousEmailAccountLinking: true,
        }),
    ],
    callbacks: {
        session: async ({ session, token }) => {
            if(session?.user) {
                session.user.id = token.uid
                session.user.role = token.role
                session.user.access_token = token.access_token
                session.user.provider = token.provider
            }
            return session;
        },
        jwt: async ({ user, token , account}) => {
            if(user) {
                token.id = user.id
                token.role = user.role
                token.access_token = account.access_token
                token.provider = account.provider
            }
            return token;
        },
    }
});
