<template>
  <section id="song-artist" class="container">
      <h2>Songs by <span>{{ artistName }}</span></h2>
      <transition-group v-if="id" class="card-item" tag="div">
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
import BaseCard from './BaseCard.vue'
export default {
  props: ["name", "id"],
  components: {
      BaseCard
  },
  data() {
    return {
      songs: [],
      artist_id: Number(this.id)
    };
  },
  computed: {
      artistName(){
          let words = this.name.split('-')
          for(let i=0; i<words.length; i++){
              words[i] = words[i][0].toUpperCase() + words[i].substr(1);
          }
          return words.join('-').replaceAll(/-/g,' ')
      }
  },
  created() {
    this.$apollo
      .query({
        query: gql`
          query song($artist_id: ID!) {
            artistSong(first: 8, artist_id: $artist_id) {
              data {
                id
                title
                lyrics
                artist{
                    name
                    image
                }
                album{
                    cover
                }
              }
              paginatorInfo {
                count
                currentPage
                lastPage
              }
            }
          }
        `,
        variables: {
          artist_id: this.artist_id,
        },
      })
      .then((data) => {
        this.songs = data.data?.artistSong
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
<style lang="scss" scoped>
.lyrics-cont {
  display: grid;
  place-items: center;
  text-align: center;
}
.pre {
  white-space: pre-line;
}
span{
    color: var(--green);
}
@import '@/assets/scss/card.scss';
</style>