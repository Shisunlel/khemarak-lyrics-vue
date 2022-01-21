<template>
  <sidebar />
  <main>
    <router-view v-slot="component">
      <transition>
        <component :is='component.Component'></component>
      </transition>
    </router-view>
  </main>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import '@/assets/scss/global';
</style>
