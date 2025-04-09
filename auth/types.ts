// auth/types.ts
interface User {
    id: number
    email: string
    username: string
    role: string
    profile_picture: string | null
    bio: string | null
  }
  
  interface AuthResponse {
    user: User
    access: string
    refresh: string
  }