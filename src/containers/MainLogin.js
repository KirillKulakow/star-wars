import React from "react";
import styled from "styled-components";
import BcgVideo from "../assets/BcgVideoStarWars.mp4";
import LoginLinkedIn from "../components/LoginLinkedIn";
import LoginFacebook from "../components/LoginFacebook";

const MainLogin = () => {
  return (
    <>
      <Video autoPlay loop muted id='video'>
        <source src={BcgVideo} type='video/mp4' />
      </Video>
      <LoginField>
        <LoginLinkedIn />
        <LoginFacebook />
      </LoginField>
    </>
  );
};

export default MainLogin;

const Video = styled.video`
  position: fixed;
  width: 100%;
  min-height: 100%;
  object-fit: cover;
`;
const LoginField = styled.div`
  padding: 10px;
  min-width: 50%;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.3);
  border-radius: 15px;
`;
