<template>
  <div class="fixed right-0 top-0 bottom-0 w-[320px] bg-white p-5 overflow-y-auto scrollbar-hide shadow-[-2px_0_5px_rgba(0,0,0,0.08)] font-poppins">
    <div class="mb-5">
      <div class="relative">
        <input 
          type="text" 
          class="w-full py-2.5 px-9 border-[1.5px] border-[#3845AD] rounded-full text-sm focus:outline-none" 
          placeholder="Search..."
        >
        <div class="absolute left-3 top-1/2 -translate-y-1/2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-xl p-4 mb-5 shadow-[0_2px_4px_rgba(0,0,0,0.05)] border-[1.5px] border-[#3845AD]">
      <h3 class="text-base font-semibold mb-1.5">Upgrade to premium</h3>
      <p class="mb-2.5">Subscribe to access new features and, if eligible, receive a share of revenue</p>
      <button class="bg-black hover:bg-[#333] text-white px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300">Subscribe</button>
    </div>

    <div class="bg-white rounded-xl p-4 mb-5 shadow-[0_2px_4px_rgba(0,0,0,0.05)] border-[1.5px] border-[#3845AD]">
      <h3 class="text-base font-semibold mb-4">Explore New Community</h3>
      <div class="community-list">
        <div v-for="i in 4" :key="i" class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="w-[43px] h-[43px] rounded-full bg-[#e1e1e1] border-2 border-[#e1e1e1]"></div>
            <span class="text-sm text-[#333]">Community {{ i }}</span>
          </div>
          <button 
            @click="toggleJoin($event)" 
            class="join-btn bg-[#4F46E5] hover:bg-[#4338CA] text-white px-4 py-1.5 rounded-2xl text-sm font-medium transition-all duration-300"
          >
            Join
          </button>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-xl p-4 mb-5 shadow-[0_2px_4px_rgba(0,0,0,0.05)] border-[1.5px] border-[#3845AD]">
      <h3 class="text-base font-semibold mb-4">Popular Hashtag</h3>
      <div class="hashtag-list">
        <div v-for="i in 4" :key="i" class="flex items-center justify-between mb-3 pb-2 relative">
          <div class="text-[15px] text-[#333]">#Hashtag{{ i }}</div>
          <button 
            @click="toggleMenu($event, i)" 
            class="more-btn h-8 w-8 flex items-center justify-center rounded-full text-[#666] hover:text-[#2196F3] transition-all duration-300 -translate-y-[1px]"
          >
            <svg viewBox="0 0 24 24" class="w-5 h-5 fill-current">
              <circle cx="12" cy="12" r="2"/>
              <circle cx="19" cy="12" r="2"/>
              <circle cx="5" cy="12" r="2"/>
            </svg>
          </button>
          <div 
            class="dropdown-menu hidden active:flex items-center gap-2 absolute right-0 top-full bg-white rounded-2xl py-2 px-4 shadow-[0_2px_8px_rgba(0,0,0,0.1)] z-[1000] border border-[#e1e1e1] min-w-[180px] mt-2"
          >
            <div 
              @click="handleReport($event, i)" 
              class="w-full flex items-center gap-2 cursor-pointer group hover:bg-[#FFF3E0] py-1"
            >
              <svg 
                class="w-5 h-5 transition-colors duration-300 stroke-current group-hover:stroke-[#FF9800]" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 9V14M12 21.41H5.94C2.47 21.41 1.02 18.93 2.7 15.9L5.82 10.28L8.76 5.01001C10.54 1.79001 13.46 1.79001 15.24 5.01001L18.18 10.29L21.3 15.91C22.98 18.94 21.52 21.42 18.06 21.42H12V21.41Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M11.995 17H12.004" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span class="text-sm text-[#333] group-hover:text-[#FF9800] transition-colors duration-300">Report Hashtag</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
const toggleJoin = (event) => {
  const button = event.target
  button.classList.toggle('joined')
  button.textContent = button.classList.contains('joined') ? 'Joined' : 'Join'
}

const toggleMenu = (event, index) => {
  event.stopPropagation()
  
  const buttons = document.querySelectorAll('.more-btn')
  const menus = document.querySelectorAll('.dropdown-menu')
  
  buttons.forEach((btn, i) => {
    if (i !== index) {
      btn.classList.remove('active')
      menus[i].classList.remove('active')
    }
  })

  buttons[index].classList.toggle('active')
  menus[index].classList.toggle('active')
}
</script>