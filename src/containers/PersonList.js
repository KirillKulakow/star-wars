import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import queryString from "query-string";
import styled from "styled-components";
import Loader from "../components/Loader";
import API from "../utils/apiRequest";
import GetHomeworld from "../components/GetHomeworld";
import useDebounce from "../utils/hookUseDebounce";
import Likes from "../components/Likes";

function getItemFromSearchParams(search, key) {
  const parsedSearch = queryString.parse(search);
  if (parsedSearch[key]) {
    return parsedSearch[key];
  } else {
    return "";
  }
}

function getPage(search) {
  let page = Number(getItemFromSearchParams(search, "page"));
  if (page !== 0 && page) {
    return page;
  }
  return 1;
}

const PersonList = () => {
  const { search } = useLocation();
  const [data, setData] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const debouncedInput = useDebounce(inputValue, 700);
  const [page, setPage] = useState(getPage(search));
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (getPage(search) !== page) {
      setPage(getPage(search));
    }
    if (debouncedInput.trim() !== "") {
      API.getPeople({
        id: null,
        params: `?search=${debouncedInput}&page=${page}`,
      })
        .then((info) => {
          setData(info);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    } else if (debouncedInput.trim() === "") {
      API.getPeople({ id: null, params: `?page=${page}` })
        .then((info) => {
          setData(info);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [page, debouncedInput, search]);

  const pagination = () => {
    if (data.previous && data.next) {
      return (
        <>
          <PageLink to={`/people?page=${page - 1}`} onClick={setPrevPage}>
            Prev
          </PageLink>
          <PageLink to={`/people?page=${page + 1}`} onClick={setNextPage}>
            Next
          </PageLink>
        </>
      );
    } else if (data.next) {
      return (
        <PageLink to={`/people?page=${page + 1}`} onClick={setNextPage}>
          Next
        </PageLink>
      );
    } else if (data.prev) {
      return (
        <PageLink to={`/people?page=${page - 1}`} onClick={setPrevPage}>
          Prev
        </PageLink>
      );
    } else {
      return <></>;
    }
  };

  const setNextPage = () => {
    setPage(page + 1);
  };
  const setPrevPage = () => {
    setPage(page - 1);
  };
  const handleOnChange = (e) => {
    setInputValue(e.target.value);
    if (page !== 1) {
      setPage(1);
    }
  };

  return !isLoading && data ? (
    <>
      <Input
        value={inputValue}
        type='text'
        id='People'
        placeholder='Name of a person'
        onChange={handleOnChange}
      />
      {data.results.length < 1 ? (
        <h4>No match found</h4>
      ) : (
        <>
          <ListContainer>
            {data.results.map((el, index) => {
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
          <PaginationContainer>{pagination()}</PaginationContainer>
        </>
      )}
    </>
  ) : (
    <Loader width={"200px"} />
  );
};

export default PersonList;

const ListContainer = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 10px;
  margin: 30px 10px;
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

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const PageLink = styled(Link)`
  text-decoration: none;
  background-color: rgba(255, 255, 255, 0.3);
  padding: 5px 25px;
  border-radius: 10px;
  color: #000;
  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }
`;

const Input = styled.input`
  box-shadow: none;
  border: none;
  background-color: #fff;
  border-radius: 20px;
  height: 35px;
  width: 100%;
  padding: 0 53px;
  box-sizing: border-box;
  color: #1a6fc4;
  font-size: 17px;
  outline: none;
  margin-top: 70px;
`;
const LinkStyled = styled(Link)`
  text-decoration: none;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
