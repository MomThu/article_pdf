import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Col, Menu, Row, Space, Typography } from "antd";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import { authOptions } from "../api/auth/[...nextauth]";

const { Title } = Typography;
const Header = (props) => {
  console.log(props, "session id");
  const router = useRouter();

  const gotoLogin = () => {
    router.push("/auth/signin");
  };

  const gotoRegister = () => {
    router.push("/auth/register");
  };

  return (
    <>
      <div className="flex flex-row justify-between bg-[#001524] items-center">
        <div>
          <Title style={{color: "#fff"}}>Logo</Title>
        </div>
        <div className="flex flex-row justify-between gap-10 items-center">
          <div>
            <ShoppingCartOutlined className="text-white" />
          </div>
          <div className="flex flex-row justify-between gap-2 mr-5">
            <Button type="default" onClick={gotoRegister}>
              Register
            </Button>
            <Button type="default" onClick={gotoLogin}>
              Sign in
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  console.log(session, "session");
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
