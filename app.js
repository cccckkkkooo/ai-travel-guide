// API Configuration
const API_URL = 'https://ai-travel-guide-81885629240.europe-west1.run.app';
const API_ENDPOINTS = {
    generateItinerary: '/api/generate-itinerary',
    searchAttractions: '/api/search-attractions',
    searchRestaurants: '/api/search-restaurants',
    getDirections: '/api/get-directions',
    cityTips: '/api/city-tips',
    health: '/api/health'
};

// Travel data (backup - not used with backend)
const travelData = {
    Tokyo: {
        attractions: [
            {
                name: "Senso-ji Temple",
                category: "Sightseeing",
                description: "Historic Buddhist temple with vibrant orange lantern and traditional architecture. Famous for its busy shopping streets selling local snacks and souvenirs.",
                location: "Asakusa, Tokyo",
                duration: "2h",
                rating: 4.7,
                tips: "Arrive early to avoid crowds. Try local snacks in nearby streets. Best visited during morning hours.",
                transport: "Metro line",
                icon: "🏛️"
            },
            {
                name: "Ueno Park",
                category: "Park",
                description: "Large urban park with museums, zoo, and beautiful cherry blossoms in spring. A peaceful oasis in the city center.",
                location: "Ueno, Tokyo",
                duration: "3h",
                rating: 4.6,
                tips: "Rent a bike to explore. Perfect for picnics. Cherry blossom season (late March-early April) is stunning.",
                transport: "Walking or bike",
                icon: "🌳"
            },
            {
                name: "Shinjuku District",
                category: "Shopping/Nightlife",
                description: "Bustling commercial and entertainment district with neon signs, shopping malls, and vibrant nightlife. Heart of modern Tokyo.",
                location: "Shinjuku, Tokyo",
                duration: "2.5h",
                rating: 4.5,
                tips: "Visit at night for best atmosphere. Avoid during rush hours (7-9 AM, 5-7 PM).",
                transport: "Metro or walking",
                icon: "🛍️"
            },
            {
                name: "Tokyo Tower",
                category: "Sightseeing",
                description: "Iconic red tower offering panoramic views of Tokyo. Built in 1958 and stands 333 meters tall.",
                location: "Minato, Tokyo",
                duration: "1.5h",
                rating: 4.4,
                tips: "Buy tickets in advance. Sunset views are spectacular. Less crowded after 6 PM.",
                transport: "Metro",
                icon: "🏛️"
            },
            {
                name: "Harajuku Station",
                category: "Shopping/Culture",
                description: "Famous for youth culture, fashion boutiques, and quirky shops. Takeshita Street is the epicenter of Harajuku's fashion scene.",
                location: "Harajuku, Tokyo",
                duration: "2h",
                rating: 4.3,
                tips: "Go on weekends to experience the full energy. Avoid during lunch hours (12-1 PM).",
                transport: "Metro",
                icon: "🎭"
            }
        ],
        restaurants: [
            {
                name: "Sukiyabashi Jiro",
                cuisine: "Sushi",
                location: "Ginza, Tokyo",
                price: "$$$",
                rating: 4.8,
                specialties: "Omakase sushi experience with premium ingredients",
                tip: "Michelin-starred; reservation required months in advance"
            },
            {
                name: "Tsukiji Outer Market",
                cuisine: "Japanese/Seafood",
                location: "Tsukiji, Tokyo",
                price: "$",
                rating: 4.6,
                specialties: "Fresh sushi, ramen, street food",
                tip: "Best visited in early morning for freshest seafood"
            },
            {
                name: "Nabezo",
                cuisine: "Japanese Hot Pot",
                location: "Shinjuku, Tokyo",
                price: "$$",
                rating: 4.5,
                specialties: "Wagyu hot pot, vegetables, broths",
                tip: "Perfect for groups; interactive cooking experience at table"
            }
        ],
        tips: [
            "Use Suica/Pasmo card for easy public transport payment",
            "Peak tourist season is spring (cherry blossoms) and autumn (fall foliage)",
            "Learn basic Japanese phrases for better interactions with locals",
            "Public restrooms are clean; don't be shy to use them",
            "Tipping is not customary in Japan",
            "Earthquakes are common but buildings are earthquake-proof",
            "Respect temple rules and remove shoes where required",
            "Japanese cuisine is about seasonality; try seasonal dishes"
        ]
    },
    Paris: {
        attractions: [
            {
                name: "Eiffel Tower",
                category: "Sightseeing",
                description: "Iconic iron lattice tower and symbol of Paris. Offers stunning views from multiple levels with restaurants and shops.",
                location: "Champ de Mars, Paris",
                duration: "2h",
                rating: 4.8,
                tips: "Book tickets online to skip queues. Evening light show is magical. Sunset views are superb.",
                transport: "Metro or walking",
                icon: "🏛️"
            },
            {
                name: "Louvre Museum",
                category: "Museum",
                description: "World's largest art museum with over 38,000 artworks including the Mona Lisa and Venus de Milo.",
                location: "Rue de Rivoli, Paris",
                duration: "3-4h",
                rating: 4.7,
                tips: "Arrive early or book timed tickets. Wednesday and Friday evenings are less crowded.",
                transport: "Metro",
                icon: "🎨"
            },
            {
                name: "Notre-Dame Cathedral",
                category: "Sightseeing",
                description: "Medieval Catholic cathedral renowned for Gothic architecture. Currently under restoration but exterior viewing available.",
                location: "Île de la Cité, Paris",
                duration: "1.5h",
                rating: 4.6,
                tips: "Exterior viewing available. Walk around Île de la Cité for complete experience.",
                transport: "Metro",
                icon: "🏛️"
            },
            {
                name: "Latin Quarter",
                category: "Culture/Food",
                description: "Historic district with bookstores, cafes, and narrow streets. Home to Sorbonne University and Panthéon.",
                location: "Latin Quarter, Paris",
                duration: "2.5h",
                rating: 4.5,
                tips: "Explore on foot. Great for street food and local cafes. Avoid during peak lunch hours.",
                transport: "Walking",
                icon: "🎭"
            },
            {
                name: "Montmartre",
                category: "Culture/Nightlife",
                description: "Historic hilltop neighborhood with bohemian charm, Sacré-Cœur basilica, and artistic heritage. Perfect for sunset views.",
                location: "Montmartre, Paris",
                duration: "2.5h",
                rating: 4.6,
                tips: "Walk up early morning for fewer tourists. Street artists near Sacré-Cœur. Cabaret shows at night.",
                transport: "Metro and walking",
                icon: "🎭"
            }
        ],
        restaurants: [
            {
                name: "L'Astrance",
                cuisine: "French Fine Dining",
                location: "Passy, Paris",
                price: "$$$",
                rating: 4.8,
                specialties: "Contemporary French cuisine with artistic presentation",
                tip: "3 Michelin stars; reservation essential"
            },
            {
                name: "Café de Flore",
                cuisine: "French Cafe",
                location: "Saint-Germain-des-Prés, Paris",
                price: "$$",
                rating: 4.5,
                specialties: "Coffee, pastries, light meals",
                tip: "Historic cafe since 1887; prime people-watching spot"
            },
            {
                name: "Marché Bastille",
                cuisine: "French Market",
                location: "Bastille, Paris",
                price: "$",
                rating: 4.4,
                specialties: "Fresh produce, cheese, local specialties",
                tip: "Open Thursdays and Sundays; great for picnic supplies"
            }
        ],
        tips: [
            "French people appreciate when you attempt their language; always greet in French",
            "Dinner starts late, typically 8 PM or later",
            "Public restrooms often require coins (€0.50)",
            "Buy a metro pass for unlimited travel; it's more economical",
            "Avoid pickpockets in crowded areas and metro stations",
            "Prices are higher in tourist areas; explore local neighborhoods",
            "Museums are free for EU residents under 26",
            "Spring (April-May) and autumn (September-October) offer best weather"
        ]
    }
};

