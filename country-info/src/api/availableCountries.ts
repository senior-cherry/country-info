export const fetchData = async () => {
    try {
        const response = await fetch("https://date.nager.at/api/v3/AvailableCountries")
        if (!response.ok) {
            console.log("Something went wrong");
        }
        return await response.json()
    } catch (error) {
        console.error('Fetch error:', error)
    }
}