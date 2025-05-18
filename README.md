# TravelPlan

TravelPlan is a comprehensive web application that helps users plan their trips by generating personalized itineraries based on their destination, duration, budget, and interests.

## Features

- **Personalized Itineraries**: Generate day-by-day itineraries based on your travel preferences
- **Budget Breakdown**: Get a detailed breakdown of your travel budget across different categories
- **Interactive Maps**: View attractions, restaurants, and accommodations on Google Maps
- **Weather Forecast**: Check the weather forecast for your travel dates
- **Customer Reviews**: See ratings and reviews for recommended places
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## How It Works

1. Enter your destination, number of days, and budget
2. Select your travel style (Budget, Standard, or Luxury)
3. Choose your interests (History & Culture, Nature & Outdoors, Food & Dining, etc.)
4. Get a personalized travel plan with:
   - Budget breakdown with charts and detailed allocation
   - Day-by-day itinerary with attractions, restaurants, and accommodations
   - Google Maps links for each location
   - Customer ratings and reviews

## Technologies Used

- HTML5, CSS3, JavaScript
- Bootstrap 5 for responsive design
- Chart.js for budget visualization
- Google Maps API for location services
- Google Places API for place details and reviews
- OpenWeatherMap API for weather forecasts

## Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/Umbrella-KM/TravelPlan.git
   ```

2. Navigate to the project directory:
   ```
   cd TravelPlan
   ```

3. Open `public/js/config.js` and add your API keys:
   - Google Maps API Key
   - OpenWeatherMap API Key
   - Exchange Rate API Key

4. Open `public/index.html` in your browser or set up a local server.

## API Keys Required

To use all features of TravelPlan, you'll need to obtain the following API keys:

1. **Google Maps API Key**: For maps, places, and geocoding functionality
   - Sign up at [Google Cloud Platform](https://cloud.google.com/maps-platform/)
   - Enable Maps JavaScript API, Places API, and Geocoding API

2. **OpenWeatherMap API Key**: For weather forecasts
   - Sign up at [OpenWeatherMap](https://openweathermap.org/api)

3. **Exchange Rate API Key**: For currency conversion
   - Sign up at [Exchange Rate API](https://www.exchangerate-api.com/)

## Future Enhancements

- User accounts and saved itineraries
- Offline access to travel plans
- Integration with booking services
- Social sharing features
- PDF export of travel plans
- Multi-city trip planning

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

