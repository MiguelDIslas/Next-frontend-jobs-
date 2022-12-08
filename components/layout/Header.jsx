import { useContext } from "react";
import React from "react";
import Link from "next/link";
import Image from "next/image";

import AuthContext from "../../context/AuthContext";
const Header = () => {
  const { loading, user, isAuthenticated, logout } = useContext(AuthContext);

  const logoutHandler = () => {
    logout();
  }

  return (
    <div className="navWrapper">
      <div className="navContainer">
        <Link href="/">
          <div className="logoWrapper">
            <div className="logoImgWrapper">
              <Image width="50" height="50" src="/images/logo.png" />
            </div>
            <span>Instituto Tecnológico de Delicias - Jobs</span>
          </div>
        </Link>
        <div className="btnsWrapper">
          <Link href="/employeer/jobs/new">
            <button className="postAJobButton">
              <span>Post A Job</span>
            </button>
          </Link>
          {isAuthenticated ? (
            <div className="dropdown ml-3">
              <a
                className="btn dropdown-toggle mr-4"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span>Hi, {user.first_name}</span>
              </a>

              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <Link href="/employeer/jobs">
                  <a className="dropdown-item">My Jobs</a>
                </Link>

                <Link href="/me/applied">
                  <a className="dropdown-item">Jobs Applied</a>
                </Link>

                <Link href="/me">
                  <a className="dropdown-item">Profile</a>
                </Link>

                <Link href="/upload/resume">
                  <a className="dropdown-item">Upload Resume</a>
                </Link>

                <Link href="/">
                  <a onClick={logoutHandler} className="dropdown-item text-danger">
                    Logout
                  </a>
                </Link>
              </div>
            </div>
          ) : (
            <Link href="/login">
              <button className="loginButtonHeader">
                <span>Login</span>
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
