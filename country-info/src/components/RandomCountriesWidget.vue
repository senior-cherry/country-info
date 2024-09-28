<template>
    <div class="random-countries-widget">
        <h2>Random Countries Widget</h2>
        <div v-if="loading">Loading...</div>
        <div v-if="error">{{ error }}</div>
        <div v-if="widgetForCountryHolidays.length">
            <div v-for="rand in widgetForCountryHolidays" :key="rand.countryCode" class="random-countries-widget-items">
                <p class="m-2 font-bold">{{ rand.countryCode }}</p>
                <p class="m-2">{{ rand.holidayName }}</p>
                <p class="m-2">{{ rand.date }}</p>
            </div>
        </div>
        <div v-else>
            No random countries found
        </div>
    </div>
</template>

<script setup lang="ts">
import { fetchAvailableCountries, fetchData } from "@/api/getAvailableCountries"
import { fetchRandomCountries, fetchUpcomingPublicHolidays } from "@/api/getUpcomingPublicHolidays"
import { onMounted, ref } from "vue"

const widgetForCountryHolidays = ref([]);
const loading = ref(true);
const error = ref('');

const getRandomCountries = async () => {
    try {
        const countries = await fetchAvailableCountries();
        const shuffledCountries = countries.sort(() => 0.5 - Math.random());
        const randomCountries = shuffledCountries.slice(0, 3);

        const holidayPromises = randomCountries.map(async (country) => {
            const holidayData = await fetchUpcomingPublicHolidays(country.countryCode);

            return {
                countryCode: country.name,
                holidayName: holidayData?.[0]?.name || "No upcoming holidays found",
                date: holidayData?.[0]?.date || "No upcoming holidays found",
            };
        });

        widgetForCountryHolidays.value = await Promise.all(holidayPromises);
    } catch (err) {
        error.value = "Failed to load random countries holidays";
    } finally {
        loading.value = false;
    }
};


onMounted(() => {
    getRandomCountries();
});
</script>

<style scoped>
.random-countries-widget {
    width: 800px;
    margin-top: 16px;
    padding: 16px;
}

h2 {
    font-size: 24px;
    font-weight: bold;
    margin-top: 16px;
}

.random-countries-widget-items {
    border: 1px solid black;
    padding: 16px;
    margin-top: 16px;
}
</style>