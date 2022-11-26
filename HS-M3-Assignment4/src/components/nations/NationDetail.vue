<script setup>
import { ref } from 'vue';
import Card from '../utils/Card.vue';
import Flag from '../utils/Flag.vue';
import Loading from '../utils/Loading.vue';
import dataService from '../../services/dataService.js';

const props = defineProps({ nationId: { type: String, required: true } });
const players = ref([]);
const nation = ref({});

try {
    nation.value = await dataService.getNationById(props.nationId);
    dataService.getNationFlag(nation.value.id).then((result) => {
        nation.value.flag = result;
    });
} catch (e) {
    alert("Error fetching nation detail");
}

const responsePlayers = await dataService.getPlayersByNationIdOffline(props.nationId)
players.value = responsePlayers.items;

for (let i = 0; i < players.value.length; i++) {
    dataService.getPlayerImage(players.value[i].id).then((result) => {
        players.value[i].image = result;
    });
}

</script>

<template>
    <div class="d-flex p-2 justify-content-center" style="height: 30%;">
        <h2 class="align-self-center">{{ nation.name.toUpperCase() }}</h2>
        <Suspense>
            <Flag class="ml-5 align-self-center" :flag-height="200" :flag-width="300" :nation-id="nation.id">
            </Flag>
            <template  #fallback>
                <Loading class="ml-5 align-self-center"/>
            </template>
        </Suspense>
        <div class="ml-5 d-flex flex-column justify-content-center">
            <h4 class="align-self-center">Average Rating</h4>
            <h5 class="align-self-center">{{ nation.averageRating }}</h5>
        </div>
    </div>
    <div class="cards">
        <router-link v-for="player in players" :to="{ name: 'player-detail', params: { id: player.id } }">
            <Card :player="player" />
        </router-link>
    </div>
</template>

<style scoped>
.cards {
    overflow: auto;
    white-space: nowrap;
    box-shadow: 5px 5px 10px 5px rgba(0, 0, 0, 0.5);
    height: 65%;
    width: 100%;
    background-color: #1C3260;
    align-self: center;
}

input {
    margin: 10px;
}

h2 {
    text-align: center;
}
</style>