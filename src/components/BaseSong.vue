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
  data() {
    return {
      song: {},
      artist_name: this.artist,
      song_title: this.title,
    };
  },
  created() {
    this.$apollo
      .query({
        query: gql`
          query song($artist: String!, $title: String!) {
            getSongLyrics(artist: $artist, title: $title) {
              title
              parse_title
              lyrics
              length
              album {
                name
                cover
              }
              artist {
                name
              }
            }
          }
        `,
        variables: {
          artist: this.artist_name,
          title: this.song_title,
        },
      })
      .then((data) => {
        this.song = data.data?.getSongLyrics;
      })
      .catch((err) => {
        console.error(err);
      });
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
h2{
  color: var(--green);
}
li{
  margin-bottom: 2rem;
}

@media screen and (min-width: 768px) {
  .lyrics-cont{
    padding: 2rem;
  }
}
</style>