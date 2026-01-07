import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma"; // <--- FIX: Use Prisma, not dbConnect
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        // --- 1. DUMMY ADMIN BACKDOOR (The credentials we agreed on) ---
        // This allows you to login regardless of the database state
        if (
          credentials.email === "admin@example.com" && 
          credentials.password === "password123"
        ) {
           return { 
             id: "dummy-admin-id", 
             name: "Admin User", 
             email: "admin@example.com", 
             role: "admin" 
           };
        }
        // -------------------------------------------------------------

        // 2. Database Check (Prisma)
        // This checks if a real user exists in your Postgres DB
        const user = await (prisma as any).user.findUnique({
          where: { email: credentials.email }
        });

        if (!user) throw new Error("User not found");

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid password");

        return { 
          id: user.id.toString(), 
          name: user.name, 
          email: user.email, 
          role: (user as any).role ?? "user",
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as any).role;
      return token;
    },
    async session({ session, token }) {
      if (session.user) (session.user as any).role = token.role;
      return session;
    },
  },
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};