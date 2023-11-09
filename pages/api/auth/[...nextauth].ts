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

export default NextAuth({
  secret: process.env.SECRET,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Sign in with Email and Password",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log(credentials, "credential");
        // Add logic here to look up the user from the credentials supplied
        // const { data } = await axios.post(
        //   "http://localhost:3000/api/auththentication/login",
        //   {
        //     email: credentials?.email,
        //     password: credentials?.password,
        //   }
        // );
        try {
          const customer = await CustomerRepository.login({
            email: credentials?.email,
            password: credentials?.password
          });
          if (customer?.error) {
            
          } else {
            
          }
          const data = customer
          // const data = await res.json();
          if (data) {
            console.log(data, "data day")
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
});
