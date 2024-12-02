document.addEventListener("DOMContentLoaded", () => {
    const apiKey = 'a1d8907755d9924c819d1f7bf6207704'; // OpenWeatherMap API Key
    const weatherContainer = document.getElementById('weather');
    const yearSpan = document.getElementById('year');
    const lastModifiedSpan = document.getElementById('lastModified');
    const spotlightContainer = document.getElementById('spotlights');
    const currentEventSpan = document.getElementById('currentEvent');

    
    // Array of Current Events
    const currentEvents = [
        "Accra Business Expo - December 20th",
        "Annual Dinner Gala - January 15th",
        "Workshop: Digital Marketing in 2024 - February 5th"
    ];

    // Function to display the first event in the footer
    function displayCurrentEvent() {
        currentEventSpan.textContent = currentEvents[0]; // Display the first event
    }


    // Fetch Weather Data
    async function fetchWeather() {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=Accra,Ghana&units=metric&appid=${apiKey}`;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Weather API response error");
            const data = await response.json();
            displayWeather(data);
        } catch (error) {
            weatherContainer.innerHTML = '<p>Error fetching weather data. Please try again later.</p>';
            console.error(error);
        }
    }

    // weather display
    function displayWeather(data) {
        const today = data.list[0];
        const forecast = data.list.slice(1, 4); // Get next 3 forecasts
    
        weatherContainer.innerHTML = `
            <p><strong>Current Temperature:</strong> ${Math.round(today.main.temp)}°C</p>
            <p><strong>Condition:</strong> ${capitalizeWords(today.weather[0].description)}</p>
            <h3>3-Day Forecast</h3>
            <ul>
                ${forecast
                    .map(day => `
                        <li>${Math.round(day.main.temp)}°C - ${capitalizeWords(day.weather[0].description)}</li>
                    `)
                    .join('')}
            </ul>
        `;
    }
    

    // Fetch Spotlight Data
    async function fetchSpotlights() {
        const members = [
            { name: "Gold Member ", logo: "images/margins.png", phone: "+233 555-987-6543", address: "5th Floor, The Octagon, Accra - Ghana.", website: "https://marginsgroup.com", level: "Gold" },
            { name: "Silver Member ", logo: "images/petra.png", phone: "+233(0)242435037", address: "Nexus Office 113 Airport West Dzorwulu, Accra - Ghana", website: "https://petraonline.com/", level: "Silver" },
            { name: "Gold Member 2", logo: "images/member3.jpg", phone: "123-789-4560", address: "789 Oak St, Accra", website: "https://member3.com", level: "Gold" },
            { name: "Bronze Member 1", logo: "images/member4.jpg", phone: "456-123-7890", address: "101 Pine St, Accra", website: "https://member4.com", level: "Bronze" },
        ];

        const eligibleMembers = members.filter(member => member.level === "Gold" || member.level === "Silver");
        const randomMembers = eligibleMembers.sort(() => 0.5 - Math.random()).slice(0, 2);

        spotlightContainer.innerHTML = randomMembers
            .map(member => `
                <div class="spotlight-card">
                    <img src="${member.logo}" alt="${member.name}">
                    <h3>${member.name}</h3>
                    <p><strong>Phone:</strong> ${member.phone}</p>
                    <p><strong>Address:</strong> ${member.address}</p>
                    <a href="${member.website}" target="_blank">Visit Website</a>
                    <p><strong>Membership Level:</strong> ${member.level}</p>
                </div>
            `)
            .join('');
    }

    // Capitalize Words in a String
    function capitalizeWords(str) {
        return str.replace(/\b\w/g, char => char.toUpperCase());
    }

    // Update Year and Last Modified
    yearSpan.textContent = new Date().getFullYear();
    lastModifiedSpan.textContent = document.lastModified;

    // Initialize Fetch Calls
    fetchWeather();
    fetchSpotlights();

    displayCurrentEvent(); // Display the current event
});

document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    // Toggle navigation links
    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });

    // Footer Updates
    const yearSpan = document.getElementById("year");
    const lastModifiedSpan = document.getElementById("lastModified");
    yearSpan.textContent = new Date().getFullYear();
    lastModifiedSpan.textContent = document.lastModified;
});

document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    // Toggle navigation links
    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });
});
