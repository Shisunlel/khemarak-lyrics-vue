<template>
  <section id="all-artist" class="container">
    <h2>All Artists</h2>
    <transition-group
      v-if="artists.data"
      class="card-item"
      tag="div"
    >
      <hot-artist-card
        v-for="artist in artists.data"
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
import { mapActions, mapState } from 'pinia';
import HotArtistCard from "../components/HotArtistCard.vue";
import { useDefaultStore } from '../store';
export default {
  components: {
    HotArtistCard,
  },
  props: ["animate"],
  computed: {
    ...mapState(useDefaultStore, {
      artists: 'getAllArtist',
    }),
  },
  async created(){
    await this.fetchData()
  },
  methods: {
    ...mapActions(useDefaultStore, {
      fetchData: 'loadAllArtists',
    }),
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/cardAnimation.scss";
</style>