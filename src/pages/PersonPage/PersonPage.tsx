import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import PhotoList from "../../components/PhotoList/PhotoList";
import useApiCall from "../../hooks/UseApiCall";
import { getUrlImages } from "../../utils";


export default function PersonPage() {
  const { id }: { id: string } = useParams();
  const [personData, setPersonData] = useState<any>();
  const [imagesData, setImagesData] = useState<any>();
  // @TODO create and external function for this url
  const personUrl = `${process.env.REACT_APP_BASE_PERSON_URL}${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
  const photosUrl = `${process.env.REACT_APP_BASE_PERSON_URL}${id}/images?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;


  const {
    response: personResponse,
    error: personError,
    loading: personLoading,
  } = useApiCall(personUrl);

  const {
    response: photosResponse,
    error: photosError,
    loading: photosLoading,
  } = useApiCall(photosUrl);

  useEffect(() => {
    if (personResponse !== null) {
      console.log(personResponse);
      setPersonData(personResponse);
    }
  }, [personResponse]);

  useEffect(() => {
    if (photosResponse !== null) {
      console.log(photosResponse);
      setImagesData(photosResponse);
    }
  }, [photosResponse]);


  return (
    <div className="page">
      <div className="page__content-wrapper">
        {personError && <div className="loading-error">{personError}</div>}
        {(personLoading) && (
          <div className="loader">
            <Loader />
          </div>
        )}

        {personData && (
          <>
            <h1>{personData.name}</h1>
            <div className="page__content">
              <div className="page__image">
                <img alt={personData.name + ' portrait'} src={getUrlImages("thumb", personData.profile_path)} width="100%" />
              </div>
              <div className="page__description">
                <h2>Biography</h2>
                <p>{personData.biography}</p>
                <div className="page__details">
                  <p>Birthday: {personData.birthday} - {personData.place_of_birth}</p>
                  <p>Roles: {personData.known_for_department}</p>
                  {personData.homepage && <p>Website: {personData.homepage}</p>}
                </div>
              </div>
            </div>

            <div className="page__photos">
              {photosError && <div className="loading-error">{photosError}</div>}
              {(photosLoading) && (
                <div className="loader">
                  <Loader />
                </div>
              )}

              {imagesData && <PhotoList imagesData={imagesData.profiles} />}

            </div>
            <div className="page__related">

            </div>

          </>
        )}
      </div>
    </div>
  );
}