import React, { useEffect, useState } from "react";
import axios from "axios";
import { get, size } from "lodash";
import { Col, Empty, Pagination, Row, Typography, notification } from "antd";
import ArticleComponent from "../component/ArticleComponent";
import SearchComponent from "../component/SearchComponent";
import Header from "../component/HeadComponent";

const { Title } = Typography;

const Bought = () => {
  const [articles, setArticles] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalArticles, setTotalArticles] = useState(0);

  const apiURL = `/api/article/bought`;

  const fetchNewData = async (keyword, currentPage, pageSize) => {
    try {
      if (size(keyword)) {
        const { data } = await axios.get(`/api/article/searchbought`, {
          params: {
            keyword: keyword,
            currentPage: currentPage,
            pageSize: pageSize,
          },
        });
        setArticles(get(data, "data", []));
        setTotalArticles(get(data, "total", 0));
      } else {
        const { data } = await axios.get(`${apiURL}`, {
          params: {
            currentPage: currentPage,
            pageSize: pageSize,
          },
        });
        setArticles(get(data, "data", []));
        setTotalArticles(get(data, "total", 0));
      }
    } catch (err) {
      notification.error({
        message: err
          ? get(err, "response.data.message", "Đã xảy ra lỗi!")
          : "Đã xảy ra lỗi!",
      });
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    setPageSize(10);
    fetchNewData(keyword, 1, 10);
  }, [keyword]);

  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
    fetchNewData(keyword, page, size);
  };

  return (
    <div>
      <header className="sticky top-0 z-50">
        <Header signined={true} isAdmin={false} />
      </header>
      <SearchComponent
        setKeyword={(data) => setKeyword(data)}
        isAdmin={false}
      />
      <div>
        <Row className="mt-10">
          <Col md={18} offset={3}>
            <Title level={3}>Bài báo đã mua</Title>
          </Col>
        </Row>
        <Row>
        <Col md={18} offset={3}>
          <Title level={4}>Số lượng: {totalArticles}</Title>
        </Col>
      </Row>
        {size(articles) ? (
          articles.map((item, index) => (
            <Row
              style={{ padding: "10px" }}
              className="justify-center"
              key={item?.id}
            >
              <Col md={18}>
                <ArticleComponent item={item} role={1} />
              </Col>
            </Row>
          ))
        ) : (
          <div className="justify-center m-10">
            <Empty />
          </div>
        )}
      </div>
      <div className="justify-center m-10">
        <Pagination
          showSizeChanger
          current={currentPage}
          pageSize={pageSize}
          total={totalArticles}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Bought;
