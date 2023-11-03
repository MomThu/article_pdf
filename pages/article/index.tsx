import axios from "axios";
import React, { useEffect, useState } from "react";
import crypto from "crypto";
import { GetServerSideProps } from "next";
import absoluteUrl from "next-absolute-url";
import { get } from "lodash";

const Article = ({ pdf }) => {
  
  return (
    <div>
      <div>
        Abstract: {get(pdf, 'article.abstract', '')}
      </div>
      {get(pdf, "permission", 0) === 1 ? (
        <div>Read</div>
      ) : get(pdf, "permission", 0) === 2 ? (
        <div>Print</div>
      ) : get(pdf, "permission", 0) === 3 ? (
        <div>Download</div>
      ) : (
        <div>None</div>
      )}
    </div>
  );
};

export default Article;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const apiURL = `http://localhost:3000/api/pdf`;
  const { data } = await axios.get(`${apiURL}?article=1`);
  return {
    props: {
      pdf: data.data,
    },
  };
};
