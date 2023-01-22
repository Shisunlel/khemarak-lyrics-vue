<template>
  <nav class="nav">
    <div class="nav-container">
      <div>
        <router-link :to="{ name: 'home' }" class="nav-brand">
          <Logo />
        </router-link>
      </div>
      <div class="hidden">
        <ul class="nav-list">
          <hr width="200px" />
          <li
            class="nav-item"
            :class="{
              active: this.currentRoute('songs') || this.currentRoute('song'),
            }"
          >
            <router-link :to="{ name: 'songs' }">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                />
              </svg>
            </router-link>
          </li>
          <hr width="200px" />
          <li class="nav-item" :class="{ active: this.currentRoute('home') }">
            <a href="/shuffle">
              <svg
                stroke-width="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 6.99999C19 6.99999 13.5 6.99999 11.5 12.5C9.5 18 5 18 2 18"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M20 5C20 5 21.219 6.21895 22 7C21.219 7.78105 20 9 20 9"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M22 18C19 18 13.5 18 11.5 12.5C9.5 6.99999 5 7.00001 2 7"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M20 20C20 20 21.219 18.781 22 18C21.219 17.219 20 16 20 16"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
          </li>
          <hr width="200px" />
          <li
            class="nav-item"
            :class="{
              active:
                this.currentRoute('artists') || this.currentRoute('artist'),
            }"
          >
            <router-link :to="{ name: 'artists' }">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </router-link>
          </li>
          <hr width="200px" />
        </ul>
      </div>

      <div class="hidden">
        <ul class="nav-footer">
          <li :class="{ active: this.currentRoute('request') }">
            <router-link :to="{ name: 'request' }" style="color: var(--green)">Submit Song Lyrics</router-link>
          </li>
          <li>
            &copy; 2022
            <a
              style="color: var(--green)"
              href="https://github.com/shisunlel"
              target="_blank"
              >Khemarak Lyrics</a
            >
          </li>
        </ul>
      </div>

      <div class="hidden-sm">
        <transition name="fade" mode="out-in">
          <svg
            @click="openDropdown"
            v-if="!open"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            @click="openDropdown"
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </transition>
      </div>
    </div>
    <div :class="[open ? 'hidden-sm' : 'hidden']" class="pb-1">
      <ul class="nav-list">
        <li
          class="nav-item"
          :class="{
            active: this.currentRoute('songs') || this.currentRoute('song'),
          }"
        >
          <router-link :to="{ name: 'songs' }">Songs</router-link>
        </li>
        <li class="nav-item" :class="{ active: this.currentRoute('home') }">
          <a href="/shuffle">Shuffle</a>
        </li>
        <li
          class="nav-item"
          :class="{
            active: this.currentRoute('artists') || this.currentRoute('artist'),
          }"
        >
          <router-link :to="{ name: 'artists' }">Artists</router-link>
        </li>
        <li class="nav-item" :class="{ active: this.currentRoute('request') }">
          <router-link :to="{ name: 'request' }">Submit A Lyric</router-link>
        </li>
        <li class="nav-item">
          &copy; 2022
          <a
            style="color: var(--green)"
            href="https://github.com/shisunlel"
            target="_blank"
            >Khemarak Lyrics</a
          >
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import Logo from '@/assets/logo.svg'
export default {
  components: {
    Logo,
  },
  data() {
    return {
      open: false,
    };
  },
  methods: {
    currentRoute(name) {
      return this.$route.name == name;
    },
    openDropdown() {
      this.open = !this.open;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/sidebar.scss";
</style>