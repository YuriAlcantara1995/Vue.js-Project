<script setup>
    import { ref } from 'vue'
</script>

<template>
    <div class="d-flex p-2 h-100 home">
        <div class="w-50 d-flex flex-column justify-content-center align-items-start">
            <div class="ml-5">
                <h1>Title</h1> 
            </div>
            <div class="ml-5 mt-5">
                <h3>Description</h3> 
            </div>
        </div>
        <div class="w-50 d-flex flex-column align-items-center justify-content-center">
            <img src="../assets/FIFA_Logo.jpeg" width="650"/>
        </div>
    </div>
</template>

<style scoped>
.home {
    color: #1C3260;
    background-image: linear-gradient(180deg, white 0%, #E0FFFF 100%);
}
</style>