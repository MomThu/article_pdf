import axios from "axios";
import { useState } from "react";

const FileUpload = (props) => {
  const [image, setImage] = useState(null);

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      console.log(i, "abccc");
      setImage(i);
    }
  };

  const uploadToServer = async (event) => {
    const body = new FormData();
    body.append("file", image);
  
    const response = await axios.post("/api/upload", body, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  };

  return (
    <div>
      <div>
        <h4>Select Image</h4>
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
}

export default FileUpload