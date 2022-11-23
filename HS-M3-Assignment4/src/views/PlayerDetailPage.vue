<script setup>
    import PlayerDetail from '../components/players/PlayerDetail.vue';
    import Loading from '../components/utils/Loading.vue';

    const { id } = defineProps(['id']);
</script>

<template>
    <div class="bc-light-blue h-100 overflow-auto d-flex flex-column justify-content-center">
        <Suspense>
            <PlayerDetail :player-id="id" class="h-100 w-100"/>
            <template #fallback>
                <Loading/>
            </template>
        </Suspense>
    </div>
</template>

<style scoped>
.bc-light-blue {
    background-color: #F0F8FF;
}
</style>