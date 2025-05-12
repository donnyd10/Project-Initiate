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
          <span>Loading records...</span>
        </div>
      </div>
    </div>

    <!-- Error Message -->
    <div
      v-if="error"
      class="max-w-6xl mx-auto bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
      role="alert"
    >
      <p>{{ error }}</p>
      <button
        @click="fetchRecords"
        class="mt-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Retry
      </button>
    </div>

    <!-- Main Content -->
    <div
      class="max-w-6xl sm:ml-auto ml-auto md:ml-auto lg:ml-15 bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100"
    >
      <!-- Header -->
      <div class="bg-gradient-to-r from-blue-600 to-blue-800 py-4 px-6">
        <h2 class="text-2xl font-bold text-white">Submitted Forms</h2>
        <p class="text-blue-100">{{ records.length }} records found</p>
      </div>

      <!-- Records Table -->
      <div class="p-6">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-blue-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider"
                >
                  Customer
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider"
                >
                  Account #
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="record in records"
                :key="record.id"
                class="hover:bg-blue-50 transition-colors"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="font-medium text-gray-900">
                    {{ record.customerName }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-gray-500">
                  {{ record.accountNumber }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-gray-500">
                  {{ formatDate(record.date) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                  >
                    Completed
                  </span>
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                >
                  <button
                    @click="viewRecord(record.id)"
                    class="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    View
                  </button>
                  <button
                    @click="downloadPDF(record.id)"
                    class="text-blue-600 hover:text-blue-900"
                  >
                    PDF
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div v-if="records.length === 0 && !loading" class="text-center py-8">
          <svg
            class="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            ></path>
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">
            No submissions yet
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            Get started by submitting a new form.
          </p>
          <div class="mt-6">
            <button
              @click="$router.push('/form')"
              class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <svg
                class="-ml-1 mr-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
              New Submission
            </button>
          </div>
        </div>

        <!-- Pagination -->
        <div
          v-if="records.length > 0"
          class="flex items-center justify-between mt-4"
        >
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          <span class="text-sm text-gray-700">
            Page {{ currentPage }} of {{ totalPages }}
          </span>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            Next
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
      records: [],
      currentPage: 1,
      pageSize: 10,
      totalRecords: 0,
      loading: false,
      error: null,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalRecords / this.pageSize);
    },
  },
  created() {
    this.fetchRecords();
  },
  methods: {
    async fetchRecords() {
      this.loading = true;
      this.error = null;

      try {
        const response = await fetch(
          `${process.env.VUE_APP_API_URL}/submissions?page=${this.currentPage}&limit=${this.pageSize}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch records");
        }

        const data = await response.json();
        this.records = data.records;
        this.totalRecords = data.total;
      } catch (error) {
        console.error("Error fetching records:", error);
        this.error = "Failed to load records. Please try again.";
      } finally {
        this.loading = false;
      }
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString();
    },
    viewRecord(id) {
      this.$router.push(`/records/${id}`);
    },
    downloadPDF(id) {
      // Implement PDF generation logic
      console.log("Generating PDF for record:", id);
      window.open(
        `${process.env.VUE_APP_API_URL}/submissions/${id}/pdf`,
        "_blank"
      );
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.fetchRecords();
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchRecords();
      }
    },
  },
};
</script>