// Application state
let currentStep = 1;
let currentTheme = 'light';
let formData = {
    destination: '',
    checkIn: '',
    checkOut: '',
    interests: [],
    travelStyle: '',
    groupType: '',
    accessibility: []
};

// Initialize theme
function initTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    currentTheme = prefersDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-color-scheme', currentTheme);
    updateThemeButton();
}

// Toggle theme
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-color-scheme', currentTheme);
    updateThemeButton();
}

function updateThemeButton() {
    const button = document.getElementById('themeToggle');
    button.textContent = currentTheme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode';
}

// Navigation functions
function startPlanning() {
    document.getElementById('welcomeScreen').classList.add('hidden');
    document.getElementById('formContainer').classList.add('active');
}

function cancelPlanning() {
    document.getElementById('formContainer').classList.remove('active');
    document.getElementById('welcomeScreen').classList.remove('hidden');
    resetForm();
}

function nextStep(step) {
    // Validate current step
    if (currentStep === 1) {
        const destination = document.getElementById('destination').value.trim();
        if (!destination) {
            alert('Please enter a city name');
            return;
        }
        formData.destination = destination;
    }

    // Hide current step
    document.getElementById(`step${currentStep}`).classList.remove('active');
    
    // Show next step
    currentStep = step;
    document.getElementById(`step${currentStep}`).classList.add('active');
    
    // Update progress
    updateProgress();
}

