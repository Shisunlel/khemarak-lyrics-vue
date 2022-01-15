<template>
  <section id="new-song" class="container">
    <h2>New Songs</h2>
    <div class="card-item">
      <base-card v-for="song in newSongs" :key="song.id"
        :href="song.url"
        :src="song.imageUrl"
      >
        <template #card-title>
          <h4>{{ song.title }}</h4>
        </template>
        <template #card-body>
          <em>{{ song.artist }}</em>
        </template>
        <template #card-footer>
          <p>{{ song.lyrics }}</p>
        </template>
      </base-card>
    </div>
  </section>
</template>
<script>
import BaseCard from "./BaseCard.vue";
export default {
  components: {
    BaseCard,
  },
  data(){
      return {
          newSongs: [
              {
                  id: 1,
                  url: '#',
                  imageUrl: 'https://i.ytimg.com/vi/VJgEx4iTnLU/maxresdefault.jpg',
                  title: 'First Kiss',
                  artist: 'SWSB',
                  lyrics: 'She\'s not a killer btw',
              },
              {
                  id: 2,
                  url: '#',
                  imageUrl: 'https://i.ytimg.com/vi/VJgEx4iTnLU/maxresdefault.jpg',
                  title: 'First Kiss',
                  artist: 'SWSB',
                  lyrics: 'She\'s not a killer btw',
              },
              {
                  id: 3,
                  url: '#',
                  imageUrl: 'https://i.ytimg.com/vi/VJgEx4iTnLU/maxresdefault.jpg',
                  title: 'First Kiss',
                  artist: 'SWSB',
                  lyrics: 'She\'s not a killer btw',
              },
              {
                  id: 4,
                  url: '#',
                  imageUrl: 'https://i.ytimg.com/vi/VJgEx4iTnLU/maxresdefault.jpg',
                  title: 'First Kiss',
                  artist: 'SWSB',
                  lyrics: 'She\'s not a killer btw',
              },
              {
                  id: 5,
                  url: '#',
                  imageUrl: 'https://i.ytimg.com/vi/VJgEx4iTnLU/maxresdefault.jpg',
                  title: 'First Kiss',
                  artist: 'SWSB',
                  lyrics: 'She\'s not a killer btw',
              },
          ]
      }
  }
};
</script>
<style scoped>
.container {
  margin: 1rem 0 0 0;
  display: grid;
  place-items: center;
}

.card-item {
  display: grid;
  grid-template-columns: 1fr;
  /* padding: 2rem 0; */
  margin: 1rem 0 0 0;
}

.card-item > .card {
  place-items: center;
}

@media only screen and (min-width: 992px) {
  .container {
    place-items: stretch;
  }

  .card-item {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}
</style>