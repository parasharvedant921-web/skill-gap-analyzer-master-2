import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getCourses = async () => {
  const response = await apiClient.get('/courses');
  return response.data;
};

export const getDemand = async () => {
  const response = await apiClient.get('/demand');
  return response.data;
};

export const getAnalysis = async (district = '') => {
  const response = await apiClient.get(`/analysis`, {
    params: { district },
  });
  return response.data;
};

export const submitSurvey = async (surveyData) => {
  const response = await apiClient.post('/survey', surveyData);
  return response.data;
};
