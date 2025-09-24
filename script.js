// Weather App JavaScript

class WeatherApp {
    constructor() {
        // OpenWeatherMap API key (you'll need to get your own from openweathermap.org)
        this.apiKey = '05a8dba1811a6e0ab1f9f9d5d432a302';
        this.apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
        
        // DOM elements
        this.cityInput = document.getElementById('cityInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.loading = document.getElementById('loading');
        this.error = document.getElementById('error');
        this.weatherContainer = document.getElementById('weatherContainer');
        
        // Weather display elements
        this.cityName = document.getElementById('cityName');
        this.currentDate = document.getElementById('currentDate');
        this.temp = document.getElementById('temp');
        this.weatherIcon = document.getElementById('weatherIcon');
        this.description = document.getElementById('description');
        this.feelsLike = document.getElementById('feelsLike');
        this.humidity = document.getElementById('humidity');
        this.windSpeed = document.getElementById('windSpeed');
        this.pressure = document.getElementById('pressure');
        this.visibility = document.getElementById('visibility');
        this.uvIndex = document.getElementById('uvIndex');
        
        this.init();
    }
    
    init() {
        // Event listeners
        this.searchBtn.addEventListener('click', () => this.handleSearch());
        this.cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSearch();
            }
        });
        
        // Display current date
        this.displayCurrentDate();
        
        // Check if geolocation is available and get user's location
        this.getCurrentLocationWeather();
    }
    
    displayCurrentDate() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        this.currentDate.textContent = now.toLocaleDateString('en-US', options);
    }
    
    async getCurrentLocationWeather() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    await this.getWeatherByCoords(latitude, longitude);
                },
                (error) => {
                    console.log('Geolocation error:', error);
                    // Don't show error for geolocation, just skip
                }
            );
        }
    }
    
    async handleSearch() {
        const city = this.cityInput.value.trim();
        
        if (!city) {
            this.showError('Please enter a city name');
            return;
        }
        
        await this.getWeatherByCity(city);
    }
    
    async getWeatherByCity(city) {
        const url = `${this.apiUrl}?q=${encodeURIComponent(city)}&appid=${this.apiKey}&units=metric`;
        await this.fetchWeatherData(url);
    }
    
    async getWeatherByCoords(lat, lon) {
        const url = `${this.apiUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
        await this.fetchWeatherData(url);
    }
    
    async fetchWeatherData(url) {
        try {
            this.showLoading();
            
            const response = await fetch(url);
            
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('City not found. Please check the spelling and try again.');
                } else if (response.status === 401) {
                    throw new Error('Invalid API key. Please check your API key.');
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            }
            
            const data = await response.json();
            this.displayWeatherData(data);
            
        } catch (error) {
            console.error('Error fetching weather data:', error);
            if (error.message.includes('fetch')) {
                this.showError('Network error. Please check your internet connection and try again.');
            } else {
                this.showError(error.message);
            }
        }
    }
    
    
    displayWeatherData(data) {
        // Update city name
        this.cityName.textContent = `${data.name}, ${data.sys.country}`;
        
        // Update temperature
        this.temp.textContent = Math.round(data.main.temp);
        
        // Update weather icon
        this.weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        this.weatherIcon.alt = data.weather[0].description;
        
        // Update description
        this.description.textContent = data.weather[0].description;
        
        // Update weather details
        this.feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
        this.humidity.textContent = `${data.main.humidity}%`;
        this.windSpeed.textContent = `${data.wind.speed} m/s`;
        this.pressure.textContent = `${data.main.pressure} hPa`;
        this.visibility.textContent = `${(data.visibility / 1000).toFixed(1)} km`;
        this.uvIndex.textContent = 'N/A'; // UV index requires separate API call
        
        this.showWeatherData();
    }
    
    showLoading() {
        this.hideAll();
        this.loading.classList.add('show-flex');
    }
    
    showError(message) {
        this.hideAll();
        document.getElementById('errorMessage').textContent = message;
        this.error.classList.add('show');
    }
    
    showWeatherData() {
        this.hideAll();
        this.weatherContainer.classList.add('show');
    }
    
    hideAll() {
        this.loading.classList.remove('show-flex');
        this.error.classList.remove('show');
        this.weatherContainer.classList.remove('show');
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize the weather app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WeatherApp();
});

// Weather App is ready to use with real API data
console.log(`
🌤️ Weather App Ready!

✅ Real API integration enabled
✅ Replace 'YOUR_ACTUAL_API_KEY_HERE' on line 6 with your OpenWeatherMap API key
✅ Get your free API key at: https://openweathermap.org/api

The app will fetch live weather data once you add your API key.
`);