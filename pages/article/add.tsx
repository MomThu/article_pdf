import React, { useEffect, useState } from "react";
import FileUpload from "../component/UploadPDF";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  SelectProps,
  Space,
  Spin,
  Typography,
  notification,
} from "antd";
import axios from "axios";
import { get, size } from "lodash";
import Header from "../component/HeadComponent";

const { Title, Text } = Typography;

const AddArticle = ({ user, sessionId }) => {
  const [form] = Form.useForm();
  const [authorForm] = Form.useForm();

  const [randomPass, setRandomPass] = useState("");
  const [fileName, setFileName] = useState("");
  const [authors, setAuthors] = useState<SelectProps["options"]>([]);
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAuthor = async () => {
    try {
      const apiURL = `/api/author`;
      const { data } = await axios.get(`${apiURL}`);

      if (get(data, "data", []) && size(data?.data)) {
        const dataSelect = data?.data.map((item) => {
          return {
            label: `${item?.fullname} - ${item?.email}`,
            value: item?.id,
          };
        });
        setAuthors(dataSelect);
      }
    } catch (err) {
      notification.error({
        message: err
          ? get(err, "response.data.message", "Đã xảy ra lỗi!")
          : "Đã xảy ra lỗi!",
      });
    }
  };

  useEffect(() => {
    fetchAuthor();
  }, []);

  const onFinish = async (formValue) => {
    if (!file) {
      notification.error({ message: "Bạn cần upload file để tạo bài báo!" });
    } else {
      setLoading(true);
      const body = new FormData();
      body.append("file", file);
      try {
        const response = await axios.post("/api/upload", body, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (response && get(response, "data.data", "")) {
          setFileName(get(response, "data.data.data", ""));
          // notification.success({
          //   message: get(response, "message", "Upload thành công!"),
          // });
          try {
            const apiURL = `/api/article/add`;
            const { data } = await axios.post(`${apiURL}`, {
              ...formValue,
              file_name: get(response, "data.data.data", ""),
            });
            setLoading(false);
            notification.success({ message: "Create successful!" });
            form.resetFields();
            setRandomPass("");
            setReload(!reload);
          } catch (err) {
            setLoading(false);
            notification.error({
              message: err
                ? get(err, "response.data.message", "Đã xảy ra lỗi!")
                : "Đã xảy ra lỗi!",
            });
          }
        }
      } catch (err) {
        setLoading(false);
        notification.error({
          message: err
            ? get(err, "response.data.message", "Đã xảy ra lỗi!")
            : "Upload thất bại!",
        });
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

  const handleChangeSelect = (value: string[]) => {
    form.setFieldsValue({
      author: value,
    });
  };

  const onCreateAuthor = async (values) => {
    try {
      const apiURL = `/api/author/add`;
      const { data } = await axios.post(`${apiURL}`, {
        ...values,
      });
      if (!data?.error) {
        await notification.success({ message: "Add author successful!" });
        setShowModal(false);
        authorForm.resetFields();
        fetchAuthor();
      }
    } catch (err) {
      notification.error({
        message: err
          ? get(err, "response.data.message", "Đã xảy ra lỗi!")
          : "Thêm tác giả thất bại!",
      });
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    authorForm.resetFields();
  };

  if (loading) {
    return (
      <div>
        <header className="sticky top-0 z-50">
          <Header
            isAdmin={get(user, "role", 0) === 1 ? true : false}
            signined={sessionId ? true : false}
          />
        </header>
        <Space size="large" className="flex justify-center mt-10">
          <Spin size="large" />
        </Space>
      </div>
    );
  }
  return (
    <div>
      <header className="sticky top-0 z-50">
        <Header
          isAdmin={get(user, "role", 0) === 1 ? true : false}
          signined={sessionId ? true : false}
        />
      </header>
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

                  <Form.Item label="Ngày xuất bản" name="publish_date">
                    <DatePicker />
                  </Form.Item>

                  <Form.Item
                    label="Nhà xuất bản"
                    name="journal_name"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the journal name!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item label="Tác giả" name="author">
                    <div className="flex flex-row">
                      <Select
                        mode="multiple"
                        allowClear
                        style={{ width: "100%" }}
                        placeholder="Please select"
                        onChange={handleChangeSelect}
                        options={authors}
                      />
                      <Button onClick={() => setShowModal(true)}>Thêm</Button>
                    </div>
                  </Form.Item>

                  <Form.Item
                    label="Đơn giá (VND)"
                    name="price"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the price!",
                      },
                    ]}
                  >
                    <InputNumber min={0} />
                  </Form.Item>

                  {!randomPass ? (
                    <div className="mb-5">
                      <Button onClick={() => generateCode(32)} type="primary">
                        Tạo mật khẩu tự động
                      </Button>
                    </div>
                  ) : (
                    <div className="mb-5">
                      <Text>
                        <b>Mật khẩu file: </b>
                        {randomPass}
                      </Text>
                    </div>
                  )}
                  <Form.Item
                    label="Mật khẩu"
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
                    <Input.Password
                      autoComplete="false"
                      visibilityToggle={{ visible: true }}
                    />
                  </Form.Item>

                  <div className="m-10 ml-0">
                    <FileUpload
                      setFile={(item) => setFile(item)}
                      reload={reload}
                    />
                  </div>

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
            <Modal
              title="Tạo tác giả"
              open={showModal}
              footer={null}
              onCancel={handleCancel}
            >
              <Form
                name="createAuthorForm"
                form={authorForm}
                onFinish={onCreateAuthor}
                labelCol={{ md: 8, xs: 24 }}
                labelWrap
                wrapperCol={{ md: 16, xs: 24 }}
                labelAlign="left"
              >
                <Form.Item
                  label="Tên tác giả"
                  name="fullname"
                  rules={[
                    { required: true, message: "Please enter full name!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Văn phòng làm việc"
                  name="department"
                  rules={[
                    { required: true, message: "Please enter department!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Địa chỉ"
                  name="address"
                  rules={[{ required: true, message: "Please enter address!" }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please enter your phone!" },
                    { type: "email" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item className="w-full">
                  <div className="flex flex-col items-center w-full">
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="items-center"
                    >
                      Submit
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </Modal>
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
