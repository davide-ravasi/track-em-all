import { VideoApiResponse, Video } from "./typescript/types";
import placeholderVert from "./assets/thumb-vert-placeholder.png";
import placeholderHoriz from "./assets/thumb-horiz-placeholder.png";

const getUrlImages = (
  type: string,
  imgName: string,
  imgOrientation?: string
) => {
  const baseImgUrl = `${process.env.REACT_APP_BASE_IMG_URL}`;
  let finalImgUrl = "";

  // if no image get a placeholder
  if (!imgName) {
    const placeHolder = getPlaceholder(imgOrientation);

    // if no image for big format
    // return nothing and in the page
    // doesn't show the image at all
    if (type === "big") return "";

    return placeHolder;
  }

  // if image get one by type
  switch (type) {
    case "thumb":
      finalImgUrl = `${baseImgUrl}/${process.env.REACT_APP_BASE_THUMB_WIDTH}${imgName}`;
      break;
    case "big":
      finalImgUrl = `${baseImgUrl}/${process.env.REACT_APP_BASE_BIG_IMG_WIDTH}${imgName}`;
      break;
    default:
      return "";
  }

  return finalImgUrl;
};

const getPlaceholder = (imgOrientation?: string) => {
  // if image is specified (landscape) get horiz placeholder
  if (imgOrientation) return placeholderHoriz;
  // otherwise get vert placeholder
  return placeholderVert;
};

const getTrailerUrl = (response: VideoApiResponse | null) => {
  if (response) {
    const { results } = response;
    const video = results.find((video: Video) => video.type === "Trailer");
    if (video) return `${process.env.REACT_APP_YOUTUBE_BASE_URL}/${video.key}`;
  }
};

const padNumber = (numberToPad: number) =>
  numberToPad > 9 ? String(numberToPad) : "0" + numberToPad;

export { getUrlImages, getTrailerUrl, padNumber };
