import { Button, Card, Col, Row, Typography, notification } from "antd";
import axios from "axios";
import { get, isEmpty } from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Pdf from "../pdf";
import { GetServerSideProps } from "next";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import crypto from "crypto";
import {
  DocumentAskPasswordEvent,
  PdfJs,
  RenderPageProps,
  Viewer,
  Worker,
} from "@react-pdf-viewer/core";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import type {
  ToolbarProps,
  ToolbarSlot,
  TransformToolbarSlot,
} from "@react-pdf-viewer/toolbar";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { ShoppingCartOutlined } from "@ant-design/icons";
const { Text, Title } = Typography;
interface RemovePartsDefaultToolbarDefaultLayoutExampleProps {
  fileUrl: string;
}

const Article = (props) => {
  const router = useRouter();

  const [article, setArticle] = useState({});
  const [showPdf, setShowPdf] = useState(false);
  const [pdf, setPdf] = useState({});

  const transform1: TransformToolbarSlot = (slot: ToolbarSlot) => ({
    ...slot,
    Download: () => <></>,
    DownloadMenuItem: () => <></>,
    Open: () => <></>,
    Print: () => <></>,
  });

  const transform2: TransformToolbarSlot = (slot: ToolbarSlot) => ({
    ...slot,
    Download: () => <></>,
    DownloadMenuItem: () => <></>,
    Open: () => <></>,
  });

  const transform3: TransformToolbarSlot = (slot: ToolbarSlot) => ({
    ...slot,
    Open: () => <></>,
  });

  const renderToolbar = (
    Toolbar: (props: ToolbarProps) => React.ReactElement
  ) => (
    <Toolbar>
      {renderDefaultToolbar(
        get(pdf, "permission") === 1
          ? transform1
          : get(pdf, "permission") === 2
          ? transform2
          : get(pdf, "permission") === 3
          ? transform3
          : null
      )}
    </Toolbar>
  );

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    renderToolbar,
  });
  const { renderDefaultToolbar } =
    defaultLayoutPluginInstance.toolbarPluginInstance;

  const renderPage = (props: RenderPageProps) => {
    return (
      <>
        {props.canvasLayer.children}
        <div
          style={{ userSelect: get(pdf, "permission") !== 3 ? "none" : "auto" }}
        >
          {props.textLayer.children}
        </div>
        {props.annotationLayer.children}
      </>
    );
  };

  useEffect(() => {
    fetchData();
    fetchPdf();
  }, []);

  const fetchData = async () => {
    try {
      const apiURL = `/api/article`;
      const id = router?.query.article;
      const { data } = await axios.get(`${apiURL}/${id}`);
      setArticle(get(data, "data", {}));
    } catch (err) {
      notification.error({ message: err ? err : "Error!" });
    }
  };

  const fetchPdf = async () => {
    try {
      const id = router?.query.article;
      const apiURL = `/api/pdf`;
      const { data } = await axios.get(`${apiURL}?article=${id}`);
      setPdf(get(data, "data", {}));
      return {
        props: {
          pdf: data.data,
        },
      };
    } catch (err) {
      notification.error({ message: err ? err : "Error!" });
    }
  };

  const handleAccess = () => {
    setShowPdf(true);
  };

  const decrypt = (encryptedText, key, iv) => {
    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      Buffer.from(key, "hex"),
      Buffer.from(iv, "hex")
    );
    let decrypted = decipher.update(encryptedText, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  };

  const handleAskPassword = (e: DocumentAskPasswordEvent) => {
    try {
      const key = props?.sessionId;
      const realPassword = decrypt(
        get(pdf, "encryptedPassword", ""),
        key,
        get(pdf, "iv_value", "")
      );
      console.log(realPassword, "realpassword");
      e.verifyPassword(realPassword);
    } catch (err) {}
  };

  const onAddToCart = () => {};


  return (
    <Row className="justify-center mt-10">
      <Col md={18}>
        <div key={get(article, "id", 0)}>
          <div>
            <Title className="text-center" level={3}>
              {get(article, "title", "")}
            </Title>
          </div>
          <div>
            <Title level={5}>Abstract</Title>
            <Text>{get(article, "abstract", "")}</Text>
          </div>
        </div>
        {!showPdf && !isEmpty(pdf) ? (
          <Button onClick={handleAccess}>Read PDF</Button>
        ) : !isEmpty(pdf) ? (
          <div>
            {get(pdf, "permission") === 1 ? (
              <div>Read</div>
            ) : get(pdf, "permission") === 2 ? (
              <div>Print</div>
            ) : get(pdf, "permission") === 3 ? (
              <div>Download</div>
            ) : (
              <div>
                <Text>
                  You do not have permission to read this article. Please pay to
                  read it!
                </Text>
                <Button
                  type="primary"
                  icon={<ShoppingCartOutlined />}
                  onClick={() => onAddToCart()}
                >
                  <b>ADD TO CART</b>
                </Button>
              </div>
            )}
            {get(pdf, "permission", 0) !== 0 && (
              <Worker workerUrl="//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js">
                <div
                  style={{
                    height: "100%",
                  }}
                >
                  <Viewer
                    fileUrl="pdfviewer.pdf"
                    plugins={[defaultLayoutPluginInstance]}
                    onDocumentAskPassword={handleAskPassword}
                    renderPage={renderPage}
                    transformGetDocumentParams={(
                      options: PdfJs.GetDocumentParams
                    ) => {
                      return Object.assign({}, options, {
                        disableRange: false,
                        disableStream: true,
                      });
                    }}
                  />
                </div>
              </Worker>
            )}
          </div>
        ) : (
          <div>Article is not exist!</div>
        )}
      </Col>
    </Row>
  );
};

export default Article;

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session)
    return {
      props: {
        sessionId: session.id,
      },
    };
  return {
    props: {},
  };
}
