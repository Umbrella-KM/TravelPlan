// Configuration file for API keys and settings

const CONFIG = {
    // Google Maps API Key - Replace with your actual API key
    GOOGLE_MAPS_API_KEY: "YOUR_GOOGLE_MAPS_API_KEY",
    
    // OpenWeatherMap API Key - Replace with your actual API key
    OPENWEATHER_API_KEY: "YOUR_OPENWEATHER_API_KEY",
    
    // Exchange Rate API Key - Replace with your actual API key
    EXCHANGE_RATE_API_KEY: "YOUR_EXCHANGE_RATE_API_KEY",
    
    // Default settings
    DEFAULT_SETTINGS: {
        currency: "USD",
        language: "en",
        units: "metric" // metric or imperial
    },
    
    // Budget allocation percentages by travel style
    BUDGET_ALLOCATIONS: {
        budget: {
            accommodation: 0.30,
            food: 0.30,
            attractions: 0.20,
            transportation: 0.15,
            miscellaneous: 0.05
        },
        standard: {
            accommodation: 0.35,
            food: 0.25,
            attractions: 0.20,
            transportation: 0.15,
            miscellaneous: 0.05
        },
        luxury: {
            accommodation: 0.40,
            food: 0.25,
            attractions: 0.15,
            transportation: 0.15,
            miscellaneous: 0.05
        }
    },
    
    // API endpoints
    API_ENDPOINTS: {
        googlePlaces: "https://maps.googleapis.com/maps/api/place",
        openWeather: "https://api.openweathermap.org/data/2.5/forecast",
        exchangeRate: "https://api.exchangerate-api.com/v4/latest"
    }
};

// Don't modify below this line
// This prevents direct access to the config object and provides a getter method
const config = (() => {
    return {
        get: (key) => {
            return CONFIG[key];
        }
    };
})();

