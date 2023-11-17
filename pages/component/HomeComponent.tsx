import React, { useEffect, useState } from "react";
import SearchComponent from "./SearchComponent";
import axios from "axios";
import { get, size } from "lodash";
import { Col, Row, notification } from "antd";
import ArticleComponent from "./ArticleComponent";

const HomeComponent = () => {
  const [articles, setArticles] = useState([]);

  const apiURL = `/api/article`;

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${apiURL}`);
      setArticles(get(data, "data", []));
    } catch (err) {
      notification.error({ message: err ? err : "Error!" });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fake = [
    articles[0],
    articles[0],
    articles[0],
    articles[0],
    articles[0],
    articles[0],
    articles[0],
    articles[0],
    articles[0],
    articles[0],
    articles[0],
    articles[0],
    articles[0],
    articles[0],
    articles[0],
    articles[0],
    articles[0],
    articles[0],
    articles[0],
  ];
  return (
    <div>
      <SearchComponent setArticle={(data) => setArticles(data)} />
      <div>
        {size(articles) &&
          articles.map((item, index) => (
            <Row style={{ padding: "10px" }} className="justify-center" key={item?.id}>
              <Col md={18}>
                <ArticleComponent item={item} />
              </Col>
            </Row>
          ))}
      </div>
    </div>
  );
};

export default HomeComponent;
