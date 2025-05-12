vue
<template>
  <div class="w-full h-screen relative">
    <div id="map" class="absolute inset-0 z-0"></div>

    <!-- Icon Button -->
    <button
      @click="findMyLocation"
      class="absolute top-4 right-4 z-10 bg-white text-gray-800 p-2 rounded-full shadow hover:bg-gray-100 transition"
      aria-label="Find My Location"
    >
      <MapPinIcon class="w-6 h-6" />
    </button>
  </div>
  <!-- <the-navbar></the-navbar> -->
</template>

<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import { MapPinIcon } from "@heroicons/vue/24/outline";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

let map = null;
let marker = null;
let watchId = null;

const initMap = (lat, lng) => {
  map = L.map("map").setView([lat, lng], 16);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  marker = L.marker([lat, lng])
    .addTo(map)
    .bindPopup("You are here")
    .openPopup();
};

const findMyLocation = () => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      if (marker) {
        marker.setLatLng([lat, lng]);
      } else {
        marker = L.marker([lat, lng]).addTo(map);
      }

      map.setView([lat, lng], 16);
      marker.bindPopup("You are here").openPopup();
    },
    (err) => {
      console.error("Geolocation error:", err);
      alert("Unable to retrieve your location.");
    },
    {
      enableHighAccuracy: true,
      maximumAge: 0,
    }
  );
};

onMounted(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        initMap(position.coords.latitude, position.coords.longitude);
        setTimeout(() => map.invalidateSize(), 100);
      },
      (err) => {
        console.error("Failed to get location:", err);
        alert("Could not get your location. Loading default position.");
        initMap(10.0, -61.0);
        setTimeout(() => map.invalidateSize(), 100);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
      }
    );
  } else {
    alert("Geolocation not supported.");
    initMap(10.0, -61.0);
  }
});

onBeforeUnmount(() => {
  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId);
  }
});
</script>
