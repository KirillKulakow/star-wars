import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import LocalStorage from "../utils/localStorage";
import API from "../utils/apiRequest";
import Loader from "../components/Loader";
import GetFilms from "../components/GetFilms";
import GetVehicles from "../components/GetVehicles";

const PersonPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [image, setImage] = useState(null);

  const handleOnChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    API.getPeople({ id: id, params: null })
      .then((info) => {
        setData(info);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
    const imagesObject = LocalStorage.getImages();
    if (Object.keys(imagesObject).includes(id)) {
      setImage(imagesObject[id]);
    }
  }, [id]);

  const addNewImage = () => {
    const imagesObject = LocalStorage.getImages();
    imagesObject[id] = inputValue;
    LocalStorage.setImages(imagesObject);
    setImage(inputValue);
    setInputValue("");
  };

  const renderPersonPage = () => {
    return (
      <Grid>
        {image ? (
          <AddPhoto>
            <Image src={image} alt={data.name} />
          </AddPhoto>
        ) : (
          <AddPhoto>
            <Input
              value={inputValue}
              type='text'
              placeholder='Link to photo'
              onChange={handleOnChange}
            />
            <AddButton onClick={addNewImage}>Add image</AddButton>
          </AddPhoto>
        )}
        <PersonContainer>
          <TitlePerson>{data.name}</TitlePerson>
          <InfoPerson>Height: {data.height}</InfoPerson>
          <InfoPerson>Mass: {data.mass}</InfoPerson>
          <InfoPerson>Hair color: {data.hair_color}</InfoPerson>
          <InfoPerson>Skin color: {data.skin_color}</InfoPerson>
          <InfoPerson>Eye color: {data.eye_color}</InfoPerson>
          <InfoPerson>Birth year: {data.birth_year}</InfoPerson>
          <InfoPerson>Gender: {data.gender}</InfoPerson>
          {data.films.length < 1 ? "" : <GetFilms urls={data.films} />}
          {data.vehicles.length < 1 ? "" : <GetVehicles urls={data.vehicles} />}
        </PersonContainer>
      </Grid>
    );
  };

  if (!isLoading && data) {
    return renderPersonPage(data);
  } else {
    return <Loader width={"200px"} />;
  }
};

export default PersonPage;

const TitlePerson = styled.h2`
  margin: 0;
`;
const InfoPerson = styled.p`
  margin: 0;
`;
const PersonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 25px;
  padding: 25px 0;
  align-items: center;
`;

const Grid = styled.div`
  display: grid;
  margin: 70px auto 0 auto;
  grid-template-columns: 1fr 1fr;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  @media screen and (max-width: 580px) {
    grid-template-columns: 1fr;
  }
`;
const Image = styled.img`
  min-width: 190px;
  max-height: 240px;
  object-fit: cover;
`;
const AddPhoto = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const AddButton = styled.button`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  width: 75px;
  border: none;
  border-radius: 25px;
  background-color: rgba(0, 0, 0, 0.3);
  cursor: pointer;
`;
const Input = styled.input`
  box-shadow: none;
  border: none;
  background-color: #fff;
  border-radius: 20px;
  height: 35px;
  width: 100%;
  padding: 0 80px 0 25px;
  box-sizing: border-box;
  color: #1a6fc4;
  font-size: 17px;
  outline: none;
`;
