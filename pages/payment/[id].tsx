import {
  Button,
  Checkbox,
  Col,
  Row,
  Typography,
  notification
} from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import axios from "axios";
import { get, max } from "lodash";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { authOptions } from "../api/auth/[...nextauth]";
import Header from "../component/HeadComponent";
import PaymentComponent from "../component/PaymentComponent";

const { Title, Text } = Typography;

const Payment = (props) => {
  const router = useRouter();

  const [article, setArticle] = useState([]);
  const [permissionCheck, setPermissionCheck] = useState<any>(0);
  const [price, setPrice] = useState(0);
  const [paid, setPaid] = useState(0);

  const fetchData = async () => {
    try {
      const id = router?.query.id;
      const apiURL = `/api/pdf`;
      const { data } = await axios.get(`${apiURL}?article=${id}`);
      setArticle(get(data, "data", {}));
      if (get(data, "data.permission", 0) === 1) {
        setPaid(get(data, "data.article.price", 0) * 0.5);
      } else if (get(data, "data.permission", 0) === 2) {
        setPaid(get(data, "data.article.price", 0) * 0.75);
      } else if (get(data, "data.permission", 0) === 3) {
        setPaid(get(data, "data.article.price", 0));
      }
    } catch (err) {
      notification.error({
        message: err
          ? get(err, "response.data.message", "Đã xảy ra lỗi!")
          : "Error!",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePayment = async () => {
    try {
      const id = router?.query.id;
      const apiURL = `/api/article/payment`;
      try {
        const { data } = await axios.patch(`${apiURL}`, {
          article: Number(id),
          permission: permissionCheck,
        });
        if (!data?.error) {
          notification.success({
            message: get(data, "message", "Thanh toán thành công"),
          });
          router.push(`/article?article=${router?.query.id}`);
        }
      } catch (err) {
        notification.error({
          message: err
            ? get(err, "response.data.message", "Đã xảy ra lỗi!")
            : "Error!",
        });
      }
    } catch (err) {
      notification.error({
        message: err
          ? get(err, "response.data.message", "Đã xảy ra lỗi!")
          : "Error!",
      });
    }
  };

  const options = [
    {
      label: "Đọc",
      value: 1,
      disabled: get(article, "permission", 0) ? true : false,
    },
    {
      label: "In",
      value: 2,
      disabled: get(article, "permission", 0) > 1 ? true : false,
    },
    {
      label: "Tải về",
      value: 3,
      disabled: get(article, "permission", 0) > 2 ? true : false,
    },
  ];

  const onChange = (checkedValues: CheckboxValueType[]) => {
    setPermissionCheck(max(checkedValues));
    setPrice(
      permissionCheck === 1
        ? get(article, "article.price", 0) * 0.5
        : permissionCheck === 2
        ? get(article, "article.price", 0) * 0.75
        : permissionCheck === 3
        ? get(article, "article.price", 0)
        : 0
    );
  };

  const numberFormat = (num?: number | string): string => {
    if (!num) return "0";

    let number = 0;
    if (typeof num === "number") {
      number = num;
    } else if (typeof num === "string") {
      number = Number.parseFloat(num);
    } else {
      return "0";
    }

    if (Number.isNaN(number)) return "0";

    const numberFormat = new Intl.NumberFormat(); //default: English, vi-VN: Vietnamese
    return numberFormat.format(number);
  };

  return (
    <div className="min-h-screen">
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
          <div>
            <Title level={4}>Thanh toán cho các quyền: </Title>
          </div>
          <Checkbox.Group
            options={options}
            onChange={onChange}
            className="my-5 gap-20"
          >
            <div>
              <Checkbox
                value={1}
                disabled={get(article, "permission", 0) ? true : false}
              >
                Đọc
              </Checkbox>
            </div>
            <div>
              <Checkbox
                value={2}
                disabled={get(article, "permission", 0) > 1 ? true : false}
              >
                In
              </Checkbox>
            </div>
            <div>
              <Checkbox
                value={3}
                disabled={get(article, "permission", 0) > 2 ? true : false}
              >
                Tải về
              </Checkbox>
            </div>
          </Checkbox.Group>
          <div className="flex flex-row gap-2">
            <div>
              <Title level={5}>Tổng tiền: </Title>
            </div>
            <div>
              <Title level={5}>
                {permissionCheck === 1
                  ? numberFormat(get(article, "article.price", 0) * 0.5 - paid)
                  : permissionCheck === 2
                  ? numberFormat(get(article, "article.price", 0) * 0.75 - paid)
                  : permissionCheck === 3
                  ? numberFormat(get(article, "article.price", 0) - paid)
                  : 0}{" "}
                VND
              </Title>
            </div>
          </div>
          <div>
            <Button
              disabled={get(article, "permission") === 3 || !permissionCheck ? true : false}
              onClick={() => handlePayment()}
            >
              Thanh toán
            </Button>
          </div>
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
