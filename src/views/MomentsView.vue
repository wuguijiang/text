<template>
  <div class="section" :class="{ active: true }">
    <h2 class="section-title">互动空间</h2>
    <div class="content">
      <!-- 上传区域 -->
      <div class="upload-section">
        <textarea 
          v-model="newMoment.text" 
          placeholder="分享你的摄影故事..."
          class="moment-textarea"
          rows="3"
        ></textarea>
        
        <div class="upload-controls">
          <div class="image-preview-container">
            <div 
              v-for="(preview, index) in imagePreviews" 
              :key="index"
              class="image-preview"
            >
              <img :src="preview" alt="预览图">
              <button 
                @click="removeImage(index)"
                class="remove-image-btn"
                type="button"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
          
          <div class="upload-actions">
            <label class="upload-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
              <span>选择图片</span>
              <input 
                type="file" 
                @change="handleImageUpload"
                accept="image/*"
                multiple
                style="display: none;"
              >
            </label>
            
            <button 
              @click="publishMoment"
              class="publish-btn"
              :disabled="!canPublish || isUploading"
            >
              {{ isUploading ? '上传中...' : '发布' }}
            </button>
          </div>
        </div>
      </div>

      <!-- 动态列表 -->
      <div class="moments-list">
        <div 
          v-for="(moment, index) in moments" 
          :key="index"
          class="moment-card"
        >
          <div class="moment-header">
            <div class="moment-avatar">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div class="moment-info">
              <h4 class="moment-author">访客</h4>
              <p class="moment-time">{{ formatTime(moment.created_at) }}</p>
            </div>
          </div>
          
          <p class="moment-text">{{ moment.text }}</p>
          
          <div 
            v-if="moment.images && moment.images.length > 0"
            class="moment-images"
            :class="'images-count-' + moment.images.length"
          >
            <div 
              v-for="(image, imgIndex) in moment.images" 
              :key="imgIndex"
              class="moment-image"
            >
              <img :src="image" :alt="'图片 ' + (imgIndex + 1)">
            </div>
          </div>
          
          <div class="moment-actions">
            <button class="action-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <span>喜欢</span>
            </button>
            <button class="action-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <span>评论</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// 互动空间相关数据
const newMoment = ref({
  text: '',
  images: []
})

const imagePreviews = ref([])

// 添加上传状态
const isUploading = ref(false)

// 从空数组开始，从数据库加载
const moments = ref([])

// 加载状态
const isLoading = ref(true)

// 计算属性
const canPublish = computed(() => {
  return newMoment.value.text.trim() !== '' || imagePreviews.value.length > 0
})

// 方法定义
const handleImageUpload = (event) => {
  const files = event.target.files
  if (!files || files.length === 0) return
  
  // 限制最多上传9张图片
  const remainingSlots = 9 - imagePreviews.value.length
  const filesToProcess = Array.from(files).slice(0, remainingSlots)
  
  filesToProcess.forEach(file => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        imagePreviews.value.push(e.target.result)
        newMoment.value.images.push(file)
      }
      reader.readAsDataURL(file)
    }
  })
  
  // 清空input,允许重复选择同一文件
  event.target.value = ''
}

const removeImage = (index) => {
  imagePreviews.value.splice(index, 1)
  newMoment.value.images.splice(index, 1)
}

// 加载动态列表
const loadMoments = async () => {
  try {
    isLoading.value = true
    const response = await fetch('/api/moments')
    
    if (!response.ok) {
      throw new Error(`加载失败 (${response.status})`)
    }
    
    const data = await response.json()
    moments.value = data
  } catch (error) {
    console.error('加载动态失败:', error)
  } finally {
    isLoading.value = false
  }
}

const publishMoment = async () => {
  if (!canPublish.value || isUploading.value) return
  
  isUploading.value = true
  
  try {
    const uploadedImageUrls = []
    
    for (let i = 0; i < newMoment.value.images.length; i++) {
      const file = newMoment.value.images[i]
      
      const timestamp = Date.now()
      const randomStr = Math.random().toString(36).substring(2, 9)
      const fileExtension = file.name.split('.').pop() || 'jpg'
      const filename = `photo-${timestamp}-${randomStr}.${fileExtension}`
      
      const base64Data = imagePreviews.value[i]
      
      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filename: filename,
          base64Data: base64Data,
        }),
      })
      
      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json().catch(() => ({}))
        throw new Error(errorData.details || `图片上传失败 (${uploadResponse.status})`)
      }
      
      const result = await uploadResponse.json()
      uploadedImageUrls.push(result.url)
    }
    
    const saveResponse = await fetch('/api/moments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: newMoment.value.text,
        images: uploadedImageUrls,
      }),
    })
    
    if (!saveResponse.ok) {
      const errorData = await saveResponse.json().catch(() => ({}))
      throw new Error(errorData.details || `保存动态失败 (${saveResponse.status})`)
    }
    
    await loadMoments()
    
    newMoment.value.text = ''
    newMoment.value.images = []
    imagePreviews.value = []
    
    alert('🎉 发布成功！')
    
  } catch (error) {
    console.error('发布失败:', error)
    alert('发布失败：' + error.message)
  } finally {
    isUploading.value = false
  }
}

