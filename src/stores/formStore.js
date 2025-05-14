import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFormStore = defineStore('form', () => {
  // State
  const loading = ref(false)
  const sections = ref({
    section1: { expanded: true },
    section2: { expanded: false },
    section3: { expanded: false },
    section4: { expanded: false }, // 👈 Add this
    section5: { expanded: false }, // 👈 And this
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

  const errors = ref({
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
    },
  })

  // Getters
  const isValidLatitude = (lat) => {
    const num = parseFloat(lat)
    return !isNaN(num) && num >= -90 && num <= 90
  }

  const isValidLongitude = (lng) => {
    const num = parseFloat(lng)
    return !isNaN(num) && num >= -180 && num <= 180
  }

  // Actions
  const toggleSection = (section) => {
    sections.value[section].expanded = !sections.value[section].expanded
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

  const validateField = (section, field, subfield = null) => {
    let value
    if (subfield) {
      value = formData.value[section][field][subfield]
    } else {
      value = formData.value[section][field]
    }

    // Clear previous error
    if (subfield) {
      errors.value[section][field][subfield] = ''
    } else {
      errors.value[section][field] = ''
    }

    // Common validation rules
    if (!value) {
      const errorMessage = getFieldLabel(section, field, subfield) + ' is required'

      if (subfield) {
        errors.value[section][field][subfield] = errorMessage
      } else {
        errors.value[section][field] = errorMessage
      }
      return false
    }

    // Special validations
    if (section === 'section1' && field === 'siteLocation') {
      if (subfield === 'latitude' && !isValidLatitude(value)) {
        errors.value.section1.siteLocation.latitude = 'Invalid latitude (-90 to 90)'
        return false
      }
      if (subfield === 'longitude' && !isValidLongitude(value)) {
        errors.value.section1.siteLocation.longitude = 'Invalid longitude (-180 to 180)'
        return false
      }
    }

    if (section === 'section2' && field === 'endDate' && formData.value.section2.startDate) {
      if (new Date(value) < new Date(formData.value.section2.startDate)) {
        errors.value.section2.endDate = 'End date must be after start date'
        return false
      }
    }

    return true
  }

  const getFieldLabel = (section, field, subfield = null) => {
    const labels = {
      section1: {
        date: 'Date',
        time: 'Time',
        siteLocation: {
          latitude: 'Latitude',
          longitude: 'Longitude',
        },
        projectTeamLead: 'Project Team Lead',
        projectHead: 'Project Head',
      },
      section2: {
        startDate: 'Start Date',
        endDate: 'End Date',
      },
      section3: {
        projectName: 'Project Name',
        projectCode: 'Project Code',
        wtcNumber: 'WTC Number',
        program: 'Program',
        projectType: 'Project Type',
        projectPhase: 'Project Phase',
        projectStatus: 'Project Status',
      },
      section4: {
        deliverables: 'Deliverables',
        accomplishments: 'Accomplishments',
        assignedPersonnel: 'Assigned Personnel',
      },
      section5: {
        attachment: 'Attachment',
      },
    }

    return subfield ? labels[section][field][subfield] : labels[section][field]
  }

  const validateSection = (section) => {
    let isValid = true
    const sectionFields = Object.keys(formData.value[section])

    sectionFields.forEach((field) => {
      if (typeof formData.value[section][field] === 'object') {
        // Handle nested objects like siteLocation
        const subFields = Object.keys(formData.value[section][field])
        subFields.forEach((subField) => {
          if (!validateField(section, field, subField)) {
            isValid = false
          }
        })
      } else {
        if (!validateField(section, field)) {
          isValid = false
        }
      }
    })

    return isValid
  }

  const validateForm = () => {
    let isValid = true

    // Validate each section
    if (!validateSection('section1')) isValid = false
    if (!validateSection('section2')) isValid = false
    if (!validateSection('section3')) isValid = false
    if (!validateSection('section4')) isValid = false // 👈 Add this
    if (!validateSection('section5')) isValid = false // 👈 Add this

    return isValid
  }

  const submitForm = async () => {
    // if (!validateForm()) {
    //   return false
    // }

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
    errors,
    toggleSection,
    getUserLocation,
    updateCoordinates,
    validateField,
    validateForm,
    submitForm,
  }
})
