<template>
  <div class="standings-page">
    <div class="standings-content">
      <!-- 左侧筛选器 -->
      <div class="filter-sidebar">
        <div 
          v-for="config in configs" 
          :key="config.type"
          :class="['filter-item', { active: selectedPointsType === config.type }]"
          @click="selectPointsType(config.type)"
        >
          {{ getDisplayName(config.type) }}
        </div>
      </div>
      
      <!-- 右侧积分榜表格 -->
      <div class="standings-main">
        <div class="standings-table" v-if="standings.length > 0">
          <table>
            <thead>
              <tr>
                <th>排名</th>
                <th>球队</th>
                <th>场次</th>
                <th>胜</th>
                <th>平</th>
                <th>负</th>
                <th>进球</th>
                <th>失球</th>
                <th>净胜球</th>
                <th>场均进球</th>
                <th>场均失球</th>
                <th>场均净胜</th>
                <th>积分</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(team, index) in standings" :key="team.teamId">
                <td class="rank">
                  <span :class="['rank-number', getRankClass(index + 1)]">
                    {{ index + 1 }}
                  </span>
                </td>
                <td class="team-cell">
                  <img :src="team.teamLogo || '/default-team.png'" :alt="team.teamName" />
                  <NuxtLink 
                    :to="`/data/team-${team.teamId}`" 
                    class="team-link"
                  >
                    {{ team.teamName }}
                  </NuxtLink>
                </td>
                <td class="matches">{{ team.matchesPlayed }}</td>
                <td class="wins">{{ team.wins }}</td>
                <td class="draws">{{ team.draws }}</td>
                <td class="losses">{{ team.losses }}</td>
                <td class="goals-for">{{ team.goalsFor }}</td>
                <td class="goals-against">{{ team.goalsAgainst }}</td>
                <td class="goal-difference" :class="{ positive: team.goalDifference > 0, negative: team.goalDifference < 0 }">
                  {{ team.goalDifference > 0 ? '+' + team.goalDifference : team.goalDifference }}
                </td>
                <td class="avg-goals-for">{{ (team.goalsFor / team.matchesPlayed).toFixed(2) }}</td>
                <td class="avg-goals-against">{{ (team.goalsAgainst / team.matchesPlayed).toFixed(2) }}</td>
                <td class="avg-goal-difference" :class="{ positive: team.goalDifference > 0, negative: team.goalDifference < 0 }">
                  {{ (team.goalDifference / team.matchesPlayed).toFixed(2) }}
                </td>
                <td class="points">{{ team.points }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div v-else-if="loading" class="loading">
          加载中...
        </div>
        
        <div v-else class="no-data">
          暂无数据
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'

const route = useRoute()
const configs = ref([])
const selectedPointsType = ref('total')
const selectedConfig = ref(null)
const standings = ref([])
const loading = ref(false)

onMounted(() => {
  fetchConfigs()
})

const fetchConfigs = async () => {
  try {
    const response = await $fetch(`/sport/api/v3/statistics/standings/configs?sportId=1&seasonId=${route.params.sid}&isActive=true`)
    if (response.code === 1000) {
      configs.value = response.data || []
      // 默认选择第一个配置或总积分
      if (configs.value.length > 0) {
        const totalConfig = configs.value.find(c => c.type === 'total')
        selectedConfig.value = totalConfig || configs.value[0]
        selectedPointsType.value = selectedConfig.value.type
        fetchStandings()
      }
    }
  } catch (error) {
    console.error('Failed to fetch configs:', error)
  }
}

const selectPointsType = (type) => {
  selectedPointsType.value = type
  selectedConfig.value = configs.value.find(c => c.type === type)
  fetchStandings()
}

const getDisplayName = (type) => {
  const nameMap = {
    'total': '总积分',
    'home': '主场积分', 
    'away': '客场积分',
    'half1': '半场积分',
    'half1_home': '半场主场积分',
    'half1_away': '半场客场积分'
  }
  return nameMap[type] || type
}

const fetchStandings = async () => {
  if (!selectedConfig.value) return
  
  loading.value = true
  try {
    const response = await $fetch('/sport/api/v3/statistics/standings/list', {
      method: 'POST',
      body: {
        configId: parseInt(selectedConfig.value.id),
        seasonId: parseInt(route.params.sid),
        pageNum: 1,
        pageSize: 20
      }
    })
    
    if (response.success) {
      standings.value = response.data?.standings || []
    }
  } catch (error) {
    console.error('Failed to fetch standings:', error)
  } finally {
    loading.value = false
  }
}

const getRankClass = (position) => {
  if (position <= 3) return 'top-three'
  if (position <= 6) return 'european'
  if (position >= standings.value.length - 2) return 'relegation'
  return ''
}
</script>

<style scoped>
.standings-page {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.standings-content {
  display: flex;
  min-height: 500px;
}

.filter-sidebar {
  width: 180px;
  background: #f8f9fa !important;
  border-right: 1px solid #dee2e6 !important;
  padding: 16px 0 !important;
  flex-shrink: 0;
  min-height: 500px;
}

.filter-item {
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
  padding: 12px 16px !important;
  cursor: pointer !important;
  color: #495057 !important;
  font-size: 14px !important;
  transition: all 0.2s !important;
  border-left: 3px solid transparent !important;
  margin: 0 !important;
  background: transparent !important;
}

.filter-item:hover {
  background: #e9ecef !important;
}

.filter-item.active {
  background: #fff !important;
  color: var(--primary-color) !important;
  border-left-color: var(--primary-color) !important;
  font-weight: 500 !important;
}

.standings-main {
  flex: 1;
  overflow: hidden;
}

.standings-table {
  height: 100%;
  overflow-y: auto;
}

.standings-table table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.standings-table th {
  background: #6c757d;
  color: #fff;
  padding: 12px 8px;
  text-align: center;
  font-weight: 500;
  font-size: 13px;
  position: sticky;
  top: 0;
  z-index: 10;
  white-space: nowrap;
}

.standings-table td {
  padding: 12px 8px;
  border-bottom: 1px solid #f1f3f4;
  vertical-align: middle;
  text-align: center;
  font-size: 13px;
}

.standings-table tr:hover {
  background: #f8f9fa;
}

.rank {
  width: 50px;
}

.rank-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  font-weight: 600;
  font-size: 12px;
}

.rank-number.top-three {
  background: var(--primary-color);
  color: #fff;
}

.rank-number.european {
  background: #3498db;
  color: #fff;
}

.rank-number.relegation {
  background: #95a5a6;
  color: #fff;
}

.team-cell {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 120px;
  text-align: left !important;
  padding-left: 16px !important;
}

.team-cell img {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.team-link {
  color: var(--primary-color) !important;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.team-link:hover {
  color: var(--primary-dark) !important;
  text-decoration: underline;
}

.matches,
.wins,
.draws,
.losses {
  width: 50px;
  font-weight: 500;
}

.wins {
  color: #27ae60;
}

.draws {
  color: #f39c12;
}

.losses {
  color: var(--error-color);
}

.goals-for,
.goals-against {
  width: 60px;
  font-weight: 500;
}

.goal-difference,
.avg-goal-difference {
  width: 70px;
  font-weight: 600;
}

.goal-difference.positive,
.avg-goal-difference.positive {
  color: #27ae60;
}

.goal-difference.negative,
.avg-goal-difference.negative {
  color: var(--error-color);
}

.avg-goals-for,
.avg-goals-against {
  width: 80px;
  color: #6c757d;
}

.points {
  width: 60px;
  font-weight: 700;
  color: #2c3e50;
  font-size: 14px;
}

.loading,
.no-data {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  color: #6c757d;
  font-size: 16px;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .standings-content {
    flex-direction: column;
  }
  
  .filter-sidebar {
    width: 100%;
    display: flex;
    overflow-x: auto;
    padding: 8px 0;
    min-height: auto;
  }
  
  .filter-item {
    white-space: nowrap;
    border-left: none !important;
    border-bottom: 3px solid transparent !important;
    min-width: auto;
  }
  
  .filter-item.active {
    border-left: none !important;
    border-bottom-color: var(--primary-color) !important;
  }
  
  .standings-table {
    overflow-x: auto;
  }
  
  .standings-table table {
    min-width: 800px;
  }
  
  .standings-table th,
  .standings-table td {
    padding: 8px 4px;
    font-size: 12px;
  }
  
  .team-cell {
    min-width: 100px;
  }
}
</style>