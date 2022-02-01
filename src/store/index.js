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
      lastFetch: {
        song: null,
        artist: null,
        hotArtist: null
      }
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
    shouldUpdateArtist(state){
      const lastFetch = state.lastFetch.artist

      if(!lastFetch){
        return true
      }
      const now = new Date().getTime()
      return (now - state.lastFetch.artist) / 1000 > 60
    },
    shouldUpdateHotArtist(state){
      const lastFetch = state.lastFetch.hotArtist

      if(!lastFetch){
        return true
      }
      const now = new Date().getTime()
      return (now - state.lastFetch.hotArtist) / 1000 > 60
    },
    shouldUpdateSong(state){
      const lastFetch = state.lastFetch.song

      if(!lastFetch){
        return true
      }
      const now = new Date().getTime()
      return (now - state.lastFetch.song) / 1000 > 60
    }
  },
  mutations: {
    setAllArtists(state, payload) {
      (state.allArtists = payload);
    },
    setHotArtists(state, payload) {
      (state.hotArtists = payload);
    },
    setSongs(state, payload) {
      (state.songs = payload);
    },
    setFetchTimestamp(state, key){
      state.lastFetch[key] = new Date().getTime()
    }
  },
  actions: {
    async loadAllArtists(context) {
      if(!context.getters.shouldUpdateArtist){
        return
      }
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
      context.commit("setAllArtists", data.data?.artists);
      context.commit('setFetchTimestamp', 'artist')
    },
    async loadHotArtists(context) {
      if(!context.getters.shouldUpdateHotArtist){
        return
      }
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
      context.commit("setHotArtists", data.data?.getHotArtists);
      context.commit('setFetchTimestamp', 'hotArtist')
    },
    async loadSongs(context) {
      if(!context.getters.shouldUpdateSong){
        return
      }

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
      context.commit("setSongs", data.data?.songs);
      context.commit('setFetchTimestamp', 'song')
    },
  },
});

export default store;
