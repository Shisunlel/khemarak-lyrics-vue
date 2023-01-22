import apolloProvider from '../../apollo.provider';
import gql from 'graphql-tag';
import { defineStore } from 'pinia';

const apollo = apolloProvider.defaultClient;

export const useRandomStore = defineStore('random', {
  state() {
    return {
      random: {
        artist: '',
        title: '',
      },
    };
  },
  getters: {
    getRandomData(state) {
      return state.random;
    },
  },
  actions: {
    async fetchRandomSong(payload) {
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
        this.random = {
          artist: payload.artist.parse_name,
          title: payload.parse_title,
        };
      }
    },
  },
});
