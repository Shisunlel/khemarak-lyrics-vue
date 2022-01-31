import apolloProvider from "../../../../apollo.provider";
import gql from "graphql-tag";

const apollo = apolloProvider.defaultClient;

export default {
  namespaced: true,
  state() {
    return {
      artist: {},
    };
  },
  getters: {
    artist(state) {
      return state.artist;
    },
  },
  mutations: {
    artist(state, payload) {
      return (state.artist = payload);
    },
  },
  actions: {
    async artist(context, payload) {
      const data = await apollo.query({
        query: gql`
          query song($artist_id: ID!) {
            artistSong(first: 8, artist_id: $artist_id) {
              data {
                id
                title
                parse_title
                lyrics
                artist {
                  name
                  parse_name
                  image
                }
                album {
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
          artist_id: payload.artist_id,
        },
      });
      return context.commit('artist', data.data?.artistSong)
    },
  },
};
