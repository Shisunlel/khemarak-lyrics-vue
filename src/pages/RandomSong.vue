<template>
  <div></div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("randomModule", {
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
    async fetchRandom() {
      return await this.$store.dispatch("randomModule/fetchRandomSong");
    },
  },
};
</script>