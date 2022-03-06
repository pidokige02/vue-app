<template>
  <div>
    <p v-for="book in result.allBooks" :key="book.id">
      {{ book.title }}
    </p>
  </div>
</template>

<script>
import { useQuery } from '@vue/apollo-composable'
// import gql from 'graphql-tag' // utility to parse GraphQL queries.

// const ALL_BOOKS_QUERY = gql`
//   query AllBooks {
//     allBooks {
//       id
//       title
//       rating
//     }
//   }
// `
import ALL_BOOKS_QUERY from './graphql/allBooks.query.gql'


export default {
  name: 'App',
  setup() {
    // It’s executed before the component is created, once the props are resolved, and serves as the entry point for composables.
    const { result } = useQuery(ALL_BOOKS_QUERY) //it performs a GraphQL query

    console.log(result)

    return { result }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.list-wrapper {
  display: flex;
  margin: 0 auto;
  max-width: 960px;
}

.list {
  width: 50%;
}
</style>