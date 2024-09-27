<template>
    <div class="countries-list">
        <div>
            <input type="text" v-model="searchQuery" placeholder="Search for a country" />
            <h1>Countries List</h1>
            <div v-if="loading">Loading...</div>
            <div v-if="error">{{ error }}</div>
            <div v-if='filteredCountries.length'>
                <div v-for="country in filteredCountries" :key="country.code">
                    <router-link :to="{ name: 'country', params: {countryCode: country.countryCode} }">
                        <span>{{country.name}}</span>
                    </router-link>
                </div>
            </div>
            <div v-else>
                No countries found
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { fetchAvailableCountries } from "@/api/getAvailableCountries"
import { computed, onMounted, ref } from "vue"

const countries = ref([]);
const loading = ref(true);
const error = ref("");
const searchQuery = ref("");

const loadCountries = async () => {
    try {
        countries.value = await fetchAvailableCountries();
    } catch (err) {
        error.value = "Failed to load countries";
    } finally {
        loading.value = false;
    }
};

const filteredCountries = computed(() => {
    if (searchQuery.value) {
        return countries.value.filter(country =>
            country.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
    }
    return countries.value;
});

onMounted(() => {
    loadCountries();
})
</script>

<style scoped>

</style>