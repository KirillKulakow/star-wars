import React, { useState, useEffect } from "react";
import styled from "styled-components";
import API from "../utils/apiRequest";
import Loader from "../components/Loader";

const GetHomeworld = ({ url }) => {
  const [name, setName] = useState(null);

  useEffect(() => {
    const newUrl = new URL(url);
    newUrl.protocol = "https:";
    API.getInfoWithURL(newUrl)
      .then((response) => setName(response.name))
      .catch((err) => console.log(err));
    return setName(null);
  }, [url]);

  if (name) {
    return <HomeName>Homeworld: {name}</HomeName>;
  } else {
    return <Loader width={"50px"} />;
  }
};

export default GetHomeworld;

const HomeName = styled.p`
  margin: 0;
`;
