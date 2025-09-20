import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api', // Use relative path for production
});

export const fetchCompanies = async (keyword = '') => {
  try {
    const params = {};
    if (keyword) {
      params.keyword = keyword;
    }
    const response = await apiClient.get('/companies', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching companies:', error);
    return []; // Return an empty array on error
  }
};
