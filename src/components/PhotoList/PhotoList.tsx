// import { useState, useEffect } from "react";
import { Image } from "../../typescript/types";
import { getUrlImages } from "../../utils";
import './PhotoList.styles.scss';

interface PhotoListProps {
  imagesData: Image[]
}

export default function PhotoList({ imagesData }: PhotoListProps) {
  return (
    <div className="photos_list">
      <h2 className="page__h2" id="photos">PHOTOS</h2>
      <div className="photos_list__container">
        {imagesData &&
          imagesData.map((photo, index) => (
            <a
              key={photo.file_path}
              href={getUrlImages("big", photo.file_path)}
              target="_blank"
              rel="noopener noreferrer"
              className="photos_list__image"
              title={`View larger photo ${index + 1}`}
            >
              <img
                alt={`Photo ${index + 1}`}
                src={getUrlImages("thumb", photo.file_path)}
              />
            </a>
          ))}
      </div>
    </div>
  )
};

