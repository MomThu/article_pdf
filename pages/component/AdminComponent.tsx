import React, { useEffect, useState } from "react";
import SearchComponent from "./SearchComponent";
import axios from "axios";
import { get, size } from "lodash";
import { Button, Col, Row, notification } from "antd";
import ArticleComponent from "./ArticleComponent";
import FileUpload from "./UploadPDF";
import { PlusCircleOutlined } from "@ant-design/icons";
import router from "next/router";

const AdminComponent = () => {
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

  const gotoAdd = () => {
    router.push("/article/add");
  };

  return (
    <div>
      <SearchComponent
        setArticle={(data) => setArticles(data)}
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
                <ArticleComponent item={item} />
              </Col>
            </Row>
          ))}
      </div>
    </div>
  );
};

export default AdminComponent;
