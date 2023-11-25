import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Typography } from "antd";
import { size } from "lodash";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const { Text, Title, Paragraph } = Typography;
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
                    <div className="mr-1">
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
            </div>
          }
        />
      </Card>
    </div>
  );
};

export default ArticleComponent;
