<template hide-overlay>
  <v-container>
    <h3>Up Coming Movies</h3>
    <!-- Pagination -->
    <template>
      <div class="text-center">
        <v-container>
          <v-row justify="center">
            <v-col cols="8">
              <v-container class="max-width">
                <v-pagination
                  v-model="ucchangepage"
                  class="my-4"
                  :length="ucallpage"
                  :click="change_page(ucchangepage)"
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
    <v-layout class="pa-7 text-left" row>
      <template>
        <div class="mx-auto ma-8" v-for="movie in ucmoviedata" :key="movie.index">
          <v-hover v-slot:default="{ hover }">
            <v-card
              width="300"
              height="500"
              :elevation="hover ? 14 : 2"
            >
              <v-img
                v-if="movie.poster_path == null"
                height="500px"
                width="300px"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.5), rgba(0,0,0,.5)"
              >
              <v-card-title v-text="'No Image'"></v-card-title>
              <v-card-title v-text="movie.title"></v-card-title>
              <v-card-subtitle v-if="movie.poster_path == null" v-text="'Not Yet Rated'"></v-card-subtitle>
              <v-card-subtitle v-else-if="movie.poster_path == 0" v-text="'Not Yet Rated'"></v-card-subtitle>
              <v-card-subtitle v-else v-text="'Rating ' + movie.vote_average"></v-card-subtitle>
              </v-img>
              <v-img
                v-else
                :src="$store.state.ImageAPI + movie.poster_path"
                height="500px"
                width="300px"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              >
              <v-card-title v-text="movie.title"></v-card-title>
              <v-card-subtitle v-if="movie.poster_path == null" v-text="'Not Rated Yet'"></v-card-subtitle>
              <v-card-subtitle v-else v-text="'Rating ' + movie.vote_average"></v-card-subtitle>
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
      ucchangepage: this.$store.state.upcommingpage
    }
  },
  async mounted () {
    await this.$store.dispatch('fetch_upcoming_movie_data')
  },
  computed: {
    ucmoviedata: function () {
      return this.$store.state.upcomingmovies
    },
    ucallpage: function () {
      return this.$store.state.upcomingallpage
    }
  },
  methods: {
    async image_remder (url) {
      return this.$store.state.ImageAPI + url
    },
    async change_page (pg) {
      this.$store.state.upcommingpage = pg
      await this.$store.dispatch('fetch_upcoming_movie_data')
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
