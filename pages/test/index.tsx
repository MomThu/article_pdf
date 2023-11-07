import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import crypto from "crypto";
import { GetServerSideProps } from "next";
import { get } from "lodash";
// import * as pdfjs from "pdfjs-dist";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Article = ({ pdf }) => {
  const canvasRef = useRef(null);

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  // Go to next page
  function goToNextPage() {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  }

  function goToPreviousPage() {
    setPageNumber((prevPageNumber) => prevPageNumber - 1);
  }

  const decrypt = (encryptedText, key, iv) => {
    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      Buffer.from(key),
      Buffer.from(iv, "hex")
    );
    let decrypted = decipher.update(encryptedText, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  };

//   const getPdf = async () => {
//     try {
//       const key = "12345612345612345612345612345612";
//       const realPassword = decrypt(
//         get(pdf, "encryptedPassword", ""),
//         key,
//         get(pdf, "iv_value", "")
//       );
//       console.log(realPassword);
//       var loadingTask = pdfjs.getDocument("pdfviewer.pdf");
//       loadingTask.onPassword = function (updatePassword, reason) {
//         if (reason === 1) {
//           // var new_password = prompt("Please enter a password:");
//           updatePassword(realPassword);
//         } else {
//           var new_password = prompt("Please enter a password:");
//           updatePassword(new_password);
//         }
//       };
//       loadingTask.promise.then((pdf) => {
//         pdf.getPage(1).then((page) => {
//           const canvas = canvasRef.current;
//           const context = canvas.getContext("2d");
//           const viewport = page.getViewport({ scale: 1 });
//           canvas.height = viewport.height;
//           canvas.width = viewport.width;
//           const renderContext = {
//             canvasContext: context,
//             viewport: viewport,
//           };
//           page.render(renderContext);
//         });
//       });
//     } catch (err) {}
//   };

  const onPassword = (updatePassword, reason) => {
    const key = "12345612345612345612345612345612";
      const realPassword = decrypt(
        get(pdf, "encryptedPassword", ""),
        key,
        get(pdf, "iv_value", "")
      );
    if (reason === 1) {
        updatePassword(realPassword);
      } else {
        var new_password = prompt("Please enter a password:");
        updatePassword(new_password);
      }
  }

//   useEffect(() => {
//     getPdf();
//   }, []);
  return (
    <div>
      <div>Abstract: {get(pdf, "article.abstract", "")}</div>
      {get(pdf, "permission", 0) === 1 ? (
        <div>Read</div>
      ) : get(pdf, "permission", 0) === 2 ? (
        <div>Print</div>
      ) : get(pdf, "permission", 0) === 3 ? (
        <div>Download</div>
      ) : (
        <div>None</div>
      )}
      {/* <canvas ref={canvasRef}></canvas> */}
      <div>
        <Document
          file={"pdfviewer.pdf"}
          onLoadSuccess={onDocumentLoadSuccess}
          onPassword={onPassword}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <p>Page {pageNumber} of {numPages}</p>
      </div>
    </div>
  );
};

export default Article;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const apiURL = `http://localhost:3000/api/pdf`;
  const { data } = await axios.get(`${apiURL}?article=1`);
  return {
    props: {
      pdf: data.data,
    },
  };
};
