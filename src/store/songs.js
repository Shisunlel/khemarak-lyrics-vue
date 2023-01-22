import apolloProvider from "../../apollo.provider";
import gql from "graphql-tag";
import { defineStore } from 'pinia';

const apollo = apolloProvider.defaultClient;

export const useSongStore = defineStore('song', {
  state() {
    return {
      song: {},
    };
  },
  getters: {
    songGetter(state) {
      return state.song;
    },
  },
  actions: {
    async fetchSong( payload) {
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
      this.song = data.data?.getSongLyrics;
    },
  },
});
