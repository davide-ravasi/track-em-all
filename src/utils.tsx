// import { URL, Recipe } from "./typescript/types";

const getUrlImages = (type: string, imgName: string) => {
  const baseImgUrl = `${process.env.REACT_APP_BASE_IMG_URL}`;
  let finalImgUrl = "";

  switch (type) {
    case "thumb":
      finalImgUrl = `${baseImgUrl}/${process.env.REACT_APP_BASE_THUMB_WIDTH}/${imgName}`;
      break;
    case "big":
      finalImgUrl = `${baseImgUrl}/${process.env.REACT_APP_BASE_BIG_IMG_WIDTH}/${imgName}`;
      break;
    default:
      return "";
  }

  return finalImgUrl;
};

export { getUrlImages };
