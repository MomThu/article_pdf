import type { AppProps } from "next/app";
import "antd/dist/reset.css";
import Layout from "./layout";
import "./styles/global.css";
import { ConfigProvider } from "antd";
import { SessionProvider, useSession } from "next-auth/react";

function MyApp({ Component, pageProps }: AppProps) {  
  return (
    <SessionProvider>

           <ConfigProvider
           theme={{
             token: {
               // Seed Token
               colorPrimary: "#31C1F3",
               borderRadius: 2,
   
               // Alias Token
               colorBgContainer: "#f6ffed",
             },
           }}
         >
           <Layout>
             <Component {...pageProps} />
           </Layout>
         </ConfigProvider>
          </SessionProvider>
  );
}

export default MyApp;
