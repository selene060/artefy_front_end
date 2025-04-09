import axios from 'axios'

const API_URL = 'http://localhost:8000/api'

export const fetchCategories = async () => {
  return await axios.get(`${API_URL}/categories/`)
}