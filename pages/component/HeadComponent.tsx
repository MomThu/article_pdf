import {
  ShoppingCartOutlined,
  ShoppingFilled,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Menu,
  Modal,
  Row,
  Space,
  Typography,
  Image
} from "antd";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import { authOptions } from "../api/auth/[...nextauth]";
import { useCallback } from "react";
import axios from "axios";
import { signOut } from "next-auth/react";
import InfoComponent from "./InfoComponent";

const { Title, Text } = Typography;
const Header = ({ signined, isAdmin }) => {
  const router = useRouter();

  const gotoLogin = () => {
    router.push("/auth/signin");
  };

  const gotoRegister = () => {
    router.push("/auth/register");
  };

  const gotoHome = () => {
    router.push("/");
  };

  const gotoCart = () => {
    router.push("/cart");
  };

  const handleLogout = useCallback((): void => {
    Modal.confirm({
      title: "Xác nhận",
      okText: "Đồng ý",
      autoFocusButton: null,
      content: "Bạn có chắc muốn đăng xuất ?",
      onOk: () => signOut({ callbackUrl: "/" }),
    });
  }, []);

  return (
    <div className="flex flex-row justify-between bg-[#001524] items-center py-2">
      <div
        className="flex justify-center gap-10 items-center mx-5"
        onClick={gotoHome}
      >
        <Image
          src={"/logo.png"}
          alt="logo"
          preview={false}
          height={50}
          rootClassName="mr-3"
        />
      </div>

      <div className="flex flex-row justify-between gap-10 items-center">
        {signined && !isAdmin ? (
          <div onClick={gotoCart}>
            <ShoppingCartOutlined className="text-white hover:text-sky-700" />
          </div>
        ) : null}

        <div>
          {!signined ? (
            <div className="flex flex-row justify-between gap-2 mr-5">
              <Button type="default" onClick={gotoRegister}>
                Đăng ký
              </Button>
              <Button type="default" onClick={gotoLogin}>
                Đăng nhập
              </Button>
            </div>
          ) : !isAdmin ? (
            <div className="flex flex-row justify-between gap-2 mr-5">
              <InfoComponent />
            </div>
          ) : (
            <Button type="default" onClick={handleLogout} className="mr-5">
              Đăng xuất
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
