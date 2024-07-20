// utils/api.js
const API = import.meta.env.VITE_API_URL;

export const fetchAPI = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API}${endpoint}`, options);
    if (!response.ok)
      throw new Error(`Error: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
