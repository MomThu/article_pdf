import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import { authOptions } from "../api/auth/[...nextauth]";

const Header = (props) => {
  console.log(props, "session id")
  const router = useRouter();

  const gotoLogin = () => {
    router.push("/auth/signin");
  };

  const gotoRegister = () => {
    router.push("/auth/register");
  };

  return (
    <>
      <div className="flex flex-row justify-between bg-[#C8E3F7]">
        <div>Logo</div>
        {props?.sessionId ? (
          <div className="flex flex-row justify-between gap-10">
            <div>
              <ShoppingCartOutlined />
            </div>
            <div className="flex flex-row justify-between">
              <Button type="default" onClick={gotoRegister}>
                Register
              </Button>
              <Button type="default" onClick={gotoLogin}>
                Sign in
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Header;

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  console.log(session, "session")
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
