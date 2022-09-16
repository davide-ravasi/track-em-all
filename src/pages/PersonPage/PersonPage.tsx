import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import useApiCall from "../../hooks/UseApiCall";


export default function PersonPage() {
  const { id }: { id: string } = useParams();
  const [personData, setPersonData] = useState<any>();
  const personUrl = `${process.env.REACT_APP_BASE_PERSON_URL}${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;


  const {
    response: personResponse,
    error: personError,
    loading: personLoading,
  } = useApiCall(personUrl);

  useEffect(() => {
    if (personResponse !== null) {
      console.log(personResponse);
      setPersonData(personResponse);
    }
  }, [personResponse]);


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
            <h2>Biography</h2>
            <p>{personData.biography}</p>
            <p>Birthday: {personData.birthday} - {personData.place_of_birth}</p>
            <p>Roles: {personData.known_for_department}</p>
            {personData.homepage && <p>Website: {personData.homepage}</p>}
          </>
        )}
        {/* <img alt={name} src={getUrlImages("big", still_path)} width="100%" /> */}
      </div>
    </div>
  );
}