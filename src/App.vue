<template>
  <sidebar />
  <main>
    <router-view v-slot="component">
      <transition mode="out-in" name="route">
        <component :is='component.Component'></component>
      </transition>
    </router-view>
  </main>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600&display=swap");
@import '@/assets/scss/global';
</style>
