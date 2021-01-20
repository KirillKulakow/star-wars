import React, { useState, useEffect } from "react";
import styled from "styled-components";
import API from "../utils/apiRequest";
import Loader from "../components/Loader";

const GetVehicles = ({ urls }) => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    urls.map((url) => {
      const newUrl = new URL(url);
      newUrl.protocol = "https:";
      return API.getInfoWithURL(newUrl)
        .then((response) =>
          setVehicles((prevVehicles) => [...prevVehicles, response])
        )
        .catch((err) => console.log(err));
    });
  }, [urls]);

  return (
    <Container>
      <Title>Vehicles:</Title>
      {vehicles.length === urls.length ? (
        <List>
          {vehicles.map((vehicle, index) => (
            <VehicleName
              key={index}
            >{`${vehicle.name} ${vehicle.model}`}</VehicleName>
          ))}
        </List>
      ) : (
        <Loader width={"70px"} />
      )}
    </Container>
  );
};

export default GetVehicles;

const VehicleName = styled.li`
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
