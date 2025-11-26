import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // credentials object send করা হয়েছে
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER}/api/auth/login`,
            {
              email: credentials.email,
              password: credentials.password
            }
          );

          // যদি status 200 না হয় তাহলে fail
          if (res.status !== 200) return null;

          // backend response must contain at least { id, email }
          return res.data;

        } catch (err) {
          console.log(err.response?.data || err.message);
          return null;
        }
      }
    })
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/", 
    error: "/login"  
  }
});
