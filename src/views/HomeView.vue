<template>
  <input v-model="searchQuery" placeholder="Sök lag" />

  <div class="team-buttons">
    <button v-for="team in filteredTeams" :key="team.id" @click="selectTeam(team.id)">
      <img :src="team.logo" :alt="team.name" />
      <span>{{ team.name }}</span>
    </button>
  </div>

  <div id="schedule">
    <TeamSchedule v-if="selectedTeamId" :team-id="selectedTeamId" :key="selectedTeamId" />
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import TeamSchedule from "/src/components/TeamSchedule.vue";

export default {
  components: { TeamSchedule },
  setup() {
    const selectedTeamId = ref(null);
    const searchQuery = ref("");
    const teams = ref([]);

const selectTeam = (teamId) => {
  console.log("kodrad 28 i homeview: Valet före klick", selectedTeamId.value);
  selectedTeamId.value = Number(teamId);
  console.log("kodrad 30 i homeview: Valet efter klick", selectedTeamId.value);
};


    onMounted(async () => {
      const response = await fetch("https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams");
      const data = await response.json();

      teams.value = data.sports[0].leagues[0].teams.slice(0, 10).map(t => ({
        id: t.team.id,
        name: t.team.displayName,
        logo: t.team.logos[0].href
      }));
    });

    const filteredTeams = computed(() => {
      return teams.value.filter(team =>
        team.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    return {
      selectedTeamId,
      teams,
      searchQuery,
      filteredTeams,
      selectTeam,
    };
  },
};
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
</style>
