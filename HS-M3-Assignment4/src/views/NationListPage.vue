<script setup>
    import NationList from '../components/nations/NationList.vue';
    import Loading from '../components/utils/Loading.vue';
</script>

<template>
    <div class="bc-light-blue h-100 overflow-auto d-flex flex-column justify-content-center">
        <Suspense>
            <NationList class="h-100 w-100"/>
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