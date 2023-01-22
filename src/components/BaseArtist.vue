<template>
  <section id="song-artist" class="container">
    <h2>
      Songs by <span>{{ artistName }}</span>
    </h2>
    <transition-group v-if="id" class="card-item" tag="div">
      <base-card
        v-for="song in songs.data"
        :key="song.id"
        :href="song.artist?.parse_name"
        :src="song.album?.cover ?? song.artist.image"
        :title="song.parse_title"
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
import { mapActions, mapState } from 'pinia';
import { useArtistsStore } from '../store/artists';
import BaseCard from "./BaseCard.vue";
export default {
  props: ["name", "id"],
  components: {
    BaseCard,
  },
  computed: {
    ...mapState(useArtistsStore, {
      songs: 'artistGetter',
    }),
    artistName() {
      let words = this.name.split("-");
      for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
      }
      return words.join("-").replaceAll(/-/g, " ");
    },
  },
  async created() {
    return await this.getArtist();
  },
  methods: {
    ...mapActions(useArtistsStore, ['fetchArtist']),
    async getArtist() {
      const data = { artist_id: Number(this.id) };
      return this.fetchArtist(data);
    },
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
span {
  color: var(--green);
}
@import "@/assets/scss/card.scss";
</style>