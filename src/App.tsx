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
import { ToastContainer } from "react-toastify";

import "./App.scss";
import ListingPage from "./pages/ListingPage/ListingPage";
import PersonPage from "./pages/PersonPage/PersonPage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // I dati sono considerati "freschi" per 5 minuti
      gcTime: 1000 * 60 * 30, // Mantieni in cache per 30 minuti prima del Garbage Collection
      refetchOnWindowFocus: false, // Evita chiamate inutili quando l'utente cambia tab (ottimo per le performance!)
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <Router>
          <AuthProvider>
            <Header />
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/about" exact component={AboutPage} />
              <Route path="/signup" exact component={SignUp} />
              <Route path="/signin" exact component={SignIn} />
              <Route
                path="/list/:section/:id?/:category/"
                exact
                component={ListingPage}
              />
              <PrivateRoute path="/favorites">
                <FavoritesPage />
              </PrivateRoute>
              {/* <Route path="/favorites" exact component={FavoritesPage} /> */}
              <Route path="/show/:id" exact component={ShowPage} />
              <Route path="/episode/:id" exact component={EpisodePage} />
              <Route path="/person/:id" exact component={PersonPage} />
            </Switch>
            <Footer />
          </AuthProvider>
        </Router>
        <ToastContainer />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
