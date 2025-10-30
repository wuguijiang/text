<template>
  <div class="section" :class="{ active: true }">
    <h2 class="section-title">
      <span class="title-icon">🎓</span>
      成长轨迹
    </h2>
    <div class="content">
      <div class="timeline">
        <div 
          v-for="(exp, index) in experiences" 
          :key="index"
          class="timeline-item"
        >
          <div class="timeline-date">{{ exp.date }}</div>
          <div class="timeline-content">
            <div class="timeline-header">
              <div class="timeline-icon">{{ exp.icon }}</div>
              <h3 class="timeline-title">{{ exp.title }}</h3>
            </div>
            <p class="timeline-description">{{ exp.description }}</p>
            <div class="tags">
              <span 
                v-for="tag in exp.tags" 
                :key="tag"
                class="tag"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 学习成长经历
const experiences = ref([
  {
    date: '2023 — 至今',
    icon: '💻',
    title: '前端开发学习之旅',
    description: '深入学习 Vue3、JavaScript 等前端技术栈，通过实战项目提升编程能力。参与开源项目，搭建个人作品网站，探索前端开发的各种可能性。坚持每天写代码，在技术社区分享学习心得。',
    tags: ['Vue.js', 'JavaScript', '项目实战', '开源贡献']
  },
  {
    date: '2022 — 至今',
    icon: '📸',
    title: '摄影爱好探索',
    description: '从最初的随手拍到现在对摄影有了更深的理解。喜欢在校园、街头、旅行途中捕捉美好瞬间。学习构图、光影、后期调色等技巧，用镜头记录生活中的每一份感动。累计拍摄 50000+ 张照片。',
    tags: ['风光摄影', '街拍记录', 'Lightroom', '后期调色']
  },
  {
    date: '2022 — 2023',
    icon: '🎯',
    title: '大学项目经历',
    description: '参与多个课程项目和校园活动，包括网页设计、小程序开发等。在团队协作中学习沟通与项目管理，提升问题解决能力。通过实践加深对前端技术的理解，建立了完整的开发思维。',
    tags: ['团队协作', '网页设计', '项目管理', '问题解决']
  },
  {
    date: '2021 — 2022',
    icon: '🌱',
    title: '编程启蒙阶段',
    description: '开始接触编程，从 HTML/CSS 基础到 JavaScript，一步步探索 Web 开发的世界。搭建第一个个人网站，完成第一个小项目，感受到代码的魅力。这是我编程之路的起点，也让我找到了真正热爱的方向。',
    tags: ['HTML/CSS', 'JavaScript基础', '自学能力', '兴趣驱动']
  }
])
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
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.title-icon {
  font-size: 2.5rem;
}

.content {
  font-size: 1.0625rem;
  line-height: 1.8;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.timeline-item {
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 2rem;
  position: relative;
}

.timeline-date {
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
  padding-top: 0.25rem;
}

.timeline-content {
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--color-border);
}

.timeline-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.timeline-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.timeline-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: var(--color-text);
}

.timeline-description {
  color: var(--color-text-secondary);
  margin-bottom: 1rem;
  line-height: 1.7;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background-color: rgba(59, 130, 246, 0.1);
  color: var(--color-accent);
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.8125rem;
  font-weight: 500;
  border: 1px solid rgba(59, 130, 246, 0.2);
}

/* ==================== 响应式设计 ==================== */

@media (max-width: 1024px) {
  .timeline-item {
    grid-template-columns: 120px 1fr;
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
  
  .timeline-item {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  
  .timeline-date {
    padding-top: 0;
  }
}
</style>