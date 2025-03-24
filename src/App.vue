<template>
  <header>
    <img :src="banner" alt="banner" />
    <h1>SCHEDULE</h1>
  </header>

  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/info">Player Info</router-link>
  </nav>

  <main>
    <router-view />
  </main>

  <footer>
    <div id="footer">
      <div id="footerNav">
        <div id="resources">
          <router-link to="/info">
            <img :src="settings" alt="Settings" />
            <span>Info</span>
          </router-link>
        </div>
        <div id="copyright">© Copyright</div>
        <div id="denver">
          <a href="https://www.denverbroncos.com/" target="_blank">
            <<img :src="denver" />Denver Broncos
          </a>
        </div>
        <div id="nfl">
          <a href="https://www.nfl.com/" target="_blank">
            <img :src="nfl" />NFL
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>

import banner from "./assets/banner.gif";
import settings from "./assets/settings.png";
import denver from "./assets/den.png";
import nfl from "./assets/nfl.png";
</script>


<style>
.team-buttons {
  display: flex;
  gap: 10px;
}

.team-buttons button {
  display: flex;
  align-items: center;
  gap: 5px;
}

.team-buttons img {
  width: 50px;
  height: 50px;
}

html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex-grow: 1;
}

footer {
  width: 100%;
  height: 2.5rem;
  background-color: #242424;
  color: white;
  text-align: center;
  line-height: 2.5rem;
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>
