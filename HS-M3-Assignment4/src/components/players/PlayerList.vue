<script setup>
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { ref, computed, watch, reactive } from 'vue';
import TableButton from '../utils/TableButton.vue';
import dataService from '../../utils/dataService.js';

const players = ref([]);
const pagination = ref({});
const filter = reactive({
    "name": "",
    "position": "",
    "ratingMin": 0,
    "ratingMax": 100
});

async function getData(page = 1) {
    let response = await dataService.searchPlayersOffline(page, filter);
    pagination.value = response.pagination;
    players.value = response.items;
}

await getData();

const firstRow = computed(() => {
    const firstRow = (pagination.value.pageCurrent - 1) * pagination.value.itemsPerPage;
    return firstRow;
});

const lastRow = computed(() => {
    const lastRow = Math.min(
        pagination.value.pageCurrent * pagination.value.itemsPerPage,
        pagination.value.countTotal
    );
    return lastRow;
});

const previousButtonStatus = computed(() => {
    if (pagination.value.pageCurrent == 1) return false;
    return true;
});

const nextButtonStatus = computed(() => {
    if (pagination.value.pageCurrent == pagination.value.pageTotal) return false;
    return true;
});

async function changePage(value) {
    await getData(pagination.value.pageCurrent + value);
}

async function goFirstPage() {
    await getData(1);
}

async function goLastPage() {
    await getData(pagination.value.pageTotal);
}

watch(filter, async (newFilter, oldFilter) => {
    await getData(1);
})
</script>

<template>
    <br />
    <div class="searchRow">
        <div style="margin-left: 5%; width: 250px; position: relative">
            <div class="fg-search">
                <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
            </div>
            <input class="shadow rounded form-control align-top float-left" type="text" v-model="filter.name"
                placeholder="Search..." />
        </div>
        <label class="float-left ml-5 mt-2">Minimum Rating:</label>
        <input class="shadow rounded form-control align-top float-left ml-2" type="number" min="0" max="100"
            v-model="filter.ratingMin" style="width: 100px;" />
        <label class="float-left ml-5 mt-2">Maximum Rating:</label>
        <input class="shadow rounded form-control align-top float-left ml-2" type="number" min="0" max="100"
            v-model="filter.ratingMax" style="width: 100px;" />
    </div>
    <table class="shadow mt-2" style="width: 90%; padding: 10px;">
        <thead>
            <tr>
                <th width="150"></th>
                <th>Name</th>
                <th>Position</th>
                <th>Age</th>
                <th>Height</th>
                <th>Weight</th>
                <th>Foot</th>
                <th>Rating</th>
                <th>Pace</th>
                <th>Shooting</th>
                <th>Passing</th>
                <th>Dribbling</th>
                <th>Defending</th>
                <th>Physicality</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="player in players">
                <td><img :src="player.image" width="50" class="ml-3" /></td>
                <td style="font-size: 18px;">
                    <router-link :to="{ name: 'player-detail', params: { id: player.id } }">
                        {{ player.name }}
                    </router-link>
                </td>
                <td style="font-size: 18px;">{{ player.position }}</td>
                <td style="font-size: 18px;">{{ player.age }}</td>
                <td style="font-size: 18px;">{{ player.height }}</td>
                <td style="font-size: 18px;">{{ player.weight }}</td>
                <td style="font-size: 18px;">{{ player.foot }}</td>
                <td style="font-size: 18px;">{{ player.rating }}</td>
                <td style="font-size: 18px;">{{ player.pace }}</td>
                <td style="font-size: 18px;">{{ player.shooting }}</td>
                <td style="font-size: 18px;">{{ player.passing }}</td>
                <td style="font-size: 18px;">{{ player.dribbling }}</td>
                <td style="font-size: 18px;">{{ player.defending }}</td>
                <td style="font-size: 18px;">{{ player.physicality }}</td>
            </tr>
            <tr v-for="i in pagination.itemsPerPage - players.length">
                <td colspan="13"></td>
            </tr>
        </tbody>

        <tfoot>
            <tr>
                <td v-if="players.length > 0" colspan="13">
                    <div style="float: right; margin: 0px 20px">
                        <TableButton @click="goFirstPage()" :buttonStatus="previousButtonStatus">
                            &laquo;
                        </TableButton>
                        <TableButton @click="changePage(-1)" :buttonStatus="previousButtonStatus">
                            &#8249;
                        </TableButton>
                        <TableButton @click="changePage(1)" :buttonStatus="nextButtonStatus">
                            &#8250;
                        </TableButton>
                        <TableButton @click="goLastPage()" :buttonStatus="nextButtonStatus">
                            &raquo;
                        </TableButton>
                    </div>
                    <span style="float: right; margin: 10px 10px">
                        {{ firstRow + 1 }} - {{ lastRow }} of {{ pagination.countTotal }}
                    </span>
                </td>
            </tr>
        </tfoot>
    </table>
</template>

<style scoped>
table {
    border-spacing: 1;
    border-collapse: collapse;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    width: 100%;
    margin: 0 auto;
    position: relative;
}

table * {
    position: relative;
}

thead {
    display: table-header-group;
    vertical-align: middle;
    border-color: inherit;
}

table thead tr {
    height: 60px;
    background: #1C3260;
}

table tfoot tr {
    height: 60px;
}

tr {
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
}

th {
    font-family: OpenSans-Regular;
    font-size: 18px;
    color: #fff;
    line-height: 1.2;
    font-weight: unset;
}

tbody {
    display: table-row-group;
    vertical-align: middle;
    border-color: inherit;
}

table tbody tr {
    height: 50px;
}

tbody tr {
    font-family: OpenSans-Regular;
    font-size: 15px;
    color: gray;
    line-height: 1.2;
    font-weight: unset;
}

tbody tr:nth-child(even) {
    background-color: #f0f0f0;
}

table td,
table th {
    text-align: left;
    padding-left: 8px;
}

.searchRow {
    height: 50px;
}

.fg-search {
    background: transparent;
    border: none;
    cursor: pointer;
    display: inline-block;
    font-size: 20px;
    position: absolute;
    top: 0;
    right: 0;
    padding: 10px 15px;
    z-index: 2;
}
</style>