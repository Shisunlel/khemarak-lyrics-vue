<template>
  <section id="new-song" class="container">
    <h2>{{title}} Songs</h2>
    <div v-if="$apollo.queries.songs.loading">Loading...</div>
    <transition-group v-if="songs.data" class="card-item" tag="div">
      <base-card
        v-for="song in songs.data"
        :key="song.id"
        :href="song.artist.name"
        :src="song.album?.cover ?? song.artist.image"
        :title="song.title"
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
import BaseCard from "../components/BaseCard.vue";
export default {
  apollo: {
    songs: {
      query: gql`
        query {
          songs(first: 8, orderBy: [{column: CREATED_AT, order: DESC}]) {
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
      title: ''
    };
  },
  created(){
    this.title = this.$route.name == 'songs' ? 'All': 'New'
  }
};
</script>
<style lang="scss" scoped>
@import '@/assets/scss/card.scss';
@import '@/assets/scss/cardAnimation.scss'
</style>