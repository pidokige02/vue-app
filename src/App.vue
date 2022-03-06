<template>
  <div>
    <input type="text" v-model="searchTerm" />
    <p v-if="loading">Loading...</p>
    <p v-else-if="error">Something went wrong! Please try again</p>
    <template v-else>
      <p v-for="book in books" :key="book.id">
        {{ book.title }}
      </p>
    </template>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useQuery , useResult} from '@vue/apollo-composable'
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
import ALL_BOOKS_QUERY from './graphql/allBooks.query.gql' //imported from file

export default {
  name: 'App',
  setup() {
    // setup() is executed before the component is created, once the props are resolved, and serves as the entry point for composables.
    const searchTerm = ref('')  // create a reactive property with 'ref'
    // It’s executed before the component is created, once the props are resolved, and serves as the entry point for composables.
    const { result, loading, error } = useQuery(ALL_BOOKS_QUERY,
      // query variables
      () => ({
        search: searchTerm.value
      }),
      // query options
      () => ({
        debounce: 500,  // add a 0.5 delay after the user stops typing before sending a query.
        enabled: searchTerm.value.length > 2, //start searching only after the search term has at least 2-3 characters.
      })
    )
     // console.log(result)
    const books = useResult(result, [], data => data.allBooks)

    return { books, searchTerm, loading, error } // don't forget to return 'searchTerm'!
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