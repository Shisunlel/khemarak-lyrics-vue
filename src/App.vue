<template>
  <the-sidebar></the-sidebar>
  <main>
    <new-songs :animate="1"/>
    <hot-artists :animate="1"/>
  </main>
</template>

<script>
import NewSongs from "./components/NewSongs.vue";
import HotArtists from './components/HotArtists.vue'
export default {
  components: {
    NewSongs,
    HotArtists
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600&display=swap");

:root {
  --green: #30c36b;
  --sky: #0EA5E9;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

ul {
  list-style: none;
}

a {
  text-decoration: none;
  color: inherit;
}

#app {
  display: flex;
  color: #e4e4e4;
  font-family: "Jost", sans-serif;
  min-height: 100vh;
}

main {
  background: linear-gradient(0deg, #151515 0%, #292929 100%);
  padding: 2rem;
  width: 100%;
  margin-left: 0;
}

@media only screen and (min-width: 992px) {
  main{
    margin-left: 200px;
  }
}
</style>
