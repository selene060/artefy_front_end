// plugins/auth.ts
import { defineNuxtPlugin } from '#app'
import { useAuthStore } from '~/stores/auth'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import type { Router } from 'vue-router'

export default defineNuxtPlugin(async (nuxtApp) => {
  const authStore = useAuthStore()

  // Initialize auth state when app starts
  await authStore.initAuth()

  // Type assertion for router
  const router = nuxtApp.$router as Router

  // Add navigation guard
  router.beforeEach(async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    // Skip if auth is already initialized
    if (!authStore.initialized) {
      await authStore.initAuth()
    }

    // Check if route requires authentication
    const requiresAuth = to.meta.requiresAuth as boolean | undefined
    const isAuthenticated = authStore.isAuthenticated

    if (requiresAuth && !isAuthenticated) {
      // Save the intended destination
      if (process.client) {
        sessionStorage.setItem('intendedRoute', to.fullPath)
      }
      return next('/login')
    }

    // If we're going to login page but already authenticated
    if (to.path === '/login' && isAuthenticated) {
      return next('/dashboard')
    }

    return next()
  })

  // Set up automatic token refresh
  let refreshInterval: NodeJS.Timeout | null = null

  if (process.client) {
    // Clear any existing interval
    if (refreshInterval) {
      clearInterval(refreshInterval)
    }

    // Set up periodic token refresh (every 14 minutes for a 15-minute token)
    refreshInterval = setInterval(async () => {
      if (authStore.isAuthenticated) {
        try {
          await authStore.refreshAuthToken()
        } catch (error) {
          console.error('Failed to refresh token:', error)
        }
      }
    }, 14 * 60 * 1000) // 14 minutes
  }
})