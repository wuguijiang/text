<template>
  <aside class="sidebar">
    <!-- 个人信息改为摄影师 -->
    <div class="profile">
      <h1 class="name">梨花詩</h1>
      <p class="title">摄影师&前端程序员</p>
      <p class="tagline">拍照免费 删照五十 代码报错 能跑就行</p>
      
    </div>

    <!-- 导航菜单更新 -->
    <nav class="nav">
      <router-link v-for="section in sections" :key="section.id" :to="section.path" class="nav-link"
        active-class="active">
        {{ section.name }}
      </router-link>
    </nav>

    <!-- 社交媒体链接 -->
    <div class="social-links">
      <router-link to="/musics" aria-label="Music">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 18V5l12-2v13"></path>
          <circle cx="6" cy="18" r="3"></circle>
          <circle cx="18" cy="16" r="3"></circle>
        </svg>
      </router-link>
      <a href="https://weibo.com" target="_blank" aria-label="Weibo">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
          <line x1="9" y1="9" x2="9.01" y2="9"></line>
          <line x1="15" y1="9" x2="15.01" y2="9"></line>
        </svg>
      </a>
      <a href="mailto:zhangsan@example.com" aria-label="Email">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
      </a>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'

// 导航菜单数据
const sections = ref([
  { id: 'about', name: '关于我', path: '/' },
  { id: 'experience', name: '成长轨迹', path: '/experience' },
  { id: 'portfolio', name: '作品集', path: '/portfolio' },
  { id: 'moments', name: '互动空间', path: '/moments' }
])
</script>

<style scoped>
.sidebar {
  width: 320px;
  background-color: var(--color-bg-secondary);
  padding: 3rem 2rem;
  position: fixed;
  height: 100vh;
  overflow-y: auto;
  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.profile {
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--color-border);
}

.name {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--color-text);
}

.title {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  margin-bottom: 0.75rem;
}

.tagline {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  line-height: 1.5;
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-link {
  color: var(--color-text-secondary);
  text-decoration: none;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  transition: var(--transition);
  font-size: 0.9375rem;
  position: relative;
  display: block;
  cursor: pointer;
}

.nav-link::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 0;
  background-color: var(--color-accent);
  transition: var(--transition);
  border-radius: 0 2px 2px 0;
}

.nav-link:hover {
  color: var(--color-text);
  background-color: rgba(59, 130, 246, 0.1);
}

.nav-link.active {
  color: var(--color-accent);
  background-color: rgba(59, 130, 246, 0.1);
}

.nav-link.active::before {
  height: 24px;
}

.social-links {
  display: flex;
  gap: 1rem;
  margin-top: auto;
}

.social-links a {
  color: var(--color-text-secondary);
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 0.5rem;
}

.social-links a:hover {
  color: var(--color-accent);
  background-color: rgba(59, 130, 246, 0.1);
}

/* ==================== 响应式设计 ==================== */

@media (max-width: 1024px) {
  .sidebar {
    width: 280px;
  }
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    position: relative;
    height: auto;
    padding: 2rem 1.5rem;
  }
}

.sidebar::-webkit-scrollbar {
  width: 6px;
}

.sidebar::-webkit-scrollbar-track {
  background: var(--color-bg);
}

.sidebar::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: 3px;
}

.sidebar::-webkit-scrollbar-thumb:hover {
  background: var(--color-accent);
}
</style>