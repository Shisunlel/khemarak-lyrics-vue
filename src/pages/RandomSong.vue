<template>
  <div>
    
  </div>
</template>
<script>
import gql from "graphql-tag";
export default {
  created() {
    this.$apollo
      .query({
        query: gql`
          query {
            getRandomSong {
              parse_title
              artist {
                parse_name
              }
            }
          }
        `,
      })
      .then((data) => {
        let artist = data.data?.getRandomSong?.artist?.parse_name;
        let title = data.data?.getRandomSong?.parse_title;
        this.$router.push({
          name: "song",
          params: { artist, title },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>