<template>
  <the-sidebar></the-sidebar>
  <main>
    <new-songs></new-songs>
  </main>
</template>

<script>
import NewSongs from "./components/NewSongs.vue";
export default {
  components: {
    NewSongs,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600&display=swap");

:root {
  --green: #30c36b;
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
}
</style>
