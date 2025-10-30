<template>
  <div class="about-page">
    <!-- 欢迎横幅 -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">
          <span class="wave">👋</span>
          你好，我是 <span class="highlight">梨花詩</span>
        </h1>
        <p class="hero-subtitle typing-text">{{ displayText }}<span class="cursor">|</span></p>
        <div class="hero-tags">
          <span class="tag">📷 摄影师</span>
          <span class="tag">💻 前端开发</span>
          <span class="tag">🎨 视觉艺术</span>
          <span class="tag">✈️ 旅行爱好者</span>
        </div>
      </div>
    </section>

    <!-- 数据统计 -->
    <section class="stats-section">
      <div class="stat-card" v-for="stat in stats" :key="stat.label">
        <div class="stat-icon">{{ stat.icon }}</div>
        <div class="stat-number" ref="statNumbers">{{ animatedStats[stat.key] || 0 }}{{ stat.suffix }}</div>
        <div class="stat-label">{{ stat.label }}</div>
      </div>
    </section>

    <!-- 关于我 -->
    <section class="intro-section">
      <h2 class="section-title">
        <span class="title-icon">✨</span>
        关于我
      </h2>
      <div class="intro-content">
        <div class="intro-text">
          <p class="intro-paragraph">
            我是一名<span class="highlight-text">前端学习者</span>，同时也是一个<span class="highlight-text">摄影爱好者</span>。
            喜欢在学习之余拿起相机，用镜头记录生活中那些打动人心的瞬间。
          </p>
          <p class="intro-paragraph">
            虽然不是专业摄影师，但我享受按下快门的每一刻。从<strong>街头巷尾的市井烟火</strong>到<strong>山川湖海的壮丽风光</strong>，
            摄影让我学会用不同的视角观察世界，发现生活中容易被忽略的美好。
          </p>
          <blockquote class="quote">
            <span class="quote-icon">💭</span>
            "代码构建世界，镜头记录生活" — 这是我的生活方式
          </blockquote>
        </div>
      </div>
    </section>

    <!-- 兴趣爱好 -->
    <section class="services-section">
      <h2 class="section-title">
        <span class="title-icon">❤️</span>
        兴趣爱好
      </h2>
      <div class="services-grid">
        <div class="service-card" v-for="service in services" :key="service.title">
          <div class="service-icon">{{ service.icon }}</div>
          <h3 class="service-title">{{ service.title }}</h3>
          <p class="service-desc">{{ service.description }}</p>
          <div class="service-price">{{ service.price }}</div>
        </div>
      </div>
    </section>

    <!-- 技能展示 -->
    <section class="skills-section">
      <h2 class="section-title">
        <span class="title-icon">🛠️</span>
        技能
      </h2>
      <div class="skills-container">
        <div class="skill-category">
          <h3 class="category-title">摄影技能</h3>
          <div class="skill-bars">
            <div class="skill-item" v-for="skill in photographySkills" :key="skill.name">
              <div class="skill-info">
                <span class="skill-name">{{ skill.name }}</span>
                <span class="skill-percent">{{ skill.level }}%</span>
              </div>
              <div class="skill-bar">
                <div class="skill-progress" :style="{ width: skill.level + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="skill-category">
          <h3 class="category-title">开发技能</h3>
          <div class="skill-bars">
            <div class="skill-item" v-for="skill in devSkills" :key="skill.name">
              <div class="skill-info">
                <span class="skill-name">{{ skill.name }}</span>
                <span class="skill-percent">{{ skill.level }}%</span>
              </div>
              <div class="skill-bar">
                <div class="skill-progress" :style="{ width: skill.level + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 联系方式 -->
    <section class="contact-section">
      <h2 class="section-title">
        <span class="title-icon">📮</span>
        联系我
      </h2>
      <div class="contact-grid">
        <a href="mailto:contact@example.com" class="contact-card">
          <div class="contact-icon">📧</div>
          <div class="contact-label">邮箱</div>
          <div class="contact-value">2926044894@qq.com</div>
        </a>
        <a href="https://weibo.com" target="_blank" class="contact-card">
          <div class="contact-icon">🌐</div>
          <div class="contact-label">gitHub</div>
          <div class="contact-value">wuguijiang</div>
        </a>
        <div class="contact-card">
          <div class="contact-icon">📱</div>
          <div class="contact-label">微信</div>
          <div class="contact-value">JSL_UN</div>
        </div>
        <div class="contact-card">
          <div class="contact-icon">📍</div>
          <div class="contact-label">位置</div>
          <div class="contact-value">江西·南昌</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 打字机效果
const fullText = '热爱摄影与代码的探索者 🎨✨'
const displayText = ref('')
let typeIndex = 0

const typeText = () => {
  if (typeIndex < fullText.length) {
    displayText.value += fullText.charAt(typeIndex)
    typeIndex++
    setTimeout(typeText, 100)
  }
}

// 统计数据
const stats = [
  { key: 'works', icon: '📸', label: '摄影作品', value: 200, suffix: '+' },
  { key: 'projects', icon: '💻', label: '代码项目', value: 30, suffix: '+' },
  { key: 'experience', icon: '⏱️', label: '爱好时长', value: 3, suffix: '年' },
  { key: 'photos', icon: '🎞️', label: '快门次数', value: 50000, suffix: '+' }
]

const animatedStats = ref({
  works: 200,
  projects: 30,
  experience: 3,
  photos: 50000
})

