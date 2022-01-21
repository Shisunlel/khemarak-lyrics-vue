<script>
import gql from "graphql-tag";
export default {
  created() {
    this.$apollo
      .query({
        query: gql`
          query {
            getRandomSong {
              title
              artist {
                name
              }
            }
          }
        `,
      })
      .then((data) => {
        let artist = window.seoURI(data.data?.getRandomSong?.artist?.name);
        let title = window.seoURI(data.data?.getRandomSong?.title);
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