<template>
  <div v-if="schedule">
    <h2>{{ schedule.team.displayName }} - {{ schedule.season.name }}</h2>
    <p v-if="byeWeek" class="bye-week">Week {{ byeWeek }} Bye</p>

    <div v-for="event in schedule.events" :key="event.id" class="match">
      <h3 class="match-week">{{ event.week.text }}</h3>
      <div class="match-info">
        <h3 class="match-teams" v-html="formatTeams(event.competitions[0].competitors)"></h3>
        <p class="match-score">{{ formatScores(event.competitions[0].competitors) }}</p>
      </div>
      <p class="match-date">{{ formatDate(event.date) }}</p>
      <p class="match-time">{{ formatTime(event.date) }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    teamId: [Number, String],
  },
  data() {
    return {
      schedule: null,
      byeWeek: null,
    };
  },
  watch: {
    teamId(newTeamId) { 
      console.log("kordrad 31 i teamschedule: teamId ändrades i TeamSchedule:", newTeamId);
      if (newTeamId) {
        this.fetchSchedule(newTeamId);
      }
    },
  },
  mounted() {
    console.log("kodrad 38 i teamschedule: TeamSchedule monterad med teamId:", this.teamId);
    if (this.teamId) {
      this.fetchSchedule(this.teamId);
    }
  },
  methods: {
    async fetchSchedule(teamId) {
      console.log("kodrad 45 i teamschedule: hämtar schema för lag:", teamId);
      this.schedule = null;

      const url = `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${teamId}/schedule?season=2024`;
      const response = await fetch(url);
      const data = await response.json();

      this.schedule = data;
      this.calculateByeWeek(data.events);
    },
    calculateByeWeek(events) {
      const weeks = events.map((event) => event.week.number);
      const n = weeks.length + 1;
      const sumOfFirstN = (n * (n + 1)) / 2;
      this.byeWeek = sumOfFirstN - weeks.reduce((a, b) => a + b, 0);
    },
    formatTeams(competitors) {
      return competitors
        .map(
          (c) =>
            `<img src="${c.team.logos[0].href}" alt="${c.team.displayName}" class="team-logo" 
            style="width: 30px; height: 30px; max-width: 30px; max-height: 30px; vertical-align: middle; margin-right: 8px;"> 
            ${c.team.displayName}`
        )
        .join('<span class="vs"> vs </span>'); 
    },
    formatScores(competitors) {
      return competitors.map((c) => c.score?.displayValue || "0").join(" - ");
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString("sv-SE").replace(/\//g, "-");
    },
    formatTime(date) {
      return new Date(date).toLocaleTimeString("sv-SE", {
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
};

</script>


<style scoped>
.match {
  padding: 10px;
  margin: 20px auto;
  background-color: white;
  max-width: 1080px;
  border-bottom: solid #f2f2f2 1px;
}

.match-week {
  padding-bottom: 10px;
  border-bottom: solid #f2f2f2 1px;
}

.match-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.match-teams {
  font-size: 24px;
  margin: 0;
}

.match-score {
  font-size: 26px;
  font-weight: bold;
  margin: 0;
}

.match-date,
.match-time {
  margin-top: 5px;
}

.bye-week {
  font-size: 20px;
  font-weight: bold;
  color: #d9534f;
}

.team-logo {
  width: 30px;
  height: 30px;
  vertical-align: middle;
  margin-right: 8px;
}

.vs {
  margin: 0 20px;
}
</style>
