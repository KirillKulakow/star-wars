import React from "react";
import FacebookLogin from "react-facebook-login";
import { IconContext } from "react-icons";
import { FaFacebookSquare } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import "./fb_btn.css";
import LocalStorage from "../utils/localStorage";

const LoginFacebook = () => {
  const history = useHistory();
  function responseFacebook(response) {
    let state = {
      expiration_time: response.data_access_expiration_time + "00000",
      accessToken: response.accessToken,
    };
    LocalStorage.setUserInfo(state);
    history.push("/people");
  }

  return (
    <FacebookLogin
      appId={process.env.REACT_APP_FACEBOOK_ID}
      fields='name,email,picture'
      callback={responseFacebook}
      cssClass={"login-facebook-btn"}
      icon={
        <IconContext.Provider value={{ size: "1rem" }}>
          <FaFacebookSquare />
        </IconContext.Provider>
      }
    />
  );
};

export default LoginFacebook;
