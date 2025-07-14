<template>
  <div class="team-stats-wrapper">
    <!-- 筛选器 -->
    <div class="filter-section">
      <div class="filter-left">
        <div class="filter-btn" 
             v-for="competition in competitions" 
             :key="competition.competitionId"
             :class="{ active: selectedCompetition === competition.competitionId }"
             @click="selectCompetition(competition)">
          {{ competition.competitionName }}
        </div>
      </div>
      <div class="filter-right">
        <span class="season-label">赛季：</span>
        <select v-model="selectedSeason" @change="fetchTeamStats" class="season-select">
          <option v-for="season in availableSeasons" :key="season.seasonId" :value="season.seasonId">
            {{ season.seasonName }}
          </option>
        </select>
      </div>
    </div>

    <!-- 加载状态 -->
    <div v-if="loading" class="loading">
      正在加载球队数据...
    </div>
    
    <!-- 错误状态 -->
    <div v-else-if="error" class="error">
      数据加载失败，请稍后重试
    </div>
    
    <!-- 数据展示 -->
    <div v-else class="team-stats">
      <!-- 进攻数据卡片 -->
      <div class="stats-card">
        <div class="card-header">
          <div class="indicator attack"></div>
          <h3 class="card-title">进攻数据</h3>
        </div>
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-value attack">{{ formatDecimal(attackStats.goalsPerMatch) }}</div>
            <div class="stat-label">场均进球</div>
          </div>
          <div class="stat-item">
            <div class="stat-value attack">{{ formatDecimal(attackStats.shotsPerMatch) }}</div>
            <div class="stat-label">场均射门</div>
          </div>
          <div class="stat-item">
            <div class="stat-value attack">{{ formatPercentage(attackStats.shotAccuracy) }}</div>
            <div class="stat-label">射门命中率</div>
          </div>
          <div class="stat-item">
            <div class="stat-value attack">{{ formatDecimal(attackStats.shotsOnTargetPerMatch) }}</div>
            <div class="stat-label">场均射正</div>
          </div>
          <div class="stat-item">
            <div class="stat-value attack">{{ formatDecimal(attackStats.cornersPerMatch) }}</div>
            <div class="stat-label">场均角球</div>
          </div>
          <div class="stat-item">
            <div class="stat-value attack">{{ formatDecimal(attackStats.offsidePerMatch) }}</div>
            <div class="stat-label">场均越位</div>
          </div>
        </div>
      </div>

      <!-- 防守数据卡片 -->
      <div class="stats-card">
        <div class="card-header">
          <div class="indicator defense"></div>
          <h3 class="card-title">防守数据</h3>
        </div>
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-value defense">{{ formatDecimal(defenseStats.goalsAgainstPerMatch) }}</div>
            <div class="stat-label">场均失球</div>
          </div>
          <div class="stat-item">
            <div class="stat-value defense">{{ formatInteger(defenseStats.cleanSheets) }}</div>
            <div class="stat-label">零封场次</div>
          </div>
          <div class="stat-item">
            <div class="stat-value defense">{{ formatDecimal(defenseStats.tacklesPerMatch) }}</div>
            <div class="stat-label">场均抢断</div>
          </div>
          <div class="stat-item">
            <div class="stat-value defense">{{ formatDecimal(defenseStats.interceptionsPerMatch) }}</div>
            <div class="stat-label">场均拦截</div>
          </div>
          <div class="stat-item">
            <div class="stat-value defense">{{ formatDecimal(defenseStats.foulsPerMatch) }}</div>
            <div class="stat-label">场均犯规</div>
          </div>
          <div class="stat-item">
            <div class="stat-value defense">{{ formatDecimal(defenseStats.yellowCardsPerMatch) }}</div>
            <div class="stat-label">场均黄牌</div>
          </div>
        </div>
      </div>

      <!-- 控球数据卡片 -->
      <div class="stats-card">
        <div class="card-header">
          <div class="indicator possession"></div>
          <h3 class="card-title">控球数据</h3>
        </div>
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-value possession">{{ formatPercentage(possessionStats.possessionPercentage) }}</div>
            <div class="stat-label">控球率</div>
          </div>
          <div class="stat-item">
            <div class="stat-value possession">{{ formatPercentage(possessionStats.passAccuracy) }}</div>
            <div class="stat-label">传球成功率</div>
          </div>
          <div class="stat-item">
            <div class="stat-value possession">{{ formatDecimal(possessionStats.passesPerMatch) }}</div>
            <div class="stat-label">场均传球</div>
          </div>
          <div class="stat-item">
            <div class="stat-value possession">{{ formatDecimal(possessionStats.crossesPerMatch) }}</div>
            <div class="stat-label">场均传中</div>
          </div>
          <div class="stat-item">
            <div class="stat-value possession">{{ formatDecimal(possessionStats.dribblesPerMatch) }}</div>
            <div class="stat-label">场均过人</div>
          </div>
          <div class="stat-item">
            <div class="stat-value possession">{{ formatDecimal(possessionStats.duelsWonPerMatch) }}</div>
            <div class="stat-label">场均对抗胜利</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  teamInfo: Object,
  honors: Array,
  competitions: Array,
  seasons: Array,
  allSeasons: Object // Map 对象，存储每个赛事的赛季数据
})

