<template>
  <div v-if="player">
    <h2>{{ player.firstName }} {{ player.lastName }}</h2>
    <img :src="player.headshot?.href" alt="Player Image" />
    <p>Height/Weight: {{ player.displayHeight }}, {{ player.displayWeight }}</p>
    <p>Birthdate: {{ formatDate(player.dateOfBirth) }}</p>
    <p>Draft Info: {{ player.draft?.displayText }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      player: null
    };
  },
  mounted() {
    fetch("https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2024/athletes/4426338?lang=en&region=us")
      .then(response => response.json())
      .then(data => {
        this.player = data;
      });
  },

  methods: {
    formatDate(date) {
      return date ? new Date(date).toLocaleDateString('sv-SE') : "Unknown";
    }
  }
};
</script>
