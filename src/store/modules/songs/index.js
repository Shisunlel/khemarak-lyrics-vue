import apolloProvider from "../../../../apollo.provider";
import gql from "graphql-tag";

const apollo = apolloProvider.defaultClient;

export default {
  namespaced: true,
  state() {
    return {
      song: {},
    };
  },
  getters: {
    song(state) {
      return state.song;
    },
  },
  mutations: {
    song(state, payload) {
      state.song = payload;
    },
  },
  actions: {
    async song(context, payload) {
      const data = await apollo.query({
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
          artist: payload.artist,
          title: payload.title,
        },
      });
      context.commit("song", data.data?.getSongLyrics);
    },
  },
};
