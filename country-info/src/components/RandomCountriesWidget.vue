<template>
    <div>
        <div v-if="widgetForCountryHolidays.length">
            <h2>Random Countries</h2>
            <div v-for="rand in widgetForCountryHolidays" :key="rand.countryCode">
                <p>Country Code: {{ rand.countryCode }}</p>
                <p>Holiday Name: {{ rand.holidayName }}</p>
                <p>Date: {{ rand.date }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { fetchAvailableCountries, fetchData } from "@/api/getAvailableCountries"
import { fetchRandomCountries, fetchUpcomingPublicHolidays } from "@/api/getUpcomingPublicHolidays"
import { onMounted, ref } from "vue"

const widgetForCountryHolidays = ref([]); // Holiday data for random countries
const loading = ref(true);
const error = ref('');

const getRandomCountries = async () => {
    try {
        const countries = await fetchAvailableCountries();
        // Shuffle countries and select 3 random countries
        const shuffledCountries = countries.sort(() => 0.5 - Math.random());
        const randomCountries = shuffledCountries.slice(0, 3);

        // Log the selected random countries for debugging
        console.log('Selected Random Countries:', randomCountries);

        // Fetch holidays for each of the 3 random countries in parallel
        const holidayPromises = randomCountries.map(async (country) => {
            const holidayData = await fetchUpcomingPublicHolidays(country.countryCode);

            // Log the fetched holiday data for debugging
            console.log('Holiday data for:', country.countryCode, holidayData);

            return {
                countryCode: country.name,
                holidayName: holidayData?.[0]?.name || 'No upcoming holidays', // Take the first holiday's name or return a message
                date: holidayData?.[0]?.date || 'No upcoming holidays', // Take the first holiday's date or return a message
            };
        });

        // Resolve all promises and store the results
        widgetForCountryHolidays.value = await Promise.all(holidayPromises);

        // Log the widget data for debugging
        console.log('Widget for Country Holidays:', widgetForCountryHolidays.value);

    } catch (err) {
        console.error('Error fetching holidays:', err);
    }
};


onMounted(() => {
    getRandomCountries();
});
</script>

<style scoped>

</style>