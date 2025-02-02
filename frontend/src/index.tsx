import React from 'react';
import ReactDOM from 'react-dom/client'; // Use the 'client' import from 'react-dom'
import './index.css'; // Optional: Your global styles can go here
import { ApolloProvider, InMemoryCache, ApolloClient  } from '@apollo/client'; // Import ApolloProvider
import App from './App';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // Replace with your actual GraphQL API endpoint
  cache: new InMemoryCache(),
});

// Create a root and render the app using React 18 API
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>  {/* Wrap your app with ApolloProvider */}
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
