import {
  Col,
  Row,
  Typography,
  notification,
  Image
} from "antd";
import axios from "axios";
import { get, size } from "lodash";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { authOptions } from "../api/auth/[...nextauth]";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { BankOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import ArticleComponent from "../component/ArticleComponent";

const { Text, Title } = Typography;

const Author = () => {
  const router = useRouter();

  const [author, setAuthor] = useState({});
  const [article, setArticle] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const id = router?.query.author;
      const apiURL = `/api/author/${id}`;
      const { data } = await axios.get(`${apiURL}`);
      setAuthor(get(data, "data", {}));
      setArticle(get(data, "data.articles", {}))
      return {
        props: {
          pdf: data.data,
        },
      };
    } catch (err) {
      notification.error({ message: err ? err : "Error!" });
    }
  };

  return (
    <div>
      <Row className="mt-10 ml-10">
        <Col md={4} offset={2}>
          <div className="flex flex-row">
            <Image src={'/user.png'} alt="user" preview={false} />
          </div>
        </Col>
        <Col>
          <div className="mt-10">
            <Title level={1}>{get(author, 'fullname', '')}</Title>
            <div><BankOutlined /> {get(author, 'department', '')}</div>
            <div><HomeOutlined /> {get(author, 'address', '')}</div>
          </div>
        </Col>
      </Row>
      <div>
        {size(article) &&
          article.map((item, index) => (
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

export default Author;

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session)
    return {
      props: {
        sessionId: session.id,
      },
    };
  return {
    props: {},
  };
}
