// composables/useCategories.ts

interface Category {
    id: number
    name: string
  }
  
  export const useCategories = () => {
    const categories = ref<Category[]>([]) // Tipe array Category
  
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          throw new Error('No token found. Please log in.')
        }
  
        const { data, error } = await useFetch<Category[]>('/api/categories/', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
  
        if (error?.value) {
          console.error('Categories fetch error:', error.value)
          throw new Error(error.value.message || 'An error occurred while fetching categories.')
        }
  
        if (!data?.value) {
          throw new Error('No data received from server.')
        }
  
        console.log('Categories data:', data.value)
        categories.value = data.value // TypeScript akan memverifikasi tipe di sini
      } catch (error) {
        console.error('Failed to fetch categories:', error)
        alert(`Failed to load categories: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    }
  
    return { categories, fetchCategories }
  }
  