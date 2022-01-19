<template>
  <new-songs :animate="1" />
  <hot-artists :animate="1" />
</template>

<script>
import NewSongs from "../components/NewSong.vue";
import HotArtists from "../components/HotArtists.vue";
export default {
  components: {
    NewSongs,
    HotArtists,
  },
};
</script>
<style>
</style>