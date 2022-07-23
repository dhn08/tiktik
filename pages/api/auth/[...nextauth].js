import NextAuth from "next-auth";
import { getToken } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import { SanityAdapter } from "next-auth-sanity";
import client from "../../../utils/client";
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  adapter: SanityAdapter(client),
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      console.log(token);
      session.user.userid = token.sub;
      return session;
    },
  },
});
