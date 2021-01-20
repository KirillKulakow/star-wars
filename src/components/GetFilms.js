import React, { useState, useEffect } from "react";
import styled from "styled-components";
import API from "../utils/apiRequest";
import Loader from "../components/Loader";

const GetFilms = ({ urls }) => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    urls.map((url) => {
      const newUrl = new URL(url);
      newUrl.protocol = "https:";
      return API.getInfoWithURL(newUrl)
        .then((response) => setFilms((prevFilms) => [...prevFilms, response]))
        .catch((err) => console.log(err));
    });
  }, [urls]);

  return (
    <Container>
      <Title>Films:</Title>
      {films.length === urls.length ? (
        <List>
          {films.map((film, index) => (
            <FilmName
              key={index}
            >{`Star Wars ${film.episode_id}: ${film.title}`}</FilmName>
          ))}
        </List>
      ) : (
        <Loader width={"70px"} />
      )}
    </Container>
  );
};

export default GetFilms;

const FilmName = styled.li`
  margin: 0;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.p`
  margin: 10px 0;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
