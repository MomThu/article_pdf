// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { createRouter } from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { login } from "../../../controllers/CustomerController";
import { CustomerRepository } from "../../../services";
import crypto from "crypto";

export const authOptions = {
  secret: process.env.SECRET,
  providers: [
    CredentialsProvider({
      name: "Sign in with Email and Password",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const customer = await CustomerRepository.login({
            email: credentials?.email,
            password: credentials?.password,
          });
          console.log(customer, "cvustpmer")
          if (customer?.error) {
          } else {
          }
          const data = customer;
          data["id"] = crypto.randomBytes(32).toString("hex");
          // const data = await res.json();
          if (data) {
            console.log(data, "data day");
            // Any object returned will be saved in `user` property of the JWT
            return data;
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            return null;

            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          }
        } catch (err) {
          console.log(err, "error day");
        }
      },
    }),
    // // OAuth authentication providers
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET,
    // }),
    // // Sign in with passwordless email link
    // EmailProvider({
    //   server: process.env.MAIL_SERVER,
    //   from: process.env.MAIL_FROM,
    // }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log(user, "user day nay");
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session["id"] = token.id;
      return session;
    },
  },
};

export default NextAuth(authOptions);
