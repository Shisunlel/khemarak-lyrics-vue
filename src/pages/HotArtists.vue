<template>
  <section id="hot-artist" class="container">
    <h2>Hot Artists</h2>
    <transition-group v-if="hotArtists && animate" class="card-item" tag="div">
      <hot-artist-card
        v-for="artist in hotArtists"
        :key="artist.id"
        :href="artist.parse_name"
        :src="artist.image"
        :id="artist.id"
      >
        <template #card-title>
          <h4>{{ artist.name }}</h4>
        </template>
      </hot-artist-card>
    </transition-group>
    <div v-else>Loading...</div>
  </section>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { useDefaultStore } from '../store/index';
import HotArtistCard from "../components/HotArtistCard.vue";
export default {
  components: {
    HotArtistCard,
  },
  props: ["animate"],
  computed: {
    ...mapState(useDefaultStore, {
      hotArtists: "getHotArtists",
    }),
  },
  methods: {
    ...mapActions(useDefaultStore,{
      getHotArtists: 'loadHotArtists',
    }),
  },
  async created() {
    await this.getHotArtists();
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/cardAnimation.scss";
</style>