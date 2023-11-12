import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Typography } from "antd";
import { size } from "lodash";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const { Text, Title } = Typography;
const { Meta } = Card;

const ArticleComponent = ({ item }) => {
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
                <Text type="secondary">{item?.abstract}</Text>
              </div>
              <div className="flex flex-row">
                {size(item?.author) &&
                  item?.author.map((author) => (
                    <div className="mr-1">
                      <Text>{author?.fullname}</Text>
                    </div>
                  ))}
              </div>
              <div>
                <Text>{moment(item?.publish_date).format("DD/MM/YYYY")}</Text>
              </div>
            </div>
          }
        />
      </Card>
    </div>
  );
};

export default ArticleComponent;
