<template>
  <base-image-slider />
  <new-songs :animate="1" />
  <hot-artists :animate="1" />
</template>

<script>
import BaseImageSlider from "../components/BaseImageSlider.vue";
import NewSongs from "../pages/NewSong.vue";
import HotArtists from "../pages/HotArtists.vue";
export default {
  components: {
    NewSongs,
    HotArtists,
    BaseImageSlider,
  },
};
</script>
<style>
</style>