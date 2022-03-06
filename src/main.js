import { createApp, h, provide } from 'vue'
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'
// import DefaultApolloClient from VueApollo.
// This is a VueApollo helper required for providing the Apollo client instance to the Vue application.

import App from './App.vue'

const httpLink = createHttpLink({ // create a link to our GraphQL API
  uri: 'http://localhost:4000/graphql',
})

const cache = new InMemoryCache() // all thre queried data are stored.

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

const app = createApp({
  // import a provide method from Vue and modify our createApp call to inject the client in our application
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
})

app.mount('#app')
