<template>
  <div
    class="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4 sm:px-6 lg:px-8"
  >
    <!-- Loading Overlay -->
    <div
      v-if="loading"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-xl">
        <div class="flex items-center">
          <svg
            class="animate-spin h-8 w-8 text-blue-600 mr-3"
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
          <span>Loading record details...</span>
        </div>
      </div>
    </div>

    <!-- Error Message -->
    <div
      v-if="error"
      class="max-w-4xl mx-auto bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
      role="alert"
    >
      <p>{{ error }}</p>
      <button
        @click="$router.push('/records')"
        class="mt-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Back to Records
      </button>
    </div>

    <!-- Main Content -->
    <div
      v-if="record"
      class="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100"
    >
      <!-- Header with back button -->
      <div
        class="bg-gradient-to-r from-blue-600 to-blue-800 py-4 px-6 flex justify-between items-center"
      >
        <div>
          <h2 class="text-2xl font-bold text-white">Form Submission Details</h2>
          <p class="text-blue-100">{{ recordDate }}</p>
        </div>
        <button
          @click="$router.push('/records')"
          class="text-white hover:text-blue-200 flex items-center"
        >
          <svg
            class="h-5 w-5 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to List
        </button>
      </div>

      <!-- Record Content -->
      <div class="p-6 space-y-6">
        <!-- General Details Section -->
        <div class="bg-blue-50 rounded-lg border border-blue-100 p-4">
          <h3 class="text-lg font-semibold text-blue-800 mb-4">
            General Information
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="(field, index) in record.generalDetails" :key="index">
              <label class="block text-sm font-medium text-gray-500">{{
                field.label
              }}</label>
              <p class="mt-1 text-sm text-gray-900">
                {{
                  field.type === "gps"
                    ? `${field.latitude}, ${field.longitude}`
                    : field.value
                }}
              </p>
            </div>
          </div>
        </div>

        <!-- Verification Sections -->
        <div
          v-for="(section, sectionKey) in record.sections"
          :key="sectionKey"
          class="bg-blue-50 rounded-lg border border-blue-100 p-4"
        >
          <h3 class="text-lg font-semibold text-blue-800 mb-4">
            {{ section.label }}
          </h3>

          <!-- Fields -->
          <div class="space-y-4">
            <div
              v-for="(field, index) in section.fields"
              :key="index"
              class="p-3 bg-white rounded-lg"
            >
              <label class="block font-medium text-gray-700 mb-1">{{
                field.label
              }}</label>
              <p class="text-gray-900">{{ field.value }}</p>
            </div>
          </div>

          <!-- Notes -->
          <div
            v-if="
              section.notes ||
              section.communicationNotes ||
              section.engagementNotes ||
              section.acceptanceNotes
            "
            class="mt-4"
          >
            <label class="block font-medium text-gray-700 mb-2">Notes</label>
            <textarea
              :value="
                section.notes ||
                section.communicationNotes ||
                section.engagementNotes ||
                section.acceptanceNotes
              "
              class="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 text-gray-700"
              rows="4"
              readonly
            ></textarea>
          </div>
        </div>

        <!-- Photo Section -->
        <div
          v-if="record.photoUrl"
          class="bg-blue-50 rounded-lg border border-blue-100 p-4"
        >
          <h3 class="text-lg font-semibold text-blue-800 mb-4">
            Attached Photo
          </h3>
          <img
            :src="record.photoUrl"
            alt="Submission photo"
            class="max-w-full h-auto rounded-lg border border-gray-200"
          />
        </div>

        <!-- Signatures Section -->
        <div
          v-if="record.signatures"
          class="bg-blue-50 rounded-lg border border-blue-100 p-4"
        >
          <h3 class="text-lg font-semibold text-blue-800 mb-4">Signatures</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div v-for="(signature, index) in record.signatures" :key="index">
              <label class="block text-sm font-medium text-gray-500"
                >Signature {{ index + 1 }}</label
              >
              <img
                v-if="signature.data"
                :src="signature.data"
                alt="Signature"
                class="mt-2 h-20 border border-gray-200 bg-white"
              />
              <p class="mt-1 text-sm text-gray-500">{{ signature.date }}</p>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end space-x-4 pt-4">
          <button
            @click="downloadPDF(record.id)"
            class="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50"
          >
            Download PDF
          </button>
          <button
            @click="printRecord"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Print
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      record: null,
      loading: true,
      error: null,
    };
  },
  computed: {
    recordDate() {
      if (!this.record) return "";
      const dateField = this.record.generalDetails.find(
        (f) => f.label === "Installation Date"
      );
      return dateField ? this.formatDate(dateField.value) : "No date available";
    },
  },
  created() {
    this.fetchRecord();
  },
  methods: {
    async fetchRecord() {
      this.loading = true;
      this.error = null;

      try {
        const response = await fetch(
          `${process.env.VUE_APP_API_URL}/submissions/${this.$route.params.id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch record");
        }

        this.record = await response.json();
      } catch (error) {
        console.error("Error fetching record:", error);
        this.error = "Failed to load record. Please try again.";
      } finally {
        this.loading = false;
      }
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString();
    },
    downloadPDF(id) {
      window.open(
        `${process.env.VUE_APP_API_URL}/submissions/${id}/pdf`,
        "_blank"
      );
    },
    printRecord() {
      window.print();
    },
  },
};
</script>

<style>
@media print {
  body * {
    visibility: hidden;
  }
  .max-w-4xl,
  .max-w-4xl * {
    visibility: visible;
  }
  .max-w-4xl {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    max-width: 100%;
    box-shadow: none;
    border: none;
  }
  .no-print {
    display: none;
  }
}
</style>
