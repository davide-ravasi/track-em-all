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
      <h3 className="page__h2">PHOTOS</h3>
      <div className="photos_list__container">
        {imagesData &&
          imagesData.map((photo) => (
            <a
              href={getUrlImages("big", photo.file_path)}
              target="_blank"
              rel="noreferrer"
              className="photos_list__image"
            >
              <img
                key={photo.file_path}
                alt={photo.file_path}
                src={getUrlImages("thumb", photo.file_path)}
              />
            </a>
          ))}
      </div>
    </div>
  )
};

