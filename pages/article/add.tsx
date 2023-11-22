import React, { useState } from "react";
import FileUpload from "../component/UploadPDF";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { Button, Col, Form, Input, Row, Typography, notification } from "antd";
import axios from "axios";

const { Title, Text } = Typography;

const AddArticle = ({ user }) => {
  const [form] = Form.useForm();

  const [randomPass, setRandomPass] = useState("");
  const [url, setUrl] = useState("");

  const onFinish = async (formValue) => {
    console.log(formValue, "form value");
    
    if (!url) {
      notification.error({message: "Bạn cần upload file để tạo bài báo!"});
    } else {
      try {
        const apiURL = `/api/article/add`;
        const { data } = await axios.post(`${apiURL}`, {
          ...formValue,
          url: url
        });
        return {
          props: {
            pdf: data.data,
          },
        };
      } catch (err) {
        notification.error({ message: err ? err : "Error!" });
      }
    }
  };

  const generateCode = (length: number) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    setRandomPass(result);
    form.setFieldsValue({
      password: result,
      confirmPassword: result,
    });
  };

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
                  form={form}
                  name="addArticleForm"
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
                        message: "Please enter the title!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Tóm tắt"
                    name="abstract"
                    rules={[
                      { required: true, message: "Please enter the abstract!" },
                    ]}
                  >
                    <Input.TextArea rows={6} />
                  </Form.Item>
                  {!randomPass ? (
                    <Button onClick={() => generateCode(32)} type="primary">
                      Auto Generate Password
                    </Button>
                  ) : (
                    <div>
                      <Text>Generated Password: {randomPass}</Text>
                    </div>
                  )}
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the password!",
                      },
                      {
                        min: 32,
                        max: 32,
                        message: "Password must be 32 characters long!",
                      },
                    ]}
                  >
                    <Input.Password
                      autoComplete="false"
                      visibilityToggle={{ visible: true }}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    dependencies={["password"]}
                    rules={[
                      {
                        required: true,
                        message: "Please confirm the password!",
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
                    <Input.Password
                      autoComplete="false"
                      visibilityToggle={{ visible: true }}
                    />
                  </Form.Item>

                  <FileUpload setUrl={(item) => setUrl(item)} />

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