const route = useRoute()
const teamId = route.params.tid

const statsData = ref(null)
const loading = ref(true)
const error = ref(null)
const selectedCompetition = ref(0) // 默认选择全部赛事
const selectedSeason = ref(0) // 默认选择全部赛季

// 根据选择的赛事动态筛选赛季选项
const availableSeasons = computed(() => {
  if (selectedCompetition.value === 0) {
    // 选择"全部赛事"时，显示所有赛季
    return props.seasons || []
  } else {
    // 选择特定赛事时，只显示该赛事的赛季
    const competitionSeasons = props.allSeasons?.get(selectedCompetition.value) || []
    return [
      { seasonId: 0, seasonName: '全部赛季', competitionId: selectedCompetition.value },
      ...competitionSeasons
    ]
  }
})

// 计算属性分离不同类型的数据
const attackStats = computed(() => {
  if (!statsData.value) return {}
  return {
    goalsPerMatch: statsData.value.goalsScoredPerMatch || 0,
    shotsPerMatch: statsData.value.shotsPerMatch || 0,
    shotAccuracy: statsData.value.shotsOnTargetPerMatch && statsData.value.shotsPerMatch ? 
      statsData.value.shotsOnTargetPerMatch / statsData.value.shotsPerMatch : 0,
    shotsOnTargetPerMatch: statsData.value.shotsOnTargetPerMatch || 0,
    cornersPerMatch: statsData.value.cornersPerMatch || 0,
    offsidePerMatch: statsData.value.offsidesPerMatch || 0
  }
})

const defenseStats = computed(() => {
  if (!statsData.value) return {}
  return {
    goalsAgainstPerMatch: statsData.value.goalsConcededPerMatch || 0,
    cleanSheets: statsData.value.cleanSheets || 0,
    tacklesPerMatch: statsData.value.tacklesPerMatch || 0,
    interceptionsPerMatch: statsData.value.interceptionsPerMatch || 0,
    foulsPerMatch: statsData.value.foulsPerMatch || 0,
    yellowCardsPerMatch: statsData.value.yellowCardsPerMatch || 0
  }
})

const possessionStats = computed(() => {
  if (!statsData.value) return {}
  return {
    possessionPercentage: statsData.value.possessionPercentage ? statsData.value.possessionPercentage / 100 : 0,
    passAccuracy: statsData.value.passAccuracy ? statsData.value.passAccuracy / 100 : 0,
    passesPerMatch: statsData.value.passesPerMatch || 0,
    crossesPerMatch: statsData.value.crossesPerMatch || 0,
    dribblesPerMatch: statsData.value.dribblesPerMatch || 0,
    duelsWonPerMatch: statsData.value.duelsWonPerMatch || 0
  }
})

onMounted(() => {
  // 设置默认值
  if (props.competitions && props.competitions.length > 0) {
    selectedCompetition.value = props.competitions[0].competitionId
  }
  if (props.seasons && props.seasons.length > 0) {
    selectedSeason.value = props.seasons[0].seasonId
  }
  fetchTeamStats()
})

function selectCompetition(competition) {
  selectedCompetition.value = competition.competitionId
  // 切换赛事时重置赛季选择为"全部赛季"
  selectedSeason.value = 0
  fetchTeamStats()
}

