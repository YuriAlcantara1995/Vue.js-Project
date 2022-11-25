<script setup>
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
</script>

<template>
  <div class="container-fluid h-100 p-0">
    <header class="navbar navbar-expand navbar-dark flex-column flex-md-row bd-navbar">
      <router-link class="text-white font-weight-bold ml-5" :to="{ name: 'home' }">
        HOME
      </router-link>
      <router-link class="text-white font-weight-bold ml-5" :to="{ name: 'nations' }">
        NATIONS
      </router-link>
      <router-link class="text-white font-weight-bold ml-5" :to="{ name: 'players' }">
        PLAYERS
      </router-link>
    </header>
    <div style="height: calc(100% - 60px);">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
header {
  background-color: #1C3260;
  height: 60px;
}
</style>

