<template>
  <div class="card">
    <a :href="href">
      <img :src="src" alt="" />
    </a>
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
  },
};
</script>
<style scoped>
.card {
  display: flex;
  position: relative;
  max-width: 30ch;
  min-height: 30ch;
  margin: 1rem 0.5rem 1rem 0.5rem;
  box-shadow: 2px 2px 0px 0px rgba(68, 66, 66, 0.25);
  overflow: hidden;
  transition: all 250ms ease-out;
}

.card > a {
  height: 100%;
}

.card img {
  width: 100%;
  min-height: 100%;
  filter: brightness(0.8);
  object-fit: cover;
  transition: transform 250ms ease;
  will-change: transform;
}

.card > .card-content {
  position: absolute;
  width: 100%;
  background: rgba(0, 0, 0, 0.63);
  /* color: var(--green); */
  bottom: 0;
  padding: 1rem;
  transform: translateY(0);
  text-align: left;
  transition: all 250ms ease-out;
  will-change: transform, text-align;
  pointer-events: none;
}

@media (hover: hover) {
  .card:hover > .card-content {
    top: 0;
    transform: translateY(0);
    text-align: center;
  }

  .card:hover > .card-content > .card-title{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
  }

  .card:hover {
    transform: perspective(30ch) translateZ(-2px);
    box-shadow: 2px 2px 0px 0px var(--green);
  }
}

@media only screen and (min-width: 992px) {
  .card > .card-content {
    transform: translateY(10%);
  }
}
</style>