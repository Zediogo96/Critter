import { NextAuthOptions } from "next-auth";
import { Provider } from "next-auth/providers";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    
    secret: process.env.AUTH_SECRET as string,
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      }) as Provider,
    ],
  };