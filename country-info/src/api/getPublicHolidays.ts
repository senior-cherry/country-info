import type { UnwrapRef } from "vue"
import type { RouteParamValue } from "vue-router"

export const fetchPublicHolidays = async (year: String, countryCode: UnwrapRef<string | RouteParamValue[]>) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v3/PublicHolidays/${year}/${countryCode}`)
        if (!response.ok) {
            console.log("Something went wrong");
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error)
    }
}