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
  const personUrl = `${import.meta.env.VITE_BASE_PERSON_URL}${id}?api_key=${
    import.meta.env.VITE_API_KEY
  }&language=en-US`;
  const photosUrl = `${
    import.meta.env.VITE_BASE_PERSON_URL
  }${id}/images?api_key=${import.meta.env.VITE_API_KEY}&language=en-US`;

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
      setPersonData(personResponse);
    }
  }, [personResponse]);

  useEffect(() => {
    if (photosResponse !== null) {
      setImagesData(photosResponse);
    }
  }, [photosResponse]);

  return (
    <main className="page">
      <div className="page__content-wrapper">
        {personError && (
          <div className="loading-error" role="alert">
            {personError}
          </div>
        )}
        {personLoading && (
          <div className="loader"
            aria-live="polite"
            aria-atomic="true"
            role="status"
            aria-label="Loading person information"
          >
            <Loader aria-hidden="true" aria-busy="true" />
          </div>
        )}

        {personData && (
          <>
            <h1 className="page__title">{personData.name}</h1>
            <div className="page__content">
              <div className="page__image">
                <img
                  alt={`${personData.name} portrait`}
                  src={getUrlImages("thumb", personData.profile_path)}
                  width="100%"
                />
              </div>
              <section className="page__description">
                <h2>Biography</h2>
                <p>{personData.biography}</p>
                <div className="page__details">
                  <p>
                    Birthday: {personData.birthday} -{" "}
                    {personData.place_of_birth}
                  </p>
                  <p>Roles: {personData.known_for_department}</p>
                  {personData.homepage && <p>Website: {personData.homepage}</p>}
                </div>
              </section>
            </div>

            {imagesData ? <section className="page__photos">
              {photosError && (
                <div className="loading-error" role="alert">{photosError}</div>
              )}
              {photosLoading && (
                <div className="loader" aria-live="polite" aria-atomic="true" role="status" aria-label="Loading photos">
                  <Loader aria-hidden="true" aria-busy="true" />
                </div>
              )}

              <PhotoList imagesData={imagesData.profiles} />
            </section> : <p>No photos available.</p>}
            <section className="page__related">
              <h2>Related</h2>
              <p>Coming soon</p>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
