<script setup>
import dataService from '../../services/dataService';
import { ref } from 'vue';

    const url = ref('');
    const props = defineProps({ playerId: String, imageWidth: Number, imageHeight: Number});
    url.value = await dataService.getPlayerImage(props.playerId);
</script>

<template>
    <img :src="url" :width="imageWidth" :height="imageHeight" class="ml-3" />
</template>
