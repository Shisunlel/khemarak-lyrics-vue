import apolloProvider from "../../../../apollo.provider";
import gql from "graphql-tag";

const apollo = apolloProvider.defaultClient;

export default {
  namespaced: true,
  state() {
    return {
      random: {
        artist: "",
        title: "",
      },
    };
  },
  getters: {
    getRandomData(state) {
      return state.random;
    },
  },
  mutations: {
    getRandomSong(state, payload) {
      return (state.random = {
        artist: payload.artist.parse_name,
        title: payload.parse_title,
      });
    },
  },
  actions: {
    async fetchRandomSong(context) {
      const data = await apollo.query({
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
      });
      if (data.data?.getRandomSong) {
        return context.commit("getRandomSong", data.data?.getRandomSong);
      }
    },
  },
};
