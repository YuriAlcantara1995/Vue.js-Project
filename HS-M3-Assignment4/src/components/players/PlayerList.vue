<script setup>
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { ref, computed, reactive } from 'vue';
import TableButton from '../utils/TableButton.vue';
import dataService from '../../services/dataService.js';
import Loading from '../utils/Loading.vue';
import Picture from '../utils/Picture.vue';

const loading = ref(true);
const players = ref([]);
const pagination = ref({});
const filter = reactive({
    "name": "",
    "position": "",
    "ratingMin": 0,
    "ratingMax": 100
});

async function getData(page = 1) {
    loading.value = true;
    let response = await dataService.searchPlayersOffline(page, filter);
    pagination.value = response.pagination;
    players.value = response.items;
    loading.value = false;
    for (let i = 0; i < players.value.length; i++) {
        dataService.getPlayerImage(players.value[i].id).then((result) => {
            players.value[i].image = result;
        });
    }
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
</script>

<template>
    <br />
    <div class="searchRow d-flex p-2 mb-2">
        <input style="margin-left: 5%; width: 250px; position: relative"
            class="shadow rounded form-control align-top float-left" type="text" v-model="filter.name"
            placeholder="Name" />
        <label class="float-left ml-5 mt-2">Minimum Rating:</label>
        <input class="shadow rounded form-control align-top float-left ml-2" type="number" min="0" max="100"
            v-model="filter.ratingMin" style="width: 100px;" />
        <label class="float-left ml-5 mt-2">Maximum Rating:</label>
        <input class="shadow rounded form-control align-top float-left ml-2" type="number" min="0" max="100"
            v-model="filter.ratingMax" style="width: 100px;" />
        <label class="float-left ml-5 mt-2">Position:</label>
        <select class="ml-2" name="position" id="position" style="width: 250px; height: 40px;"
            v-model="filter.position">
            <option value="">All</option>
            <option value="GK">GoalKeeper</option>
            <option value="CB">Centre back</option>
            <option value="RB">Right back</option>
            <option value="LB">Left back</option>
            <option value="CDM">Centre defensive midfielder</option>
            <option value="CM">Centre midfielder</option>
            <option value="RM">Right midfielder</option>
            <option value="LM">Left midfielder</option>
            <option value="CAM">Centre attacking midfielder</option>
            <option value="RW">Right Winger</option>
            <option value="LW">Left winger</option>
            <option value="ST">Striker</option>
            <option value="CF">Centre forward</option>
        </select>
        <button class="btn btn-primary ml-5 filter-button" @click="getData(1)">Filter</button>
    </div>
    <table class="shadow mt-2" style="width: 90%; padding: 10px;">
        <thead>
            <tr>
                <th width="150"></th>
                <th>Name</th>
                <th>Rating</th>
                <th>Position</th>
                <th>Age</th>
                <th>Height</th>
                <th>Weight</th>
                <th>Foot</th>
                <th>Pace</th>
                <th>Shooting</th>
                <th>Passing</th>
                <th>Dribbling</th>
                <th>Defending</th>
                <th>Physicality</th>
            </tr>
        </thead>
        <tbody v-if="!loading">
            <tr v-for="player in players">
                <td>
                    <Suspense>
                        <Picture :imageHeight="50" :imageWidth="50" :playerId="player.id">
                        </Picture>
                        <template #fallback>
                            <Loading />
                        </template>
                    </Suspense>
                </td>
                <td style="font-size: 18px;">
                    <router-link :to="{ name: 'player-detail', params: { id: player.id } }">
                        {{ player.name }}
                    </router-link>
                </td>
                <td style="font-size: 18px;">{{ player.rating }}</td>
                <td style="font-size: 18px;">{{ player.position }}</td>
                <td style="font-size: 18px;">{{ player.age }}</td>
                <td style="font-size: 18px;">{{ player.height }}</td>
                <td style="font-size: 18px;">{{ player.weight }}</td>
                <td style="font-size: 18px;">{{ player.foot }}</td>
                <td style="font-size: 18px;">{{ player.pace }}</td>
                <td style="font-size: 18px;">{{ player.shooting }}</td>
                <td style="font-size: 18px;">{{ player.passing }}</td>
                <td style="font-size: 18px;">{{ player.dribbling }}</td>
                <td style="font-size: 18px;">{{ player.defending }}</td>
                <td style="font-size: 18px;">{{ player.physicality }}</td>
            </tr>
            <tr v-for="i in pagination.itemsPerPage - players.length">
                <td colspan="14"></td>
            </tr>
        </tbody>
        <tbody v-else>
            <tr>
                <td colspan="14">
                    <div class="d-flex justify-content-center align-items-center" style="height: 570px; width: 100%;">
                        <Loading />
                    </div>
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td v-if="players.length > 0" colspan="14">
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

.filter-button {
    background-color: #1C3260;
    height: 40px;
}
</style>