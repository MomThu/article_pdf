import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Typography } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const { Text, Title } = Typography;
const { Meta } = Card;

const ArticleComponent = ({ item }) => {
  const onAddToCart = () => {};
  return (
    <div className="h-100%">
      <Card
        cover={
          <Link href={{ pathname: "/article", query: { article: item?.id } }}>
            <img
              // className="w-10"
              alt={"article image"}
              src={"/article.png"}
            />
          </Link>
        }
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
          description={<Text type="secondary">{item?.abstract}</Text>}
        />
      </Card>
    </div>
  );
};

export default ArticleComponent;
