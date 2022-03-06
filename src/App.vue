<template>
  <div>
    <input type="text" v-model="searchTerm" />
    <p v-if="loading">Loading...</p>
    <p v-else-if="error">Something went wrong! Please try again</p>
    <template v-else>
      <p v-for="book in result.allBooks" :key="book.id">
        {{ book.title }}
      </p>
    </template>
  </div>
</template>

<script>
import { ref } from 'vue'
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
import ALL_BOOKS_QUERY from './graphql/allBooks.query.gql' //imported from file

export default {
  name: 'App',
  setup() {
    // setup() is executed before the component is created, once the props are resolved, and serves as the entry point for composables.
    const searchTerm = ref('')  // create a reactive property with 'ref'
    // It’s executed before the component is created, once the props are resolved, and serves as the entry point for composables.
    const { result, loading, error } = useQuery(ALL_BOOKS_QUERY, () => ({
      search: searchTerm.value
    }))

     // console.log(result)

    return { result, searchTerm, loading, error } // don't forget to return 'searchTerm'!
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