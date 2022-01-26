<template>
  <div class="carousel">
    <base-search />
    <div class="image-container">
      <!-- :style="background" -->
      <div class="imgs">
        <img :src="background" loading="lazy" alt="artist image" v-if="backgroundImg"/>
      </div>
    </div>
  </div>
</template>

<script>
import BaseSearch from "../components/BaseSearch.vue";
import gql from "graphql-tag";
export default {
  components: {
    BaseSearch,
  },
  data() {
    return {
      // background: {
      //   background:
      //     "url(https://2.bp.blogspot.com/-YWGO05EIaTI/UI9_JQDN1eI/AAAAAAAANIM/iN-lrVtuxqg/s0/adele-laurie-blue-adkins-1920x1080.jpg)",
      //   backgroundPosition: "center",
      //   backgroundSize: "cover",
      //   backgroundRepeat: "no-repeat",
      // },
      background:
        "https://2.bp.blogspot.com/-YWGO05EIaTI/UI9_JQDN1eI/AAAAAAAANIM/iN-lrVtuxqg/s0/adele-laurie-blue-adkins-1920x1080.jpg",
      backgroundImg: [],
      index: 0,
    };
  },
  apollo: {
    backgroundImg: gql`
      query {
        backgroundImg: artists {
          data {
            image
          }
        }
      }
    `,
  },
  methods: {
    run() {
      setInterval(() => {
        this.index++;
        if (this.index > this.backgroundImg?.data?.length - 1) {
          this.index = 0;
        }
        this.background = `${this.backgroundImg?.data[this.index]?.image}`;
      }, 1500);
    },
  },
  mounted() {
    if(this.backgroundImg){
      this.run();
    }
  },
};
</script>

<style lang="scss" scoped>
.carousel {
  width: 100%;
  height: 30rem;
  overflow: hidden;
  position: relative;
}

.image-container {
  display: flex;
  width: 100%;
  height: 100%;
  place-items: center;

  & > div.imgs {
    height: inherit;
    flex: 1 0 100%;

    & > img {
      width: 100%;
      height: 30rem;
    }
  }
}
</style>