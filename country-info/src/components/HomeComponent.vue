<template>
    <div class="countries-list">
        <div>
            <input type="text" v-model="searchQuery" placeholder="Search for a country" />
            <h2>Countries List</h2>
            <div v-if="loading">Loading...</div>
            <div v-if="error">{{ error }}</div>
            <div v-if='filteredCountries.length'>
                <div class="flex flex-col">
                    <router-link
                        :to="{ name: 'country', params: {countryCode: country.countryCode} }"
                        v-for="country in filteredCountries" :key="country.code"
                        class="countries-list-item">
                        <strong>{{country.name}}</strong>
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
.countries-list {
    width: 500px;
    margin-top: 16px;
}

h2 {
    font-size: 24px;
    font-weight: bold;
    margin-top: 16px;
}

input {
    border: 1px solid #d1d5db;
    border-radius: 8px;
    padding: 0.5rem;
    margin-top: 16px;
    width: 300px;
}

.countries-list-item {
    border: 1px solid black;
    padding: 16px;
    margin-top: 16px;
}
</style>