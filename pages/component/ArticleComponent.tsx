import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Typography } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const { Text, Title } = Typography;
const { Meta } = Card;

const ArticleComponent = ({ item }) => {
  console.log(item);
  const onAddToCart = () => {};
  return (
    <div>
      <Card
        actions={[
          <Button
            type="primary"
            icon={<ShoppingCartOutlined />}
            onClick={() => onAddToCart()}
          >
            <b>ADD TO CART</b>
          </Button>,
        ]}
      >
        <Meta
          title={
            <Link href={{ pathname: "/article", query: { article: item?.id } }}>
              <Title level={4}>{item?.title}</Title>
            </Link>
          }
          description={
            <div>
              <div>
                <Text type="secondary">{item?.abstract}</Text>
              </div>
              <div>
                <Text>Author</Text>
              </div>
              <div>
                <Text>publish_date</Text>
              </div>
            </div>
          }
        />
      </Card>
    </div>
  );
};

export default ArticleComponent;
