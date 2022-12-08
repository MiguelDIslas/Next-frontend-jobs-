import { useEffect, useContext } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { faUpload, faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AuthContext from "../../context/AuthContext";

import useUploadFile from "../../hooks/useUploadFile";

const UploadResume = ({ access_token }) => {
  const router = useRouter();
  const file = useUploadFile();
  const { loading, error, clearErrors, uploadResume, user } =
    useContext(AuthContext);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [error, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("resume", file.file);
    await uploadResume(formData, access_token);

    router.push("/upload/resume");
    file.cleanFile();
    toast.success("Resume Uploaded");
  };

  return (
    <div className="modalMask">
      <div className="modalWrapper">
        <div className="left">
          <div className="w-100 h-100 position-relative">
            <Image src="/images/resume-upload.svg" alt="resume" layout="fill" />
          </div>
        </div>
        <div className="right">
          <div className="rightContentWrapper">
            <div className="headerWrapper">
              <h2> Upload Resume</h2>
            </div>
            <form className="form" onSubmit={handleSubmit}>
              <div className="inputWrapper">
                <div className="inputBox">
                  <FontAwesomeIcon icon={faUpload} />
                  <input
                    id="resume"
                    name="resume"
                    type="file"
                    placeholder="Enter First Name"
                    required
                    accept="application/pdf"
                    onInput={(e) => file.handleFileChange(e)}
                  />
                </div>
              </div>

              {user && user.resume && (
                <>
                  <h4 className="text-center my-3">Or</h4>

                  <a
                    href={`https://jobsportal.s3.us-west-1.amazonaws.com/${user.resume}`}
                    className="text-success text-center ml-4"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <div className="text-bold">
                      <FontAwesomeIcon icon={faDownload} />
                      Download your resume
                    </div>
                  </a>
                </>
              )}
              <div className="registerButtonWrapper">
                <button type="submit" className="registerButton">
                  {loading ? "Uploading..." : "Upload Resumen"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadResume;