function prevStep(step) {
    document.getElementById(`step${currentStep}`).classList.remove('active');
    currentStep = step;
    document.getElementById(`step${currentStep}`).classList.add('active');
    updateProgress();
}

function updateProgress() {
    const progress = (currentStep / 6) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
}

function resetForm() {
    currentStep = 1;
    formData = {
        destination: '',
        checkIn: '',
        checkOut: '',
        interests: [],
        travelStyle: '',
        groupType: '',
        accessibility: []
    };
    document.querySelectorAll('.form-step').forEach(step => step.classList.remove('active'));
    document.getElementById('step1').classList.add('active');
    updateProgress();
}

// Generate itinerary
async function generateItinerary() {
    // Collect form data
    formData.checkIn = document.getElementById('checkIn').value;
    formData.checkOut = document.getElementById('checkOut').value;
    
    formData.interests = Array.from(document.querySelectorAll('input[name="interests"]:checked'))
        .map(cb => cb.value);
    
    const travelStyleInput = document.querySelector('input[name="travelStyle"]:checked');
    formData.travelStyle = travelStyleInput ? travelStyleInput.value : 'cultural';
    
    const groupTypeInput = document.querySelector('input[name="groupType"]:checked');
    formData.groupType = groupTypeInput ? groupTypeInput.value : 'solo';
    
    formData.accessibility = Array.from(document.querySelectorAll('input[name="accessibility"]:checked'))
        .map(cb => cb.value);

    // Show loading
    showLoading('Fetching real data from Google Places API...');

    try {
        // Prepare request data
        const requestData = {
            city: formData.destination,
            start_date: formData.checkIn || null,
            end_date: formData.checkOut || null,
            interests: formData.interests,
            travel_style: formData.travelStyle,
            group_type: formData.groupType,
            accessibility_needs: formData.accessibility
        };

        console.log('Sending request to backend:', requestData);

        // Make API call
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.generateItinerary}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        hideLoading();

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        console.log('Received data from backend:', data);

        // Hide form, show results
        document.getElementById('formContainer').classList.remove('active');
        document.getElementById('resultsScreen').classList.add('active');

        // Render results with real data
        renderResultsFromBackend(data);

    } catch (error) {
        console.error('Error generating itinerary:', error);
        hideLoading();
        
        // Hide form, show results with error
        document.getElementById('formContainer').classList.remove('active');
        document.getElementById('resultsScreen').classList.add('active');
        
        let errorMessage = 'Cannot connect to Flask server. Make sure it\'s running on http://localhost:5000';
        if (error.message.includes('404')) {
            errorMessage = `Sorry, we couldn't find information about ${formData.destination}. Try another city.`;
        }
        
        showError(errorMessage);
    }
}

// Render results from backend data
function renderResultsFromBackend(data) {
    const destination = data.city || formData.destination;
    const tripDays = data.duration_days || data.itinerary.length;

    // Update header
    document.getElementById('resultsTitle').textContent = `Your ${destination} Adventure`;
    const dateRange = formData.checkIn && formData.checkOut 
        ? `${formatDate(formData.checkIn)} - ${formatDate(formData.checkOut)}`
        : `${tripDays} day trip`;
    document.getElementById('resultsSubtitle').textContent = dateRange;

    // Render itinerary from backend
    renderItineraryFromBackend(data.itinerary);
    
    // Render restaurants from backend
    renderRestaurantsFromBackend(data.itinerary);
    
    // Render tips from backend
    renderTipsFromBackend(data.tips || []);
}

