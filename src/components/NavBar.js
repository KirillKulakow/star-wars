import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavBar = () => {
  return (
    <Navigation>
      <StyledLink to={"/people?page=1"}>All people</StyledLink>
      <StyledLink to={"/favorites"}>Favorites people</StyledLink>
    </Navigation>
  );
};

export default NavBar;

const Navigation = styled.nav`
  position: fixed;
  top: 0;
  background-color: rgba(255, 255, 255, 0.8);
  width: 100%;
  padding: 20px 25px;
  z-index: 5;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  padding: 10px;
  margin: 0 10px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
