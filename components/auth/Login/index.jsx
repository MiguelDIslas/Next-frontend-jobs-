import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";

import AuthContext from "../../../context/AuthContext";

const Login = () => {
  const router = useRouter();
  const { loading, error, isAuthenticated, login, clearErrors } =
    useContext(AuthContext);
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }
    if (isAuthenticated && !loading) {
      router.push("/");
    }
  }, [isAuthenticated, error, loading]);

  const handleChange = (e) =>
    setState({ ...state, [e.target.name]: e.target.value });

  const submitHandler = (e) => {
    e.preventDefault();
    login({
      username: state.email,
      password: state.password,
    });
  };

  return (
    <div className="modalMask">
      <div className="modalWrapper">
        <div className="left">
          <div className="w-100 h-100 position-relative">
            <Image src="/images/login.svg" alt="login" layout="fill" />
          </div>
        </div>
        <div className="right">
          <div className="rightContentWrapper">
            <div className="headerWrapper">
              <h2> LOGIN</h2>
            </div>
            <form className="form" onSubmit={submitHandler}>
              <div className="inputWrapper">
                <div className="inputBox">
                  <FontAwesomeIcon icon={faEnvelope} />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    title="Your email"
                    value={state.email}
                    placeholder="Enter Your Email"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="inputBox">
                  <FontAwesomeIcon icon={faKey} />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    title="Your password"
                    value={state.password}
                    placeholder="Enter Your Password"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="loginButtonWrapper">
                <button type="submit" className="loginButton">
                  {loading ? "Authenticating..." : "Login"}
                </button>
              </div>
              <p className="signup text-decoration-none">
                New to Jobbee? <Link href="/register">Create an account</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
