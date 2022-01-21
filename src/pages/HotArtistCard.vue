<template>
  <div class="card">
    <router-link :to="{ name: 'artist', params: { name: artistName, id: id}}">
      <img :src="src" alt="" />
    </router-link>
    <div class="card-content">
      <div class="card-title">
        <slot name="card-title"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    href: String,
    src: String,
    id: String
  },
  computed: {
    artistName(){
      return window.seoURI(this.href)
    }
  }
};
</script>
<style lang="scss" scoped>
@import '@/assets/scss/hotArtistCard.scss'
</style>