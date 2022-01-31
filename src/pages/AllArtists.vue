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
import HotArtistCard from "../components/HotArtistCard.vue";
export default {
  components: {
    HotArtistCard,
  },
  props: ["animate"],
  computed: {
    artists(){
      return this.$store.getters['getAllArtist']
    }
  },
  async created(){
    await this.fetchData()
  },
  methods: {
    async fetchData(){
      await this.$store.dispatch('loadAllArtists')
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/cardAnimation.scss";
</style>