import React from "react";
import { Form, Input, Button, Col, Row, Typography, notification } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

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
        await notification.success({ message: "Register successful!" });
        router.push("/auth/signin");
      }
    } catch (err) {
      notification.error({
        message: err ? err.response.data?.message : "Register failed!",
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="h-[100vh] flex flex-col justify-center bg-[#001524]">
      <Row className="flex justify-center">
        <Col className="bg-white py-8 px-20 rounded-xl shadow-xl">
          <Title className="text-center text-[40px] leading-[48px] font-bold mb-8">
            Register
          </Title>
          <div className="justify-center">
            <Form
              name="registrationForm"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              labelCol={{ span: 8 }}
              labelWrap
              wrapperCol={{ span: 16 }}
              labelAlign="left"
            >
              <Form.Item
                label="Full Name"
                name="fullName"
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
                label="Password"
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
                label="Confirm Password"
                name="confirmPassword"
                dependencies={["password"]}
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("The two passwords do not match!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="Phone"
                name="phone"
                rules={[
                  { required: true, message: "Please enter your phone!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="justify-center">
                  Register
                </Button>
              </Form.Item>
            </Form>
            <div className="justify-center">
              <Text>
                Did you have an account?{" "}
                <Link
                  href={{ pathname: "/auth/signin" }} // Replace with your actual forgot password page
                  style={{ color: "#1890ff", textDecoration: "underline" }}
                >
                  Signin
                </Link>
              </Text>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
