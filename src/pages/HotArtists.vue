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
        :href="artist.name"
        :src="artist.image"
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
            name
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
<style scoped>
.container {
  margin: 1rem 0 0 0;
  display: grid;
  place-items: center;
}

.container > h2{
    color: var(--sky);
}

.card-item {
  display: grid;
  grid-template-columns: 1fr;
  /* padding: 2rem 0; */
  margin: 1rem 0 0 0;
}

.card-item > .card {
  place-items: center;
}

.v-enter-active {
  animation: slide-in 500ms ease-out;
}

@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateY(10rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media only screen and (min-width: 992px) {
  .container {
    place-items: stretch;
  }

  .card-item {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}
</style>