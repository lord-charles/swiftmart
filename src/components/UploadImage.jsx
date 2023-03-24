import React, { useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";

const UploadPage = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadButtonEnabled, setUploadButtonEnabled] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFileSelection = (files) => {
    setSelectedFiles(files);
    setUploadButtonEnabled(true);
  };

  const handleUpload = async () => {
    setUploading(true);
    const fakeUploadAPI = "https://jsonplaceholder.typicode.com/posts";
    try {
      const formData = new FormData();
      for (let file of selectedFiles) {
        formData.append("files", file);
      }
      const response = await axios.post(fakeUploadAPI, formData);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setSelectedFiles([]);
      setUploadButtonEnabled(false);
      setUploading(false);
    }
  };

  return (
    <div>
      <Dropzone onDrop={handleFileSelection} multiple>
        {({ getRootProps, getInputProps }) => (
          <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag and drop some files here, or click to select files</p>
          </div>
        )}
      </Dropzone>
      {uploadButtonEnabled && (
        <button disabled={uploading} onClick={handleUpload}>
          Upload
        </button>
      )}
    </div>
  );
};

export default UploadPage;
