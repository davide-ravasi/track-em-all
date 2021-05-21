import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import SignUp from "./components/Signup/Signup";
import SignIn from "./components/SignIn/SignIn";
import ExampleFirestoreUsage from "./components/ExampleFirestoreUsage/ExampleFirestoreUsage";

import { AuthProvider } from "./contexts/AuthContext";

import "./App.scss";

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
            <Route
              path="/ExampleFirestoreUsage"
              exact
              component={ExampleFirestoreUsage}
            />
          </Switch>
          <Footer />
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