// 页面加载时，获取动态列表
onMounted(() => {
  loadMoments()
})

// 格式化时间显示
const formatTime = (timestamp) => {
  if (!timestamp) return '刚刚'
  
  const now = new Date()
  const time = new Date(timestamp)
  const diff = now - time
  
  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour
  
  if (diff < minute) {
    return '刚刚'
  } else if (diff < hour) {
    return Math.floor(diff / minute) + '分钟前'
  } else if (diff < day) {
    return Math.floor(diff / hour) + '小时前'
  } else if (diff < 7 * day) {
    return Math.floor(diff / day) + '天前'
  } else {
    return time.toLocaleDateString('zh-CN')
  }
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

/* 互动空间样式 */
.upload-section {
  background-color: var(--color-bg-secondary);
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid var(--color-border);
}

.moment-textarea {
  width: 100%;
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  padding: 1rem;
  color: var(--color-text);
  font-size: 0.9375rem;
  line-height: 1.6;
  resize: vertical;
  font-family: inherit;
  margin-bottom: 1rem;
}

.moment-textarea:focus {
  outline: none;
  border-color: var(--color-accent);
}

.moment-textarea::placeholder {
  color: var(--color-text-secondary);
}

.upload-controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.image-preview-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 0.75rem;
}

.image-preview {
  position: relative;
  aspect-ratio: 1;
  border-radius: 0.5rem;
  overflow: hidden;
  background-color: var(--color-bg);
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-image-btn {
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  background-color: rgba(0,0,0,0.6);
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  transition: var(--transition);
}

.remove-image-btn:hover {
  background-color: rgba(239, 68, 68, 0.8);
}

.upload-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.upload-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: var(--transition);
  font-size: 0.9375rem;
}

.upload-btn:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.publish-btn {
  padding: 0.625rem 2rem;
  background-color: var(--color-accent);
  border: none;
  border-radius: 0.5rem;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  font-size: 0.9375rem;
}

.publish-btn:hover:not(:disabled) {
  background-color: var(--color-accent-hover);
}

.publish-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.moments-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.moment-card {
  background-color: var(--color-bg-secondary);
  border-radius: 0.75rem;
  padding: 1.5rem;
  border: 1px solid var(--color-border);
}

.moment-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.moment-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: var(--color-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);
}

.moment-info {
  flex: 1;
}

.moment-author {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.25rem;
}

.moment-time {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
}

.moment-text {
  color: var(--color-text);
  line-height: 1.6;
  margin-bottom: 1rem;
  font-size: 0.9375rem;
}

.moment-images {
  display: grid;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.moment-images.images-count-1 {
  grid-template-columns: 1fr;
  max-width: 400px;
}

.moment-images.images-count-2,
.moment-images.images-count-4 {
  grid-template-columns: repeat(2, 1fr);
}

.moment-images.images-count-3,
.moment-images.images-count-5,
.moment-images.images-count-6,
.moment-images.images-count-7,
.moment-images.images-count-8,
.moment-images.images-count-9 {
  grid-template-columns: repeat(3, 1fr);
}

.moment-image {
  aspect-ratio: 1;
  border-radius: 0.5rem;
  overflow: hidden;
  background-color: var(--color-bg);
}

.moment-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
  transition: var(--transition);
}

.moment-image img:hover {
  transform: scale(1.05);
}

.moment-actions {
  display: flex;
  gap: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: var(--transition);
  font-size: 0.875rem;
  padding: 0.5rem;
  border-radius: 0.375rem;
}

.action-btn:hover {
  color: var(--color-accent);
  background-color: rgba(59, 130, 246, 0.1);
}

/* ==================== 响应式设计 ==================== */

@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
  
  .image-preview-container {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  }
  
  .upload-actions {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .upload-btn,
  .publish-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>