<template>
    <div class="min-h-screen bg-gradient-to-br from-[#F9CDCC]/20 to-[#3845AD]/10 flex items-center justify-center p-4 relative">
      <!-- Main Container -->
      <div class="w-full max-w-md z-10">
        <!-- Brand Section -->
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold text-gray-800 mb-2">Your Art, Your Story! ✨</h1>
          <p class="text-gray-600">Let's get started! </p>
        </div>
  
        <div class="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20">
          <form @submit.prevent="handleSubmit">
           <!-- username -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <div class="relative">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <i class="fas fa-user"></i>
                </span>
                <input 
                  v-model="formData.username"
                  type="text"
                  class="w-full pl-12 pr-4 py-3.5 rounded-xl border border-[#F9CDCC] focus:outline-none focus:border-[#3845AD] focus:ring-2 focus:ring-[#3845AD]/20 bg-white/50 transition-all duration-200"
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>
  
            <!-- email -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div class="relative">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <i class="fas fa-envelope"></i>
                </span>
                <input 
                  v-model="formData.email"
                  type="email"
                  class="w-full pl-12 pr-4 py-3.5 rounded-xl border border-[#F9CDCC] focus:outline-none focus:border-[#3845AD] focus:ring-2 focus:ring-[#3845AD]/20 bg-white/5 transition-all duration-200"
                  placeholder="email@example.com"
                  required
                />
              </div>
            </div>
  
            <!-- password -->
            <div class="mb-6">
              <div class="flex justify-between mb-2">
                <label class="text-sm font-medium text-gray-700">Password</label>
              </div>
              <div class="relative">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <i class="fas fa-lock"></i>
                </span>
                <input 
                  v-model="formData.password"
                  :type="showPassword ? 'text' : 'password'"
                  class="w-full pl-12 pr-12 py-3.5 rounded-xl border border-[#F9CDCC] focus:outline-none focus:border-[#3845AD] focus:ring-2 focus:ring-[#3845AD]/20 bg-white/50 transition-all duration-200"
                  placeholder="Enter password"
                  required
                />
                <button 
                  type="button"
                  @click="togglePassword"
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <i :class="['fas', showPassword ? 'fa-eye-slash' : 'fa-eye']"></i>
                </button>
              </div>
            </div>
  
            <!-- remember me-->
            <div class="flex items-center mb-6">
              <input
                type="checkbox"
                id="remember"
                class="w-4 h-4 rounded border-gray-300 text-[#3845AD] focus:ring-[#3845AD]/20"
              />
              <label for="remember" class="ml-2 text-sm text-gray-600">Remember me</label>
            </div>
  
            <!-- login -->
            <button
              type="submit"
              class="w-full px-6 py-3.5 bg-[#3845AD] text-white rounded-xl hover:bg-[#3845AD]/90 transition-all duration-200 font-medium shadow-lg shadow-[#3845AD]/20 hover:shadow-xl hover:shadow-[#3845AD]/30"
            >
              Login
            </button>
  
            <!-- sign up-->
            <p class="text-center mt-6 text-gray-600">
              Don't have an account? 
              <a href="#" class="text-[#3845AD] hover:underline font-medium">Sign up</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const formData = ref({
    username: '',
    email: '',
    password: ''
  });
  
  const showPassword = ref(false);
  const togglePassword = () => {
    showPassword.value = !showPassword.value;
  };
  
  const handleSubmit = async () => {
    try {
      console.log('Login attempted:', {
        username: formData.value.username,
        email: formData.value.email,
        password: formData.value.password
      });
      //coding login masukkin kesini
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  </script>