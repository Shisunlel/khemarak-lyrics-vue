<template>
  <div class="lyrics-cont">
    <ul v-if="song">
      <li>
        <h2>"{{ song.title }}"</h2>
      </li>
      <li>
        <h4>
          <em>{{ song.artist?.name }}</em>
        </h4>
      </li>
      <li>
        <p class="pre">
          {{ song.lyrics }}
        </p>
      </li>
    </ul>
  </div>
</template>
<script>
import gql from "graphql-tag";
export default {
  props: ["artist", "title"],
  computed: {
    song() {
      return this.$store.getters["songModule/song"];
    },
  },
  async created() {
    return await this.getSong();
  },
  methods: {
    async getSong() {
      const data = {
        artist: this.artist,
        title: this.title,
      };
      return await this.$store.dispatch("songModule/song", data);
    },
  },
};
</script>
<style scoped>
.lyrics-cont {
  display: grid;
  place-items: center;
  text-align: center;
  padding: 1rem;
}
.pre {
  white-space: pre-line;
  line-height: 2.5;
}
h2 {
  color: var(--green);
}
li {
  margin-bottom: 2rem;
}

@media screen and (min-width: 768px) {
  .lyrics-cont {
    padding: 2rem;
  }
}
</style>