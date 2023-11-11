import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import HomeComponent from "./component/HomeComponent";

export default function Home(props) {
  if (props?.sessionId) {
    return (
      <HomeComponent />
    )
  } else {
    return <div>chua login</div>;
  }

  // will make the initial call to populate the results
}
export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session)
    return {
      props: {
        sessionId: session.id,
      },
    };
  return {
    props: {},
  };
}