export const fetchUpcomingPublicHolidays = async (countryCode: String) => {
    console.log(countryCode)
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v3/NextPublicHolidays/${countryCode}`)
        if (!response.ok) {
            console.log("Something went wrong");
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error)
    }
}