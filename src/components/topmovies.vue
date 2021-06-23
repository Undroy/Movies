<template hide-overlay>
  <v-container>
    <h3>Top Rated Movies</h3>
    <!-- Pagination -->
    <template>
      <div class="text-center">
        <v-container>
          <v-row justify="center">
            <v-col cols="8">
              <v-container class="max-width">
                <v-pagination
                  v-model="changepage"
                  class="my-4"
                  :length="allpage"
                  :click="change_page(changepage)"
                  circle
                ></v-pagination>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </template>
    <v-divider class="ma-3"></v-divider>
    <!-- Main Movie Show -->
    <v-layout class="pa-7 text-left" wrap row>
      <template>
        <div class="mx-auto ma-8" v-for="movie in moviedata" :key="movie.id">
          <v-hover v-slot:default="{ hover }">
            <v-card
              width="300"
              height="500"
              :elevation="hover ? 14 : 2"
            >
              <v-img
                :src="$store.state.ImageAPI + movie.poster_path"
                height="500px"
                width="300px"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              >
              <v-card-title v-text="movie.title"></v-card-title>
              <v-card-subtitle v-text="'Rating ' + movie.vote_average"></v-card-subtitle>
              </v-img>
              <!-- Hover Element -->
              <template>
                <v-fade-transition>

                  <v-overlay
                    absolute
                    :opacity=".86"
                    color="deep-purple accent-9"
                    :value="hover"
                    class="text-justify"
                  >
                  <v-card-title v-text="'Overview'"></v-card-title>
                  <v-card-subtitle v-text="movie.overview"></v-card-subtitle>
                  <v-card-title v-text="'Release Date'"></v-card-title>
                  <v-card-subtitle v-text="movie.release_date"></v-card-subtitle>
                  </v-overlay>
                </v-fade-transition>
              </template>
            </v-card>
          </v-hover>
        </div>
      </template>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      changepage: this.$store.state.toppage
    }
  },
  async mounted () {
    await this.$store.dispatch('fetch_top_movie_data')
  },
  computed: {
    moviedata: function () {
      return this.$store.state.topmovies
    },
    allpage: function () {
      return this.$store.state.topallpage
    }
  },
  methods: {
    image_remder (url) {
      return this.$store.state.ImageAPI + url
    },
    async change_page (pg) {
      this.$store.state.toppage = pg
      await this.$store.dispatch('fetch_top_movie_data')
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
