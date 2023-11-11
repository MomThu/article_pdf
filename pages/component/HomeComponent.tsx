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

  return (
    <div>
      <SearchComponent setArticle={(data) => setArticles(data)} />
      <div>
        {size(articles) &&
          articles.map((article) => {
            return (
              <div className="mt-5">
                <Row key={article?.id} gutter={16}>
                  <Col span={4}>
                    <div>aaa</div>
                  </Col>
                  <Col span={4}>
                    <ArticleComponent item={article} />
                  </Col>
                  <Col span={4}>
                    <ArticleComponent item={article} />
                  </Col>
                  <Col span={4}>
                    <ArticleComponent item={article} />
                  </Col>
                </Row>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default HomeComponent;
