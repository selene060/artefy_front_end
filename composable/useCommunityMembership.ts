// composables/useCommunityMembership.ts
import { ref } from 'vue'
import { useRuntimeConfig } from 'nuxt/app'

interface ApiResponse {
  message?: string;
  error?: string;
}

interface JoinResult {
  success: boolean;
  message?: string;
  error?: string;
}

export const useCommunityMembership = () => {
  const isProcessing = ref(false)
  const error = ref<string | null>(null)
  
  const requestJoinCommunity = async (communityId: string, message: string = ''): Promise<JoinResult> => {
    isProcessing.value = true
    error.value = null
    
    try {
      const config = useRuntimeConfig()
      const token = localStorage.getItem('accessToken')
      
      if (!token) {
        throw new Error('Authentication required')
      }
      
      const response = await fetch(`${config.public.apiBase}/api/communities/${communityId}/request-join/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
      })
      
      const data = await response.json() as ApiResponse
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit join request')
      }
      
      return { success: true, message: data.message || 'Join request submitted successfully' }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred'
      error.value = errorMessage
      return { success: false, error: errorMessage }
    } finally {
      isProcessing.value = false
    }
  }
  
  const joinCommunity = async (communityId: string): Promise<JoinResult> => {
    isProcessing.value = true
    error.value = null
    
    try {
      const config = useRuntimeConfig()
      const token = localStorage.getItem('accessToken')
      
      if (!token) {
        throw new Error('Authentication required')
      }
      
      const response = await fetch(`${config.public.apiBase}/api/communities/${communityId}/join/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      
      const data = await response.json() as ApiResponse
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to join community')
      }
      
      return { success: true, message: data.message || 'Successfully joined community' }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred'
      error.value = errorMessage
      return { success: false, error: errorMessage }
    } finally {
      isProcessing.value = false
    }
  }
  
  return {
    isProcessing,
    error,
    requestJoinCommunity,
    joinCommunity
  }
}
