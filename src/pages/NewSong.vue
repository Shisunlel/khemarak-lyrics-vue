<template>
  <section id="new-song" class="container">
    <h2>{{title}} Songs</h2>
    <transition-group v-if="songs.data" class="card-item" tag="div">
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
          <em>{{ song.artist?.name }}</em>
        </template>
        <template #card-footer>
          <p>{{ song.lyrics }}</p>
        </template>
      </base-card>
    </transition-group>
    <div v-else>Loading...</div>
  </section>
</template>
<script>
import { mapActions, mapState } from 'pinia';
import BaseCard from "../components/BaseCard.vue";
import { useDefaultStore } from '../store';
export default {
  components: {
    BaseCard,
  },
  props: ["animate"],
  data() {
    return {
      title: '',
    };
  },
  computed: {
    ...mapState(useDefaultStore, {
      songs: 'getSongs',
    }),
  },
  methods: {
    ...mapActions(useDefaultStore, ['loadSongs'])
  },
  created(){
    this.title = this.$route.name == 'songs' ? 'All': 'New'
    this.loadSongs();
  }
};
</script>
<style lang="scss" scoped>
@import '@/assets/scss/card.scss';
@import '@/assets/scss/cardAnimation.scss'
</style>