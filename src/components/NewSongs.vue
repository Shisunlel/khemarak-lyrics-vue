<template>
  <section id="new-song" class="container">
    <h2>New Songs</h2>
    <div v-if="$apollo.queries.songs.loading">Loading...</div>
    <transition-group v-if="!$apollo.queries.songs.loading || animate" class="card-item" tag="div">
      <base-card
        v-for="song in songs.data"
        :key="song.id"
        :href="song.artist.name"
        :src="song.album.cover"
      >
        <template #card-title>
          <h4>{{ song.title }}</h4>
        </template>
        <template #card-body>
          <em>{{ song.artist.name }}</em>
        </template>
        <template #card-footer>
          <p>{{ song.lyrics }}</p>
        </template>
      </base-card>
    </transition-group>
  </section>
</template>
<script>
import gql from "graphql-tag";
import BaseCard from "./BaseCard.vue";
export default {
  apollo: {
    songs: {
      query: gql`
        query {
          songs(first: 8) {
            data {
              id
              title
              artist {
                name
                image
              }
              album {
                name
                cover
              }
              length
              track
              disc
              lyrics
            }
          }
        }
      `,
    },
  },
  components: {
    BaseCard,
  },
  props: ["animate"],
  data() {
    return {
      songs: [],
    };
  }
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