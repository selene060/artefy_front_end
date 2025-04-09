<template>
  <div class="h-screen flex bg-[#FAFBFF]">
    <!-- sidebar komunitas -->
    <div class="w-20 bg-white border-r border-gray-100 flex flex-col items-center py-6">
      <!-- logo -->
      <div class="w-12 h-12 bg-[#3845AD] rounded-2xl flex items-center justify-center mb-8">
        <span class="text-white font-bold">A</span>
      </div>

      <!-- ikon komunitas -->
      <div class="space-y-4">
        <div v-for="i in 5" :key="i"
          class="w-12 h-12 rounded-2xl bg-gradient-to-br hover:scale-105 transition-all duration-300 cursor-pointer"
          :class="[
            i === 1 ? 'bg-[#F65035]' :
              i === 2 ? 'bg-[#7FBFA2]' :
                'bg-[#FFCD64]'
          ]">
        </div>
      </div>

      <!-- tambah komunitas button -->
      <button @click="isModalOpen = true"
        class="w-12 h-12 rounded-2xl border-2 border-dashed border-gray-300 mt-6 hover:border-[#3845AD] transition-colors flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>

    <!-- sidebar channel -->
    <div class="w-72 bg-white border-r border-gray-100">
      <!-- header komunitas -->
      <div class="p-6 border-b border-gray-100">
        <h2 class="text-xl font-bold text-[#3845AD] ">My Communities</h2>
        <!-- <div class="flex items-center gap-2 text-sm text-gray-500">
          <span class="w-2 h-2 rounded-full bg-green-400"></span>
          245 online
        </div> -->
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-500">LIST COMMUNITIES</h3>
          <button className="p-1 hover:bg-gray-100 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
        <div class="p-4">
          <div class="space-y-1">
            <div>
              <div v-for="community in communities" :key="community.id"
                class="px-3 py-2 rounded-xl cursor-pointer transition-all duration-300 flex items-center gap-2" :class="selectedChannel === community.id ?
                  'bg-[#F9CDCC]/10 text-[#F65035]' :
                  'text-gray-600 hover:bg-gray-50'" @click="selectedChannel = community.id">
                <img v-if="community.photo_community" :src="getPhotoUrl(community.photo_community)"
                  :alt="community.name" class="w-8 h-8 rounded-full object-cover" @error="(e) => {
                    console.error('Image load error for:', community.name, 'URL:', e.target.src)
                  }" />
                <span v-else class="w-8 h-8 flex items-center justify-center">
                  {{ getEmoji(community.name) }}
                </span>
                <span>{{ community.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Anggota -->
      <div class="p-4 mt-4">
        <h3 class="text-sm font-semibold text-gray-500 mb-4">ONLINE MEMBERS</h3>
        <div class="space-y-2">
          <div v-for="member in members" :key="member.name"
            class="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-50 cursor-pointer">
            <div class="relative">
              <div class="w-8 h-8 rounded-xl flex items-center justify-center" :class="member.bgColor">
                <span class="text-white font-regular">{{ member.name[0].toUpperCase() }}</span>
              </div>
              <div class="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-white">
              </div>
            </div>
            <span class="text-sm text-gray-700">{{ member.name }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- chat section -->
    <div class="flex-1 flex flex-col">
      <!-- chat header -->
      <div class="h-16 px-8 flex items-center justify-between bg-white border-b border-gray-100">
        <div class="flex items-center gap-3">
          <span class="text-2xl">#</span>
          <h2 class="font-semibold text-gray-800">
            {{ selectedChannel ? communities.find(c => c.id === selectedChannel)?.name : 'Select a channel' }}
          </h2>
          <span class="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {{ members.length }} members
          </span>
        </div>

        <div class="flex items-center gap-4">
          <button class="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button class="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          </button>
        </div>
      </div>

      <!-- bagian chat -->
      <div class="flex-1 overflow-y-auto px-6 py-6">
        <div class="space-y-6">
          <div v-for="message in messages" :key="message.id">
            <div class="group" :class="{ 'flex justify-end': message.sender_id === currentUserId }">
              <div class="flex items-start gap-3 max-w-[85%]"
                :class="{ 'flex-row-reverse': message.sender_id === currentUserId }">
                <!-- Avatar -->
                <div class="flex-shrink-0">
                  <div class="relative cursor-pointer">
                    <div :class="{
                      'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-transform hover:scale-105': true,
                      'bg-blue-600 text-white': message.sender_id === currentUserId,
                      'bg-gradient-to-br from-purple-500 to-pink-500 text-white': message.sender_id !== currentUserId
                    }">
                      {{ message.sender_name ? message.sender_name[0].toUpperCase() : 'U' }}
                    </div>
                    <div
                      class="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-[1.5px] border-white ring-2 ring-emerald-50">
                    </div>
                  </div>
                </div>

                <!-- Message Content -->
                <div class="relative group/message space-y-1">
                  <!-- Sender & Time -->
                  <div class="flex items-baseline gap-2"
                    :class="{ 'justify-end': message.sender_id === currentUserId }">
                    <span :class="{
                      'text-xs font-medium': true,
                      'text-blue-600 order-2': message.sender_id === currentUserId,
                      'text-gray-700': message.sender_id !== currentUserId
                    }">
                      {{ message.sender_name || 'Unknown User' }}
                    </span>
                    <span class="text-[11px] text-gray-400">
                      {{ formatMessageTime(message.sent_at) }}
                    </span>
                  </div>

                  <!-- Message Bubble -->
                  <div class="relative">
                    <div :class="{
                      'px-4 py-2.5 rounded-2xl max-w-[420px] break-words text-[14px] leading-relaxed shadow-sm': true,
                      'bg-blue-600 text-white rounded-tr-none': message.sender_id === currentUserId,
                      'bg-gray-100 text-gray-700 rounded-tl-none': message.sender_id !== currentUserId
                    }">
                      {{ message.message }}
                    </div>

                    <!-- Quick Actions -->
                    <div
                      class="absolute top-1/2 -translate-y-1/2 opacity-0 group-hover/message:opacity-100 transition-opacity duration-200"
                      :class="{ 'right-full mr-2': message.sender_id === currentUserId, 'left-full ml-2': message.sender_id !== currentUserId }">
                      <div class="flex items-center gap-0.5 bg-white shadow-lg rounded-full border border-gray-100 p-1">
                        <button class="p-1.5 hover:bg-gray-100 rounded-full transition-colors" title="React">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-gray-500" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>
                        <button class="p-1.5 hover:bg-gray-100 rounded-full transition-colors" title="Reply">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-gray-500" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Reactions -->
                  <div class="flex gap-1" :class="{ 'justify-end': message.sender_id === currentUserId }">
                    <div v-if="message.reactions?.length"
                      class="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white border border-gray-100 shadow-sm">
                      <span class="text-[12px]">👍</span>
                      <span class="text-xs font-medium text-gray-500">2</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Time Divider -->
            <div v-if="shouldShowTimeDivider(message, messages[index + 1])"
              class="flex items-center justify-center my-6">
              <div class="bg-gray-100/50 rounded-full px-3 py-1">
                <span class="text-xs font-medium text-gray-500">{{ formatDateDivider(message.sent_at) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ngirim pesan -->
      <div class="p-6 bg-white border-t border-gray-100">
        <div class="bg-[#FAFBFF] rounded-2xl p-2 flex items-end">
          <div class="flex-1">
            <textarea v-model="newMessage" rows="1" placeholder="Type your message..."
              class="w-full px-4 py-3 bg-transparent placeholder-gray-400 resize-none focus:outline-none"
              @keyup.enter="sendMessage"></textarea>
          </div>

          <div class="flex items-center gap-2 px-2">
            <button class="p-2 text-gray-400 hover:text-[#3845AD] rounded-xl transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
            <button class="p-2 text-gray-400 hover:text-[#3845AD] rounded-xl transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <button @click="sendMessage"
              class="ml-2 p-3 bg-[#3845AD] text-white rounded-xl hover:bg-[#3845AD]/90 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"
                  transform="rotate(90 12 12)" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    <AddCommunityModal :isOpen="isModalOpen" @close="isModalOpen = false" @submit="handleSubmit" />
  </div>
</template>
<script setup>
import { ref, watch, watchEffect, onMounted, onBeforeUnmount } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const API_URL = 'http://localhost:8000'
const WS_URL = 'ws://localhost:8000'
const communities = ref([])
const selectedChannel = ref(null)
const currentUserId = ref(null)
const members = ref([])
const messages = ref([])
const newMessage = ref('')
const isModalOpen = ref(false)
const socket = ref(null)

// Function to get logged in user ID
// const getCurrentUserId = () => {
//   const user = JSON.parse(localStorage.getItem('user'))
//   return user?.id
// }
const getCurrentUserId = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  // Konversi ke number jika sender_id berupa number
  return Number(user?.id) // atau String(user?.id) jika sender_id berupa string
}
const shouldShowTimeDivider = (currentMessage, nextMessage) => {
  if (!nextMessage) return false;
  const currentDate = new Date(currentMessage.sent_at);
  const nextDate = new Date(nextMessage.sent_at);

  // Show divider if messages are from different days or hours apart
  return currentDate.getDate() !== nextDate.getDate() ||
    currentDate.getHours() - nextDate.getHours() >= 1;
}

const formatDateDivider = (date) => {
  const messageDate = new Date(date);
  const today = new Date();

  if (messageDate.toDateString() === today.toDateString()) {
    return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  return messageDate.toLocaleDateString([], {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}
const handleSubmit = (formData) => {
  console.log('Form submitted:', formData)
  isModalOpen.value = false
}

// WebSocket connection management
const connectWebSocket = (channelId) => {
  if (socket.value) {
    socket.value.close()
  }

  const userId = getCurrentUserId()
  if (!userId || !channelId) return

  socket.value = new WebSocket(`${WS_URL}/ws/chat/${channelId}/?user_id=${userId}`)

  socket.value.onopen = () => {
    console.log('WebSocket connected')
  }

  socket.value.onmessage = (event) => {
    const data = JSON.parse(event.data)
    if (data.type === 'chat_message') {
      const newMessage = data.message

      // Check if message already exists to avoid duplicates
      const messageExists = messages.value.some(m => m.id === newMessage.id)
      if (!messageExists) {
        messages.value = [...messages.value, newMessage]
      }
    }
  }


  socket.value.onerror = (error) => {
    console.error('WebSocket error:', error)
  }

  socket.value.onclose = () => {
    console.log('WebSocket disconnected')
    // Attempt to reconnect after a delay
    setTimeout(() => {
      if (selectedChannel.value === channelId) {
        connectWebSocket(channelId)
      }
    }, 3000)
  }
}

// Function to fetch communities
const fetchCommunities = async () => {
  const userId = getCurrentUserId()
  if (!userId) {
    console.error('No user ID found')
    return
  }

  currentUserId.value = userId

  try {
    const response = await fetch(`${API_URL}/api/user-communities/${userId}/`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch communities')
    }

    const data = await response.json()
    communities.value = data

    communities.value.forEach(community => {
      console.log('Community:', {
        name: community.name,
        photo: community.photo_community,
        hasPhoto: !!community.photo_community
      })
    })
  } catch (err) {
    console.error('Failed to fetch communities:', err)
  }
}

// Function to fetch members
const fetchMembers = async (communityId) => {
  if (!communityId) return

  try {
    const response = await fetch(`${API_URL}/api/community-members/${communityId}/`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch members')
    }

    const data = await response.json()
    members.value = data
  } catch (err) {
    console.error('Failed to fetch members:', err)
  }
}

// Modified to use WebSocket for sending messages
const sendMessage = () => {
  if (!newMessage.value.trim() || !selectedChannel.value || !socket.value) return

  const userId = getCurrentUserId()
  if (!userId) {
    console.error('No user ID found')
    return
  }

  const messageData = {
    type: 'chat_message',
    message: newMessage.value,
    sender_id: userId
  }

  socket.value.send(JSON.stringify(messageData))
  newMessage.value = ''
}

// Initial message fetch when changing channels
const fetchMessages = async (communityId) => {
  if (!communityId) return

  try {
    const response = await fetch(
      `${API_URL}/api/community/${communityId}/messages/`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${authStore.accessToken}`
        },
      }
    )

    if (response.ok) {
      const data = await response.json()
      // Sort messages by sent_at if needed
      messages.value = data.messages.sort((a, b) =>
        new Date(a.sent_at) - new Date(b.sent_at)
      )
    }
  } catch (err) {
    console.error('Failed to fetch messages:', err)
  }
}


const getPhotoUrl = (photoPath) => {
  if (!photoPath) return null
  console.log('Processing photo path:', photoPath)
  const url = `${API_URL}/media/${photoPath}`
  console.log('Generated URL:', url)
  return url
}

const getEmoji = (name) => {
  const emojiMap = {
    MadeWithLove: '🎨',
    HandmadeTreasures: '💭',
    CraftingJoy: '🤝',
    CreativeHands: '📢',
  }

  const firstWord = name?.split(' ')[0]
  return emojiMap[firstWord] || '🎨'
}

const getWIBTimestamp = () => {
  const now = new Date()
  const wibOffset = 7 * 60 * 60 * 1000
  const wibTime = new Date(now.getTime() + wibOffset)

  const year = wibTime.getUTCFullYear()
  const month = String(wibTime.getUTCMonth() + 1).padStart(2, '0')
  const day = String(wibTime.getUTCDate()).padStart(2, '0')
  const hours = String(wibTime.getUTCHours()).padStart(2, '0')
  const minutes = String(wibTime.getUTCMinutes()).padStart(2, '0')
  const seconds = String(wibTime.getUTCSeconds()).padStart(2, '0')
  const milliseconds = String(wibTime.getUTCMilliseconds()).padStart(3, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`
}

const formatMessageTime = (dateString) => {
  if (!dateString) return "Invalid Date"

  try {
    // Handle both ISO format and your custom format
    const date = dateString.includes('T')
      ? new Date(dateString)
      : new Date(dateString.replace(' ', 'T'))

    return new Intl.DateTimeFormat('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(date)
  } catch (error) {
    console.error('Error formatting date:', error)
    return "Invalid Date"
  }
}

// Watch for selected channel changes
watch(selectedChannel, async (newChannelId) => {
  if (newChannelId) {
    // Clear existing messages first
    messages.value = []

    // Close existing WebSocket connection if any
    if (socket.value) {
      socket.value.close()
    }

    // Fetch all initial data in parallel
    await Promise.all([
      fetchMembers(newChannelId),
      fetchMessages(newChannelId)
    ])

    // Connect WebSocket for real-time updates
    connectWebSocket(newChannelId)
  }
})

// Watch for auth changes
watch(() => getCurrentUserId(), (newUserId) => {
  if (newUserId && newUserId !== currentUserId.value) {
    fetchCommunities()
  }
})

// Initialize data on component mount
onMounted(async () => {
  currentUserId.value = getCurrentUserId()
  console.log('Current User ID:', currentUserId.value)
  console.log('Type of currentUserId:', typeof currentUserId.value)
  // Log salah satu message untuk membandingkan
  console.log('Sample message sender_id:', messages[0]?.sender_id)
  console.log('Type of sender_id:', typeof messages[0]?.sender_id)
  await fetchCommunities()
})

// Clean up WebSocket connection on component unmount
onBeforeUnmount(() => {
  if (socket.value) {
    socket.value.close()
  }
})
</script>