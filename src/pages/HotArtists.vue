<template>
  <section id="hot-artist" class="container">
    <h2>Hot Artists</h2>
    <div v-if="$apollo.queries.getHotArtists.loading">Loading...</div>
    <transition-group
      v-if="!$apollo.queries.getHotArtists.loading || animate"
      class="card-item"
      tag="div"
    >
      <hot-artist-card
        v-for="artist in getHotArtists"
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
  </section>
</template>
<script>
import gql from "graphql-tag";
import HotArtistCard from "./HotArtistCard.vue";
export default {
  apollo: {
    getHotArtists: {
      query: gql`
        query {
          getHotArtists {
            id
            name
            parse_name
            image
          }
        }
      `,
    },
  },
  components: {
    HotArtistCard,
  },
  props: ["animate"],
  data() {
    return {
      getHotArtists: [],
    };
  },
};
</script>
<style lang="scss" scoped>
@import '@/assets/scss/cardAnimation.scss';
</style>