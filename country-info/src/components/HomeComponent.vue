<template>
    <div class="countries-list">
        <div>
            <input type="text" v-model="searchQuery" placeholder="Search for a country" />
            <h1>Countries List</h1>
            <div v-if="loading">Loading...</div>
            <div v-if="error">{{ error }}</div>
            <div v-if='filteredCountries.length'>
                <RouterLink :to="{ name: '' }">
                    <div v-for="country in filteredCountries" :key="country.code">
                        <span>{{ country.name }}</span>
                    </div>
                </RouterLink>
            </div>
            <div v-else>
                No countries found
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { fetchData } from "@/api/availableCountries"
import { computed, onMounted, ref } from "vue"

const countries = ref([]);
const loading = ref(true);
const error = ref("");
const searchQuery = ref("");

const loadCountries = async () => {
    try {
        countries.value = await fetchData();
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