import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as yup from 'yup'

export const readonlyStore = defineStore('form', () => {
  // State
  const loading = ref(false)
  const sections = ref({
    section1: { expanded: true },
    section2: { expanded: false },
    section3: { expanded: false },
    section4: { expanded: false },
    section5: { expanded: false },
  })

  const formData = ref({
    section1: {
      date: '',
      time: '',
      siteLocation: {
        latitude: '',
        longitude: '',
      },
      projectTeamLead: '',
      projectHead: '',
    },
    section2: {
      startDate: '',
      endDate: '',
    },
    section3: {
      projectName: '',
      projectCode: '',
      wtcNumber: '',
      program: '',
      projectType: '',
      projectPhase: '',
      projectStatus: '',
      percentageCompletion: '',
      projectHealth: '',
    },
    section4: {
      deliverables: '',
      accomplishments: '',
      assignedPersonnel: '',
    },
    section5: {
      attachment: '',
    },
  })

  const dropdownOptions = ref({
    program: ['Program A', 'Program B', 'Program C', 'Program D'],
    projectType: ['Construction', 'Maintenance', 'Research', 'Development'],
    projectPhase: ['Planning', 'Initiation', 'Execution', 'Monitoring', 'Closure'],
    projectStatus: ['Not Started', 'In Progress', 'On Hold', 'Completed', 'Cancelled'],
    projectHealth: ['Excellent', 'Good', 'Fair', 'Poor', 'Critical'],
  })

  const editableFields = ref({
    projectPhase: false,
    projectStatus: false,
    projectHealth: false,
    deliverables: false,
    accomplishments: false,
    assignedPersonnel: false,
  })

  // Actions
  const toggleSection = (section) => {
    sections.value[section].expanded = !sections.value[section].expanded
  }

  const toggleEdit = (field) => {
    editableFields.value[field] = !editableFields.value[field]
  }

  const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            formData.value.section1.siteLocation.latitude = position.coords.latitude.toFixed(6)
            formData.value.section1.siteLocation.longitude = position.coords.longitude.toFixed(6)
            resolve()
          },
          (error) => {
            console.error('Error getting location:', error)
            formData.value.section1.siteLocation.latitude = '0.000000'
            formData.value.section1.siteLocation.longitude = '0.000000'
            reject(error)
          },
        )
      } else {
        console.error('Geolocation is not supported by this browser.')
        formData.value.section1.siteLocation.latitude = '0.000000'
        formData.value.section1.siteLocation.longitude = '0.000000'
        reject(new Error('Geolocation not supported'))
      }
    })
  }

  const updateCoordinates = (coords) => {
    formData.value.section1.siteLocation.latitude = coords.lat.toFixed(6)
    formData.value.section1.siteLocation.longitude = coords.lng.toFixed(6)
  }

  const handleFileUpload = (event) => {
    const files = event.target.files // Get all selected files
    if (files && files.length > 0) {
      // Validate each file
      const allowedTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      ]
      const maxSize = 20 * 1024 * 1024 // 20MB (you had 10MB in comment but 20MB in code)

      // Initialize formData.section5.attachments as an array if it doesn't exist
      if (!Array.isArray(formData.value.section5.attachments)) {
        formData.value.section5.attachments = []
      }

      for (let i = 0; i < files.length; i++) {
        const file = files[i]

        if (!allowedTypes.includes(file.type)) {
          alert(`Invalid file type for ${file.name}. Please upload a PDF, DOCX, or XLSX file.`)
          continue // Skip this file but continue with others
        }

        if (file.size > maxSize) {
          alert(`File ${file.name} exceeds the size limit.`)
          continue // Skip this file but continue with others
        }

        // Add the file to the attachments array
        formData.value.section5.attachments.push(file)
        console.log('File selected:', file)

        // Read and log the file contents (optional)
        const reader = new FileReader()
        reader.onload = (e) => {
          console.log('File contents:', e.target.result)
        }
        reader.onerror = (e) => {
          console.error('Error reading file:', e)
        }
        reader.readAsText(file) // Use readAsText for text-based files
      }
    }
  }
  const removeFile = (index) => {
    if (Array.isArray(formData.value.section5.attachments)) {
      formData.value.section5.attachments.splice(index, 1)
    }
  }

  const submitForm = async () => {
    loading.value = true

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log('Form submitted:', formData.value)
      return true
    } catch (error) {
      console.error('Submission error:', error)
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    sections,
    formData,
    dropdownOptions,
    editableFields,
    toggleSection,
    getUserLocation,
    updateCoordinates,
    submitForm,
    handleFileUpload,
    toggleEdit,
    removeFile
  }
})
