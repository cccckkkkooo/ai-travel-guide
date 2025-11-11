import os
import sys
from dotenv import load_dotenv

# Загружаем .env файл ПЕРВЫМ ДЕЛОМ
print("📂 Загружаю конфигурацию из .env...")
load_dotenv()

# Проверяем, что API ключ существует
GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')

if not GOOGLE_API_KEY:
    print("\n" + "="*60)
    print("❌ ОШИБКА: GOOGLE_API_KEY не найден!")
    print("="*60)
    print("\n📝 Пожалуйста, создайте файл .env в корневой папке проекта")
    print("   Путь: " + os.path.abspath('.env'))
    print("\n📝 Содержимое файла .env должно быть:")
    print("   GOOGLE_API_KEY=ваш_api_ключ_здесь")
    print("\n🔑 Как получить ключ:")
    print("   1. Перейдите на: https://console.cloud.google.com/")
    print("   2. Создайте новый проект")
    print("   3. Включите APIs: Places, Maps, Geocoding, Directions")
    print("   4. Создайте ключ в 'APIs & Services' → 'Credentials'")
    print("   5. Включите Billing!")
    print("   6. Скопируйте ключ в .env файл")
    print("\n" + "="*60 + "\n")
    sys.exit(1)

print("✅ GOOGLE_API_KEY загружен успешно!\n")

# Теперь импортируем остальное
from flask import Flask, request, jsonify
from flask_cors import CORS
import googlemaps
import logging
import requests
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Initialize Google Maps client
try:
    gmaps = googlemaps.Client(key=GOOGLE_API_KEY)
    print("✅ Google Maps клиент инициализирован\n")
except Exception as e:
    print(f"❌ Ошибка при инициализации Google Maps: {str(e)}")
    sys.exit(1)

# Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ==================== HELPER FUNCTIONS ====================

def get_place_details(place_id):
    """Get detailed place information using Places API"""
    try:
        url = "https://maps.googleapis.com/maps/api/place/details/json"
        params = {
            'place_id': place_id,
            'key': GOOGLE_API_KEY,
            'fields': 'name,rating,reviews,formatted_address,opening_hours,formatted_phone_number,website,photos,types,price_level,user_ratings_total,geometry'
        }
        
        response = requests.get(url, params=params)
        result = response.json()
        
        if result['status'] == 'OK':
            place = result['result']
            
            # Process photos
            photos = []
            if 'photos' in place:
                for photo in place['photos'][:3]:
                    photo_ref = photo.get('photo_reference')
                    if photo_ref:
                        photo_url = f"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference={photo_ref}&key={GOOGLE_API_KEY}"
                        photos.append(photo_url)
            
            # Process reviews
            reviews = []
            if 'reviews' in place:
                for review in place['reviews'][:5]:
                    reviews.append({
                        'author': review.get('author_name', 'Anonymous'),
                        'rating': review.get('rating', 0),
                        'text': review.get('text', ''),
                        'time': review.get('relative_time_description', '')
                    })
            
            # Opening hours
            opening_hours = []
            if 'opening_hours' in place and 'weekday_text' in place['opening_hours']:
                opening_hours = place['opening_hours']['weekday_text']
            
            return {
                'name': place.get('name', ''),
                'rating': place.get('rating', 'N/A'),
                'user_ratings_total': place.get('user_ratings_total', 0),
                'formatted_address': place.get('formatted_address', ''),
                'phone': place.get('formatted_phone_number', 'N/A'),
                'website': place.get('website', 'N/A'),
                'opening_hours': opening_hours,
                'price_level': place.get('price_level', 'N/A'),
                'photos': photos,
                'reviews': reviews,
                'types': place.get('types', []),
                'location': {
                    'lat': place.get('geometry', {}).get('location', {}).get('lat'),
                    'lng': place.get('geometry', {}).get('location', {}).get('lng')
                }
            }
        
        logger.warning(f"Place details failed: {result.get('status')}")
        return None
        
    except Exception as e:
        logger.error(f"Error in get_place_details: {str(e)}")
        return None

