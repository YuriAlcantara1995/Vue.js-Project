<script setup>
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { ref } from 'vue';

const props = defineProps({ functionality: String, buttonStatus: Boolean });
</script>

<template>
  <a
    :class="buttonStatus ? '' : 'disabled'"
    class="controlButton rounded-circle"
    >
    <slot></slot>
  </a>
</template>

<style scoped>
.controlButton {
  background-color: lightgray;
  color: black;
  text-decoration: none;
  display: inline-block;
  padding: 1px 13px;
  cursor: pointer;
  font-size: 24px;
  margin: 5px;
}

.disabled {
  pointer-events: none;
  cursor: default;
  background-color: #f0f0f0;
}

.controlButton:hover {
  background-color: #36304a;
  color: white;
}
</style>
