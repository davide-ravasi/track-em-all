import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import EpisodePage from "./pages/EpisodePage/EpisodePage";
import ShowPage from "./pages/ShowPage/ShowPage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import SignUp from "./components/Signup/Signup";
import SignIn from "./components/SignIn/SignIn";

import { AuthProvider } from "./contexts/AuthContext";

import "./App.scss";
import ListingPage from "./pages/ListingPage/ListingPage";

function App() {
  return (
    <div className="app">
      <Router>
        <AuthProvider>
          <Header />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/about" exact component={AboutPage} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/signin" exact component={SignIn} />
            <Route path="/list/:category" exact component={ListingPage} />
            <Route path="/favorites" exact component={FavoritesPage} />
            <Route path="/show/:id" exact component={ShowPage} />
            <Route path="/episode/:id" exact component={EpisodePage} />
          </Switch>
          <Footer />
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
