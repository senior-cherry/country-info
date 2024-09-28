export const fetchAvailableCountries = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v3/AvailableCountries`)
        if (!response.ok) {
            console.log("Something went wrong");
        }
        return await response.json()
    } catch (error) {
        console.error('Fetch error:', error)
    }
}