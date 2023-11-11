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
    <form method="post" action="/api/auth/callback/credentials">
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <label>
        Email
        <input name="email" type="text" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <button type="submit">Sign in</button>
    </form>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
