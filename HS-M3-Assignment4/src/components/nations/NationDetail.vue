<script setup>
import { ref } from 'vue';
import Card from '../utils/Card.vue';
import dataService from '../../utils/dataService.js';
import router from '../../router';

const props = defineProps({ nationId: { type: String, required: true } });
const players = ref([]);
const nation = ref({});

nation.value = await dataService.getNationById(props.nationId);

const responsePlayers = await dataService.getPlayersByNationIdOffline(props.nationId)
players.value = responsePlayers.items;

</script>

<template>
    <div class="d-flex p-2 justify-content-center" style="height: 30%;">
        <h2 class="align-self-center">{{ nation.name }}</h2>
        <img class="ml-5 align-self-center" :src="nation.flag" width="300" height="200" />
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
    background-color: #F0F8FF;
    align-self: center;
}

input {
    margin: 10px;
}

h2 {
    text-align: center;
}
</style>