async function fetchTeamStats() {
  try {
    loading.value = true
    const params = new URLSearchParams()
    
    if (selectedCompetition.value && selectedCompetition.value !== 0) {
      params.append('competitionId', selectedCompetition.value)
    }
    if (selectedSeason.value && selectedSeason.value !== 0) {
      params.append('seasonId', selectedSeason.value)
    }
    
    const url = `/sport/api/v3/team/${teamId}/stats${params.toString() ? '?' + params.toString() : ''}`
    const response = await $fetch(url)
    
    if (response && response.result) {
      statsData.value = response.result
    } else {
      // 使用模拟数据用于开发测试
      statsData.value = {
        goalsScoredPerMatch: 2.3,
        shotsPerMatch: 14.2,
        shotsOnTargetPerMatch: 5.1,
        cornersPerMatch: 6.1,
        offsidesPerMatch: 2.1,
        goalsConcededPerMatch: 0.8,
        cleanSheets: 8,
        tacklesPerMatch: 18.4,
        interceptionsPerMatch: 12.7,
        foulsPerMatch: 11.3,
        yellowCardsPerMatch: 1.8,
        possessionPercentage: 58,
        passAccuracy: 83,
        passesPerMatch: 421,
        crossesPerMatch: 18.2,
        dribblesPerMatch: 12.6,
        duelsWonPerMatch: 25.4
      }
    }
  } catch (err) {
    console.error('获取球队数据失败:', err)
    error.value = err.message
    // 使用模拟数据
    statsData.value = {
      goalsScoredPerMatch: 2.3,
      shotsPerMatch: 14.2,
      shotsOnTargetPerMatch: 5.1,
      cornersPerMatch: 6.1,
      offsidesPerMatch: 2.1,
      goalsConcededPerMatch: 0.8,
      cleanSheets: 8,
      tacklesPerMatch: 18.4,
      interceptionsPerMatch: 12.7,
      foulsPerMatch: 11.3,
      yellowCardsPerMatch: 1.8,
      possessionPercentage: 58,
      passAccuracy: 83,
      passesPerMatch: 421,
      crossesPerMatch: 18.2,
      dribblesPerMatch: 12.6,
      duelsWonPerMatch: 25.4
    }
  } finally {
    loading.value = false
  }
}

// 格式化函数
function formatPercentage(value) {
  if (!value && value !== 0) return '0%'
  return Math.round(value * 100) + '%'
}

function formatDecimal(value) {
  if (!value && value !== 0) return '0.0'
  return Number(value).toFixed(1)
}

function formatInteger(value) {
  if (!value && value !== 0) return '0'
  return Math.round(value).toString()
}
</script>
<style scoped>
.team-stats-wrapper {
  min-height: 400px;
}

.filter-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
  padding: 20px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.04);
}

.filter-left {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 8px 16px;
  background: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  color: #666;
  transition: all 0.2s ease;
}

.filter-btn:hover {
  background: #eee;
}

.filter-btn.active {
  background: #e94d4d;
  color: #fff;
  border-color: #e94d4d;
}

.filter-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.season-label {
  font-size: 14px;
  color: #666;
}

.season-select {
  padding: 6px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  background: #fff;
  cursor: pointer;
}

.season-select:focus {
  outline: none;
  border-color: #e94d4d;
}

.team-stats {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.stats-card {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.06);
  border: 1px solid #f0f0f0;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f5f5f5;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}

.indicator.attack {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
}

.indicator.defense {
  background: linear-gradient(135deg, #4dabf7 0%, #339af0 100%);
}

.indicator.possession {
  background: linear-gradient(135deg, #51cf66 0%, #40c057 100%);
}

.card-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 20px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 16px 12px;
  background: #fafafa;
  border-radius: 12px;
  transition: all 0.2s ease;
}

.stat-item:hover {
  background: #f0f0f0;
  transform: translateY(-2px);
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 8px;
}

.stat-value.attack {
  color: #ff6b6b;
}

.stat-value.defense {
  color: #4dabf7;
}

.stat-value.possession {
  color: #51cf66;
}

.stat-label {
  font-size: 13px;
  color: #666;
  font-weight: 500;
  line-height: 1.3;
}

/* 加载状态 */
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #999;
  font-size: 16px;
}

.error {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #ff6b6b;
  font-size: 16px;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 16px;
  }
  
  .stat-value {
    font-size: 24px;
  }
}

@media (max-width: 768px) {
  .filter-section {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
    padding: 16px;
  }
  
  .filter-left {
    justify-content: center;
  }
  
  .filter-right {
    justify-content: center;
  }
  
  .team-stats {
    gap: 16px;
  }
  
  .stats-card {
    padding: 20px 16px;
    border-radius: 12px;
  }
  
  .card-header {
    margin-bottom: 20px;
    padding-bottom: 12px;
  }
  
  .card-title {
    font-size: 16px;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  
  .stat-item {
    padding: 12px 8px;
    border-radius: 8px;
  }
  
  .stat-value {
    font-size: 20px;
  }
  
  .stat-label {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .stat-item {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    text-align: left;
    padding: 16px;
  }
  
  .stat-value {
    font-size: 18px;
    margin-bottom: 0;
  }
  
  .stat-label {
    margin-bottom: 0;
  }
}
</style>
