import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Col, Pagination, Row, notification } from "antd";
import axios from "axios";
import { get, size } from "lodash";
import router from "next/router";
import { useEffect, useState } from "react";
import ArticleComponent from "./ArticleComponent";
import SearchComponent from "./SearchComponent";

const AdminComponent = () => {
  const [articles, setArticles] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalArticles, setTotalArticles] = useState(0);

  const apiURL = `/api/article`;

  const fetchNewData = async (keyword, currentPage, pageSize) => {
    try {
      if (size(keyword)) {
        const { data } = await axios.get(`${apiURL}/search`, {
          params: {
            keyword: keyword,
            currentPage: currentPage,
            pageSize: pageSize,
          }
        });
        setArticles(get(data, "data", []));
        setTotalArticles(get(data, "total", 0));
      } else {
        const { data } = await axios.get(`${apiURL}`, {
          params: {
            currentPage: currentPage,
            pageSize: pageSize
          }
        });
        setArticles(get(data, "data", []));
        setTotalArticles(get(data, "total", 0));
      }
    } catch (err) {
      notification.error({ message: err ? get(err, "response.data.message", "Đã xảy ra lỗi!") : "Error!" });
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

  const gotoAdd = () => {
    router.push("/article/add");
  };

  return (
    <div>
      <SearchComponent
        setKeyword={(data) => setKeyword(data)}
        isAdmin={true}
      />

      <Row style={{ padding: "10px" }} className="justify-center">
        <Col md={18}>
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            className="ml-10 rounded-md"
            onClick={gotoAdd}
          >
            Thêm mới
          </Button>
        </Col>
      </Row>
      <div>
        {size(articles) &&
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
          ))}
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

export default AdminComponent;
