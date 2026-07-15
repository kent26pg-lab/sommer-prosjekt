import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './style.css';

var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    zoomLevel: 13,
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('A pretty CSS popup.<br> Easily customizable.')
    .openPopup();

const apiKey = import.meta.env.VITE_GEOAPIFY_API_KEY;

async function searchLocation(query) {
  const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(query)}&apiKey=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.features.length === 0) {
    alert('Fant ikke stedet');
    return;
  }

  const location = data.features[0];
  const [lon, lat] = location.geometry.coordinates;

  map.setView([lat, lon], 13);
}

const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');

searchButton.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) {
    searchLocation(query);
  }
}); 