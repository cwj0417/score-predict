<template>
  <div class="lineup-page">
    <!-- Filter and Sort Controls -->
    <div class="controls">
      <div class="position-filter">
        <div class="filter-label">位置筛选:</div>
        <div class="filter-tabs">
          <button
            v-for="position in positionFilters"
            :key="position.value"
            :class="['filter-tab', { active: selectedPosition === position.value }]"
            @click="selectedPosition = position.value"
          >
            {{ position.label }}
          </button>
        </div>
      </div>
      <div class="sort-control">
        <div class="sort-label">排序:</div>
        <select v-model="sortBy" class="sort-select">
          <option value="shirtNumber">球衣号码</option>
          <option value="age">年龄</option>
          <option value="goals">进球数</option>
          <option value="assists">助攻数</option>
          <option value="marketValue">身价</option>
        </select>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading">
      <div class="loading-spinner"></div>
      <div>加载中...</div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error">
      <div class="error-message">{{ error }}</div>
      <button @click="fetchData" class="retry-btn">重试</button>
    </div>

    <!-- Content -->
    <div v-else class="lineup-content">
      <!-- Player List -->
      <div class="lineup-section">
        <div class="section-header">
          <div class="section-title">
            <span class="indicator starter"></span>
            <span class="title">球员名单</span>
            <span class="count">({{ filteredPlayers.length }})</span>
          </div>
        </div>
        <div class="players-grid">
          <div
            v-for="player in filteredPlayers"
            :key="player.playerId"
            class="player-card"
            @click="goToPlayer(player.playerId)"
          >
            <div class="player-number">{{ player.shirtNumber || '-' }}</div>
            <div class="player-avatar">
              <img :src="player.photoUrl || '/default-avatar.png'" :alt="player.name" />
            </div>
            <div class="player-info">
              <div class="player-name">{{ player.name }}</div>
              <div class="player-details">
                <span class="position">{{ player.positionName }}</span>
                <span class="age">{{ player.age }}岁</span>
                <span class="nationality">{{ player.nationality }}</span>
              </div>
            </div>
            <div class="player-stats">
              <div class="market-value">{{ formatValue(player.marketValue) }}</div>
              <div class="performance">
                <span class="goals">{{ player.goals }}球</span>
                <span class="assists">{{ player.assists }}助攻</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Team Statistics -->
      <div class="team-stats">
        <div class="stat-item">
          <div class="stat-value">{{ teamStats.totalPlayers }}</div>
          <div class="stat-label">总球员</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ teamStats.averageAge }}岁</div>
          <div class="stat-label">平均年龄</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ teamStats.foreignPlayers }}</div>
          <div class="stat-label">外援球员</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ formatValue(teamStats.totalValue) }}</div>
          <div class="stat-label">总市值</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// Data
const loading = ref(true)
const error = ref('')
const squadData = ref(null)
const selectedPosition = ref('all')
const sortBy = ref('shirtNumber')

// Position filters
const positionFilters = computed(() => {
  const positions = [{ value: 'all', label: '全部' }]
  
  if (squadData.value && squadData.value.allPlayers) {
    const uniquePositions = [...new Set(squadData.value.allPlayers.map(p => p.positionName).filter(Boolean))]
    uniquePositions.forEach(position => {
      positions.push({ value: position, label: position })
    })
  }
  
  return positions
})

// Computed properties
const filteredPlayers = computed(() => {
  if (!squadData.value || !squadData.value.allPlayers) return []
  return filterAndSortPlayers(squadData.value.allPlayers)
})

const teamStats = computed(() => {
  if (!squadData.value) return { totalPlayers: 0, averageAge: 0, foreignPlayers: 0, totalValue: 0 }
  const allPlayers = squadData.value.allPlayers || []
  const totalPlayers = allPlayers.length
  const averageAge = totalPlayers > 0 ? (allPlayers.reduce((sum, p) => sum + p.age, 0) / totalPlayers).toFixed(1) : 0
  const foreignPlayers = allPlayers.filter(p => p.nationality && p.nationality !== '中国').length
  const totalValue = allPlayers.reduce((sum, p) => sum + (p.marketValue || 0), 0)
  return { totalPlayers, averageAge, foreignPlayers, totalValue }
})

