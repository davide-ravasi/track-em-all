import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
// import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

// const client = new ApolloClient({
//   uri: import.meta.env.REACT_APP_GRAPHQL_ENDPOINT,
//   cache: new InMemoryCache(),
// });

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
