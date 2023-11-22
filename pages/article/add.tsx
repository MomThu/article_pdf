import React from "react";
import FileUpload from "../component/UploadPDF";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { Button, Col, Form, Input, Row, Typography } from "antd";

const { Title } = Typography;

const AddArticle = ({ user }) => {
  const onFinish = () => {};

  return (
    <div>
      {user?.role === 1 ? (
        <Row className="justify-center">
          <Col md={18}>
            <div className="bg-white flex flex-col py-8 px-20 rounded-xl shadow-xl">
              <Title className="text-center text-[40px] leading-[48px] font-bold mb-8">
                Thêm bài báo
              </Title>
              <div className="justify-center">
                <Form
                  name="registrationForm"
                  onFinish={onFinish}
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  labelAlign="left"
                >
                  <Form.Item
                    label="Tiêu đề"
                    name="title"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your full name!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Tóm tắt"
                    name="abstract"
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
                      {
                        required: true,
                        message: "Please enter your password!",
                      },
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

                  <FileUpload />

                  <Form.Item
                    wrapperCol={{ span: 16 }}
                    className="justify-center"
                  >
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      ) : (
        <div>You are not authorized!</div>
      )}
    </div>
  );
};
export default AddArticle;

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
