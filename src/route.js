import { createRouter, createWebHistory } from "vue-router";

import Home from "./layouts/Home";
import NewRequest from "./pages/NewRequest";
import NewSong from "./pages/NewSong";
import BaseSong from "./components/BaseSong";
import BaseArtist from "./components/BaseArtist";
import AllArtists from "./pages/AllArtists";
import RandomSong from "./pages/RandomSong";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        title: 'Khemarak Lyrics',
      }
    },
    {
      path: "/request",
      name: "request",
      component: NewRequest,
      meta: {
        title: 'Khemarak Lyrics - New Request'
      }
    },
    {
      path: "/songs",
      name: "songs",
      component: NewSong,
      props: true,
      meta: {
        title: 'Khemarak Lyrics - All Songs'
      }
    },
    {
      path: "/artists",
      name: "artists",
      component: AllArtists,
      props: true,
      meta: {
        title: 'Khemarak Lyrics - All Artist'
      }
    },
    {
      path: "/shuffle",
      component: RandomSong,
    },
    {
      path: "/song/:artist/:title",
      name: "song",
      component: BaseSong,
      props: true,
      meta: {
        title: route => `Khemarak Lyrics - ${route.params.title.toUpperCase()}`
      }
    },
    {
      path: "/artist/:name/:id",
      name: "artist",
      component: BaseArtist,
      props: true,
      meta: {
        title: route => `Khemarak Lyrics - ${route.params.name.toUpperCase()}`
      }      
    },
    {
      path: "/:any(.*)",
      redirect: "/",
    },
  ],
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const { title } = to.meta;
  document.title = typeof title == 'function' ? title(to) : title
  next()
})

export default router;
