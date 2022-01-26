<template>
  <section id="input-section">
    <div class="input-container">
      <base-input
        :placeholder="'Enter title or name'"
        :name="'search'"
        autocomplete="off"
        @blur="hideResults"
        @focus="showResults"
        v-model="search"
      ></base-input>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  </section>
  <section class="results" v-if="(songs[0] || artists[0]) && show">
    <div v-if="songs[0]">
      <h3 class="title"><em>Songs</em></h3>
      <ul v-for="song in songs" :key="song.id">
        <li>
          <router-link
            :to="{
              name: 'song',
              params: {
                artist: song.artist?.parse_name,
                title: song.parse_title,
              },
            }"
            >{{ song.title + " - "
            }}<span class="sky">{{ song.artist.name }}</span></router-link
          >
        </li>
      </ul>
    </div>
    <div v-if="artists[0]">
      <h3 class="title"><em>Artists</em></h3>
      <ul v-for="artist in artists" :key="artist.id">
        <li>
          <router-link
            v-text="artist.name"
            :to="{
              name: 'artist',
              params: {
                name: artist.parse_name,
                id: artist.id,
              },
            }"
          ></router-link>
        </li>
      </ul>
    </div>
  </section>
</template>
<script>
import BaseInput from "./BaseInput.vue";
import gql from "graphql-tag";
export default {
  data() {
    return {
      search: "",
      songs: [],
      artists: [],
      show: false,
    };
  },
  components: {
    BaseInput,
  },
  methods: {
    hideResults() {
      setTimeout(() => {
        this.show = false;
      }, 1000);
    },
    showResults() {
      if (this.songs || this.artists) {
        this.show = true;
      }
    },
  },
  watch: {
    search() {
      this.$apollo
        .query({
          query: gql`
            query searchSongArtist($title: String!, $name: String!) {
              searchSong(title: $title) {
                id
                title
                parse_title
                artist {
                  id
                  name
                  parse_name
                }
              }
              searchArtist(name: $name) {
                id
                name
                parse_name
              }
            }
          `,
          variables: {
            title: this.search,
            name: this.search,
          },
        })
        .then((data) => {
          this.songs = data.data?.searchSong;
          this.artists = data.data?.searchArtist;
          if (this.songs || this.artists) {
            this.show = true;
          }
        });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/search.scss";
</style>