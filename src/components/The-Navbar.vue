<template>
  <!-- Mobile Bottom Navbar -->
  <div
    class="md:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-t from-blue-800 to-blue-500 shadow-lg border-t border-blue-200 z-50"
  >
    <div class="flex justify-around items-center h-16">
      <!-- Form Button -->
      <button
        @click="$router.push('/')"
        :class="{
          'text-blue-900': $route.path === '/',
          'text-blue-700': $route.path !== '/',
        }"
        class="flex flex-col items-center justify-center hover:text-blue-900 transition-colors"
      >
        <div
          :class="{
            'bg-blue-300': $route.path === '/',  
            'bg-blue-100': $route.path !== '/',
          }"
          class="p-2 rounded-full hover:bg-blue-200 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <span class="text-xs text-white mt-1 font-medium">Form</span>
      </button>

      <!-- Records Button -->
      <button
        @click="$router.push('/Records')"
        :class="{
          'text-blue-900': $route.path === '/Records',
          'text-blue-700': $route.path !== '/Records',
        }"
        class="flex flex-col items-center justify-center hover:text-blue-900 transition-colors"
      >
        <div
          :class="{
            'bg-blue-300': $route.path === '/Records',
            'bg-blue-100': $route.path !== '/Records',
          }"
          class="p-2 rounded-full hover:bg-blue-200 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
            />
          </svg>
        </div>
        <span class="text-xs text-white mt-1 font-medium">Records</span>
      </button>

      <!-- Map Button -->
      <button
        @click="$router.push('/Map')"
        :class="{
          'text-blue-900': $route.path === '/Map',
          'text-blue-700': $route.path !== '/Map',
        }"
        class="flex flex-col items-center justify-center hover:text-blue-900 transition-colors"
      >
        <div
          :class="{
            'bg-blue-300': $route.path === '/Map',
            'bg-blue-100': $route.path !== '/Map',
          }"
          class="p-2 rounded-full hover:bg-blue-200 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <span class="text-xs text-white mt-1 font-medium">Map</span>
      </button>
    </div>
  </div>

  <!-- Desktop Sidebar -->
  <div
    class="hidden md:flex fixed left-0 top-0 bottom-0 w-16 bg-gradient-to-b from-blue-600 to-blue-800 shadow-lg z-50"
  >
    <div class="flex flex-col items-center py-4 space-y-8">
      <!-- Form Button -->
      <button
        @click="$router.push('/')"
        :class="{
          'text-white bg-blue-500': $route.path === '/',
          'text-blue-100': $route.path !== '/',
        }"
        class="group flex flex-col items-center justify-center hover:text-white transition-colors p-2 rounded-lg"
        title="Form"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      </button>

      <!-- Records Button -->
      <button
        @click="$router.push('/Records')"
        :class="{
          'text-white bg-blue-500': $route.path === '/Records',
          'text-blue-100': $route.path !== '/Records',
        }"
        class="group flex flex-col items-center justify-center hover:text-white transition-colors p-2 rounded-lg"
        title="Records"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
          />
        </svg>
      </button>

      <!-- Map Button -->
      <button
        @click="$router.push('/Map')"
        :class="{
          'text-white bg-blue-500': $route.path === '/Map',
          'text-blue-100': $route.path !== '/Map',
        }"
        class="group flex flex-col items-center justify-center hover:text-white transition-colors p-2 rounded-lg"
        title="Map"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheNavbar',
}
</script>

<style>
/* Smooth transitions for navbar elements */
button {
  transition: all 0.2s ease-in-out;
}
</style>