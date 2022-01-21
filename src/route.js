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
    },
    {
      path: "/request",
      name: "request",
      component: NewRequest,
    },
    {
      path: "/songs",
      name: "songs",
      component: NewSong,
      props: true,
    },
    {
      path: "/artists",
      name: "artists",
      component: AllArtists,
      props: true,
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
    },
    {
      path: "/artist/:name/:id",
      name: "artist",
      component: BaseArtist,
      props: true,
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

export default router;
