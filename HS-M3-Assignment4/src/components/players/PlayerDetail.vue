<script setup>
import { ref } from 'vue';
import Card from '../utils/Card.vue';
import dataService from '../../utils/dataService.js';

const props = defineProps({ playerId: { type: String, required: true } });
const player = ref({});

player.value = await dataService.getPlayerById(props.playerId);

</script>

<template>
    <div class="d-flex flex-column p-2 justify-content-center" style="height: 30%;">
        <h2 class="align-self-center">{{ player.name }}</h2>
        <img class="ml-5 align-self-center" :src="player.image" width="400" height="500" />
    </div>
</template>

<style scoped>

h2 {
    text-align: center;
}
</style>