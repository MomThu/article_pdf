import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button } from "antd";

const Header = () => {
  return (
    <>
      <div className="flex flex-row justify-between bg-[#C8E3F7]">
        <div>Logo</div>
        <div className="flex flex-row justify-between gap-10">
          <div>
            <ShoppingCartOutlined />
          </div>
          <div className="flex flex-row justify-between">
            <Button type="default">
              Register
            </Button>
            <Button type="default">
              Sign in
            </Button>
          </div>
        </div>
      </div>

    </>
  );
};

export default Header;
