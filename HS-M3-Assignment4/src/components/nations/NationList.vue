<script setup>
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { ref, computed, reactive } from 'vue';
import TableButton from '../utils/TableButton.vue';
import Flag from '../utils/Flag.vue';
import Loading from '../utils/Loading.vue';
import dataService from '../../services/dataService.js';

const nations = ref([]);
const pagination = ref({});
const filter = reactive({
  "name": ""
});

async function getData(page = 1) {
  let response = await dataService.searchNationsOffline(page, filter);
  pagination.value = response.pagination;
  nations.value = response.items;
  for (let i = 0; i < nations.value.length; i++) {
    dataService.getNationFlag(nations.value[i].id).then((result) => {
      nations.value[i].flag = result;
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
/*
watch(filter, async (newFilter, oldFilter) => {
  await getData(1);
})
*/
</script>

<template>
  <br />
  <div class="searchRow">
    <div style="margin-left: 25%; width: 250px; position: relative">
      <div class="fg-search">
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
      </div>
      <input @input="getData(1)" class="shadow rounded form-control align-top float-left" type="text"
        v-model="filter.name" placeholder="Search..." />
    </div>
  </div>
  <table class="shadow mt-2" style="width: 50%; padding: 10px;">
    <thead>
      <tr>
        <th width="150"></th>
        <th>Name</th>
        <th>Average Rating</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="nation in nations">
        <td>
          <Suspense>
            <Flag class="ml-3" :flag-height="40" :flag-width="50" :nation-id="nation.id">
            </Flag>
            <template class="ml-3" #fallback>
              <Loading />
            </template>
          </Suspense>
        </td>
        <td>
          <router-link :to="{ name: 'nation-detail', params: { id: nation.id } }">
            {{ nation.name }}
          </router-link>
        </td>
        <td>{{ nation.averageRating }}</td>
      </tr>
      <tr v-for="i in pagination.itemsPerPage - nations.length">
        <td colspan="3"></td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td v-if="nations.length > 0" colspan="3">
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
  font-size: 22px;
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
  text-align: center;
  font-size: 20px;
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