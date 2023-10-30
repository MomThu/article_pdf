import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import axios from "axios";
import absoluteUrl from "next-absolute-url";

export default function Home({ results }) {
  const [dataFetch, setDataFetch] = useState();

  React.useEffect(() => console.log(results), [results]);
  React.useEffect(() => console.log(dataFetch), [dataFetch]);

  const fetchData = async () => {
    const { origin } = absoluteUrl();

    const apiURL = `${origin}/api/customer`;
    const { data } = await axios.get(apiURL);
    console.log(data, "data herer")
    setDataFetch(data);
  };

  useEffect(() => {
    fetchData()
  }, [])
  return <div>hihi</div>;
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