def text_search_places(query, location=None):
    """Search places using text query"""
    try:
        url = "https://maps.googleapis.com/maps/api/place/textsearch/json"
        params = {
            'query': query,
            'key': GOOGLE_API_KEY
        }
        
        if location:
            params['location'] = location
            params['radius'] = 10000
        
        response = requests.get(url, params=params)
        result = response.json()
        
        places = []
        if result['status'] == 'OK':
            for place in result.get('results', [])[:15]:
                places.append({
                    'place_id': place.get('place_id'),
                    'name': place.get('name'),
                    'rating': place.get('rating', 'N/A'),
                    'formatted_address': place.get('formatted_address', ''),
                    'types': place.get('types', []),
                    'location': {
                        'lat': place.get('geometry', {}).get('location', {}).get('lat'),
                        'lng': place.get('geometry', {}).get('location', {}).get('lng')
                    }
                })
        
        return places
        
    except Exception as e:
        logger.error(f"Error in text_search_places: {str(e)}")
        return []

def geocode_address(address):
    """Convert address to coordinates"""
    try:
        result = gmaps.geocode(address)
        if result:
            location = result[0]['geometry']['location']
            return {
                'lat': location['lat'],
                'lng': location['lng'],
                'formatted_address': result[0]['formatted_address']
            }
        return None
    except Exception as e:
        logger.error(f"Error in geocode: {str(e)}")
        return None

def get_directions_info(origin, destination, mode='transit'):
    """Get directions between two places"""
    try:
        result = gmaps.directions(origin, destination, mode=mode)
        
        if result:
            route = result[0]
            leg = route['legs'][0]
            
            return {
                'distance': leg.get('distance', {}).get('text', ''),
                'duration': leg.get('duration', {}).get('text', ''),
                'duration_seconds': leg.get('duration', {}).get('value', 0),
                'start_address': leg.get('start_address', ''),
                'end_address': leg.get('end_address', '')
            }
        
        return None
        
    except Exception as e:
        logger.error(f"Error in get_directions: {str(e)}")
        return None

# ==================== API ENDPOINTS ====================

@app.route('/', methods=['GET'])
def index():
    """Root endpoint - Welcome message"""
    return jsonify({
        'status': 'success',
        'message': '🌍 AI Travel Guide API - Добро пожаловать!',
        'version': '1.0.0',
        'available_endpoints': {
            'health_check': '/api/health',
            'search_attractions': '/api/search-attractions',
            'search_restaurants': '/api/search-restaurants',
            'get_directions': '/api/get-directions',
            'generate_itinerary': '/api/generate-itinerary',
            'city_tips': '/api/city-tips',
            'geocode': '/api/geocode'
        }
    }), 200

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'ok',
        'message': 'AI Travel Guide server is running ✅',
        'api_configured': True,
        'timestamp': datetime.now().isoformat()
    }), 200