// 兴趣爱好
const services = [
  {
    icon: '📷',
    title: '街拍记录',
    description: '用镜头捕捉城市的角落，记录生活中的美好瞬间',
    price: '个人爱好'
  },
  {
    icon: '🌅',
    title: '风光摄影',
    description: '热爱旅行，喜欢拍摄日出日落、山川湖海的壮丽景色',
    price: '业余创作'
  },
  {
    icon: '💻',
    title: '前端开发',
    description: '专注于 Web 开发，喜欢用代码实现创意和想法',
    price: '职业方向'
  },
  {
    icon: '🎨',
    title: '视觉设计',
    description: '对美学有追求，享受摄影与设计结合的创作过程',
    price: '兴趣探索'
  }
]

// 技能数据
const photographySkills = [
  { name: '风光摄影', level: 75 },
  { name: '街拍记录', level: 70 },
  { name: '后期调色', level: 65 },
  { name: '构图美学', level: 72 }
]

const devSkills = [
  { name: 'CSS/SCSS', level: 80 },
   { name: 'JavaScript', level: 70},
   { name: 'Vue.js', level: 60 },
 
  
  { name: 'Node.js', level: 30 }
]

onMounted(() => {
  typeText()
})
</script>

<style scoped>
.about-page {
  animation: fadeIn 0.8s ease;
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

/* ==================== 欢迎横幅 ==================== */
.hero-section {
  background: linear-gradient(135deg, var(--color-accent) 0%, #8b5cf6 100%);
  padding: 4rem 3rem;
  border-radius: 1.5rem;
  margin-bottom: 3rem;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -10%;
  width: 400px;
  height: 400px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(10deg); }
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: 3rem;
  font-weight: 800;
  color: white;
  margin-bottom: 1rem;
}

.wave {
  display: inline-block;
  animation: wave 2s ease-in-out infinite;
}

@keyframes wave {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(20deg); }
  75% { transform: rotate(-20deg); }
}

.highlight {
  background: linear-gradient(120deg, #fff 0%, #ffd700 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 2rem;
  min-height: 2rem;
}

.typing-text {
  display: inline-block;
}

.cursor {
  display: inline-block;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}

.hero-tags {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.tag {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 0.5rem 1.25rem;
  border-radius: 2rem;
  color: white;
  font-size: 0.95rem;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.tag:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

/* ==================== 数据统计 ==================== */
.stats-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stat-card {
  background: var(--color-bg-secondary);
  padding: 2rem;
  border-radius: 1rem;
  text-align: center;
  border: 2px solid var(--color-border);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(59, 130, 246, 0.2);
  border-color: var(--color-accent);
}

.stat-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--color-accent);
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1rem;
  color: var(--color-text-secondary);
  font-weight: 500;
}

/* ==================== 通用样式 ==================== */
.section-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: var(--color-text);
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.title-icon {
  font-size: 2rem;
}

/* ==================== 介绍区域 ==================== */
.intro-section {
  margin-bottom: 3rem;
}

.intro-content {
  background: var(--color-bg-secondary);
  padding: 2.5rem;
  border-radius: 1rem;
  border: 2px solid var(--color-border);
}

.intro-paragraph {
  font-size: 1.125rem;
  line-height: 1.8;
  color: var(--color-text);
  margin-bottom: 1.5rem;
}

.highlight-text {
  color: var(--color-accent);
  font-weight: 600;
}

.quote {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
  border-left: 4px solid var(--color-accent);
  padding: 1.5rem;
  margin: 2rem 0;
  border-radius: 0.5rem;
  font-style: italic;
  color: var(--color-text-secondary);
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.quote-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

/* ==================== 服务项目 ==================== */
.services-section {
  margin-bottom: 3rem;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.service-card {
  background: var(--color-bg-secondary);
  padding: 2rem;
  border-radius: 1rem;
  border: 2px solid var(--color-border);
  transition: all 0.3s ease;
  text-align: center;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(59, 130, 246, 0.15);
  border-color: var(--color-accent);
}

.service-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.service-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0.75rem;
}

.service-desc {
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.service-price {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-accent);
}

/* ==================== 技能展示 ==================== */
.skills-section {
  margin-bottom: 3rem;
}

.skills-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.skill-category {
  background: var(--color-bg-secondary);
  padding: 2rem;
  border-radius: 1rem;
  border: 2px solid var(--color-border);
}

.category-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 1.5rem;
}

.skill-bars {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.skill-item {
  width: 100%;
}

.skill-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.skill-name {
  font-size: 0.95rem;
  color: var(--color-text);
  font-weight: 500;
}

.skill-percent {
  font-size: 0.875rem;
  color: var(--color-accent);
  font-weight: 600;
}

.skill-bar {
  height: 8px;
  background: var(--color-border);
  border-radius: 4px;
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  background: linear-gradient(90deg, var(--color-accent) 0%, #8b5cf6 100%);
  border-radius: 4px;
  transition: width 1s ease;
  animation: slideIn 1s ease;
}

@keyframes slideIn {
  from { width: 0; }
}

/* ==================== 联系方式 ==================== */
.contact-section {
  margin-bottom: 2rem;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.contact-card {
  background: var(--color-bg-secondary);
  padding: 2rem 1.5rem;
  border-radius: 1rem;
  border: 2px solid var(--color-border);
  text-align: center;
  transition: all 0.3s ease;
  text-decoration: none;
  display: block;
}

.contact-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(59, 130, 246, 0.15);
  border-color: var(--color-accent);
}

.contact-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.contact-label {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.contact-value {
  font-size: 1rem;
  color: var(--color-text);
  font-weight: 600;
}

/* ==================== 响应式设计 ==================== */
@media (max-width: 768px) {
  .hero-section {
    padding: 3rem 2rem;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1.125rem;
  }

  .stats-section {
    grid-template-columns: repeat(2, 1fr);
  }

  .stat-number {
    font-size: 2rem;
  }

  .services-grid,
  .skills-container,
  .contact-grid {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: 1.5rem;
  }
}
</style>