import * as React from "react";
import * as ReactDOM from "react-dom";
import "./index.css";
import App from "./App/App";
import * as serviceWorker from "./registerServiceWorker";
import "typeface-roboto";
import { BrowserRouter as Router } from "react-router-dom";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { theme } from "./Theme/theme";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import {authHandler} from "./AUTH/AuthHandler";
import { InMemoryCache } from 'apollo-cache-inmemory';

const client = new ApolloClient({
    link: authHandler,
    cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <MuiThemeProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </MuiThemeProvider>
  </ApolloProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
