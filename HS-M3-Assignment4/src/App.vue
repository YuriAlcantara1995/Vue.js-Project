<script setup>
import ApiNba from './components/ApiNba.vue'

</script>

<template>
  <Suspense>
    <ApiNba/>
    <template #fallback>
      <img src="https://media.tenor.com/o8m3bKTsifUAAAAC/hold-on.gif" />
    </template>
  </Suspense>
</template>

<style scoped>
</style>
