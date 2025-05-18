// API handling functions for TravelPlan

const api = (() => {
    // Private methods and properties
    const handleResponse = async (response) => {
        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }
        return await response.json();
    };

    const handleError = (error) => {
        console.error('API Error:', error);
        throw error;
    };

    // Public methods
    return {
        // Get place details from Google Places API
        getPlaceDetails: async (placeId) => {
            try {
                const endpoint = `${config.get('API_ENDPOINTS').googlePlaces}/details/json`;
                const params = new URLSearchParams({
                    place_id: placeId,
                    fields: 'name,rating,formatted_address,formatted_phone_number,opening_hours,website,price_level,review,photo,geometry',
                    key: config.get('GOOGLE_MAPS_API_KEY')
                });

                const response = await fetch(`${endpoint}?${params}`);
                return await handleResponse(response);
            } catch (error) {
                return handleError(error);
            }
        },

        // Search for places using Google Places API
        searchPlaces: async (query, location, type, radius = 5000) => {
            try {
                const endpoint = `${config.get('API_ENDPOINTS').googlePlaces}/textsearch/json`;
                const params = new URLSearchParams({
                    query: query,
                    location: location, // lat,lng format
                    radius: radius,
                    type: type,
                    key: config.get('GOOGLE_MAPS_API_KEY')
                });

                const response = await fetch(`${endpoint}?${params}`);
                return await handleResponse(response);
            } catch (error) {
                return handleError(error);
            }
        },

        // Get nearby places using Google Places API
        getNearbyPlaces: async (location, type, radius = 5000, keyword = '') => {
            try {
                const endpoint = `${config.get('API_ENDPOINTS').googlePlaces}/nearbysearch/json`;
                const params = new URLSearchParams({
                    location: location, // lat,lng format
                    radius: radius,
                    type: type,
                    keyword: keyword,
                    key: config.get('GOOGLE_MAPS_API_KEY')
                });

                const response = await fetch(`${endpoint}?${params}`);
                return await handleResponse(response);
            } catch (error) {
                return handleError(error);
            }
        },

        // Get geocode information for a location
        getGeocode: async (address) => {
            try {
                const endpoint = 'https://maps.googleapis.com/maps/api/geocode/json';
                const params = new URLSearchParams({
                    address: address,
                    key: config.get('GOOGLE_MAPS_API_KEY')
                });

                const response = await fetch(`${endpoint}?${params}`);
                return await handleResponse(response);
            } catch (error) {
                return handleError(error);
            }
        },

        // Get weather forecast for a location
        getWeatherForecast: async (lat, lng) => {
            try {
                const endpoint = config.get('API_ENDPOINTS').openWeather;
                const params = new URLSearchParams({
                    lat: lat,
                    lon: lng,
                    units: config.get('DEFAULT_SETTINGS').units,
                    appid: config.get('OPENWEATHER_API_KEY')
                });

                const response = await fetch(`${endpoint}?${params}`);
                return await handleResponse(response);
            } catch (error) {
                return handleError(error);
            }
        },

        // Get exchange rate information
        getExchangeRates: async (baseCurrency = 'USD') => {
            try {
                const endpoint = `${config.get('API_ENDPOINTS').exchangeRate}/${baseCurrency}`;
                const response = await fetch(endpoint);
                return await handleResponse(response);
            } catch (error) {
                return handleError(error);
            }
        },

        // Simulate API call for development/testing or when API keys are not available
        simulateApiCall: async (type, destination, days, budget, travelStyle, interests) => {
            // This function returns mock data for development and testing
            // In a production environment, this would be replaced with actual API calls
            
            console.log('Simulating API call with:', { type, destination, days, budget, travelStyle, interests });
            
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Return mock data based on the request type
            switch (type) {
                case 'itinerary':
                    return mockData.generateItinerary(destination, days, interests);
                case 'budget':
                    return mockData.generateBudget(budget, days, travelStyle);
                case 'places':
                    return mockData.generatePlaces(destination, interests);
                default:
                    throw new Error('Invalid simulation type');
            }
        }
    };
})();

