import { Button, Col, Empty, Row, Typography, notification } from "antd";
import axios from "axios";
import { get, size } from "lodash";
import { useEffect, useState } from "react";
import Header from "../component/HeadComponent";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import CartComponent from "../component/CartComponent";
import { useRouter } from "next/router";
import PaymentComponent from "../component/PaymentComponent";

const { Title } = Typography;

const Payment = (props) => {
  const router = useRouter();

  const [article, setArticle] = useState([]);

  const apiURL = `/api/article/payment`;

  const fetchData = async () => {
    try {
      const id = router?.query.id;
      const apiURL = `/api/pdf`;
      const { data } = await axios.get(`${apiURL}?article=${id}`);
      setArticle(get(data, "data", {}));
    } catch (err) {
      notification.error({ message: err ? err : "Error!" });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePayment = async (type: number) => {
    try {
      const id = router?.query.id;
      const apiURL = `/api/article/payment`;
      try {
        const { data } = await axios.patch(`${apiURL}`, {
          article: Number(id),
          permission: type,
        });
        if (!data?.error) {
          notification.success({ message: data?.message });
        }
      } catch (err) {
        notification.error({
          message: err ? get(err, "response.data.message", "") : "Error!",
        });
      }
    } catch (err) {
      notification.error({ message: err ? err.toString() : "Error!" });
    }
  };

  return (
    <div>
      <header className="sticky top-0 z-50">
        <Header
          isAdmin={get(props, "user.role", 0) === 1 ? true : false}
          signined={get(props, "sessionId", "") ? true : false}
        />
      </header>
      <Row className="mt-10">
        <Col md={18} offset={3}>
          <Title level={3}>Thanh toán</Title>
        </Col>
      </Row>

      <div className="mt-10">
        <Row className="justify-center">
          <Col md={18}>
            <PaymentComponent item={get(article, "article", {})} />
          </Col>
        </Row>
      </div>

      <Row className="mt-10 justify-center">
        <Col md={18}>
          {!get(article, "permission", 0) ? (
            <div>
              <Button type="primary" onClick={() => handlePayment(1)}>Thanh toán cho quyền đọc</Button>
              <Button type="primary" onClick={() => handlePayment(2)}>Thanh toán cho quyền đọc và in</Button>
              <Button type="primary" onClick={() => handlePayment(3)}>Thanh toán cho quyền đọc, in và tải về</Button>
            </div>
          ) : get(article, "permission") === 1 ? (
            <div>
              <Button type="primary" onClick={() => handlePayment(2)}>Thanh toán cho quyền đọc và in</Button>
              <Button type="primary" onClick={() => handlePayment(3)}>Thanh toán cho quyền đọc, in và tải về</Button>
            </div>
          ) : get(article, "permission") === 2 ? (
            <div>
              <Button type="primary" onClick={() => handlePayment(3)}>Thanh toán cho quyền đọc, in và tải về</Button>
            </div>
          ) : null}
        </Col>
      </Row>
    </div>
  );
};

export default Payment;

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session)
    return {
      props: {
        sessionId: session.id,
        user: session.user,
      },
    };
  return {
    props: {},
  };
}
