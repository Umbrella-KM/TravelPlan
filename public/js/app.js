// Main application script for TravelPlan

document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const travelForm = document.getElementById('travel-form');
    const loadingElement = document.getElementById('loading');
    const resultsElement = document.getElementById('results');
    
    // Form submission handler
    travelForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        try {
            // Show loading indicator
            loadingElement.classList.remove('d-none');
            resultsElement.classList.add('d-none');
            
            // Get form values
            const destination = document.getElementById('destination').value;
            const days = parseInt(document.getElementById('days').value);
            const budget = parseInt(document.getElementById('budget').value);
            const travelStyle = document.getElementById('travel-style').value;
            
            // Get selected interests
            const interests = [];
            document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
                interests.push(checkbox.value);
            });
            
            // Validate input
            if (!destination || isNaN(days) || days < 1 || isNaN(budget) || budget < 100) {
                throw new Error('Please fill in all required fields with valid values.');
            }
            
            // Generate itinerary
            await itineraryManager.generateItinerary(destination, days, interests);
            
            // Calculate budget
            await budgetManager.calculateBudget(budget, days, travelStyle);
            
            // Hide loading indicator and show results
            loadingElement.classList.add('d-none');
            resultsElement.classList.remove('d-none');
            
            // Scroll to results
            resultsElement.scrollIntoView({ behavior: 'smooth' });
            
        } catch (error) {
            // Hide loading indicator
            loadingElement.classList.add('d-none');
            
            // Show error message
            alert(`Error: ${error.message}`);
            console.error('Application error:', error);
        }
    });
    
    // Initialize Google Maps autocomplete for destination input
    const initAutocomplete = () => {
        try {
            const destinationInput = document.getElementById('destination');
            
            // Check if Google Maps API is loaded
            if (window.google && window.google.maps && window.google.maps.places) {
                const autocomplete = new google.maps.places.Autocomplete(destinationInput, {
                    types: ['(cities)']
                });
                
                // Set autocomplete fields
                autocomplete.setFields(['address_components', 'geometry', 'name']);
                
                // Add place_changed event listener
                autocomplete.addListener('place_changed', () => {
                    const place = autocomplete.getPlace();
                    if (!place.geometry) {
                        console.warn("No details available for input: '" + place.name + "'");
                        return;
                    }
                    
                    // You can store place details for later use if needed
                    // For example, store coordinates for weather API
                    console.log('Selected place:', place);
                });
            } else {
                console.warn('Google Maps API not loaded. Autocomplete disabled.');
            }
        } catch (error) {
            console.error('Error initializing autocomplete:', error);
        }
    };
    
    // Initialize autocomplete when Google Maps API is loaded
    if (window.google && window.google.maps && window.google.maps.places) {
        initAutocomplete();
    } else {
        // If Google Maps API is not yet loaded, wait for it
        window.initAutocomplete = initAutocomplete;
    }
    
    // Helper function to export itinerary as PDF (placeholder)
    window.exportItinerary = () => {
        alert('Export functionality will be implemented in a future update.');
    };
    
    // Helper function to share itinerary (placeholder)
    window.shareItinerary = () => {
        alert('Share functionality will be implemented in a future update.');
    };
});

