<script setup>
import { ref } from 'vue';
import dataService from '../../services/dataService.js';

const props = defineProps({ playerId: { type: String, required: true } });
const player = ref({});
const nation = ref({});

try {
    player.value = await dataService.getPlayerById(props.playerId);
    nation.value = await dataService.getNationById(player.value.nation);
} catch (e) {
    alert("Error fetching player detail");
}


</script>

<template>
    <div class="d-flex p-2 h-100 home">
        <div class="d-flex flex-column p-2 justify-content-center w-50">
            <img class="align-self-center" :src="player.image" width="650" height="700" />
            <div class="d-flex p-2 mt-2 justify-content-center">
                <h1 class="">{{ player.name }}</h1>
                <img :src="nation.flag" width="80" height="50" class="ml-5" />
            </div>
        </div>
        <div class="w-50 d-flex flex-column align-items-center justify-content-center">
            <div class="w-100 rounded shadow p-2" style="background-color: #1C3260;">
                <div class="row w-100">
                    <div class="col-4 text-right">
                        AGE
                    </div>
                    <div class="col-4">
                        POSITION
                    </div>
                    <div class="col-4 text-left">
                        RATING
                    </div>
                </div>
                <div class="row w-100">
                    <div class="col-4 text-right">
                        {{ player.age }}
                    </div>
                    <div class="col-4">
                        {{ player.position }}
                    </div>
                    <div class="col-4 text-left">
                        {{ player.rating }}
                    </div>
                </div>
            </div>
            <div class="w-100 rounded shadow p-2 mt-5" style="background-color: #1C3260;">
                <div class="row w-100">
                    <div class="col-4 text-right">
                        FOOT
                    </div>
                    <div class="col-4">
                        HEIGHT
                    </div>
                    <div class="col-4 text-left">
                        WEIGHT
                    </div>
                </div>
                <div class="row w-100">
                    <div class="col-4 text-right">
                        {{ player.foot }}
                    </div>
                    <div class="col-4">
                        {{ player.height }} cm
                    </div>
                    <div class="col-4 text-left">
                        {{ player.weight }} kg
                    </div>
                </div>
            </div>
            <div class="w-75 rounded shadow p-2 mt-5" style="background-color: #1C3260;">
                <div class="row w-100">
                    <div class="col-7 text-left ml-2">
                        ATTACK WORK RATE
                    </div>
                    <div class="col-4 text-left ml-2">
                        {{player.attackWorkRate}}
                    </div>
                </div>
                <div class="row w-100">
                    <div class="col-7 text-left ml-2">
                        DEFENSE WORK RATE
                    </div>
                    <div class="col-4 text-left ml-2">
                        {{ player.defenseWorkRate }}
                    </div>
                </div>
                <div class="row w-100">
                    <div class="col-7 text-left ml-2">
                        PACE
                    </div>
                    <div class="col-4 text-left ml-2">
                        {{ player.pace }}
                    </div>
                </div>
                <div class="row w-100">
                    <div class="col-7 text-left ml-2">
                        SHOOTING
                    </div>
                    <div class="col-4 text-left ml-2">
                        {{ player.shooting }} 
                    </div>
                </div>
                <div class="row w-100">
                    <div class="col-7 text-left ml-2">
                        PASSING
                    </div>
                    <div class="col-4 text-left ml-2">
                        {{ player.passing }}
                    </div>
                </div>
                <div class="row w-100">
                    <div class="col-7 text-left ml-2">
                        DRIBBLING
                    </div>
                    <div class="col-4 text-left ml-2">
                        {{ player.dribbling }}
                    </div>
                </div>
                <div class="row w-100">
                    <div class="col-7 text-left ml-2">
                        DEFENDING
                    </div>
                    <div class="col-4 text-left ml-2">
                        {{ player.defending }}
                    </div>
                </div>
                <div class="row w-100">
                    <div class="col-7 text-left ml-2">
                        PHYSICALITY
                    </div>
                    <div class="col-4 text-left ml-2">
                        {{ player.physicality }}
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>

<style scoped>
h1 {
    text-align: center;
    color: #1C3260;
}

div {
    font-size: 24px;
    color: white;
}
</style>