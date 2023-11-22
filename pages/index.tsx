import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import HomeComponent from "./component/HomeComponent";
import AdminComponent from "./component/AdminComponent";
import { get } from "lodash";

export default function Home(props) {
  
  return (
    <div>
      {get(props, "user.role", 0) === 1 ? <AdminComponent /> : <HomeComponent />}
    </div>
    )
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session)
    return {
      props: {
        sessionId: session.id,
        user: session.user
      },
    };
  return {
    props: {},
  };
}
