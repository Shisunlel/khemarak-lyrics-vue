import { createStore } from "vuex";
import randomModule from "./modules/random";
import songModule from "./modules/songs";
import artistModule from "./modules/artists";
import apolloProvider from "../../apollo.provider";
import gql from "graphql-tag";

const apollo = apolloProvider.defaultClient;

const store = createStore({
  modules: {
    randomModule,
    songModule,
    artistModule,
  },
  state() {
    return {
      allArtists: [],
      hotArtists: [],
      songs: [],
    };
  },
  getters: {
    getAllArtist(state) {
      return state.allArtists;
    },
    getHotArtists(state) {
      return state.hotArtists;
    },
    getSongs(state) {
      return state.songs;
    },
  },
  mutations: {
    setAllArtists(state, payload) {
      return (state.allArtists = payload);
    },
    setHotArtists(state, payload) {
      return (state.hotArtists = payload);
    },
    setSongs(state, payload) {
      return (state.songs = payload);
    },
  },
  actions: {
    async loadAllArtists(context) {
      const data = await apollo.query({
        query: gql`
          query {
            artists(first: 8) {
              data {
                id
                name
                parse_name
                image
              }
            }
          }
        `,
      });
      return context.commit("setAllArtists", data.data?.artists);
    },
    async loadHotArtists(context) {
      const data = await apollo.query({
        query: gql`
          query {
            getHotArtists {
              id
              name
              parse_name
              image
            }
          }
        `,
      });
      return context.commit("setHotArtists", data.data?.getHotArtists);
    },
    async loadSongs(context) {
      const data = await apollo.query({
        query: gql`
          query {
            songs(first: 8, orderBy: [{ column: CREATED_AT, order: DESC }]) {
              data {
                id
                title
                parse_title
                artist {
                  name
                  parse_name
                  image
                }
                album {
                  name
                  cover
                }
                length
                track
                disc
                lyrics
              }
            }
          }
        `,
      });
      return context.commit("setSongs", data.data?.songs);
    },
  },
});

export default store;
