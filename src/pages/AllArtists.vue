<template>
  <section id="all-artist" class="container">
    <h2>All Artists</h2>
    <div v-if="$apollo.queries.artists.loading">Loading...</div>
    <transition-group
      v-if="artists"
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
  </section>
</template>
<script>
import gql from "graphql-tag";
import HotArtistCard from "../components/HotArtistCard.vue";
export default {
  apollo: {
    artists: {
      query: gql`
        query {
          artists(first: 8) {
            data {
              id
              name
              parse_name
              image
            }
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
      artists: [],
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/cardAnimation.scss";
</style>