<template>
  <div class="music-page">
    <!-- 顶部两个音乐平台盒子 -->
    <div class="platform-boxes">
      <div class="platform-box qq-music">
        <h2>QQ音乐--晚风~</h2>
        <p>周杰伦撑起一片天</p>
        <a href="https://c6.y.qq.com/base/fcgi-bin/u?__=7rXwcX4eJQYJ" target="_blank" rel="noopener noreferrer"> <button class="listen-btn">立即体验</button></a>
      </div>
      <div class="platform-box netease-music">
        <h2>网易云音乐--爱吹晚枫</h2>
        <p>网易云的夜晚，听见emo好时光</p>
        <a href="https://music.163.com/playlist?id=2458035842&uct2=U2FsdGVkX18Yl7qXWqLM7wvcDAWAieIyxrbI+qIRIxk=" target="_blank" rel="noopener noreferrer">
          <button class="listen-btn">立即体验</button></a>
      </div>
    </div>

    <!-- 我喜欢的音乐展示区域 -->
    <div class="favorite-music-section">
      <h2>今日推荐</h2>
      <div class="music-grid">
        <div v-for="(song, index) in todaylikeSongs" :key="index" class="music-item" @click="playMusic(song)">
          <div class="album-cover">
            <img :src="song.cover" :alt="song.title">
            <div class="play-overlay">
              <span class="play-icon">▶</span>
            </div>
          </div>
          <div class="music-info">
            <h3>{{ song.title }}</h3>
            <p>{{ song.artist }}</p>
          </div>
        </div>
      </div>
      <h2>我喜爱的音乐</h2>
      <div class="music-grid">
        <div v-for="(song, index) in favoriteSongs" :key="index" class="music-item" @click="playMusic(song)">
          <div class="album-cover">
            <img :src="song.cover" :alt="song.title">
            <div class="play-overlay">
              <span class="play-icon">▶</span>
            </div>
          </div>
          <div class="music-info">
            <h3>{{ song.title }}</h3>
            <p>{{ song.artist }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MusicPage',
  data() {
    return {
      todaylikeSongs: [
        {
          title: '柏松',
          artist: '世间美好与你环环相扣',
          cover: 'http://p2.music.126.net/DK1_4sP_339o5rowMdPXdw==/109951164071024476.jpg?param=130y130'
        }, {
          title: '夏天Alex',
          artist: '等我先说',
          cover: 'http://p1.music.126.net/IuiUzV2flAUoA_sci7gYsA==/109951163573794210.jpg?param=130y130'
        }, {
          title: 'July',
          artist: 'Beyond The Memory',
          cover: 'http://p1.music.126.net/ZerR7iaaF7K0gB92oDZjFQ==/783951790611000.jpg?param=130y130'
        }
      ],
      favoriteSongs: [
        {
          title: '天平',
          artist: '银河系长 / Kumark漱一',
          cover: 'http://p1.music.126.net/OQ2eOV056ugDuQa1sIvP6A==/109951169974693525.jpg?param=130y130'
        },
        {
          title: '되돌아가다',
          artist: 'July',
          cover: 'http://p2.music.126.net/O4fSX9-tfHsnS5Q_yUfG-w==/109951163646922967.jpg?param=130y130'
        },
        {
          title: '第57次取消发送',
          artist: '菲菲公主（陆绮菲）',
          cover: 'http://p2.music.126.net/urn8LGHXlT4XLnpliFBXLQ==/109951171482450403.jpg?param=130y130'
        },
        {
          title: '下一个天亮',
          artist: '郭静',
          cover: 'http://p2.music.126.net/-ccXZvLLbvLQc99YEbylUA==/109951171316025348.jpg?param=130y130'
        },
        {
          title: '单车',
          artist: '陈奕迅',
          cover: 'http://p1.music.126.net/1I8ELtF6pswNRAVs4CwjfA==/109951166656425505.jpg?param=130y130'
        },
        {
          title: '罗生门（Follow）',
          artist: '梨冻紧 / Wiz_H张子豪',
          cover: 'http://p2.music.126.net/yN1ke1xYMJ718FiHaDWtYQ==/109951165076380471.jpg?param=130y130'
        },
        {
          title: '淘汰',
          artist: '陈奕迅',
          cover: 'http://p2.music.126.net/o_OjL_NZNoeog9fIjBXAyw==/18782957139233959.jpg?param=130y130'
        },
        {
          title: '怀抱（Cover 弹壳）',
          artist: 'GuiltLy',
          cover: 'http://p1.music.126.net/nkI3i-bDtTh417Yw4Ovz3Q==/109951167044863354.jpg?param=130y130'
        }
      ]
    }
  },
  methods: {
    playMusic(song) {
      alert(`正在播放: ${song.title} - ${song.artist}`)
    }
  }
}
</script>

<style scoped>
.music-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

/* 平台盒子容器 */
.platform-boxes {
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
}

.platform-box {
  flex: 1;
  height: 200px;
  border-radius: 10px;
  padding: 30px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.platform-box h2 {
  font-size: 28px;
  margin-bottom: 10px;
  z-index: 2;
}

.platform-box p {
  font-size: 16px;
  margin-bottom: 20px;
  z-index: 2;
}

.listen-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.5);
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  z-index: 2;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
}

.listen-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.qq-music {
  background: linear-gradient(135deg, #77e14d 0%, #89ff9d 100%);
}

.netease-music {
  background: linear-gradient(135deg, #f04d4d 0%, #e63e3e 100%);
}

/* 我喜欢的音乐部分 */
.favorite-music-section h2 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 28px;
  color: #333;
}

.music-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
}

.music-item {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.music-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.album-cover {
  position: relative;
  width: 100%;
  padding-top: 100%;
  /* 正方形比例 */
}

.album-cover img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.play-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.music-item:hover .play-overlay {
  opacity: 1;
}

.play-icon {
  color: white;
  font-size: 36px;
}

.music-info {
  padding: 15px;
}

.music-info h3 {
  margin: 0 0 5px 0;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.music-info p {
  margin: 0;
  font-size: 14px;
  color: #777;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .platform-boxes {
    flex-direction: column;
  }

  .music-grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  }
}
</style>