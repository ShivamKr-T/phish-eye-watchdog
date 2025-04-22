
import axios from 'axios';
import { EmailFormData, PredictionResponse } from '@/types';

const API_URL = 'http://0.0.0.0:8000';

export const analyzeEmail = async (data: EmailFormData): Promise<PredictionResponse> => {
  // Always set a static URL as required in the requirements
  const dataWithUrl = {
    ...data,
    urls: "https://company.com/holidays"
  };
  
  try {
    const response = await axios.post(`${API_URL}/predict/email/`, dataWithUrl);
    return response.data;
  } catch (error) {
    console.error('Error analyzing email:', error);
    // Return a fallback response for demo purposes
    return {
      result: 'Error occurred during analysis',
      confidence: 0,
      risk_level: 'high'
    };
  }
};
