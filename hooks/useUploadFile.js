import { useState } from "react";

const useUploadFile = () => {
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");

  const handleFileChange = (e) => {
    const fileSelected = e.target.files[0];
    if (fileSelected !== undefined) {
      setFile(fileSelected);
      const previewImage = URL.createObjectURL(fileSelected);
      setPreview(previewImage);
    } else {
      setFile("");
      setPreview("");
    }
  };

  const cleanFile = (e) => {
    setFile("");
    setPreview("");
  };

  return {
    file,
    preview,
    handleFileChange,
    cleanFile,
  };
};

export default useUploadFile;
