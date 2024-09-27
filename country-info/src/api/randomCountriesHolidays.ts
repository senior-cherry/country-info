export const fetchRandomCountries = async (countryCode: String) => {
    console.log(countryCode)
    try {
        const response = await fetch(`https://date.nager.at/api/v3/NextPublicHolidays/${countryCode}`)
        if (!response.ok) {
            console.log("Something went wrong");
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error)
    }
}