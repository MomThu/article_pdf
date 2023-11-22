import { AudioOutlined } from "@ant-design/icons";
import { Col, Row, Typography, Image, Input, notification } from "antd";
import axios from "axios";
import { get, size } from "lodash";
import React, { useEffect, useState } from "react";

const SearchComponent = ({ setArticle, isAdmin }) => {
  const apiURL = `/api/article`;

  const fetchData = async (keyword) => {
    try {
      if (size(keyword)) {
        const { data } = await axios.get(`${apiURL}/search?keyword=${keyword}`);
        setArticle(get(data, "data", []));
      } else {
        const { data } = await axios.get(`${apiURL}`);
        setArticle(get(data, "data", []));
      }
    } catch (err) {
      notification.error({ message: err ? err : "Error!" });
    }
  };

  const handleSearch = (value) => {
    fetchData(value);
  };

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        {!isAdmin && (
          <Row justify="center" className="justify-center">
            <Col md={20}>
              <img src="/article.png" alt="banner image" />
            </Col>
          </Row>
        )}

        <Row justify="center" className="mt-5 flex">
          <Col md={12} xs={20}>
            <Input.Search
              placeholder="Search articles by title, abstract..."
              size="large"
              onSearch={handleSearch}
              allowClear
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SearchComponent;
