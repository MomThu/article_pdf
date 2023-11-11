import { Button, Form, Input, Typography, notification } from "antd";
import axios from "axios";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getCsrfToken } from "next-auth/react";
import { useRouter } from "next/router";

const { Title } = Typography;
interface FormLogin {
  email: string;
  password: string;
  csrfToken: any;
}

export default function SignIn({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const [form] = Form.useForm<FormLogin>();

  const handleSubmit = async () => {
    try {
      const data = await form.validateFields();
      handleLogin(data);
    } catch (error) {
      // console.log(error);
    }
  };

  const handleLogin = async (data: FormLogin) => {
    try {
      await axios.post("/api/auth/callback/credentials", {
        data,
      });
      form.setFieldsValue(data);
      // router.push("/");
    } catch (error) {
      notification.error({ message: "Username or password incorrect!" });
    }
  };

  const handleClickForgetPassword = async () => {
    router.push("/forgetPassword");
  };

  return (
    // <form method="post" action="/api/auth/callback/credentials">
    //   <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
    //   <label>
    //     Email
    //     <input name="email" type="text" />
    //   </label>
    //   <label>
    //     Password
    //     <input name="password" type="password" />
    //   </label>
    //   <button type="submit">Sign in</button>
    // </form>

    <div className="h-[100vh] flex flex-col justify-center">
      <div className="flex justify-end mr-36 ">
        <div className="bg-white flex flex-col py-8 px-20 rounded-xl shadow-xl max-w-[528px]">
          <Title className="text-center text-[40px] leading-[48px] font-bold mb-8">
            Login
          </Title>
          <Form
            form={form}
            className="min-w-[250px]"
            initialValues={{ csrfToken: csrfToken }}
          >
            <Form.Item name={"csrfToken"} hidden={true}>
              <Input />
            </Form.Item>
            <Form.Item
              name={"email"}
              labelAlign="left"
              required
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input placeholder="email address" size="large" />
            </Form.Item>
            <Form.Item
              name={"password"}
              labelAlign="left"
              required
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password placeholder="password" size="large" />
            </Form.Item>
          </Form>
          <div className="flex mx-2 justify-end items-center">
            <Button type="link" onClick={handleClickForgetPassword}>
              Forget Password?
            </Button>
          </div>
          <Button block type="primary" className="mt-5" onClick={handleSubmit}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
