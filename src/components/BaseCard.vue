<template>
  <div class="card">
    <a :href="href">
      <img :src="src" alt="" />
    </a>
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

.card-body {
  margin-bottom: 1rem;
  color: var(--green);
}

.card-footer p {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  /* fallback */
  max-height: 10ch;
  /* fallback */
  -webkit-line-clamp: 3;
  /* number of lines to show */
  -webkit-box-orient: vertical;
}

@media (hover: hover) {
  .card:hover > .card-content {
    top: 0;
    transform: translateY(0);
    text-align: center;
  }

  .card:hover {
    transform: perspective(30ch) translateZ(-2px);
    box-shadow: 2px 2px 0px 0px var(--green);
  }

  .card:hover .card-footer {
    display: block;
  }
}

@media only screen and (min-width: 992px) {
  .card > .card-content {
    transform: translateY(20%);
  }

  .card-footer {
    display: none;
  }

  .card-footer > p {
    max-height: none;
    -webkit-line-clamp: 7;
  }
}
</style>