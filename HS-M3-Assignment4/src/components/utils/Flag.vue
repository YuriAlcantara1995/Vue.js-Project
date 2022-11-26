<script setup>
import dataService from '../../services/dataService';
import { ref, watch } from 'vue';

const url = ref('');
const props = defineProps({ nationId: String, flagWidth: Number, flagHeight: Number });
url.value = await dataService.getNationFlag(props.nationId);

watch(() => props.nationId, async (first, second) => {
    url.value = await dataService.getNationFlag(props.nationId);
});
</script>

<template>
    <img :src="url" :width="flagWidth" :height="flagHeight" class="ml-3" />
</template>
