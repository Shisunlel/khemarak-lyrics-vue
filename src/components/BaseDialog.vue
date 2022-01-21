<template>
    <div class="overlay" v-if="show"></div>
    <dialog open v-if="show">Request has been submitted.</dialog>
</template>
<script>
export default ({
    props: ['show']
})
</script>
<style lang="scss" scoped>
@import '@/assets/scss/dialog';
</style>