function renderResults(tripDays) {
    const destination = formData.destination;
    const cityData = travelData[destination] || travelData.Tokyo;

    // Update header
    document.getElementById('resultsTitle').textContent = `Your ${destination} Adventure`;
    const dateRange = formData.checkIn && formData.checkOut 
        ? `${formatDate(formData.checkIn)} - ${formatDate(formData.checkOut)}`
        : `${tripDays} day trip`;
    document.getElementById('resultsSubtitle').textContent = dateRange;

    // Render itinerary
    renderItinerary(cityData, tripDays);
    
    // Render restaurants
    renderRestaurants(cityData);
    
    // Render tips
    renderTips(cityData);
}

function renderItinerary(cityData, tripDays) {
    const container = document.getElementById('itineraryView');
    const attractions = cityData.attractions;
    
    let html = '';
    const attractionsPerDay = Math.ceil(attractions.length / tripDays);

    for (let day = 1; day <= tripDays; day++) {
        const startIdx = (day - 1) * attractionsPerDay;
        const endIdx = Math.min(startIdx + attractionsPerDay, attractions.length);
        const dayAttractions = attractions.slice(startIdx, endIdx);

        const dateStr = formData.checkIn ? formatDate(addDays(formData.checkIn, day - 1)) : `Day ${day}`;

        html += `
            <div class="day-card">
                <div class="day-header" onclick="toggleDay(${day})">
                    <h3>${dateStr}</h3>
                    <span id="dayToggle${day}">▼</span>
                </div>
                <div class="day-content" id="dayContent${day}">
        `;

        dayAttractions.forEach((attraction, idx) => {
            html += `
                <div class="activity-card">
                    <div class="activity-header">
                        <div>
                            <div class="activity-title">${attraction.icon} ${attraction.name}</div>
                            <span class="activity-category">${attraction.category}</span>
                        </div>
                    </div>
                    <p class="activity-description">${attraction.description}</p>
                    <div class="activity-meta">
                        <div class="activity-meta-item">
                            📍 ${attraction.location}
                        </div>
                        <div class="activity-meta-item">
                            ⏱️ ${attraction.duration}
                        </div>
                        <div class="activity-meta-item">
                            <span class="rating">⭐ ${attraction.rating}</span>
                        </div>
                        <div class="activity-meta-item">
                            🚇 ${attraction.transport}
                        </div>
                    </div>
                    <div class="activity-tips">
                        💡 <strong>Tip:</strong> ${attraction.tips}
                    </div>
                </div>
            `;
        });

        html += `
                </div>
            </div>
        `;
    }

    container.innerHTML = html;
}

