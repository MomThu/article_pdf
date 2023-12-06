import { ConfigProvider } from "antd";
import "antd/dist/reset.css";
import type { AppProps } from "next/app";
import Layout from "./layout";
import "./styles/global.css";

function MyApp({ Component, pageProps, router }: AppProps) {
  if (router.pathname.startsWith('/auth/')) {
    return (
      <ConfigProvider
      theme={{
        token: {
          borderRadius: 2,
        },
      }}
    > 
        <Component {...pageProps} />
    </ConfigProvider>
    )
  }
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 2,
        },
      }}
    > 
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ConfigProvider>
  );
}

export default MyApp;
