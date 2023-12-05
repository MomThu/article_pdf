import React from "react";
import { Form, Input, Button, Col, Row, Typography, notification } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import Header from "../component/HeadComponent";
import { get } from "lodash";

const { Title, Text } = Typography;

const Register = () => {
  const router = useRouter();

  const onFinish = async (values) => {
    try {
      const apiURL = `/api/authentication/register`;
      const { data } = await axios.post(`${apiURL}`, {
        ...values,
      });
      if (!data?.error) {
        await notification.success({
          message: get(data, "message", "Đăng ký tài khoản thành công!"),
        });
        router.push("/auth/signin");
      }
    } catch (err) {
      notification.error({
        message: err
          ? get(err, "response.data.message", "Đăng ký tài khoản thất bại!")
          : "Đăng ký tài khoản thất bại!",
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <header className="sticky top-0 z-50">
        <Header signined={false} isAdmin={true} />
      </header>
      <div className="h-[100vh] flex flex-col justify-center bg-[#001524]">
        <Row className="flex justify-center">
          <Col md={12} className="bg-white py-8 px-20 rounded-xl shadow-xl">
            <Title className="text-center text-[40px] leading-[48px] font-bold mb-8">
              Đăng ký
            </Title>
            <div className="justify-center">
              <Form
                name="registrationForm"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                labelCol={{ md: 8, xs: 24 }}
                labelWrap
                wrapperCol={{ md: 16, xs: 24 }}
                labelAlign="left"
              >
                <Form.Item
                  label="Tên người dùng"
                  name="full_name"
                  rules={[
                    { required: true, message: "Please enter your full name!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please enter your email!" },
                    {
                      type: "email",
                      message: "Please enter a valid email address!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Mật khẩu"
                  name="password"
                  rules={[
                    { required: true, message: "Please enter your password!" },
                    {
                      min: 6,
                      message: "Password must be at least 6 characters long!",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  label="Nhập lại mật khẩu"
                  name="confirmPassword"
                  dependencies={["password"]}
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng xác nhận mật khẩu!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Mật khẩu không trùng khớp!")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  label="Điện thoại"
                  name="phone"
                  rules={[
                    { required: true, message: "Please enter your phone!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item>
                  <div className="flex flex-col items-end">
                    <Button
                      type="primary"
                      htmlType="submit"
                      // className="items-center"
                    >
                      Submit
                    </Button>
                  </div>
                </Form.Item>
              </Form>
              <div>
                <Text>
                  Bạn đã có tài khoản?{" "}
                  <Link
                    href={{ pathname: "/auth/signin" }} // Replace with your actual forgot password page
                    style={{ color: "#1890ff", textDecoration: "underline" }}
                  >
                    Đăng nhập
                  </Link>
                </Text>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Register;
