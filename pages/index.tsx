import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function Home({ results }) {
  const session = useSession();

  console.log(session, "sessionnnn")
  const [dataFetch, setDataFetch] = useState();

  React.useEffect(() => console.log(results), [results]);
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


  if (session) {
    return (
      <div>
        home
      </div>
    );
  } else {
    return (
      <div>
        chua login
      </div>
    );
  }

  // will make the initial call to populate the results
}
// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//   const { origin } = absoluteUrl(req);

//   const apiURL = `${origin}/api/customer`;
//   const { data } = await axios.get(apiURL);
//   return {
//     props: {
//       results: data.data,
//     },
//   };
// };
