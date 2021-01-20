import React, { useState, useEffect } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import LocalStorage from "../utils/localStorage";

const Likes = ({ data }) => {
  const [liked, setLike] = useState(false);
  let id = data.url.split("/")[data.url.split("/").length - 2];

  useEffect(() => {
    let likesArray = LocalStorage.getLikes();
    if (likesArray.length > 1 && likesArray.includes(id)) {
      setLike(true);
    } else {
      setLike(false);
    }
  }, [id, data]);

  const triggerLiked = () => {
    setLike((prev) => !prev);
    let likesArrayTrigger = LocalStorage.getLikes();
    if (!liked) {
      likesArrayTrigger.push(id);
      LocalStorage.setLikes(likesArrayTrigger);
    } else {
      let index = likesArrayTrigger.findIndex((elem) => elem === id);
      likesArrayTrigger.splice(index, 1);
      LocalStorage.setLikes(likesArrayTrigger);
    }
  };

  return (
    <div onClick={triggerLiked}>
      {liked ? <AiFillHeart /> : <AiOutlineHeart />}
    </div>
  );
};

export default Likes;
