import { defineStore } from "pinia";
import apolloProvider from "../../apollo.provider";
import gql from "graphql-tag";

const apollo = apolloProvider.defaultClient;

export const useDefaultStore = defineStore('default', {
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
  actions: {
    async loadAllArtists() {
      if(!this.shouldUpdateArtist){
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
      this.allArtists = data.data?.artists;
      this.lastFetch['artist'] = new Date().getTime()
    },
    async loadHotArtists() {
      if(!this.shouldUpdateHotArtist){
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
      this.hotArtists = data.data?.getHotArtists
      this.lastFetch['hotArtist'] = new Date().getTime()
    },
    async loadSongs() {
      if(!this.shouldUpdateSong){
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
      this.songs = data.data?.songs;
      this.lastFetch['song'] = new Date().getTime()
    },
  },
});
