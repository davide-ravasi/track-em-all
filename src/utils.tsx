import { VideoApiResponse, Video } from "./typescript/types";

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

const getTrailerUrl = (response: VideoApiResponse | null) => {
  if (response) {
    const { results } = response;
    const video = results.find((video: Video) => video.type === "Trailer");
    if (video) return `${process.env.REACT_APP_YOUTUBE_BASE_URL}/${video.key}`;
  }
};

export { getUrlImages, getTrailerUrl };
