// Itinerary handling functions for TravelPlan

const itineraryManager = (() => {
    // Private variables and methods
    let itineraryData = null;
    
    // Format date to display in a user-friendly format
    const formatDate = (dateString) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    
    // Get weather icon based on condition
    const getWeatherIcon = (condition) => {
        switch (condition.toLowerCase()) {
            case 'sunny':
                return '<i class="fas fa-sun text-warning"></i>';
            case 'partly cloudy':
                return '<i class="fas fa-cloud-sun text-secondary"></i>';
            case 'cloudy':
                return '<i class="fas fa-cloud text-secondary"></i>';
            case 'rainy':
                return '<i class="fas fa-cloud-rain text-primary"></i>';
            case 'snowy':
                return '<i class="fas fa-snowflake text-info"></i>';
            default:
                return '<i class="fas fa-cloud text-secondary"></i>';
        }
    };
    
    // Get price level indicator
    const getPriceLevel = (level) => {
        let html = '';
        for (let i = 0; i < level; i++) {
            html += '<i class="fas fa-dollar-sign"></i>';
        }
        for (let i = level; i < 4; i++) {
            html += '<i class="fas fa-dollar-sign text-muted"></i>';
        }
        return html;
    };
    
    // Get Google Maps link for a place
    const getMapLink = (place) => {
        return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name)}&query_place_id=${place.place_id || ''}&query_lat=${place.lat}&query_lng=${place.lng}`;
    };
    
    // Render trip overview
    const renderTripOverview = (data) => {
        const overviewElement = document.getElementById('trip-overview');
        
        // Clear existing content
        overviewElement.innerHTML = '';
        
        // Create overview content
        const overviewContent = document.createElement('div');
        overviewContent.innerHTML = `
            <div class="mb-4">
                <h4>Trip Details</h4>
                <p><strong>Destination:</strong> ${data.destination}</p>
                <p><strong>Duration:</strong> ${data.days} days</p>
                <p><strong>Accommodation:</strong> ${data.hotel.name} 
                    <span class="place-rating">${'★'.repeat(Math.round(data.hotel.rating))}</span>
                    <span class="place-reviews">(${data.hotel.reviews.toLocaleString()} reviews)</span>
                </p>
            </div>
            
            <div class="mb-4">
                <h4>Accommodation Details</h4>
                <p class="place-address">${data.hotel.address}</p>
                <p><a href="${getMapLink(data.hotel)}" target="_blank" class="map-link">
                    <i class="fas fa-map-marker-alt"></i> View on Google Maps
                </a></p>
            </div>
            
            <div>
                <h4>Weather Forecast</h4>
                <div class="row">
                    ${data.itinerary.slice(0, 5).map(day => `
                        <div class="col">
                            <div class="text-center p-2 border rounded mb-2">
                                <div class="small">${formatDate(day.date).split(',')[0]}</div>
                                <div class="h4 mb-0">${getWeatherIcon(day.weather.condition)}</div>
                                <div class="small">${day.weather.temp}°C</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        // Append to overview element
        overviewElement.appendChild(overviewContent);
    };
    
    // Render itinerary
    const renderItinerary = (data) => {
        const itineraryContainer = document.getElementById('itinerary-container');
        
        // Clear existing content
        itineraryContainer.innerHTML = '';
        
        // Create itinerary header
        const itineraryHeader = document.createElement('h3');
        itineraryHeader.className = 'text-center mb-4';
        itineraryHeader.textContent = 'Day-by-Day Itinerary';
        itineraryContainer.appendChild(itineraryHeader);
        
        // Create itinerary days
        data.itinerary.forEach(day => {
            const dayCard = document.createElement('div');
            dayCard.className = 'card shadow day-card';
            
            // Create day header
            const dayHeader = document.createElement('div');
            dayHeader.className = 'day-header';
            dayHeader.innerHTML = `
                <div class="d-flex justify-content-between align-items-center">
                    <h4 class="mb-0">Day ${day.day} - ${formatDate(day.date)}</h4>
                    <div>
                        ${getWeatherIcon(day.weather.condition)} ${day.weather.temp}°C
                    </div>
                </div>
            `;
            
            // Create day body
            const dayBody = document.createElement('div');
            dayBody.className = 'card-body';
            
            // Create activities list
            const activitiesList = document.createElement('div');
            activitiesList.className = 'activities-list';
            
            // Add activities
            day.activities.forEach(activity => {
                const activityItem = document.createElement('div');
                activityItem.className = 'activity-item';
                
                // Get activity type class
                let activityTypeClass = '';
                switch (activity.type) {
                    case 'attraction':
                        activityTypeClass = 'attraction';
                        break;
                    case 'food':
                        activityTypeClass = 'food';
                        break;
                    case 'accommodation':
                        activityTypeClass = 'accommodation';
                        break;
                    default:
                        activityTypeClass = '';
                }
                
                // Create activity content
                activityItem.innerHTML = `
                    <div class="d-flex justify-content-between align-items-start">
                        <div>
                            <span class="activity-time">${activity.time}</span>
                            <span class="activity-type ${activityTypeClass}">${activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}</span>
                        </div>
                        ${activity.type === 'food' && activity.place.price ? `<div>${getPriceLevel(activity.place.price)}</div>` : ''}
                    </div>
                    <h5 class="mt-2">${activity.place.name}</h5>
                    <div>
                        <span class="place-rating">${'★'.repeat(Math.round(activity.place.rating))}</span>
                        <span class="place-reviews">(${activity.place.reviews.toLocaleString()} reviews)</span>
                    </div>
                    <p class="place-address">${activity.place.address}</p>
                    <p class="mb-0">${activity.notes}</p>
                    <a href="${getMapLink(activity.place)}" target="_blank" class="map-link">
                        <i class="fas fa-map-marker-alt"></i> View on Google Maps
                    </a>
                `;
                
                activitiesList.appendChild(activityItem);
            });
            
            // Assemble day card
            dayBody.appendChild(activitiesList);
            dayCard.appendChild(dayHeader);
            dayCard.appendChild(dayBody);
            
            // Add day card to itinerary container
            itineraryContainer.appendChild(dayCard);
        });
    };
    
    // Public methods
    return {
        // Generate itinerary based on input parameters
        generateItinerary: async (destination, days, interests) => {
            try {
                // In a real application, this would call an API to get accurate itinerary information
                // For now, we'll use our mock data generator
                itineraryData = await api.simulateApiCall('itinerary', destination, days, null, null, interests);
                
                // Set result destination
                document.getElementById('result-destination').textContent = destination;
                
                // Render trip overview
                renderTripOverview(itineraryData);
                
                // Render itinerary
                renderItinerary(itineraryData);
                
                return itineraryData;
            } catch (error) {
                console.error('Error generating itinerary:', error);
                throw error;
            }
        },
        
        // Get current itinerary data
        getItineraryData: () => {
            return itineraryData;
        }
    };
})();

