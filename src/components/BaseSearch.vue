<template>
  <section>
    <div class="input-container">
      <base-input
        :placeholder="'Enter title or name'"
        :name="'search'"
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
    <div class="results" v-if="songs[0] || artists[0]">
      <div v-if="songs[0]">
        <em>Songs</em>
        <ul v-for="song in songs" :key="song.id">
          <li>
            <router-link
              v-text="song.title"
              :to="{
                name: 'song',
                params: {
                  artist: this.uri(song.artist.name),
                  title: this.uri(song.title),
                },
              }"
            ></router-link>
          </li>
        </ul>
      </div>
      <div v-if="artists[0]">
        <em>Artists</em>
        <ul v-for="artist in artists" :key="artist.id">
          <li>
            <router-link
              v-text="artist.name"
              :to="{
                name: 'artist',
                params: {
                  name: this.uri(artist.name),
                  id: this.uri(artist.id),
                },
              }"
            ></router-link>
          </li>
        </ul>
      </div>
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
    };
  },
  components: {
    BaseInput,
  },
  methods: {
    uri(val) {
      return window.seoURI(val);
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
                artist {
                  id
                  name
                }
              }
              searchArtist(name: $name) {
                id
                name
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
        });
    },
  },
};
</script>
<style lang="scss" scoped>
section {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 55%;
}
input[type="text"] {
  padding: 0.9rem 3rem;
  width: 100%;
  border-radius: 4px 4px 0 0;
  box-shadow: 0 0 1rem rgba(48, 195, 107, 0.377), 0 0 2rem rgba(36, 26, 26, 0.7);
  background-color: var(--green);
  background-image: linear-gradient(315deg, var(--sky) 0%, var(--green) 74%);
  border: none;
  color: white;
  font-size: 1.1rem;
  &:placeholder-shown {
    padding-left: 3rem;
  }
}

.input-container {
  position: relative;
}

svg {
  position: absolute;
  left: 0.7rem;
  top: 0.7rem;
}

.h-6 {
  height: 1.6rem;
}
.w-6 {
  width: 1.6rem;
}

.results {
  width: 100%;
  border-radius: 0 0 4px 4px;
  background: var(--main-bg);
  color: #efefef;
  padding: 1rem;

  & > div {
    margin-top: 1rem;
  }
}
</style>