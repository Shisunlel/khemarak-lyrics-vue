<template>
  <div class="card">
    <router-link :to="{ name: 'song', params: { artist: href, title}}">
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
};

</script>
<style lang="scss" scoped>
@import '@/assets/scss/card.scss';
</style>