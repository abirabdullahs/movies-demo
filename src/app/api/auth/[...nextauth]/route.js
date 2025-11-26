import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
let GoogleProvider;

try {
  // require conditionally so missing env doesn't crash at import time
  GoogleProvider = require("next-auth/providers/google").default;
} catch (e) {
  GoogleProvider = null;
}

const serverUrl = process.env.NEXTAUTH_API_URL || process.env.NEXT_PUBLIC_SERVER || "http://localhost:5000";

export const authOptions = {
  providers: [
    ...(process.env.NEXTAUTH_SECRET ? [CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(`${serverUrl}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
          });
          if (!res.ok) return null;
          const user = await res.json();
          return user;
        } catch (err) {
          console.error(err);
          return null;
        }
      },
    })] : []),
    // Google provider is optional
    ...(GoogleProvider && process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET ? [
      GoogleProvider({ clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET })
    ] : []),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user || session.user;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "dev-secret-unsafe-only-for-dev",
  pages: {
    signIn: '/login',
    error: '/login',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
