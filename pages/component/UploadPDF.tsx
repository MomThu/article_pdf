const FileUpload = ({ setFile, reload}) => {

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setFile(i);
    } else {
      setFile("");
    }
  };

  return (
    <div>
      <div>
        <h4>Chọn file PDF</h4>
        <div className="flex flex-row gap-5">
          <input type="file" key={reload} onChange={uploadToClient} />
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
