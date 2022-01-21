<template>
  <div class="card">
    <router-link :to="{ name: 'song', params: { artist: link, title: titleURI}}">
      <img :src="src" alt="" />
    </router-link>
    <div class="card-content">
      <div class="card-title">
        <slot name="card-title"></slot>
      </div>
      <div class="card-body">
        <slot name="card-body"></slot>
      </div>
      <div class="card-footer">
        <slot name="card-footer"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    href: String,
    src: String,
    title: String
  },
  computed: {
    link(){
      return window.seoURI(this.href)
    },
    titleURI(){
      return window.seoURI(this.title)
    }
  }
};

</script>
<style lang="scss" scoped>
@import '@/assets/scss/card.scss';
</style>