import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

export default function Home(props) {
  const [dataFetch, setDataFetch] = useState();

  React.useEffect(() => console.log(dataFetch), [dataFetch]);

  const apiURL = `/api/author/article`;

  const fetchData = async (id: number) => {
    try {
      const { data } = await axios.get(`${apiURL}?article=${id}`);
      setDataFetch(data);
    } catch (err) {
      console.log(err, "errhereree");
    }
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  if (props?.sessionId) {
    return <div>home</div>;
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
