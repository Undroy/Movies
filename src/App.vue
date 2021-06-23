<template>
  <v-app>
    <span class="bg"></span>
    <v-app-bar color="deep-purple accent-1" app hide-overlay>
      <v-toolbar-title>Movies&nbsp;&nbsp;</v-toolbar-title>
      <span></span>
      <v-toolbar-title>
        <v-btn-toggle v-model="text" tile color="deep-purple accent-7" group>
          <v-btn value="/top" v-on:click="goto('/top')" class="black--text">
            Top Rated Movies
          </v-btn>
          <v-btn value="/upcoming" v-on:click="goto('/upcoming')" class="black--text">
            Up Coming Movies
          </v-btn>
        </v-btn-toggle>
      </v-toolbar-title>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
    <!-- </v-parallax> -->
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      name: 'App',
      text: '/top'
    }
  },
  methods: {
    goto (path) {
      this.$router.push(path)
      this.text = path
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-size: cover;
    background-color: #dccff7;
    transform: scale(1.1);
}
</style>
