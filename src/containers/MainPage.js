import React from "react";
import styled from "styled-components";
import { useParams, useLocation } from "react-router-dom";
import img from "../assets/BcgImage.png";
import PersonPage from "../components/PersonPage";
import PersonList from "./PersonList";
import FavoritesPersonList from "./FavoritesPersonList";
import NavBar from "../components/NavBar";

const MainPage = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  return (
    <>
      <BGImage />
      <Container>
        <NavBar />
        {id ? (
          <PersonPage />
        ) : pathname.includes("/favorites") ? (
          <FavoritesPersonList />
        ) : (
          <PersonList />
        )}
      </Container>
    </>
  );
};

export default MainPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const BGImage = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  opacity: 0.7;
  background-image: url(${img});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  z-index: -1;
`;
