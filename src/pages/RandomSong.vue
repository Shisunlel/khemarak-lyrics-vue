<template>
  <div></div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { useRandomStore } from '../store/random';
export default {
  computed: {
    ...mapState(useRandomStore, {
      data: "getRandomData",
    }),
  },
  async created() {
    await this.fetchRandom();
    this.$router.push({
      name: "song",
      params: {
        artist: this.data.artist,
        title: this.data.title,
      },
    });
  },
  methods: {
    ...mapActions(useRandomStore, {
      fetchRandom: 'fetchRandomSong',
    }),
  },
};
</script>