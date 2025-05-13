<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4 sm:px-6 lg:px-8">
    <!-- Form container -->
    <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100 pb-2 mb-10">
      <!-- Form header with accent bar -->
      <div class="bg-gradient-to-r from-blue-600 to-blue-800 py-4 px-6">
        <div class="flex items-center space-x-3">
          <svg class="w-8 h-8 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <div>
            <h2 class="text-2xl font-bold text-white">Project Information</h2>
            <p class="text-blue-100 flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              View-only mode
            </p>
          </div>
        </div>
      </div>

      <!-- Form content -->
      <div class="p-6 space-y-6">
        <!-- Section 1: Basic Information -->
        <div class="bg-blue-50 rounded-lg border border-blue-100 overflow-hidden">
          <button
            @click="toggleSection('section1')"
            type="button"
            class="w-full flex justify-between items-center p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium hover:from-blue-600 hover:to-blue-700 transition-colors"
          >
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-3 text-blue-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
              <span class="text-lg">Basic Information</span>
            </div>
            <svg
              class="w-5 h-5 transform transition-transform text-blue-200"
              :class="{ 'rotate-180': sections.section1.expanded }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>

          <div v-if="sections.section1.expanded" class="p-4 space-y-6 animate-fade-in">
            <!-- Date and Time -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="font-medium text-gray-700 mb-2 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  Date
                </label>
                <div class="w-full border border-gray-200 bg-gray-50 rounded-lg p-3 text-gray-700">
                  {{ formData.section1.date || 'Not provided' }}
                </div>
              </div>
              <div>
                <label class="font-medium text-gray-700 mb-2 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Time
                </label>
                <div class="w-full border border-gray-200 bg-gray-50 rounded-lg p-3 text-gray-700">
                  {{ formData.section1.time || 'Not provided' }}
                </div>
              </div>
            </div>

            <!-- GPS Coordinates -->
            <div>
              <label class="font-medium text-gray-700 mb-2 flex items-center">
                <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                Site Location (GPS Coordinates)
              </label>
              <div class="space-y-4">
                <div class="flex space-x-4">
                  <!-- Latitude -->
                  <div class="w-full">
                    <label class="text-sm font-medium text-gray-600 mb-1 flex items-center">
                      <svg class="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                      Latitude
                    </label>
                    <div class="w-full border border-gray-200 bg-gray-50 rounded-lg p-3 text-gray-700">
                      {{ formData.section1.siteLocation.latitude || 'Not available' }}
                    </div>
                  </div>

                  <!-- Longitude -->
                  <div class="w-full">
                    <label class="text-sm font-medium text-gray-600 mb-1 flex items-center">
                      <svg class="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                      Longitude
                    </label>
                    <div class="w-full border border-gray-200 bg-gray-50 rounded-lg p-3 text-gray-700">
                      {{ formData.section1.siteLocation.longitude || 'Not available' }}
                    </div>
                  </div>
                </div>
                <!-- Map component container -->
                <div class="bg-gray-100 rounded-lg p-2 border border-gray-200 relative">
                  <the-map
                    :lat="formData.section1.siteLocation.latitude"
                    :lng="formData.section1.siteLocation.longitude"
                    :interactive="false"
                  ></the-map>
                  <div class="absolute bottom-3 right-3 bg-white p-2 rounded-full shadow-md">
                    <svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <!-- Project Team Lead and Project Head -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="font-medium text-gray-700 mb-2 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                  Project Team Lead
                </label>
                <div class="w-full border border-gray-200 bg-gray-50 rounded-lg p-3 text-gray-700">
                  {{ formData.section1.projectTeamLead || 'Not provided' }}
                </div>
              </div>
              <div>
                <label class="font-medium text-gray-700 mb-2 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Project Head
                </label>
                <div class="w-full border border-gray-200 bg-gray-50 rounded-lg p-3 text-gray-700">
                  {{ formData.section1.projectHead || 'Not provided' }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 2: Project Dates -->
        <div class="bg-blue-50 rounded-lg border border-blue-100 overflow-hidden">
          <button
            @click="toggleSection('section2')"
            type="button"
            class="w-full flex justify-between items-center p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium hover:from-blue-600 hover:to-blue-700 transition-colors"
          >
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-3 text-blue-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span class="text-lg">Project Timeline</span>
            </div>
            <svg
              class="w-5 h-5 transform transition-transform text-blue-200"
              :class="{ 'rotate-180': sections.section2.expanded }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>

          <div v-if="sections.section2.expanded" class="p-4 space-y-6 animate-fade-in">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="font-medium text-gray-700 mb-2 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  Start Date
                </label>
                <div class="w-full border border-gray-200 bg-gray-50 rounded-lg p-3 text-gray-700">
                  {{ formData.section2.startDate || 'Not provided' }}
                </div>
              </div>
              <div>
                <label class="font-medium text-gray-700 mb-2 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  End Date
                </label>
                <div class="w-full border border-gray-200 bg-gray-50 rounded-lg p-3 text-gray-700">
                  {{ formData.section2.endDate || 'Not provided' }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 3: Project Details -->
        <div class="bg-blue-50 rounded-lg border border-blue-100 overflow-hidden">
          <button
            @click="toggleSection('section3')"
            type="button"
            class="w-full flex justify-between items-center p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium hover:from-blue-600 hover:to-blue-700 transition-colors"
          >
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-3 text-blue-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
              <span class="text-lg">Project Details</span>
            </div>
            <svg
              class="w-5 h-5 transform transition-transform text-blue-200"
              :class="{ 'rotate-180': sections.section3.expanded }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>

          <div v-if="sections.section3.expanded" class="p-4 space-y-6 animate-fade-in">
            <!-- Project Name and Code -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="font-medium text-gray-700 mb-2 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                  </svg>
                  Project Name
                </label>
                <div class="w-full border border-gray-200 bg-gray-50 rounded-lg p-3 text-gray-700">
                  {{ formData.section3.projectName || 'Not provided' }}
                </div>
              </div>
              <div>
                <label class="font-medium text-gray-700 mb-2 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                  </svg>
                  Project Code
                </label>
                <div class="w-full border border-gray-200 bg-gray-50 rounded-lg p-3 text-gray-700">
                  {{ formData.section3.projectCode || 'Not provided' }}
                </div>
              </div>
            </div>

            <!-- WTC Number -->
            <div>
              <label class="font-medium text-gray-700 mb-2 flex items-center">
                <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
                WTC Number
              </label>
              <div class="w-full border border-gray-200 bg-gray-50 rounded-lg p-3 text-gray-700">
                {{ formData.section3.wtcNumber || 'Not provided' }}
              </div>
            </div>

            <!-- Dropdown Fields -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="font-medium text-gray-700 mb-2 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                  </svg>
                  Program
                </label>
                <div class="w-full border border-gray-200 bg-gray-50 rounded-lg p-3 text-gray-700">
                  {{ formData.section3.program || 'Not provided' }}
                </div>
              </div>
              <div>
                <label class="font-medium text-gray-700 mb-2 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                  </svg>
                  Project Type
                </label>
                <div class="w-full border border-gray-200 bg-gray-50 rounded-lg p-3 text-gray-700">
                  {{ formData.section3.projectType || 'Not provided' }}
                </div>
              </div>
              <!-- Project Phase -->
              <div>
                <div class="flex justify-between items-center mb-2">
                  <label class="font-medium text-gray-700 flex items-center">
                    <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                    Project Phase
                  </label>
                  <button
                    @click="toggleEdit('projectPhase')"
                    type="button"
                    class="text-sm text-blue-600 hover:text-blue-800 flex items-center transition-colors"
                  >
                    <svg v-if="!editableFields.projectPhase" class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                    <svg v-else class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    <span>{{ !editableFields.projectPhase ? 'Edit' : 'Cancel' }}</span>
                  </button>
                </div>
                <div
                  v-if="!editableFields.projectPhase"
                  class="w-full border border-gray-200 bg-gray-50 rounded-lg p-3 text-gray-700"
                >
                  {{ formData.section3.projectPhase || 'Not provided' }}
                </div>
                <select
                  v-else
                  v-model="formData.section3.projectPhase"
                  class="w-full border border-gray-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                >
                  <option value="">Select Project Phase</option>
                  <option v-for="phase in dropdownOptions.projectPhase" :key="phase" :value="phase">
                    {{ phase }}
                  </option>
                </select>
              </div>

              <!-- Project Status -->
              <div>
                <div class="flex justify-between items-center mb-2">
                  <label class="font-medium text-gray-700 flex items-center">
                    <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Project Status
                  </label>
                  <button
                    @click="toggleEdit('projectStatus')"
                    type="button"
                    class="text-sm text-blue-600 hover:text-blue-800 flex items-center transition-colors"
                  >
                    <svg v-if="!editableFields.projectStatus" class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                    <svg v-else class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    <span>{{ !editableFields.projectStatus ? 'Edit' : 'Cancel' }}</span>
                  </button>
                </div>
                <div
                  v-if="!editableFields.projectStatus"
                  class="w-full border border-gray-200 bg-gray-50 rounded-lg p-3 text-gray-700"
                >
                  {{ formData.section3.projectStatus || 'Not provided' }}
                </div>
                <select
                  v-else
                  v-model="formData.section3.projectStatus"
                  class="w-full border border-gray-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                >
                  <option value="">Select Project Status</option>
                  <option
                    v-for="status in dropdownOptions.projectStatus"
                    :key="status"
                    :value="status"
                  >
                    {{ status }}
                  </option>
                </select>
              </div>

              <!-- Percentage Completion -->
              <div>
                <label class="font-medium text-gray-700 mb-2 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                  Percentage Completion
                </label>
                <div class="flex items-center space-x-3">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    v-model="formData.section3.percentageCompletion"
                    class="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer"
                  />
                  <span class="text-sm font-medium text-gray-700 min-w-[40px]">
                    {{ formData.section3.percentageCompletion || 0 }}%
                  </span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    class="bg-blue-600 h-2 rounded-full"
                    :style="{ width: `${formData.section3.percentageCompletion || 0}%` }"
                  ></div>
                </div>
              </div>

              <!-- Project Health -->
              <div>
                <div class="flex justify-between items-center mb-2">
                  <label class="font-medium text-gray-700 flex items-center">
                    <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                    </svg>
                    Project Health
                  </label>
                  <button
                    @click="toggleEdit('projectHealth')"
                    type="button"
                    class="text-sm text-blue-600 hover:text-blue-800 flex items-center transition-colors"
                  >
                    <svg v-if="!editableFields.projectHealth" class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                    <svg v-else class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    <span>{{ !editableFields.projectHealth ? 'Edit' : 'Cancel' }}</span>
                  </button>
                </div>
                <div
                  v-if="!editableFields.projectHealth"
                  class="w-full border border-gray-200 bg-gray-50 rounded-lg p-3 text-gray-700"
                >
                  {{ formData.section3.projectHealth || 'Not provided' }}
                </div>
                <select
                  v-else
                  v-model="formData.section3.projectHealth"
                  class="w-full border border-gray-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                >
                  <option value="">Select Project Health</option>
                  <option
                    v-for="health in dropdownOptions.projectHealth"
                    :key="health"
                    :value="health"
                  >
                    {{ health }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 4: Action Items -->
        <div class="bg-blue-50 rounded-lg border border-blue-100 overflow-hidden">
          <button
            @click="toggleSection('section4')"
            type="button"
            class="w-full flex justify-between items-center p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium hover:from-blue-600 hover:to-blue-700 transition-colors"
          >
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-3 text-blue-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
              </svg>
              <span class="text-lg">Action Items</span>
            </div>
            <svg
              class="w-5 h-5 transform transition-transform text-blue-200"
              :class="{ 'rotate-180': sections.section4?.expanded }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>

          <div v-if="sections.section4?.expanded" class="p-4 space-y-6 animate-fade-in">
            <!-- Deliverables -->
            <div>
              <div class="flex justify-between items-center mb-2">
                <label class="font-medium text-gray-700 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Deliverables
                </label>
                <button
                  @click="toggleEdit('deliverables')"
                  type="button"
                  class="text-sm text-blue-600 hover:text-blue-800 flex items-center transition-colors"
                >
                  <svg v-if="!editableFields.deliverables" class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                  <svg v-else class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                  <span>{{ !editableFields.deliverables ? 'Edit' : 'Cancel' }}</span>
                </button>
              </div>
              <div
                v-if="!editableFields.deliverables"
                class="w-full border border-gray-200 bg-gray-50 rounded-lg p-3 text-gray-700 whitespace-pre-line"
              >
                {{ formData.section4.deliverables || 'Not provided' }}
              </div>
              <textarea
                v-else
                v-model="formData.section4.deliverables"
                rows="3"
                class="w-full border border-gray-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              ></textarea>
            </div>

            <!-- Accomplishments -->
            <div>
              <div class="flex justify-between items-center mb-2">
                <label class="font-medium text-gray-700 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Accomplishments
                </label>
                <button
                  @click="toggleEdit('accomplishments')"
                  type="button"
                  class="text-sm text-blue-600 hover:text-blue-800 flex items-center transition-colors"
                >
                  <svg v-if="!editableFields.accomplishments" class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                  <svg v-else class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                  <span>{{ !editableFields.accomplishments ? 'Edit' : 'Cancel' }}</span>
                </button>
              </div>
              <div
                v-if="!editableFields.accomplishments"
                class="w-full border border-gray-200 bg-gray-50 rounded-lg p-3 text-gray-700 whitespace-pre-line"
              >
                {{ formData.section4.accomplishments || 'Not provided' }}
              </div>
              <textarea
                v-else
                v-model="formData.section4.accomplishments"
                rows="3"
                class="w-full border border-gray-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              ></textarea>
            </div>

            <!-- Assigned Personnel -->
            <div>
              <div class="flex justify-between items-center mb-2">
                <label class="font-medium text-gray-700 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                  Assigned Personnel
                </label>
                <button
                  @click="toggleEdit('assignedPersonnel')"
                  type="button"
                  class="text-sm text-blue-600 hover:text-blue-800 flex items-center transition-colors"
                >
                  <svg v-if="!editableFields.assignedPersonnel" class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                  <svg v-else class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                  <span>{{ !editableFields.assignedPersonnel ? 'Edit' : 'Cancel' }}</span>
                </button>
              </div>
              <div
                v-if="!editableFields.assignedPersonnel"
                class="w-full border border-gray-200 bg-gray-50 rounded-lg p-3 text-gray-700"
              >
                {{ formData.section4.assignedPersonnel || 'Not provided' }}
              </div>
              <input
                v-else
                type="text"
                v-model="formData.section4.assignedPersonnel"
                class="w-full border border-gray-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
          </div>
        </div>

        <!-- Section 5: Attachments -->
        <div class="bg-blue-50 rounded-lg border border-blue-100 overflow-hidden">
          <button
            @click="toggleSection('section5')"
            type="button"
            class="w-full flex justify-between items-center p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium hover:from-blue-600 hover:to-blue-700 transition-colors"
          >
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-3 text-blue-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              <span class="text-lg">Attachments</span>
            </div>
            <svg
              class="w-5 h-5 transform transition-transform text-blue-200"
              :class="{ 'rotate-180': sections.section5?.expanded }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>

          <div v-if="sections.section5?.expanded" class="p-4 space-y-6 animate-fade-in">
            <div>
              <label class="font-medium text-gray-700 mb-2 flex items-center">
                <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                Upload File
              </label>
              <div class="flex items-center justify-center w-full">
                <label class="flex flex-col w-full border-2 border-dashed border-gray-300 hover:border-blue-500 rounded-lg p-6 group text-center cursor-pointer transition-colors">
                  <div class="flex flex-col items-center justify-center">
                    <svg class="w-10 h-10 text-blue-400 group-hover:text-blue-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    <p class="text-sm text-gray-500 group-hover:text-gray-600">
                      <span class="font-medium text-blue-600 group-hover:text-blue-700">Click to upload</span> or drag and drop
                    </p>
                    <p class="text-xs text-gray-400 mt-1">PDF, DOCX, XLSX up to 10MB</p>
                  </div>
                  <input type="file" @change="handleFileUpload" class="hidden" />
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="pt-4">
          <button
          @click="handleSubmit"
            type="submit"
            class="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-medium rounded-lg shadow-md transition-all duration-200 transform hover:scale-[1.01] flex items-center justify-center"
            :disabled="loading"
          >
            <span v-if="loading">
              <svg
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </span>
            <span v-else class="flex items-center">
              <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Submit Project Information
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { MapPinIcon } from '@heroicons/vue/24/outline'
import TheMap from './The-Map.vue'
import { useFormStore } from '@/stores/formStore'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const formStore = useFormStore()
const { sections, formData, dropdownOptions } = storeToRefs(formStore)
const { toggleSection, submitForm } = formStore

// Track editable state for fields
const editableFields = ref({
  projectPhase: false,
  projectStatus: false,
  projectHealth: false,
  deliverables: false,
  accomplishments: false,
  assignedPersonnel: false
})

const loading = ref(false)

const toggleEdit = (field) => {
  editableFields.value[field] = !editableFields.value[field]
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    console.log('File selected:', file.name)
    // Handle file upload logic here
  }
}

const handleSubmit = async () => {
  loading.value = true
  try {
    const success = await submitForm()
    if (success) {
      console.log('Form submitted successfully')
    }
  } finally {
    loading.value = false
  }
}
</script>

<style>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb {
  background: #3b82f6;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #2563eb;
}

/* Range input styling */
input[type="range"] {
  appearance: none;
  -webkit-appearance: none;
  height: 6px;
  background: #d1d5db;
  border-radius: 3px;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  background: #2563eb;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.15s ease;
}

input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.1);
  background: #1d4ed8;
}
</style>