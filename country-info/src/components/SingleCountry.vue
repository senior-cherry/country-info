<template>
    <div class="single-country-info">
        <h2>{{countryCode}}</h2>
        <div v-if="loading">Loading...</div>
        <div v-if="error">{{ error }}</div>
        <div v-if="holidays.length">
            <div v-for="holiday in holidays" class="single-country-info-items">
                <p class="m-2">Name: <strong>{{holiday.name}}</strong></p>
                <p class="m-2">Local name: <strong>{{holiday.localName}}</strong></p>
                <p class="m-2">Type: <strong>{{holiday.types[0]}}</strong></p>
                <p class="m-2">Date: <strong>{{holiday.date}}</strong></p>
            </div>
        </div>
        <div v-else>
            Holidays data was not found
        </div>
        <div class="year-switcher">
            <button v-for="year in years" :key="year" @click="getPublicHolidays(year)">{{year}}</button>
        </div>
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
    try {
        countryCode.value = route.params.countryCode;
        holidays.value = await fetchPublicHolidays(year.toString(), countryCode.value);
    } catch (error) {
        error.value = "Failed to load country info";
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    getPublicHolidays(currentYear.value);
})
</script>

<style scoped>
.year-switcher {
    margin-bottom: 20px;
    margin-top: 20px;
    text-align: center;
}

.year-switcher button {
    margin-right: 10px;
    padding: 5px 10px;
    background-color: teal;
    color: white;
    border: none;
    cursor: pointer;
    letter-spacing: 1px;
}

.single-country-info {
    width: 800px;
    margin-top: 16px;
    padding: 16px;
}

h2 {
    font-size: 24px;
    font-weight: bold;
    margin-top: 16px;
}

.single-country-info-items {
    border: 1px solid black;
    padding: 16px;
    margin-top: 16px;
}
</style>