import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import './Header.scss';

const people = [
  "Siri",
  "Alexa",
  "Google",
  "Facebook",
  "Twitter",
  "Linkedin",
  "Sinkedin"
];

export default function Header() {

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const results: any = people.filter(person =>
      person.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm]);

  return (
    <>
      <nav className="navbar">
          <div className="navbar__links">
            <div className="navbar-container--left">
              <div className="logo">
                <Link to="/"> Tracker
                </Link>
              </div>
            </div>            
            <div className="navbar-container--right">
              <ul className="navbar__Item">
                <li>
                  <input
                  className="navbar__menuItem"
                  type="text"
                  placeholder="Search Movie"
                  value={searchTerm}
                  onChange={handleChange}
                  />
                </li>
                {searchResults.map(item => (
                  console.log(item)
                ))}
                <li>
                  <Link to="/about" >
                  <FontAwesomeIcon className="navbar__menuItem" icon={faList} size="2x" />
                  </Link>
                </li>
                <li>
                  <Link to="/about">
                  <FontAwesomeIcon className="navbar__menuItem" icon={faUser} size="2x" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
      </nav>
    </>
  )
}
