<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4 sm:px-6 lg:px-8">
    <!-- Form container -->
    <div
      class="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100 pb-2 mb-10"
    >
      <!-- Form header with accent bar -->
      <div class="bg-gradient-to-r from-blue-600 to-blue-800 py-4 px-6">
        <h2 class="text-2xl font-bold text-white">Project Information Form</h2>
        <p class="text-blue-100">Please complete all required fields</p>
      </div>

      <!-- Form content -->
      <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
        <!-- Section 1: Basic Information -->
        <div class="bg-blue-50 rounded-lg border border-blue-100 overflow-hidden">
          <button
            @click="toggleSection('section1')"
            type="button"
            class="w-full flex justify-between items-center p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium"
          >
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>Section 1: Basic Information</span>
            </div>
            <svg
              class="w-5 h-5 transform transition-transform"
              :class="{ 'rotate-180': sections.section1.expanded }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>

          <div v-if="sections.section1.expanded" class="p-4 space-y-4 animate-fade-in">
            <!-- Date and Time -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block font-medium text-gray-700 mb-1">
                  Date <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="formData.section1.date"
                  type="date"
                  class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  :class="{ 'border-red-500': errors.section1.date }"
                />
                <p v-if="errors.section1.date" class="text-red-500 text-sm mt-1">
                  {{ errors.section1.date }}
                </p>
              </div>
              <div>
                <label class="block font-medium text-gray-700 mb-1">
                  Time <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="formData.section1.time"
                  type="time"
                  class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  :class="{ 'border-red-500': errors.section1.time }"
                />
                <p v-if="errors.section1.time" class="text-red-500 text-sm mt-1">
                  {{ errors.section1.time }}
                </p>
              </div>
            </div>

            <!-- GPS Coordinates -->
            <div>
              <label class="font-medium text-gray-700 mb-1 flex items-center">
                <MapPinIcon class="w-5 h-5 mr-1 text-blue-600" />
                Site Location (GPS Coordinates) <span class="text-red-500">*</span>
              </label>
              <div class="space-y-3">
                <div class="flex space-x-4">
                  <!-- Latitude input -->
                  <div class="w-full">
                    <label class="text-sm font-medium text-gray-600 mb-1 flex items-center">
                      <svg
                        class="w-4 h-4 mr-1 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"
                        ></path>
                      </svg>
                      Latitude
                    </label>
                    <div class="relative">
                      <input
                        v-model="formData.section1.siteLocation.latitude"
                        type="text"
                        class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        :class="{ 'border-red-500': errors.section1.siteLocation.latitude }"
                        readonly
                        placeholder="Fetching location..."
                      />
                      <!-- Refresh location button -->
                      <button
                        @click="getUserLocation"
                        type="button"
                        class="absolute right-2 top-2 p-1 text-blue-600 hover:text-blue-800"
                        title="Refresh location"
                      >
                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <p
                      v-if="errors.section1.siteLocation.latitude"
                      class="text-red-500 text-sm mt-1"
                    >
                      {{ errors.section1.siteLocation.latitude }}
                    </p>
                  </div>

                  <!-- Longitude input -->
                  <div class="w-full">
                    <label class="text-sm font-medium text-gray-600 mb-1 flex items-center">
                      <svg
                        class="w-4 h-4 mr-1 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"
                        ></path>
                      </svg>
                      Longitude
                    </label>
                    <input
                      v-model="formData.section1.siteLocation.longitude"
                      type="text"
                      class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      :class="{ 'border-red-500': errors.section1.siteLocation.longitude }"
                      readonly
                    />
                    <p
                      v-if="errors.section1.siteLocation.longitude"
                      class="text-red-500 text-sm mt-1"
                    >
                      {{ errors.section1.siteLocation.longitude }}
                    </p>
                  </div>
                </div>
                <!-- Map component container -->
                <div class="bg-gray-100 rounded-lg p-2 border border-gray-200 relative">
                  <the-map
                    :lat="formData.section1.siteLocation.latitude"
                    :lng="formData.section1.siteLocation.longitude"
                    @coordinates-updated="updateCoordinates"
                  ></the-map>
                  <div class="absolute bottom-3 right-3 bg-white p-1 rounded-full shadow-md">
                    <MapPinIcon class="w-5 h-5 text-red-500" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Project Team Lead and Project Head -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block font-medium text-gray-700 mb-1">
                  Project Team Lead <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="formData.section1.projectTeamLead"
                  type="text"
                  class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  :class="{ 'border-red-500': errors.section1.projectTeamLead }"
                  placeholder="Enter team lead name"
                />
                <p v-if="errors.section1.projectTeamLead" class="text-red-500 text-sm mt-1">
                  {{ errors.section1.projectTeamLead }}
                </p>
              </div>
              <div>
                <label class="block font-medium text-gray-700 mb-1">
                  Project Head <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="formData.section1.projectHead"
                  type="text"
                  class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  :class="{ 'border-red-500': errors.section1.projectHead }"
                  placeholder="Enter project head name"
                />
                <p v-if="errors.section1.projectHead" class="text-red-500 text-sm mt-1">
                  {{ errors.section1.projectHead }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 2: Project Dates -->
        <div class="bg-blue-50 rounded-lg border border-blue-100 overflow-hidden">
          <button
            @click="toggleSection('section2')"
            type="button"
            class="w-full flex justify-between items-center p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium"
          >
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
              <span>Section 2: Project Dates</span>
            </div>
            <svg
              class="w-5 h-5 transform transition-transform"
              :class="{ 'rotate-180': sections.section2.expanded }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>

          <div v-if="sections.section2.expanded" class="p-4 space-y-4 animate-fade-in">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block font-medium text-gray-700 mb-1">
                  Start Date <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="formData.section2.startDate"
                  type="date"
                  class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  :class="{ 'border-red-500': errors.section2.startDate }"
                />
                <p v-if="errors.section2.startDate" class="text-red-500 text-sm mt-1">
                  {{ errors.section2.startDate }}
                </p>
              </div>
              <div>
                <label class="block font-medium text-gray-700 mb-1">
                  End Date <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="formData.section2.endDate"
                  type="date"
                  class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  :class="{ 'border-red-500': errors.section2.endDate }"
                />
                <p v-if="errors.section2.endDate" class="text-red-500 text-sm mt-1">
                  {{ errors.section2.endDate }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 3: Project Details -->
        <div class="bg-blue-50 rounded-lg border border-blue-100 overflow-hidden">
          <button
            @click="toggleSection('section3')"
            type="button"
            class="w-full flex justify-between items-center p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium"
          >
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                ></path>
              </svg>
              <span>Section 3: Project Details</span>
            </div>
            <svg
              class="w-5 h-5 transform transition-transform"
              :class="{ 'rotate-180': sections.section3.expanded }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>

          <div v-if="sections.section3.expanded" class="p-4 space-y-4 animate-fade-in">
            <!-- Project Name and Code -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block font-medium text-gray-700 mb-1">
                  Project Name <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="formData.section3.projectName"
                  type="text"
                  class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  :class="{ 'border-red-500': errors.section3.projectName }"
                  placeholder="Enter project name"
                />
                <p v-if="errors.section3.projectName" class="text-red-500 text-sm mt-1">
                  {{ errors.section3.projectName }}
                </p>
              </div>
              <div>
                <label class="block font-medium text-gray-700 mb-1">
                  Project Code <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="formData.section3.projectCode"
                  type="text"
                  class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  :class="{ 'border-red-500': errors.section3.projectCode }"
                  placeholder="Enter project code"
                />
                <p v-if="errors.section3.projectCode" class="text-red-500 text-sm mt-1">
                  {{ errors.section3.projectCode }}
                </p>
              </div>
            </div>

            <!-- WTC Number -->
            <div>
              <label class="block font-medium text-gray-700 mb-1">
                WTC Number <span class="text-red-500">*</span>
              </label>
              <input
                v-model="formData.section3.wtcNumber"
                type="text"
                class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                :class="{ 'border-red-500': errors.section3.wtcNumber }"
                placeholder="Enter WTC number"
              />
              <p v-if="errors.section3.wtcNumber" class="text-red-500 text-sm mt-1">
                {{ errors.section3.wtcNumber }}
              </p>
            </div>

            <!-- Dropdown Fields -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block font-medium text-gray-700 mb-1">
                  Program <span class="text-red-500">*</span>
                </label>
                <select
                  v-model="formData.section3.program"
                  class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  :class="{ 'border-red-500': errors.section3.program }"
                >
                  <option value="" disabled selected>Select program</option>
                  <option v-for="option in dropdownOptions.program" :key="option" :value="option">
                    {{ option }}
                  </option>
                </select>
                <p v-if="errors.section3.program" class="text-red-500 text-sm mt-1">
                  {{ errors.section3.program }}
                </p>
              </div>
              <div>
                <label class="block font-medium text-gray-700 mb-1">
                  Project Type <span class="text-red-500">*</span>
                </label>
                <select
                  v-model="formData.section3.projectType"
                  class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  :class="{ 'border-red-500': errors.section3.projectType }"
                >
                  <option value="" disabled selected>Select project type</option>
                  <option
                    v-for="option in dropdownOptions.projectType"
                    :key="option"
                    :value="option"
                  >
                    {{ option }}
                  </option>
                </select>
                <p v-if="errors.section3.projectType" class="text-red-500 text-sm mt-1">
                  {{ errors.section3.projectType }}
                </p>
              </div>
              <div>
                <label class="block font-medium text-gray-700 mb-1">
                  Project Phase <span class="text-red-500">*</span>
                </label>
                <select
                  v-model="formData.section3.projectPhase"
                  class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  :class="{ 'border-red-500': errors.section3.projectPhase }"
                >
                  <option value="" disabled selected>Select project phase</option>
                  <option
                    v-for="option in dropdownOptions.projectPhase"
                    :key="option"
                    :value="option"
                  >
                    {{ option }}
                  </option>
                </select>
                <p v-if="errors.section3.projectPhase" class="text-red-500 text-sm mt-1">
                  {{ errors.section3.projectPhase }}
                </p>
              </div>
              <div>
                <label class="block font-medium text-gray-700 mb-1">
                  Project Status <span class="text-red-500">*</span>
                </label>
                <select
                  v-model="formData.section3.projectStatus"
                  class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  :class="{ 'border-red-500': errors.section3.projectStatus }"
                >
                  <option value="" disabled selected>Select project status</option>
                  <option
                    v-for="option in dropdownOptions.projectStatus"
                    :key="option"
                    :value="option"
                  >
                    {{ option }}
                  </option>
                </select>
                <p v-if="errors.section3.projectStatus" class="text-red-500 text-sm mt-1">
                  {{ errors.section3.projectStatus }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="pt-4">
          <button
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
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              Submit Project Information
            </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { MapPinIcon } from '@heroicons/vue/24/outline'
import TheMap from './The-Map.vue'
import { useFormStore } from '@/stores/formStore'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const formStore = useFormStore()

// Destructure state
const { loading, sections, formData, dropdownOptions } = storeToRefs(formStore)

// Destructure actions
const { toggleSection, getUserLocation, updateCoordinates, submitForm } = formStore

const handleSubmit = async () => {
  const success = await submitForm()
  if (success) {
    // Handle successful submission
    console.log('Form submitted successfully')
    // Optionally redirect or show success message
  }
}

onMounted(() => {
  formStore.getUserLocation()
})
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
}
::-webkit-scrollbar-thumb {
  background: #3b82f6;
  border-radius: 4px;
}
</style>
