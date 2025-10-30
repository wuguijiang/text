<template>
  <div class="section" :class="{ active: true }">
    <h2 class="section-title">作品集</h2>
    <div class="content">
      <div class="portfolio-grid">
        <div 
          v-for="(work, index) in portfolioWorks" 
          :key="index"
          class="portfolio-item"
          @click="openLightbox(index)"
        >
          <div class="portfolio-image">
            <img :src="work.image" :alt="work.title">
            <div class="portfolio-overlay">
              <h3 class="portfolio-title">{{ work.title }}</h3>
              <p class="portfolio-category">{{ work.category }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 作品集数据
const portfolioWorks = ref([
  {
    title: '城市印象',
    category: '风光摄影',
    image: '/placeholder.svg?height=400&width=600'
  },
  {
    title: '自然之美',
    category: '风光摄影',
    image: '/placeholder.svg?height=400&width=600'
  },
  {
    title: '人像故事',
    category: '人像摄影',
    image: '/placeholder.svg?height=400&width=600'
  },
  {
    title: '婚礼瞬间',
    category: '婚礼摄影',
    image: '/placeholder.svg?height=400&width=600'
  },
  {
    title: '街头纪实',
    category: '纪实摄影',
    image: '/placeholder.svg?height=400&width=600'
  },
  {
    title: '商业作品',
    category: '商业摄影',
    image: '/placeholder.svg?height=400&width=600'
  }
])

const openLightbox = (index) => {
  // 这里可以添加图片灯箱查看功能
}
</script>

<style scoped>
.section {
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: var(--color-text);
}

.content {
  font-size: 1.0625rem;
  line-height: 1.8;
}

/* 作品集网格样式 */
.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.portfolio-item {
  position: relative;
  overflow: hidden;
  border-radius: 0.75rem;
  cursor: pointer;
  aspect-ratio: 3/2;
}

.portfolio-image {
  width: 100%;
  height: 100%;
  position: relative;
}

.portfolio-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.portfolio-item:hover .portfolio-image img {
  transform: scale(1.1);
}

.portfolio-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  padding: 2rem 1.5rem 1.5rem;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.portfolio-item:hover .portfolio-overlay {
  transform: translateY(0);
}

.portfolio-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.25rem;
}

.portfolio-category {
  font-size: 0.875rem;
  color: rgba(255,255,255,0.8);
}

/* ==================== 响应式设计 ==================== */

@media (max-width: 1024px) {
  .portfolio-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
  
  .portfolio-grid {
    grid-template-columns: 1fr;
  }
}
</style>