function renderRestaurants(cityData) {
    const container = document.getElementById('restaurantsView');
    const restaurants = cityData.restaurants;

    let html = '<h2 style="margin-bottom: 24px;">Recommended Restaurants</h2>';

    restaurants.forEach(restaurant => {
        html += `
            <div class="restaurant-card">
                <div class="restaurant-header">
                    <div>
                        <h3 class="restaurant-name">🍽️ ${restaurant.name}</h3>
                    </div>
                    <div class="price-indicator">${restaurant.price}</div>
                </div>
                <div class="restaurant-info">
                    <div>🍴 ${restaurant.cuisine}</div>
                    <div>📍 ${restaurant.location}</div>
                    <div class="rating">⭐ ${restaurant.rating}</div>
                </div>
                <div class="restaurant-specialties">
                    <strong>Must-try:</strong> ${restaurant.specialties}
                </div>
                <div class="restaurant-tip">
                    💡 ${restaurant.tip}
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

// Render itinerary from backend data
function renderItineraryFromBackend(itinerary) {
    const container = document.getElementById('itineraryView');
    
    if (!itinerary || itinerary.length === 0) {
        container.innerHTML = '<p>No itinerary data available.</p>';
        return;
    }

    let html = '';

    itinerary.forEach((day, dayIdx) => {
        const dayNum = day.day || (dayIdx + 1);
        const dateStr = day.date || `Day ${dayNum}`;

        html += `
            <div class="day-card">
                <div class="day-header" onclick="toggleDay(${dayNum})">
                    <h3>${dateStr}</h3>
                    <span id="dayToggle${dayNum}">▼</span>
                </div>
                <div class="day-content" id="dayContent${dayNum}">
        `;

        if (day.activities && day.activities.length > 0) {
            day.activities.forEach(activity => {
                html += renderActivityCard(activity);
            });
        }

        html += `
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

// Render single activity card with real data
function renderActivityCard(activity) {
    let html = '<div class="activity-card">';
    
    // Photos carousel
    if (activity.photos && activity.photos.length > 0) {
        html += `<div class="photo-carousel">`;
        html += `<img src="${activity.photos[0]}" alt="${activity.name}">`;
        if (activity.photos.length > 1) {
            html += `
                <div class="carousel-controls">
                    <button class="carousel-btn" onclick="prevPhoto(this)">‹</button>
                    <button class="carousel-btn" onclick="nextPhoto(this)">›</button>
                </div>
            `;
        }
        html += '</div>';
    }
    
    html += `
        <div class="activity-header">
            <div>
                <div class="activity-title">${activity.name}</div>
                ${activity.category ? `<span class="activity-category">${activity.category}</span>` : ''}
            </div>
        </div>
    `;
    
    if (activity.description) {
        html += `<p class="activity-description">${activity.description}</p>`;
    }
    
    // Meta information
    html += '<div class="activity-meta">';
    if (activity.address) {
        html += `<div class="activity-meta-item">📍 ${activity.address}</div>`;
    }
    if (activity.duration) {
        html += `<div class="activity-meta-item">⏱️ ${activity.duration}</div>`;
    }
    if (activity.rating) {
        html += `<div class="activity-meta-item"><span class="rating">⭐ ${activity.rating}</span></div>`;
    }
    html += '</div>';
    
    // Contact info
    if (activity.phone || activity.website) {
        html += '<div class="contact-info">';
        if (activity.phone) {
            html += `<a href="tel:${activity.phone}">📞 ${activity.phone}</a>`;
        }
        if (activity.website) {
            html += `<a href="${activity.website}" target="_blank">🌐 Website</a>`;
        }
        html += '</div>';
    }
    
    // Opening hours
    if (activity.opening_hours && activity.opening_hours.length > 0) {
        html += '<div class="opening-hours">';
        html += '<strong>⏰ Opening Hours:</strong>';
        html += '<ul class="hours-list">';
        activity.opening_hours.slice(0, 7).forEach(hours => {
            html += `<li>${hours}</li>`;
        });
        html += '</ul></div>';
    }
    
    // Reviews
    if (activity.reviews && activity.reviews.length > 0) {
        html += '<div class="reviews-section">';
        html += '<strong>💬 Reviews:</strong>';
        activity.reviews.slice(0, 3).forEach(review => {
            html += `
                <div class="review-item">
                    <div class="review-header">
                        <span class="review-author">${review.author || 'Anonymous'}</span>
                        <span class="review-rating">⭐ ${review.rating || 'N/A'}</span>
                    </div>
                    <p class="review-text">${review.text || review.review || ''}</p>
                </div>
            `;
        });
        html += '</div>';
    }
    
    html += '</div>';
    return html;
}

// Photo carousel navigation
function prevPhoto(btn) {
    const carousel = btn.closest('.photo-carousel');
    const img = carousel.querySelector('img');
    const activity = getCurrentActivityData(carousel);
    if (activity && activity.photos && activity.photos.length > 1) {
        let currentIdx = activity.photos.indexOf(img.src);
        currentIdx = (currentIdx - 1 + activity.photos.length) % activity.photos.length;
        img.src = activity.photos[currentIdx];
    }
}

function nextPhoto(btn) {
    const carousel = btn.closest('.photo-carousel');
    const img = carousel.querySelector('img');
    const activity = getCurrentActivityData(carousel);
    if (activity && activity.photos && activity.photos.length > 1) {
        let currentIdx = activity.photos.indexOf(img.src);
        currentIdx = (currentIdx + 1) % activity.photos.length;
        img.src = activity.photos[currentIdx];
    }
}

function getCurrentActivityData(element) {
    // This is a simplified version - in production you'd store this data better
    return null;
}

// Render restaurants from backend data
function renderRestaurantsFromBackend(itinerary) {
    const container = document.getElementById('restaurantsView');
    let allRestaurants = [];
    
    // Collect all restaurants from all days
    if (itinerary) {
        itinerary.forEach(day => {
            if (day.restaurants && day.restaurants.length > 0) {
                allRestaurants = allRestaurants.concat(day.restaurants);
            }
        });
    }
    
    if (allRestaurants.length === 0) {
        container.innerHTML = '<p>No restaurant recommendations available.</p>';
        return;
    }

    let html = '<h2 style="margin-bottom: 24px;">Recommended Restaurants</h2>';

    allRestaurants.forEach(restaurant => {
        html += `<div class="restaurant-card">`;
        
        // Photos
        if (restaurant.photos && restaurant.photos.length > 0) {
            html += `<div class="photo-carousel">`;
            html += `<img src="${restaurant.photos[0]}" alt="${restaurant.name}">`;
            html += '</div>';
        }
        
        html += `
            <div class="restaurant-header">
                <div>
                    <h3 class="restaurant-name">🍽️ ${restaurant.name}</h3>
                </div>
                ${restaurant.price_level ? `<div class="price-indicator">${'$'.repeat(restaurant.price_level)}</div>` : ''}
            </div>
            <div class="restaurant-info">
                ${restaurant.cuisine ? `<div>🍴 ${restaurant.cuisine}</div>` : ''}
                ${restaurant.address ? `<div>📍 ${restaurant.address}</div>` : ''}
                ${restaurant.rating ? `<div class="rating">⭐ ${restaurant.rating}</div>` : ''}
            </div>
        `;
        
        if (restaurant.description) {
            html += `<div class="restaurant-specialties"><strong>About:</strong> ${restaurant.description}</div>`;
        }
        
        // Contact info
        if (restaurant.phone || restaurant.website) {
            html += '<div class="contact-info">';
            if (restaurant.phone) {
                html += `<a href="tel:${restaurant.phone}">📞 ${restaurant.phone}</a>`;
            }
            if (restaurant.website) {
                html += `<a href="${restaurant.website}" target="_blank">🌐 Website</a>`;
            }
            html += '</div>';
        }
        
        // Opening hours
        if (restaurant.opening_hours && restaurant.opening_hours.length > 0) {
            html += '<div class="opening-hours">';
            html += '<strong>⏰ Opening Hours:</strong>';
            html += '<ul class="hours-list">';
            restaurant.opening_hours.slice(0, 7).forEach(hours => {
                html += `<li>${hours}</li>`;
            });
            html += '</ul></div>';
        }
        
        // Reviews
        if (restaurant.reviews && restaurant.reviews.length > 0) {
            html += '<div class="reviews-section">';
            html += '<strong>💬 Reviews:</strong>';
            restaurant.reviews.slice(0, 3).forEach(review => {
                html += `
                    <div class="review-item">
                        <div class="review-header">
                            <span class="review-author">${review.author || 'Anonymous'}</span>
                            <span class="review-rating">⭐ ${review.rating || 'N/A'}</span>
                        </div>
                        <p class="review-text">${review.text || review.review || ''}</p>
                    </div>
                `;
            });
            html += '</div>';
        }
        
        html += '</div>';
    });

    container.innerHTML = html;
}

// Render tips from backend data
function renderTipsFromBackend(tips) {
    const container = document.getElementById('tipsView');
    
    if (!tips || tips.length === 0) {
        container.innerHTML = '<p>No tips available.</p>';
        return;
    }

    let html = '<h2 style="margin-bottom: 24px;">Tips &amp; Local Insights</h2><div class="tips-grid">';

    const icons = ['💡', '🎯', '⚠️', '🌟', '📌', '🔔', '✨', '💰'];

    tips.forEach((tip, idx) => {
        const icon = icons[idx % icons.length];
        const tipText = typeof tip === 'string' ? tip : (tip.text || tip.tip || '');
        html += `
            <div class="tip-card">
                <div class="tip-icon">${icon}</div>
                <div class="tip-content">${tipText}</div>
            </div>
        `;
    });

    html += '</div>';
    container.innerHTML = html;
}

function renderTips(cityData) {
    const container = document.getElementById('tipsView');
    const tips = cityData.tips;

    let html = '<h2 style="margin-bottom: 24px;">Tips &amp; Local Insights</h2><div class="tips-grid">';

    const icons = ['💡', '🎯', '⚠️', '🌟', '📌', '🔔', '✨', '💰'];

    tips.forEach((tip, idx) => {
        const icon = icons[idx % icons.length];
        html += `
            <div class="tip-card">
                <div class="tip-icon">${icon}</div>
                <div class="tip-content">${tip}</div>
            </div>
        `;
    });

    html += '</div>';
    container.innerHTML = html;
}

// Toggle day content
function toggleDay(day) {
    const content = document.getElementById(`dayContent${day}`);
    const toggle = document.getElementById(`dayToggle${day}`);
    
    if (content.classList.contains('collapsed')) {
        content.classList.remove('collapsed');
        toggle.textContent = '▼';
    } else {
        content.classList.add('collapsed');
        toggle.textContent = '▶';
    }
}

// Switch tabs
function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');

    // Update content
    document.querySelectorAll('.view-content').forEach(view => view.classList.remove('active'));
    
    if (tabName === 'itinerary') {
        document.getElementById('itineraryView').classList.add('active');
    } else if (tabName === 'restaurants') {
        document.getElementById('restaurantsView').classList.add('active');
    } else if (tabName === 'tips') {
        document.getElementById('tipsView').classList.add('active');
    }
}

// Start over
function startOver() {
    document.getElementById('resultsScreen').classList.remove('active');
    document.getElementById('welcomeScreen').classList.remove('hidden');
    resetForm();
}

// Utility functions
function formatDate(dateStr) {
    const date = new Date(dateStr);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function addDays(dateStr, days) {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
}

// Add visual feedback for checkboxes and radios
document.addEventListener('change', function(e) {
    if (e.target.type === 'checkbox') {
        const parent = e.target.closest('.checkbox-item');
        if (parent) {
            if (e.target.checked) {
                parent.classList.add('selected');
            } else {
                parent.classList.remove('selected');
            }
        }
    }
    
    if (e.target.type === 'radio') {
        const parent = e.target.closest('.radio-grid');
        if (parent) {
            parent.querySelectorAll('.radio-item').forEach(item => item.classList.remove('selected'));
            e.target.closest('.radio-item').classList.add('selected');
        }
    }
});

// Check backend connection
async function checkBackendConnection() {
    try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.health}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            const statusEl = document.getElementById('connectionStatus');
            statusEl.textContent = '🟢 Connected';
            statusEl.style.borderColor = 'var(--color-success)';
            return true;
        }
    } catch (error) {
        console.error('Backend connection failed:', error);
        const statusEl = document.getElementById('connectionStatus');
        statusEl.textContent = '🔴 Disconnected';
        statusEl.style.borderColor = 'var(--color-error)';
        return false;
    }
    return false;
}

// Show loading screen
function showLoading(message = 'Fetching real data from Google Places API...') {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingText = document.getElementById('loadingText');
    loadingText.textContent = message;
    loadingScreen.classList.add('active');
}

// Hide loading screen
function hideLoading() {
    const loadingScreen = document.getElementById('loadingScreen');
    loadingScreen.classList.remove('active');
}

// Show error message
function showError(message, container = 'resultsScreen') {
    const errorHTML = `
        <div class="error-message">
            <h3>⚠️ Error</h3>
            <p>${message}</p>
            <button class="btn-primary" onclick="retryGenerate()">Retry</button>
            <button class="btn-secondary" onclick="startOver()">Start Over</button>
        </div>
    `;
    
    if (container === 'resultsScreen') {
        document.getElementById('itineraryView').innerHTML = errorHTML;
    }
}

// Retry generation
function retryGenerate() {
    generateItinerary();
}

// Initialize on load
initTheme();
checkBackendConnection();

// Check connection every 30 seconds
setInterval(checkBackendConnection, 30000);
