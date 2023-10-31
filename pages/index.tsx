import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import axios from "axios";
import absoluteUrl from "next-absolute-url";

export default function Home({ results }) {
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

  const getOneCus = async (id: number) => {
    try {
      const { data } = await axios.get(`${apiURL}/${id}`);
      setDataFetch(data);
    } catch (err) {
      console.log(err, "errhereree");
    }
  };

  const postCustomer = async () => {
    try {
      const payload = {
        email: "nqh@gmail.com",
        full_name: "nguyen quang huy",
        phone: "096292271719"
      }
      const { data } = await axios.post(apiURL, payload);
      console.log(data);
    } catch (err) {
      console.log(err, "errhereree");
    }
  };

  useEffect(() => {
    fetchData(1);
    // getOneCus(1);
    // postCustomer()
  }, []);
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
