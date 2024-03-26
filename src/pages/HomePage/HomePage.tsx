import React, { useState, useEffect } from "react";
import { Context } from "../../context/GlobalContext";
import { Sections, Show } from "../../typescript/types";
import ShowList from "../../components/ShowList/ShowList";
import Search from "../../components/Search/Search";
import SearchBar from "../../components/SearchBar/SearchBar";
import { Categories } from "../../typescript/types";
import "../../components/Search/Search.scss";
import { getSearchUrl } from "../../utils";
import { en } from "../../trads/en";
import { useSelector } from "react-redux";
import { useToast } from "../../hooks/UseToast";

export default function HomePage() {
  const [textInput, setTextInput] = useState("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Show[]>([]);
  const [recommendedId, setRecommendedId] = useState<string>();
  const [recommendedName, setRecommendedName] = useState<string>();
  const [hideHomepageContents, setHideHomepageContents] = useState(false);
  const [searchError, setSearchError] = useState("");
  const { user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (user && user.favorites !== null && user.favorites.length) {
      const randomFavoritesIndex = Math.floor(
        Math.random() * user.favorites.length
      );

      setRecommendedId(user.favorites[randomFavoritesIndex].showId);
      setRecommendedName(user.favorites[randomFavoritesIndex].name);
    }

    // url example
    // https://api.themoviedb.org/3/tv/series_id/recommendations?language=en-US&page=1
    // https://api.themoviedb.org/3/tv/1396/recommendations?api_key=b61f13ab08388482df500390ef8de990&language=en-US&page=1
  }, [user]);

  const { isError, message } = useSelector((state: any) => state.auth);
  const { notifyError } = useToast();

  useEffect(() => {
    if (isError) {
      notifyError(message.message, { autoClose: 2000 });
    }
  }, [isError, notifyError, message]);

  const getSearchData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setSearchTerm(textInput);

      if (textInput) {
        try {
          const res = await fetch(getSearchUrl(textInput));
          const data = await res.json();
          setSearchResults(data.results);
        } catch (error) {
          setSearchResults([]);
          setSearchTerm("");
        } finally {
          setHideHomepageContents(true);
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        // Handle the error object
        setSearchError(error.message);
      } else {
        // Handle any other exceptions
        setSearchError("An unknown error occurred");
      }
    }
  };

  return (
    <Context.Provider
      value={{
        searchTerm,
        searchResults,
        getSearchData,
      }}
    >
      <div className="page">
        <div className="page__content-wrapper">
          <SearchBar textInput={textInput} setTextInput={setTextInput} />
          {!hideHomepageContents ? (
            <>
              <ShowList
                section={Sections.Tv}
                category={Categories.Popular}
                cardAmount={6}
              />

              <ShowList
                section={Sections.Tv}
                category={Categories.TopRated}
                cardAmount={6}
              />

              {recommendedId && recommendedName && (
                <ShowList
                  title={`because you liked:  ${recommendedName}`}
                  section={Sections.Tv}
                  category={Categories.Recommended}
                  id={recommendedId}
                  cardAmount={6}
                />
              )}

              <ShowList
                title={en.categories.personpopular.title}
                section={Sections.Person}
                category={Categories.Popular}
                cardAmount={6}
              />
            </>
          ) : (
            <>
              <Search shows={searchResults} />
            </>
          )}
          {searchError && <div>{searchError}</div>}
        </div>
      </div>
    </Context.Provider>
  );
}
