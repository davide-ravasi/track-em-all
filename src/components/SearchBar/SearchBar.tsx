import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./SearchBar.scss";

import { Context } from "../../context/GlobalContext";

type SearchBarProps = {
  textInput: string;
  setTextInput: (textInput: string) => void;
};

export default function SearchBar(props: SearchBarProps) {
  const { textInput, setTextInput } = props;

  const { getSearchData } = useContext(Context);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
  };

  return (
    <div className="search">
      <section className="page__search">
        <form
          role="search"
          className="page__search__form"
          onSubmit={getSearchData}
        >
          <input
            type="search"
            name="searchterm"
            value={textInput}
            className="page__search__input"
            placeholder="Search tv shows"
            onChange={handleChange}
            aria-label="Search TV shows"
          />
          <button
            type="submit"
            className="page__search__button"
            aria-label="Submit search"
          >
            <FontAwesomeIcon icon={faSearch} aria-hidden="true" />
          </button>
        </form>
      </section>
    </div>
  );
}
