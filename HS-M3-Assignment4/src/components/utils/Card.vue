<script setup>
import { ref } from 'vue';

const props = defineProps({
  player: Object
});
</script>

<template>
  <div class="player_card">
    <img class="player_image" :src="player.image" />
    <div class="player_name">
      <span>{{ player.name }}</span>
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
  box-shadow: 0px 0px 60px -25px rgba(0, 0, 0, 0.5);
  background-color: whitesmoke;
}
.player_image {
  width: 90%;
  height: 75%;
  border-radius: 10px;
  margin-top: 10px;
}
.player_name {
  text-align: center;
  font-size: 18px;
  margin-top: 10px;
}
input {
  margin: 10px;
}
</style>