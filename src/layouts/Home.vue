<template>
  <new-songs :animate="1" />
  <hot-artists :animate="1" />
</template>

<script>
import NewSongs from "../pages/NewSong.vue";
import HotArtists from "../pages/HotArtists.vue";
export default {
  components: {
    NewSongs,
    HotArtists,
  },
};
</script>
<style>
</style>