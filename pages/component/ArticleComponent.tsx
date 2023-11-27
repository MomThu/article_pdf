import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Typography, notification } from "antd";
import axios from "axios";
import { get, size } from "lodash";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const { Text, Title, Paragraph } = Typography;
const { Meta } = Card;

const ArticleComponent = ({ item }) => {
  const handleAddToCard = async () => {
    try {
      const apiURL = `/api/cart/add`;
      const { data } = await axios.post(`${apiURL}`, {
        article: item?.id
      });
      notification.success({ message: "Add to cart successful!" });
    } catch (err) {
      notification.error({
        message: err
          ? get(err, "response.data.message", "Loi day")
          : "Error!",
      });
    }
  }

  return (
    <div>
      <Card>
        <Meta
          title={
            <Link href={{ pathname: "/article", query: { article: item?.id } }}>
              <Title level={4}>{item?.title}</Title>
            </Link>
          }
          description={
            <div>
              <div>
                <Paragraph
                  ellipsis={{ rows: 2, expandable: false }}
                  type="secondary"
                >
                  {item?.abstract}
                </Paragraph>
              </div>
              <div className="flex flex-row gap-2">
                {size(item?.author) &&
                  item?.author.map((author) => (
                    <div className="mr-1" key={author?.id}>
                      <UserOutlined />
                      <Link
                        href={{
                          pathname: `/author/${author.id}`,
                        }}
                      >
                        {author?.fullname}
                      </Link>
                    </div>
                  ))}
              </div>
              <div>
                <Text>{item?.journal_name}</Text>
              </div>
              <div>
                <Text>{moment(item?.publish_date).format("DD/MM/YYYY")}</Text>
              </div>
              <div className="flex justify-end ">
                <Button onClick={() => handleAddToCard()}>Thêm vào giỏ hàng</Button>
              </div>
            </div>
          }
        />
      </Card>
    </div>
  );
};

export default ArticleComponent;
