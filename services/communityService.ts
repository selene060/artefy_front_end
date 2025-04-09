// communityService.ts
import axios from 'axios';
import type { CommunityData } from './community';

const API_URL = 'http://localhost:8000/api';

export const createCommunity = async (formData: FormData, token: string) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  
  const response = await axios.post(`${API_URL}/communities/`, formData, config);
  return response.data;
};
