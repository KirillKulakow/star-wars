const getLikes = () => {
  try {
    let likesState = localStorage.getItem("likesStarWars");
    if (likesState === null) {
      return [];
    }
    return JSON.parse(likesState);
  } catch {
    return [];
  }
};
const setLikes = (state) => {
  try {
    const likesState = JSON.stringify(state);
    localStorage.setItem("likesStarWars", likesState);
  } catch {}
};
const getImages = () => {
  try {
    let imagesState = localStorage.getItem("imagesStarWars");
    if (imagesState === null) {
      return {};
    }
    return JSON.parse(imagesState);
  } catch {
    return {};
  }
};
const setImages = (state) => {
  try {
    const imagesState = JSON.stringify(state);
    localStorage.setItem("imagesStarWars", imagesState);
  } catch {}
};
const getUserInfo = () => {
  try {
    let userState = localStorage.getItem("userStarWars");
    if (userState === null) {
      return {};
    }
    return JSON.parse(userState);
  } catch {
    return {};
  }
};
const setUserInfo = (state) => {
  try {
    const userState = JSON.stringify(state);
    localStorage.setItem("userStarWars", userState);
  } catch {}
};

const LSFunction = {
  getLikes,
  setLikes,
  getImages,
  setImages,
  getUserInfo,
  setUserInfo,
};

export default LSFunction;