@app.route('/api/geocode', methods=['POST'])
def geocode_endpoint():
    """Convert city/address to coordinates"""
    try:
        data = request.json
        address = data.get('address')
        
        if not address:
            return jsonify({'error': 'Address is required'}), 400
        
        result = geocode_address(address)
        
        if result:
            return jsonify(result), 200
        else:
            return jsonify({'error': 'Could not geocode address'}), 404
            
    except Exception as e:
        logger.error(f"Geocode endpoint error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/search-attractions', methods=['POST'])
def search_attractions():
    """Search for tourist attractions"""
    try:
        data = request.json
        city = data.get('city')
        interests = data.get('interests', [])
        
        if not city:
            return jsonify({'error': 'City is required'}), 400
        
        # Geocode city
        geocode_result = geocode_address(city)
        if not geocode_result:
            return jsonify({'error': f'Could not find city: {city}'}), 404
        
        location = f"{geocode_result['lat']},{geocode_result['lng']}"
        
        # Search for attractions
        attractions = []
        search_queries = [
            f'tourist attractions in {city}',
            f'museums in {city}',
            f'historical sites in {city}',
            f'landmarks in {city}',
        ]
        
        seen_place_ids = set()
        
        for query in search_queries[:3]:
            places = text_search_places(query, location)
            
            for place in places:
                place_id = place['place_id']
                
                if place_id in seen_place_ids:
                    continue
                
                seen_place_ids.add(place_id)
                
                # Get detailed info
                details = get_place_details(place_id)
                
                if details:
                    attractions.append({
                        'place_id': place_id,
                        'name': details['name'],
                        'category': 'Sightseeing',
                        'description': f"Popular attraction with {details['user_ratings_total']} reviews",
                        'location': details['formatted_address'],
                        'address': details['formatted_address'],
                        'rating': details['rating'],
                        'phone': details['phone'],
                        'website': details['website'],
                        'opening_hours': details['opening_hours'],
                        'photos': details['photos'],
                        'reviews': details['reviews'],
                        'duration': '2h',
                        'lat': details['location']['lat'],
                        'lng': details['location']['lng']
                    })
                
                if len(attractions) >= 12:
                    break
            
            if len(attractions) >= 12:
                break
        
        logger.info(f"Found {len(attractions)} attractions for {city}")
        return jsonify({'attractions': attractions}), 200
        
    except Exception as e:
        logger.error(f"Search attractions error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/search-restaurants', methods=['POST'])
def search_restaurants():
    """Search for restaurants"""
    try:
        data = request.json
        city = data.get('city')
        cuisine = data.get('cuisine', 'restaurants')
        
        if not city:
            return jsonify({'error': 'City is required'}), 400
        
        # Geocode city
        geocode_result = geocode_address(city)
        if not geocode_result:
            return jsonify({'error': f'Could not find city: {city}'}), 404
        
        location = f"{geocode_result['lat']},{geocode_result['lng']}"
        
        # Search restaurants
        search_queries = [
            f'best restaurants in {city}',
            f'{cuisine} restaurants in {city}',
            f'top rated restaurants in {city}'
        ]
        
        restaurants = []
        seen_place_ids = set()
        
        for query in search_queries[:2]:
            places = text_search_places(query, location)
            
            for place in places:
                place_id = place['place_id']
                
                if place_id in seen_place_ids:
                    continue
                
                seen_place_ids.add(place_id)
                
                # Get details
                details = get_place_details(place_id)
                
                if details:
                    # Map price level
                    price_map = {1: '$', 2: '$$', 3: '$$$', 4: '$$$$'}
                    price = price_map.get(details['price_level'], 'N/A') if isinstance(details['price_level'], int) else 'N/A'
                    
                    restaurants.append({
                        'place_id': place_id,
                        'name': details['name'],
                        'cuisine': cuisine.capitalize(),
                        'location': details['formatted_address'],
                        'address': details['formatted_address'],
                        'price': price,
                        'rating': details['rating'],
                        'phone': details['phone'],
                        'website': details['website'],
                        'opening_hours': details['opening_hours'],
                        'photos': details['photos'],
                        'reviews': details['reviews'],
                        'lat': details['location']['lat'],
                        'lng': details['location']['lng']
                    })
                
                if len(restaurants) >= 8:
                    break
            
            if len(restaurants) >= 8:
                break
        
        logger.info(f"Found {len(restaurants)} restaurants for {city}")
        return jsonify({'restaurants': restaurants}), 200
        
    except Exception as e:
        logger.error(f"Search restaurants error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/get-directions', methods=['POST'])
def get_directions():
    """Get directions between two locations"""
    try:
        data = request.json
        origin = data.get('origin')
        destination = data.get('destination')
        mode = data.get('mode', 'transit')
        
        if not origin or not destination:
            return jsonify({'error': 'Origin and destination required'}), 400
        
        directions = get_directions_info(origin, destination, mode)
        
        if directions:
            return jsonify(directions), 200
        else:
            return jsonify({'error': 'Could not get directions'}), 404
            
    except Exception as e:
        logger.error(f"Directions error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/generate-itinerary', methods=['POST'])
def generate_itinerary():
    """Generate full travel itinerary"""
    try:
        data = request.json
        city = data.get('city')
        start_date = data.get('start_date')
        end_date = data.get('end_date')
        interests = data.get('interests', [])
        travel_style = data.get('travel_style', 'balanced')
        
        if not city:
            return jsonify({'error': 'City is required'}), 400
        
        logger.info(f"Generating itinerary for {city}")
        
        # Get attractions
        attractions_response = search_attractions()
        attractions_data = attractions_response[0].get_json() if isinstance(attractions_response, tuple) else attractions_response.get_json()
        
        if 'error' in attractions_data:
            return jsonify(attractions_data), 404
        
        attractions = attractions_data.get('attractions', [])
        
        # Get restaurants
        restaurants_response = search_restaurants()
        restaurants_data = restaurants_response[0].get_json() if isinstance(restaurants_response, tuple) else restaurants_response.get_json()
        restaurants = restaurants_data.get('restaurants', [])
        
        # Calculate trip duration
        if start_date and end_date:
            start = datetime.strptime(start_date, '%Y-%m-%d')
            end = datetime.strptime(end_date, '%Y-%m-%d')
            duration = (end - start).days + 1
        else:
            duration = 3
        
        # Distribute activities across days
        activities_per_day = max(3, len(attractions) // duration) if duration > 0 else 3
        restaurants_per_day = max(2, len(restaurants) // duration) if duration > 0 else 2
        
        itinerary = []
        
        for day in range(1, duration + 1):
            day_start = (day - 1) * activities_per_day
            day_end = min(day * activities_per_day, len(attractions))
            
            rest_start = (day - 1) * restaurants_per_day
            rest_end = min(day * restaurants_per_day, len(restaurants))
            
            day_activities = attractions[day_start:day_end]
            day_restaurants = restaurants[rest_start:rest_end]
            
            itinerary.append({
                'day': day,
                'date': start_date if start_date else f'Day {day}',
                'activities': day_activities,
                'restaurants': day_restaurants
            })
        
        result = {
            'city': city,
            'duration_days': duration,
            'total_attractions': len(attractions),
            'total_restaurants': len(restaurants),
            'itinerary': itinerary
        }
        
        logger.info(f"Generated itinerary: {duration} days, {len(attractions)} attractions")
        return jsonify(result), 200
        
    except Exception as e:
        logger.error(f"Generate itinerary error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/city-tips', methods=['POST'])
def city_tips():
    """Get travel tips for a city"""
    try:
        data = request.json
        city = data.get('city')
        
        if not city:
            return jsonify({'error': 'City is required'}), 400
        
        tips = {
            'city': city,
            'safety_advice': [
                'Keep valuables secure in crowded areas',
                'Use official transportation services',
                'Stay aware of your surroundings',
                'Keep emergency contacts handy'
            ],
            'cultural_etiquette': [
                'Respect local customs and traditions',
                'Learn basic phrases in local language',
                'Dress appropriately for religious sites',
                'Ask permission before photographing people'
            ],
            'local_insights': [
                'Visit popular attractions early morning',
                'Try local street food for authentic experience',
                'Use public transport when possible',
                'Download offline maps before traveling'
            ],
            'seasonal_info': [
                'Spring and autumn offer pleasant weather',
                'Summer can be crowded with tourists',
                'Winter may have limited hours at attractions',
                'Check for local festivals and events'
            ]
        }
        
        return jsonify(tips), 200
        
    except Exception as e:
        logger.error(f"City tips error: {str(e)}")
        return jsonify({'error': str(e)}), 500

# ==================== ERROR HANDLERS ====================

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found', 'status': 404}), 404

@app.errorhandler(500)
def server_error(error):
    return jsonify({'error': 'Internal server error', 'status': 500}), 500

# ==================== MAIN ====================

if __name__ == '__main__':
    import os
    port = int(os.getenv('PORT', 8080))
    app.run(debug=False, host='0.0.0.0', port=port)
