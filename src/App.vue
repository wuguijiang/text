<template>
  <div class="container" :class="{ 'dark-theme': isDarkTheme }">
    <!-- 侧边栏导航区域 -->
    <Sidebar />
    
    <!-- 主内容区域 -->
    <main class="main-content">
      <router-view></router-view>
    </main>
    
    <!-- 主题切换按钮 -->
    <button class="theme-toggle-btn" @click="toggleTheme" :title="isDarkTheme ? '切换到浅色模式' : '切换到深色模式'">
      <svg v-if="isDarkTheme" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
      <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Sidebar from './components/Sidebar.vue'

const isDarkTheme = ref(false)

const toggleTheme = () => {
  isDarkTheme.value = !isDarkTheme.value
  localStorage.setItem('theme', isDarkTheme.value ? 'dark' : 'light')
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  isDarkTheme.value = savedTheme === 'dark'
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --color-bg: #ffffff;
  --color-bg-secondary: #f8fafc;
  --color-text: #1e293b;
  --color-text-secondary: #64748b;
  --color-accent: #3b82f6;
  --color-accent-hover: #2563eb;
  --color-border: #e2e8f0;
  --transition: all 0.3s ease;
}

.dark-theme {
  --color-bg: #0f172a;
  --color-bg-secondary: #1e293b;
  --color-text: #e2e8f0;
  --color-text-secondary: #94a3b8;
  --color-accent: #3b82f6;
  --color-accent-hover: #2563eb;
  --color-border: #334155;
}

.container {
  display: flex;
  min-height: 100vh;
  background-color: var(--color-bg);
}

.main-content {
  margin-left: 420px;
  flex: 1;
  padding: 3rem;
  max-width: 1200px;
}

/* ==================== 响应式设计 ==================== */

@media (max-width: 1024px) {
  .main-content {
    margin-left: 280px;
    padding: 2rem;
  }
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
  
  .main-content {
    margin-left: 0;
    padding: 2rem 1.5rem;
  }
}

/* 主题切换按钮样式 */
.theme-toggle-btn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: var(--color-accent);
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
  transition: var(--transition);
  z-index: 1000;
}

.theme-toggle-btn:hover {
  background-color: var(--color-accent-hover);
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(59, 130, 246, 0.5);
}

.theme-toggle-btn:active {
  transform: scale(0.95);
}

@media (max-width: 768px) {
  .theme-toggle-btn {
    bottom: 1.5rem;
    right: 1.5rem;
    width: 48px;
    height: 48px;
  }
}
</style>