// Mock data generator for development and testing
const mockData = (() => {
    // Helper function to generate random number within range
    const randomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    
    // Helper function to get random item from array
    const randomItem = (array) => {
        return array[Math.floor(Math.random() * array.length)];
    };
    
    // Sample data for mock responses
    const mockPlaces = {
        attractions: {
            'Paris': [
                { name: 'Eiffel Tower', rating: 4.7, reviews: 215000, address: 'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France', lat: 48.8584, lng: 2.2945 },
                { name: 'Louvre Museum', rating: 4.8, reviews: 187000, address: 'Rue de Rivoli, 75001 Paris, France', lat: 48.8606, lng: 2.3376 },
                { name: 'Notre-Dame Cathedral', rating: 4.7, reviews: 140000, address: '6 Parvis Notre-Dame - Pl. Jean-Paul II, 75004 Paris, France', lat: 48.8530, lng: 2.3499 },
                { name: 'Arc de Triomphe', rating: 4.7, reviews: 140000, address: 'Place Charles de Gaulle, 75008 Paris, France', lat: 48.8738, lng: 2.2950 },
                { name: 'Montmartre', rating: 4.6, reviews: 110000, address: '75018 Paris, France', lat: 48.8867, lng: 2.3431 },
                { name: 'Palace of Versailles', rating: 4.7, reviews: 98000, address: 'Place d\'Armes, 78000 Versailles, France', lat: 48.8049, lng: 2.1204 }
            ],
            'New York': [
                { name: 'Statue of Liberty', rating: 4.7, reviews: 187000, address: 'New York, NY 10004, USA', lat: 40.6892, lng: -74.0445 },
                { name: 'Central Park', rating: 4.8, reviews: 210000, address: 'New York, NY, USA', lat: 40.7812, lng: -73.9665 },
                { name: 'Empire State Building', rating: 4.7, reviews: 152000, address: '20 W 34th St, New York, NY 10001, USA', lat: 40.7484, lng: -73.9857 },
                { name: 'Times Square', rating: 4.7, reviews: 195000, address: 'Manhattan, NY 10036, USA', lat: 40.7580, lng: -73.9855 },
                { name: 'Metropolitan Museum of Art', rating: 4.8, reviews: 98000, address: '1000 5th Ave, New York, NY 10028, USA', lat: 40.7794, lng: -73.9632 },
                { name: 'Brooklyn Bridge', rating: 4.8, reviews: 87000, address: 'Brooklyn Bridge, New York, NY 10038, USA', lat: 40.7061, lng: -73.9969 }
            ],
            'Tokyo': [
                { name: 'Tokyo Skytree', rating: 4.6, reviews: 87000, address: '1 Chome-1-2 Oshiage, Sumida City, Tokyo 131-0045, Japan', lat: 35.7101, lng: 139.8107 },
                { name: 'Senso-ji Temple', rating: 4.7, reviews: 92000, address: '2 Chome-3-1 Asakusa, Taito City, Tokyo 111-0032, Japan', lat: 35.7147, lng: 139.7966 },
                { name: 'Meiji Shrine', rating: 4.6, reviews: 65000, address: '1-1 Yoyogikamizonocho, Shibuya City, Tokyo 151-8557, Japan', lat: 35.6763, lng: 139.6993 },
                { name: 'Tokyo Imperial Palace', rating: 4.5, reviews: 59000, address: '1-1 Chiyoda, Chiyoda City, Tokyo 100-8111, Japan', lat: 35.6852, lng: 139.7528 },
                { name: 'Shinjuku Gyoen National Garden', rating: 4.6, reviews: 45000, address: '11 Naitomachi, Shinjuku City, Tokyo 160-0014, Japan', lat: 35.6851, lng: 139.7100 },
                { name: 'Shibuya Crossing', rating: 4.6, reviews: 78000, address: '2 Chome-2-1 Dogenzaka, Shibuya City, Tokyo 150-0043, Japan', lat: 35.6591, lng: 139.7005 }
            ]
        },
        restaurants: {
            'Paris': [
                { name: 'Le Jules Verne', rating: 4.6, reviews: 3200, address: 'Eiffel Tower, Avenue Gustave Eiffel, 75007 Paris, France', lat: 48.8583, lng: 2.2944, price: 4 },
                { name: 'Café de Flore', rating: 4.3, reviews: 8700, address: '172 Boulevard Saint-Germain, 75006 Paris, France', lat: 48.8539, lng: 2.3336, price: 3 },
                { name: 'L\'Ambroisie', rating: 4.7, reviews: 1200, address: '9 Place des Vosges, 75004 Paris, France', lat: 48.8554, lng: 2.3671, price: 4 },
                { name: 'Bouillon Chartier', rating: 4.2, reviews: 25000, address: '7 Rue du Faubourg Montmartre, 75009 Paris, France', lat: 48.8731, lng: 2.3431, price: 2 },
                { name: 'Le Comptoir du Relais', rating: 4.4, reviews: 4500, address: '9 Carrefour de l\'Odéon, 75006 Paris, France', lat: 48.8513, lng: 2.3385, price: 3 }
            ],
            'New York': [
                { name: 'Katz\'s Delicatessen', rating: 4.5, reviews: 45000, address: '205 E Houston St, New York, NY 10002, USA', lat: 40.7223, lng: -73.9874, price: 2 },
                { name: 'Peter Luger Steak House', rating: 4.4, reviews: 14000, address: '178 Broadway, Brooklyn, NY 11211, USA', lat: 40.7099, lng: -73.9622, price: 4 },
                { name: 'Eleven Madison Park', rating: 4.8, reviews: 3200, address: '11 Madison Ave, New York, NY 10010, USA', lat: 40.7416, lng: -73.9872, price: 4 },
                { name: 'Shake Shack', rating: 4.4, reviews: 35000, address: 'Madison Square Park, New York, NY 10010, USA', lat: 40.7414, lng: -73.9883, price: 2 },
                { name: 'Le Bernardin', rating: 4.7, reviews: 4800, address: '155 W 51st St, New York, NY 10019, USA', lat: 40.7614, lng: -73.9813, price: 4 }
            ],
            'Tokyo': [
                { name: 'Sukiyabashi Jiro', rating: 4.8, reviews: 2100, address: '4 Chome-2-15 Ginza, Chuo City, Tokyo 104-0061, Japan', lat: 35.6717, lng: 139.7649, price: 4 },
                { name: 'Ichiran Shibuya', rating: 4.4, reviews: 12000, address: '1 Chome-22-7 Jinnan, Shibuya City, Tokyo 150-0041, Japan', lat: 35.6614, lng: 139.7006, price: 2 },
                { name: 'Sushi Dai', rating: 4.7, reviews: 5600, address: '5 Chome-2-1 Tsukiji, Chuo City, Tokyo 104-0045, Japan', lat: 35.6654, lng: 139.7707, price: 3 },
                { name: 'Gonpachi Nishi-Azabu', rating: 4.2, reviews: 8900, address: '1 Chome-13-11 Nishiazabu, Minato City, Tokyo 106-0031, Japan', lat: 35.6592, lng: 139.7215, price: 3 },
                { name: 'Narisawa', rating: 4.7, reviews: 1800, address: '2 Chome-6-15 Minami Aoyama, Minato City, Tokyo 107-0062, Japan', lat: 35.6697, lng: 139.7223, price: 4 }
            ]
        },
        hotels: {
            'Paris': [
                { name: 'Hôtel Plaza Athénée', rating: 4.8, reviews: 2100, address: '25 Avenue Montaigne, 75008 Paris, France', lat: 48.8661, lng: 2.3031, price: 4 },
                { name: 'Le Meurice', rating: 4.7, reviews: 1800, address: '228 Rue de Rivoli, 75001 Paris, France', lat: 48.8651, lng: 2.3280, price: 4 },
                { name: 'Hôtel de Crillon', rating: 4.8, reviews: 1500, address: '10 Place de la Concorde, 75008 Paris, France', lat: 48.8674, lng: 2.3214, price: 4 },
                { name: 'Citadines Tour Eiffel Paris', rating: 4.2, reviews: 3200, address: '132 Boulevard de Grenelle, 75015 Paris, France', lat: 48.8517, lng: 2.2976, price: 3 },
                { name: 'Generator Paris', rating: 4.1, reviews: 5600, address: '9-11 Place du Colonel Fabien, 75010 Paris, France', lat: 48.8772, lng: 2.3705, price: 2 }
            ],
            'New York': [
                { name: 'The Plaza', rating: 4.6, reviews: 5800, address: '768 5th Ave, New York, NY 10019, USA', lat: 40.7645, lng: -73.9741, price: 4 },
                { name: 'The Standard, High Line', rating: 4.4, reviews: 3200, address: '848 Washington St, New York, NY 10014, USA', lat: 40.7399, lng: -74.0083, price: 4 },
                { name: 'Pod 51 Hotel', rating: 4.0, reviews: 4500, address: '230 E 51st St, New York, NY 10022, USA', lat: 40.7559, lng: -73.9709, price: 2 },
                { name: 'The Nomad Hotel', rating: 4.6, reviews: 2100, address: '1170 Broadway, New York, NY 10001, USA', lat: 40.7448, lng: -73.9885, price: 3 },
                { name: 'Ace Hotel New York', rating: 4.4, reviews: 3800, address: '20 W 29th St, New York, NY 10001, USA', lat: 40.7456, lng: -73.9881, price: 3 }
            ],
            'Tokyo': [
                { name: 'Park Hyatt Tokyo', rating: 4.7, reviews: 3200, address: '3 Chome-7-1-2 Nishishinjuku, Shinjuku City, Tokyo 163-1055, Japan', lat: 35.6869, lng: 139.6921, price: 4 },
                { name: 'The Ritz-Carlton, Tokyo', rating: 4.8, reviews: 2100, address: '9 Chome-7-1 Akasaka, Minato City, Tokyo 107-6245, Japan', lat: 35.6658, lng: 139.7296, price: 4 },
                { name: 'Shinjuku Granbell Hotel', rating: 4.2, reviews: 4800, address: '2 Chome-14-5 Kabukicho, Shinjuku City, Tokyo 160-0021, Japan', lat: 35.6956, lng: 139.7037, price: 3 },
                { name: 'Hotel Gracery Shinjuku', rating: 4.3, reviews: 5600, address: '1 Chome-19-1 Kabukicho, Shinjuku City, Tokyo 160-8466, Japan', lat: 35.6941, lng: 139.7016, price: 3 },
                { name: 'UNPLAN Kagurazaka', rating: 4.5, reviews: 1200, address: '2 Chome-14-12 Kagurazaka, Shinjuku City, Tokyo 162-0825, Japan', lat: 35.7015, lng: 139.7403, price: 2 }
            ]
        }
    };
    
    // Public methods
    return {
        generateItinerary: (destination, days, interests) => {
            const itinerary = [];
            const availableAttractions = mockPlaces.attractions[destination] || mockPlaces.attractions['Paris'];
            const availableRestaurants = mockPlaces.restaurants[destination] || mockPlaces.restaurants['Paris'];
            const availableHotels = mockPlaces.hotels[destination] || mockPlaces.hotels['Paris'];
            
            // Select a hotel for the entire stay
            const hotel = randomItem(availableHotels);
            
            // Generate itinerary for each day
            for (let day = 1; day <= days; day++) {
                const dayPlan = {
                    day: day,
                    date: new Date(Date.now() + (day - 1) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    weather: {
                        temp: randomNumber(15, 30),
                        condition: randomItem(['Sunny', 'Partly Cloudy', 'Cloudy', 'Rainy'])
                    },
                    activities: []
                };
                
                // Morning activity (usually an attraction)
                dayPlan.activities.push({
                    time: '09:00 - 12:00',
                    type: 'attraction',
                    place: randomItem(availableAttractions),
                    notes: 'Morning visit to enjoy smaller crowds'
                });
                
                // Lunch
                dayPlan.activities.push({
                    time: '12:30 - 14:00',
                    type: 'food',
                    place: randomItem(availableRestaurants),
                    notes: 'Lunch break'
                });
                
                // Afternoon activity (usually an attraction)
                dayPlan.activities.push({
                    time: '14:30 - 17:30',
                    type: 'attraction',
                    place: randomItem(availableAttractions),
                    notes: 'Afternoon exploration'
                });
                
                // Dinner
                dayPlan.activities.push({
                    time: '19:00 - 21:00',
                    type: 'food',
                    place: randomItem(availableRestaurants),
                    notes: 'Dinner'
                });
                
                // Add accommodation for each day
                dayPlan.activities.push({
                    time: '21:30',
                    type: 'accommodation',
                    place: hotel,
                    notes: 'Return to hotel'
                });
                
                itinerary.push(dayPlan);
            }
            
            return {
                destination: destination,
                days: days,
                hotel: hotel,
                itinerary: itinerary
            };
        },
        
        generateBudget: (totalBudget, days, travelStyle) => {
            // Get budget allocation percentages based on travel style
            const allocations = config.get('BUDGET_ALLOCATIONS')[travelStyle];
            
            // Calculate budget breakdown
            const budgetBreakdown = {};
            let remainingBudget = totalBudget;
            
            for (const category in allocations) {
                if (category !== 'miscellaneous') {
                    const amount = Math.round(totalBudget * allocations[category]);
                    budgetBreakdown[category] = amount;
                    remainingBudget -= amount;
                }
            }
            
            // Assign remaining budget to miscellaneous
            budgetBreakdown.miscellaneous = remainingBudget;
            
            // Calculate daily budget
            const dailyBudget = Math.round(totalBudget / days);
            
            // Calculate category details
            const categoryDetails = {
                accommodation: {
                    total: budgetBreakdown.accommodation,
                    perNight: Math.round(budgetBreakdown.accommodation / days),
                    notes: `${travelStyle === 'budget' ? 'Hostels or budget hotels' : travelStyle === 'luxury' ? 'Luxury hotels' : 'Mid-range hotels'}`
                },
                food: {
                    total: budgetBreakdown.food,
                    perDay: Math.round(budgetBreakdown.food / days),
                    breakdown: {
                        breakfast: Math.round(budgetBreakdown.food * 0.2 / days),
                        lunch: Math.round(budgetBreakdown.food * 0.3 / days),
                        dinner: Math.round(budgetBreakdown.food * 0.4 / days),
                        snacks: Math.round(budgetBreakdown.food * 0.1 / days)
                    }
                },
                attractions: {
                    total: budgetBreakdown.attractions,
                    perDay: Math.round(budgetBreakdown.attractions / days),
                    notes: 'Includes entrance fees, tours, and activities'
                },
                transportation: {
                    total: budgetBreakdown.transportation,
                    perDay: Math.round(budgetBreakdown.transportation / days),
                    notes: 'Local transportation, taxis, and car rentals if applicable'
                },
                miscellaneous: {
                    total: budgetBreakdown.miscellaneous,
                    perDay: Math.round(budgetBreakdown.miscellaneous / days),
                    notes: 'Souvenirs, tips, and unexpected expenses'
                }
            };
            
            return {
                totalBudget: totalBudget,
                dailyBudget: dailyBudget,
                days: days,
                travelStyle: travelStyle,
                breakdown: budgetBreakdown,
                details: categoryDetails
            };
        },
        
        generatePlaces: (destination, interests) => {
            // Filter places based on interests
            const places = {
                attractions: mockPlaces.attractions[destination] || mockPlaces.attractions['Paris'],
                restaurants: mockPlaces.restaurants[destination] || mockPlaces.restaurants['Paris'],
                hotels: mockPlaces.hotels[destination] || mockPlaces.hotels['Paris']
            };
            
            return places;
        }
    };
})();

