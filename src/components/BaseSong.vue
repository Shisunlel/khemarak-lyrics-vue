<template>
  <div class="lyrics-cont">
    <h2>{{ song.title }}</h2>
    <p class="pre">
      {{ song.lyrics }}
    </p>
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
        console.log(err);
      });
  },
};
</script>
<style scoped>
.lyrics-cont{
    display: grid;
    place-items: center;
    text-align: center;
}
.pre{
    white-space: pre-line;
}
</style>