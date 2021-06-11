import React, { useState, useEffect } from "react";
import ShowList from "../../components/ShowList/ShowList";
//import { populars } from "../../mock/popular-tv-show";
import firebase from "firebase";
//import app from "../../firebase/firebase";
//import { useAuth } from "../../contexts/AuthContext";
//import { QuerySnapshot } from "@firebase/firestore-types";
//import { ShowListProps } from "../../typescript/types";

export default function FavoritesPage() {
  //const [error, setError] = useState("");
  //const { currentUser, logout } = useAuth();
  const [favorites, setFavorites] = useState([] as any);

  //const [loading, setLoading] = useState(false);
  const ref = firebase.firestore().collection("Favorites");

  //const shows = populars.results;
  /*
  useEffect(()=>{
    app.auth().onAuthStateChanged((user)=>{
      setCurrentUser(user);
    })
  })
 */
  //ONE TIME GET FUNCTION
  function getFavorites() {
    //setLoading(true);

    ref.onSnapshot((querySnapshot) => {
      //const items = [];
      const items = [] as any;
      //const results = [] as any;

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        items.push(data);

        setFavorites({ ...favorites, items });

        console.log("ITEMS: " + JSON.stringify(items));
      });

      //setLoading(false);
    });
  }

  useEffect(() => {
    getFavorites();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="page">
      <div className="page__content-wrapper">
        {favorites && favorites.items && favorites.items.length > 0 && (
          <ShowList title="Your Favorite Shows" shows={favorites.items} />
        )}
      </div>
    </div>
  );
}
