<script setup>
    import { ref } from 'vue'
	const response = ref({})

    const url = 'https://nba-stats4.p.rapidapi.com/teams/';

    const options = {
	method: 'GET',
	    headers: {
		    'X-RapidAPI-Key': '0fc6e49d17msh56f6baf2d560196p1e03ecjsnf2c9e7768ecf',
		    'X-RapidAPI-Host': 'nba-stats4.p.rapidapi.com'
	    }
    };
    

    // adding delay
    await new Promise(resolve => {
        setTimeout(() => { 
            resolve()
        }, 1000)
    })
    
    try {
        const res = await fetch(url, options)
        console.log(res)
        response.value = (await res.json())
    } catch (error) {
        response.value = { answer: 'Error! Could not reach the API. ' + error, image: '' }
    }

</script>

<template>
  <span>{{ response }}</span>
</template>