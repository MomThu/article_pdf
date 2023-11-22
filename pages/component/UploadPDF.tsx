import { Input, notification } from "antd";
import axios from "axios";
import { get } from "lodash";
import { useState } from "react";

const FileUpload = ({setUrl}) => {
  const [file, setFile] = useState(null);

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setFile(i);
    }
  };

  const uploadToServer = async (event) => {
    const body = new FormData();
    body.append("file", file);

    try {
      const response = await axios.post("/api/upload", body, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response && get(response, "data.data", "")) {
        setUrl(get(response, "data.data", ""))
        notification.success({ message: "Upload successful!" });
      }
    } catch (err) {
      console.log(err, "err here");

      notification.error({ message: err?.message || "Upload Failed hihi" });
    }
  };

  return (
    <div>
      <div>
        <h4>Select PDF File</h4>
        <input type="file" onChange={uploadToClient} />
        <button
          className="btn btn-primary"
          type="submit"
          onClick={uploadToServer}
        >
          Send to server
        </button>
      </div>
    </div>
  );
};

export default FileUpload;
