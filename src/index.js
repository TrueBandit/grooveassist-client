import React from 'react';
import ReactDOM from 'react-dom/client';
// Apollo GraphQL //
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

import App from './App';
import './design/index.css';
import { BrowserRouter } from "react-router-dom";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import DataReducer from './utilities/DataReducer';

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_HTTPLINK
});
const wsLink = new GraphQLWsLink(createClient({
  url: process.env.REACT_APP_WSLINK
}));
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
});

const appStore = createStore(DataReducer);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
          <App />
    </ApolloProvider>
  </BrowserRouter>

);