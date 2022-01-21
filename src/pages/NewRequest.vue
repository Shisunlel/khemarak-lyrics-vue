<template>
  <form>
    <div>
      <label for="user"> What is your name?: </label>
      <base-input
        :placeholder="'Your name will be contributed when accepted'"
        :name="'user'"
        v-model="user"
      />
    </div>
    <div>
      <label for="title">Title:</label>
      <base-input
        :placeholder="'Enter song title'"
        :name="'title'"
        v-model="title"
        required
      />
    </div>
    <div>
      <label for="artist">Artist:</label>
      <base-input
        :placeholder="'Enter artist name'"
        :name="'artist'"
        v-model="artist"
        required
      />
    </div>
    <div>
      <label for="album">Album:</label>
      <base-input
        :placeholder="'Enter album name'"
        :name="'album'"
        v-model="album"
      />
    </div>
    <div>
      <label for="source">Where did you get these lyrics?:</label>
      <select name="sorce" v-model="selectedSource">
        <option v-for="source in sources" :key="source" :value="source">
          {{ source }}
        </option>
      </select>
    </div>
    <div>
      <label for="lyrics">Lyrics:</label>
      <textarea
        name="lyrics"
        cols="30"
        rows="10"
        v-model="lyrics"
        required
      ></textarea>
    </div>
    <div class="button">
      <button type="button" @click="formSubmit">Submit Lyrics</button>
    </div>
  </form>
  <base-dialog :show="isSuccess"/>
</template>

<script>
import gql from "graphql-tag";
import BaseInput from "../components/BaseInput.vue";
import BaseDialog from '../components/BaseDialog.vue'
export default {
  data() {
    return {
      title: "",
      artist: "",
      user: "",
      album: "",
      lyrics: "",
      sources: [
        "from another website",
        "album booklet",
        "transcribed by yourself",
        "official lyrics video",
        "other",
      ],
      selectedSource: "from another website",
      isSuccess: false
    };
  },
  components: {
    BaseInput,
    BaseDialog
  },
  methods: {
    formSubmit() {
      if (this.validateInput()) {
        this.$apollo
          .mutate({
            mutation: gql`
              mutation ($requestInput: RequestInput!) {
                createRequest(input: $requestInput) {
                  id
                  contributor
                  artist
                  song_title
                  album
                  lyrics
                  source
                }
              }
            `,
            variables: {
              requestInput: {
                song_title: this.title,
                contributor: this.user,
                artist: this.artist,
                album: this.album,
                lyrics: this.lyrics,
                source: this.selectedSource,
              },
            },
          })
          .then(() => {
            this.isSuccess = true
            setTimeout(() => {
              this.$router.push({name: 'home'});
            }, 1000);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      else{
        alert('Check input again')
      }
    },
    validateInput() {
      if (!(this.title && this.artist && this.lyrics && this.selectedSource)) {
        return false;
      }
      return true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/request';
</style>