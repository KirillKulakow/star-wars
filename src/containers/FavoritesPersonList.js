import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Loader from "../components/Loader";
import API from "../utils/apiRequest";
import GetHomeworld from "../components/GetHomeworld";
import Likes from "../components/Likes";
import LocalStorage from "../utils/localStorage";

const FavoritesPersonList = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const likesArray = LocalStorage.getLikes();
    if (likesArray.length > 1) {
      setIsLoading(true);
      likesArray.map((el) =>
        API.getPeople({ id: el, params: null })
          .then((info) => {
            setData((prev) => [...prev, info]);
            setIsLoading(false);
          })
          .catch((err) => console.log(err))
      );
    }
  }, []);

  return !isLoading ? (
    data.length < 1 ? (
      <h4>No match found</h4>
    ) : (
      <>
        <ListContainer>
          {data.map((el, index) => {
            const arr = el.url.split("/");
            const id = arr[arr.length - 2];
            return (
              <ItemList key={index}>
                <LinkStyled to={`/people/${id}`}>
                  <TitleName>{el.name}</TitleName>
                  <InfoItem>Gender: {el.gender}</InfoItem>
                  <GetHomeworld url={el.homeworld} />
                </LinkStyled>
                <Likes data={el} />
              </ItemList>
            );
          })}
        </ListContainer>
      </>
    )
  ) : (
    <Loader width={"200px"} />
  );
};

export default FavoritesPersonList;

const ListContainer = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 10px;
  margin: 70px 10px 0 10px;
  padding: 0;
  list-style: none;
  @media screen and (max-width: 850px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media screen and (max-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (max-width: 450px) {
    grid-template-columns: 1fr;
  }
`;
const ItemList = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 15px;
`;

const TitleName = styled.h3`
  margin: 0;
  font-style: italic;
`;

const InfoItem = styled.p`
  margin: 0;
`;
const LinkStyled = styled(Link)`
  text-decoration: none;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
