// Mock data storage for form submissions
let formSubmissions = [];

export const mockDataService = {
  // Save form data
  saveFormData: (data) => {
    const submission = {
      id: Date.now(),
      ...data,
      timestamp: new Date().toISOString()
    };
    formSubmissions.push(submission);
    console.log('Form submitted:', submission);
    console.log('All submissions:', formSubmissions);
    return submission;
  },

  // Get all submissions
  getAllSubmissions: () => {
    return formSubmissions;
  },

  // Clear all submissions
  clearSubmissions: () => {
    formSubmissions = [];
  }
};
