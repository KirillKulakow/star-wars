import React from "react";
import styled from "styled-components";
import { LinkedIn } from "react-linkedin-login-oauth2";
import { IconContext } from "react-icons";
import { FaLinkedin } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import LocalStorage from "../utils/localStorage";

const LoginLinkedIn = () => {
  const history = useHistory();
  const handleSuccess = (data) => {
    let date = Date.now();
    let state = {
      expiration_time: date + 3600000,
      accessToken: data.code,
    };
    LocalStorage.setUserInfo(state);
    history.push("/people");
  };

  const handleFailure = (error) => {
    console.log(error);
  };
  return (
    <LinkedInStyle
      clientId={process.env.REACT_APP_LINKEDIN_ID + ""}
      onFailure={handleFailure}
      onSuccess={handleSuccess}
      scope={"r_liteprofile r_emailaddress"}
      redirectUri='https://star-wars-global.netlify.app/linkedin'
    >
      <IconContext.Provider value={{ size: "1rem" }}>
        <FaLinkedin />
      </IconContext.Provider>
      Login with LinkedIn
    </LinkedInStyle>
  );
};

export default LoginLinkedIn;

const LinkedInStyle = styled(LinkedIn)`
  font-family: Helvetica, sans-serif;
  font-weight: 700;
  -webkit-font-smoothing: antialiased;
  color: #fff;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  transition: background-color 0.3s, border-color 0.3s;
  background-color: #0e76a8;
  padding: 15px 20px;
  border: none;
`;
