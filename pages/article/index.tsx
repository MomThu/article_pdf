import axios from "axios";
import React, { useEffect } from "react";

const Article = () => {
  const apiURL = `/api/article`;

  const getArticle = async (id: number) => {
    try {
      const { data } = await axios.get(`${apiURL}/${id}`);
    } catch (err) {
      console.log(err, "error");
    }
  };

  useEffect(() => {
    getArticle(1);
  }, []);

  return <div>article</div>;
};

export default Article;
