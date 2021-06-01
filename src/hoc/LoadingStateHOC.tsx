import React, { useState } from "react";

import Loader from "../components/Loader/Loader";

const LoadingStateHOC = (WrappedComponent: any) => {
  function HOC(props: any) {
    const [isLoading, setLoading] = useState(true);

    const setLoadingState = (isComponentLoading: boolean) => {
      setLoading(isComponentLoading);
    };

    return (
      <>
        {isLoading && (
          <div className="loader">
            <Loader />
          </div>
        )}
        <WrappedComponent {...props} setLoading={setLoadingState} />
      </>
    );
  }
  return HOC;
};

export default LoadingStateHOC;