// Methods
const filterAndSortPlayers = (players) => {
  if (!players) return []
  let filtered = players
  // Filter by position
  if (selectedPosition.value !== 'all') {
    filtered = filtered.filter(player => player.positionName === selectedPosition.value)
  }
  // Sort
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'shirtNumber':
        return (a.shirtNumber || 0) - (b.shirtNumber || 0)
      case 'age':
        return a.age - b.age
      case 'goals':
        return b.goals - a.goals
      case 'assists':
        return b.assists - a.assists
      case 'marketValue':
        return b.marketValue - a.marketValue
      default:
        return 0
    }
  })
  return filtered
}

const formatValue = (value) => {
  if (!value) return '0欧'
  if (value >= 10000) {
    return `${(value / 10000).toFixed(0)}万欧`
  }
  return `${value}欧`
}

const fetchData = async () => {
  try {
    loading.value = true
    error.value = ''
    const teamId = route.params.tid
    const response = await $fetch(`/sport/api/v3/team/${teamId}/squad`)
    if (response.code === 0 || response.code === 1) {
      squadData.value = response.result
    } else {
      error.value = response.message || '获取数据失败'
    }
  } catch (err) {
    error.value = '网络请求失败'
    console.error('Failed to fetch squad data:', err)
  } finally {
    loading.value = false
  }
}

const goToPlayer = (playerId) => {
  router.push(`/data/player-${playerId}`)
}

// Lifecycle
onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.lineup-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
}

.position-filter {
  display: flex;
  align-items: center;
  gap: 12px;
}

.filter-label {
  font-weight: 500;
  color: #333;
}

.filter-tabs {
  display: flex;
  gap: 8px;
}

.filter-tab {
  padding: 8px 16px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
}

.filter-tab:hover {
  background: #f0f0f0;
}

.filter-tab.active {
  background: #e53e3e;
  color: white;
  border-color: #e53e3e;
}

.sort-control {
  display: flex;
  align-items: center;
  gap: 8px;
}

.sort-label {
  font-weight: 500;
  color: #333;
}

.sort-select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px;
  color: #666;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #e53e3e;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px;
  color: #e53e3e;
}

.error-message {
  margin-bottom: 16px;
  font-size: 16px;
}

.retry-btn {
  padding: 8px 16px;
  background: #e53e3e;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.retry-btn:hover {
  background: #d53e3e;
}

.lineup-content {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.lineup-section {
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.section-header {
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e2e8f0;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
}

.indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.indicator.starter {
  background: #38a169;
}

.count {
  color: #666;
  font-weight: normal;
  font-size: 14px;
}

.players-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.player-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid #e2e8f0;
}

.player-card:hover {
  background: #f8f9fa;
  border-color: #cbd5e0;
}

.player-number {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e53e3e;
  color: white;
  border-radius: 50%;
  font-weight: bold;
  font-size: 14px;
  flex-shrink: 0;
}

.player-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.player-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.player-info {
  flex: 1;
  min-width: 0;
}

.player-name {
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 4px;
  color: #333;
}

.player-details {
  display: flex;
  gap: 8px;
  font-size: 14px;
  color: #666;
}

.player-details span {
  padding: 2px 8px;
  background: #e2e8f0;
  border-radius: 12px;
  font-size: 12px;
}

.player-stats {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  flex-shrink: 0;
}

.market-value {
  font-weight: 600;
  font-size: 16px;
  color: #333;
}

.performance {
  display: flex;
  gap: 8px;
  font-size: 14px;
  color: #666;
}

.performance span {
  font-size: 14px;
  color: #666;
}

.team-stats {
  display: flex;
  justify-content: space-around;
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.stat-value:nth-child(1) {
  color: #3182ce;
}

.stat-value:nth-child(2) {
  color: #38a169;
}

.stat-value:nth-child(3) {
  color: #805ad5;
}

.stat-value:nth-child(4) {
  color: #e53e3e;
}

.stat-label {
  font-size: 14px;
  color: #666;
}

@media (max-width: 768px) {
  .lineup-page {
    padding: 16px;
  }
  
  .controls {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }
  
  .position-filter,
  .sort-control {
    justify-content: center;
  }
  
  .players-grid {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .team-stats {
    flex-wrap: wrap;
    gap: 16px;
  }
  
  .stat-item {
    flex: 1;
    min-width: 120px;
  }
}
</style>
