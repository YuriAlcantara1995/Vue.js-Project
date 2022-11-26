<script setup>
import Picture from './Picture.vue';
import Loading from './Loading.vue';

const props = defineProps({
    player: Object
});
</script>

<template>
    <div class="shadow-lg player_card">
        <Suspense>
            <Picture class="player_image" :imageHeight="700" :imageWidth="650" :playerId="player.id">
            </Picture>
            <template #fallback>
                <Loading class="player_image"/>
            </template>
        </Suspense>

        <div class="player_name">
            <span>{{ player.name }}</span>
        </div>
        <div class="row mt-3">
            <div class="col-4">
                AGE
            </div>
            <div class="col-4">
                POSITION
            </div>
            <div class="col-4">
                RATING
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                {{ player.age }}
            </div>
            <div class="col-4">
                {{ player.position }}
            </div>
            <div class="col-4">
                {{ player.rating }}
            </div>
        </div>
    </div>
</template>

<style scoped>
.player_card {
    display: inline-block;
    width: 320px;
    height: 500px;
    margin: 20px;
    overflow: hidden;
    border-radius: 20px;
    transition: all 0.4s;
    background: radial-gradient(circle at 18.7% 37.8%,
            rgb(250, 250, 250) 0%,
            rgb(225, 234, 238) 90%);
    color: #1C3260;
    font-size: 18px;
}

.player_image {
    width: 90%;
    height: 75%;
    border-radius: 10px;
}

.player_name {
    text-align: center;
    font-size: 28px;
    margin-top: 0px;
}

input {
    margin: 10px;
}
</style>