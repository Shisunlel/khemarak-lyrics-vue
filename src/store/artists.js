import { defineStore } from 'pinia';
import apolloProvider from "../../apollo.provider";
import gql from "graphql-tag";

const apollo = apolloProvider.defaultClient;

export const useArtistsStore = defineStore('artists', {
  state() {
    return {
      artist: {},
    };
  },
  getters: {
    artistGetter(state) {
      return state.artist;
    },
  },
  actions: {
    async fetchArtist(payload) {
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
      this.artist = data.data?.artistSong;
    },
  },
});