import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import {
  faUser,
  faEnvelope,
  faUserTie,
  faKey,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AuthContext from "../../context/AuthContext";

const UpdateProfile = () => {
  const router = useRouter();
  const { loading, error, user, clearErrors, update } = useContext(AuthContext);
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      setState({
        ...state,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
      });
    }
    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [error, loading]);

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await update({
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      password: state.password,
    });

    router.push("/me");
    setState({ ...state, password: "" });
    toast.success("User Updated");
  };

  return (
    <div className="modalMask">
      <div className="modalWrapper">
        <div className="left">
          <div className="w-100 h-100 position-relative">
            <Image src="/images/profile.svg" alt="register" layout="fill" />
          </div>
        </div>
        <div className="right">
          <div className="rightContentWrapper">
            <div className="headerWrapper">
              <h2> Profile</h2>
            </div>
            <form className="form" onSubmit={handleSubmit}>
              <div className="inputWrapper">
                <div className="inputBox">
                  <FontAwesomeIcon icon={faUser} />
                  <input
                    id="firstName"
                    name="firstName"
                    value={state.firstName}
                    type="text"
                    placeholder="Enter First Name"
                    required
                    onChange={handleChange}
                  />
                </div>

                <div className="inputBox">
                  <FontAwesomeIcon icon={faUserTie} />
                  <input
                    id="lastName"
                    name="lastName"
                    value={state.lastName}
                    type="text"
                    placeholder="Enter Last name"
                    required
                    onChange={handleChange}
                  />
                </div>

                <div className="inputBox">
                  <FontAwesomeIcon icon={faEnvelope} />
                  <input
                    id="email"
                    name="email"
                    value={state.email}
                    type="email"
                    placeholder="Enter Your Email"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="inputBox">
                  <FontAwesomeIcon icon={faKey} />
                  <input
                    id="password"
                    name="password"
                    value={state.password}
                    type="password"
                    placeholder="Enter Your Password"
                    required
                    minLength={6}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="registerButtonWrapper">
                <button type="submit" className="registerButton">
                  {loading ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
