<template>
    <div v-for="holiday in holidays">
        <p>{{holiday.name}}</p>
        <p>{{holiday.localName}}</p>
        <p>{{holiday.types[0]}}</p>
        <p>{{holiday.date}}</p>
    </div>
<div v-for="year in years">
    <button @click="getPublicHolidays(year)">{{year}}</button>
</div>
</template>

<script setup lang="ts">
import { fetchPublicHolidays } from "@/api/getPublicHolidays"
import { useRoute } from "vue-router"
import { onMounted, ref } from "vue"

const route = useRoute();

const countryCode = ref(route.params.countryCode);
const currentYear = ref(new Date().getFullYear());
const holidays = ref([]);
const years = ref(Array.from({ length: 11 }, (v, i) => 2020 + i));
const loading = ref(false);
const error = ref(null);

const getPublicHolidays = async (year) => {
    countryCode.value = route.params.countryCode;
    holidays.value = await fetchPublicHolidays(year.toString(), countryCode.value);
}

onMounted(() => {
    getPublicHolidays(currentYear.value);
})
</script>

<style scoped>

</style>