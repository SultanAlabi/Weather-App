# Weather App

A modern, responsive weather application that displays current weather information for any city worldwide.

## Features

- 🌤️ Current weather display with temperature, description, and weather icon
- 🔍 Search weather by city name
- 📍 Automatic location detection (with user permission)
- 📱 Fully responsive design for mobile and desktop
- ⚡ Loading states and error handling
- 🎨 Modern UI with gradient backgrounds and smooth animations

## Weather Information Displayed

- Current temperature and "feels like" temperature
- Weather description and icon
- Humidity percentage
- Wind speed
- Atmospheric pressure
- Visibility distance
- Current date and location

## Setup Instructions

### Option 1: Quick Demo (Mock Data)
1. Simply open `index.html` in your web browser
2. The app will work with mock weather data for demonstration

### Option 2: Live Weather Data
1. Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Copy your API key from the dashboard
4. Open `script.js` and replace `'YOUR_API_KEY_HERE'` with your actual API key
5. Remove or comment out the mock data section (lines 85-110)
6. Uncomment the real fetch code (lines 75-83)
7. Open `index.html` in your web browser

## File Structure

```
weather-app/
├── index.html          # Main HTML structure
├── style.css           # CSS styling and responsive design
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Technologies Used

- **HTML5** - Semantic markup structure
- **CSS3** - Modern styling with flexbox, grid, and animations
- **JavaScript (ES6+)** - Weather API integration and DOM manipulation
- **OpenWeatherMap API** - Weather data source
- **Google Fonts** - Poppins font family

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## API Information

This app uses the OpenWeatherMap Current Weather Data API:
- **Endpoint**: `https://api.openweathermap.org/data/2.5/weather`
- **Rate Limit**: 1,000 calls/day (free tier)
- **Documentation**: [OpenWeatherMap API Docs](https://openweathermap.org/current)

## Features in Detail

### Search Functionality
- Enter any city name in the search box
- Press Enter or click the Search button
- Displays weather for the searched location

### Geolocation
- Automatically detects user's location on first load
- Requires user permission
- Falls back gracefully if permission denied

### Responsive Design
- Mobile-first approach
- Adapts to different screen sizes
- Touch-friendly interface

### Error Handling
- Invalid city names
- Network connectivity issues
- API rate limiting
- Geolocation errors

## Customization

You can easily customize the app by modifying:

- **Colors**: Update the CSS gradient and color variables
- **Fonts**: Change the Google Fonts import and font-family
- **Layout**: Modify the CSS grid and flexbox properties
- **Additional Data**: Add more weather parameters from the API response

## License

This project is open source and available under the MIT License.