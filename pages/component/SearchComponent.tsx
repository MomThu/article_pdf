import { Col, Input, Row } from "antd";

const SearchComponent = ({ setKeyword, isAdmin }) => {
  const handleSearch = (value) => {
    setKeyword(value);
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
              placeholder="Tìm kiếm bài báo qua tiêu đề, tóm tắt, tác giả, nhà xuất bản"
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
