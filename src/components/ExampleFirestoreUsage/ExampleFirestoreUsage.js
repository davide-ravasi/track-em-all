import React, { useState, useEffect, Fragment } from "react";
import firebase from "../../firebase/firebase";
import { v4 as uuidv4 } from "uuid";

function ExampleFirestoreUsage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [boxOffice, setboxOffice] = useState("");

  const ref = firebase.firestore().collection("Movies");

  //ONE TIME GET FUNCTION
  function getmovies2() {
    setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setMovies(items);
      setLoading(false);
    });
  }
  useEffect(() => {
    getmovies2();
    // eslint-disable-next-line
  }, []);

  // ADD FUNCTION
  function addMovie(newMovie) {
    ref
      //.doc() use if for some reason you want that firestore generates the id
      .doc(newMovie.id)
      .set(newMovie)
      .then(() => {
        setMovies((prev) => [...prev]);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  //DELETE FUNCTION
  function deleteMovie(movie) {
    ref
      .doc(movie.id)
      .delete()
      .then(() => {
        setMovies((prev) => prev.filter((element) => element.id !== movie.id));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <Fragment>
      <h1>Movies (GET)</h1>

      <div>
        <h3>Add New </h3>
        <br />
        <h4>Title</h4>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <h4>Box Office</h4>
        <input
          type="text"
          value={boxOffice}
          onChange={(e) => setboxOffice(e.target.value)}
        />
        <br />
        <button onClick={() => addMovie({ title, boxOffice, id: uuidv4() })}>
          Submit
        </button>
      </div>
      <hr />
      {loading ? <h1>Loading...</h1> : null}
      {movies.map((movie) => (
        <div className="movie" key={movie.id}>
          <h2>{movie.title}</h2>
          <p>${movie.boxOffice} Box Office</p>
          <br />

          <div>
            <button onClick={() => deleteMovie(movie)}>X</button>
          </div>
        </div>
      ))}
    </Fragment>
  );
}

export default ExampleFirestoreUsage;
