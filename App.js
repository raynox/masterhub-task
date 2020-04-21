import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApolloClient } from 'apollo-client';
import { API_URL } from 'react-native-dotenv';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import Video from './src/videos/screens/Video';
import Feed from './src/videos/screens/Feed';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: `${API_URL}/graphql/`,
});

const client = new ApolloClient({
  cache,
  link,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
});

export default function App() {
  const Stack = createStackNavigator();

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Feed" component={Feed} />
          <Stack.Screen name="Video" component={Video} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
