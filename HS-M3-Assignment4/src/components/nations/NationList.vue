<script setup>
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { ref, computed } from 'vue';
import TableButton from '../utils/TableButton.vue';

const nations = ref([]);
const options = {
  method: 'GET',
  headers: {
    'accept': 'application/json',
    'X-AUTH-TOKEN': '9a807e49-440b-4ab5-8ec2-25491f516431'
  }
};
const urlBase = 'https://futdb.app/api/';
const currentPage = ref(1);
const searchByName = ref('');
const perPage = ref(10);
const pagination = ref({});

async function getData() {
  //Get first page 
  let res = await fetch(urlBase + 'nations', options);
  if (!res.ok) {
    throw new Error();
  }
  let response = await res.json();
  pagination.value = response.pagination;
  nations.value = response.items;

  //Get rest of information
  for (let i = 2; i <= pagination.value.pageTotal; i++) {
    console.log(i);
    res = await fetch(urlBase + 'nations?page=' + i.toString(), options);
    if (!res.ok) {
      throw new Error();
    }
    response = await res.json();
    nations.value = nations.value.concat(response.items);
  }

  let imageOptions = {
    method: 'GET',
    headers: {
      'accept': 'image/png',
      'X-AUTH-TOKEN': '9a807e49-440b-4ab5-8ec2-25491f516431'
    }
  }
  for (let i = 0; i <= nations.value.length; i++) {
    let id = nations.value[i].id;
    try {
      let res = await fetch(urlBase + 'nations/' + id.toString() + '/image', imageOptions);
      if (!res.ok) {
        throw new Error();
      }
      const imageBlob = await res.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);
      nations.value[i].flag = imageObjectURL;

    } catch (e) {
      nations.value[i].flag = '';
      console.log(e);
    }
  }
}

getData();

const firstRow = computed(() => {
  const firstRow = (currentPage.value - 1) * perPage.value;
  return firstRow;
});

const lastRow = computed(() => {
  const lastRow = Math.min(
    (currentPage.value - 1) * perPage.value + perPage.value,
    filteredNations.value.length
  );
  return lastRow;
});

const filteredNations = computed(() => {
  console.log(searchByName.value);

  let filtered = nations.value.filter((x) =>
    x.name.toLowerCase().includes(searchByName.value.toLowerCase())
  );
  currentPage.value = 1;
  return filtered;
});

const currentRows = computed(() => {
  const begin = (currentPage.value - 1) * perPage.value;
  const end = Math.min(begin + perPage.value, filteredNations.value.length);
  return filteredNations.value.slice(begin, end);
});

const previousButtonStatus = computed(() => {
  if (currentPage.value == 1) return false;
  return true;
});

const nextButtonStatus = computed(() => {
  if (currentPage.value * perPage.value >= filteredNations.value.length)
    return false;
  return true;
});

function changePage(value) {
  currentPage.value += value;
}

function goFirstPage() {
  currentPage.value = 1;
}

function goLastPage() {
  currentPage.value = Math.ceil(filteredNations.value.length / perPage.value);
}
</script>

<template>
  <br />
  <div class="searchRow">
    <label class="align-top float-left ml-5 font-weight-bold mt-2">Search by Name: </label>
    <input class="form-control align-top float-left ml-2" style="width: 200px" type="text" v-model="searchByName" />
  </div>
  <table class="shadow mt-2" style="width: 95%; padding: 10px;">
    <thead>
      <tr>
        <th width="150"></th>
        <th>Name</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="nation in currentRows">
        <td><img :src="nation.flag" width="50" class="ml-3" /></td>
        <td style="font-size: 18px;">{{ nation.name }}</td>
      </tr>
      <tr v-for="i in perPage - currentRows.length">
        <td></td>
        <td></td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td v-if="filteredNations.length > 0" colspan="4">
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
            {{ firstRow + 1 }} - {{ lastRow }} of {{ filteredNations.length }}
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
</style>