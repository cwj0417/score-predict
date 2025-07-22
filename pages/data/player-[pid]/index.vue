<template>
  <div class="player-page">
    <!-- Header -->
    <div class="player-header">
      <div class="header-left">
        <div class="avatar">
          <img :src="player.photoUrl || '/default-avatar.png'" :alt="player.name" />
          <div class="shirt-number">#{{ player.shirtNumber || '-' }}</div>
        </div>
        <div class="info">
          <h1>{{ player.name }}<small> ({{ player.nameEn }})</small></h1>
          <p class="position">{{ positions.mainPositionName || player.position }}</p>
        </div>
      </div>
      <div class="header-right">
        <div class="club">
          <img :src="player.clubLogo || '/default-club.png'" :alt="player.clubName" />
          <NuxtLink 
            v-if="player.clubId"
            :to="`/data/team-${player.clubId}`" 
            class="club-link"
          >
            {{ player.clubName }}
          </NuxtLink>
          <span v-else>{{ player.clubName }}</span>
        </div>
        <div class="value">身价: {{ formatValue(player.marketValue) }}</div>
      </div>
    </div>

    <!-- Main content grid -->
    <div class="player-content">
      <!-- Left column -->
      <div class="left-col">
        <!-- Basic Info -->
        <section class="card">
          <h2>基本资料</h2>
          <ul>
            <li><span class="label">主位置:</span> <span class="value">{{ positions.mainPositionName || '-' }}</span></li>
            <li v-if="positions.secondaryPositionNames"><span class="label">辅位置:</span> <span class="value">{{ positions.secondaryPositionNames }}</span></li>
            <li v-if="positions.injuryStatus"><span class="label">伤病状态:</span> <span class="value">{{ positions.injuryStatus }}</span></li>
            <li><span class="label">国籍/省籍:</span> <span class="value">{{ player.nationality || '-' }}</span></li>
            <li><span class="label">惯用脚:</span> <span class="value">{{ formatDominantFoot(player.dominantFoot) }}</span></li>
            <li><span class="label">出生日期:</span> <span class="value">{{ player.birthDate || '-' }}</span></li>
            <li><span class="label">身高:</span> <span class="value">{{ player.height ? player.height + 'cm' : '-'
                }}</span></li>
            <li><span class="label">体重:</span> <span class="value">{{ player.weight ? player.weight + 'kg' : '-'
                }}</span></li>
            <li><span class="label">合同截止日期:</span> <span class="value">{{ player.contractEndDate || '-' }}</span></li>
          </ul>
        </section>
        <!-- Biography -->
        <section class="card biography">
          <h2>球员简介</h2>
          <p v-if="player.biography">{{ player.biography }}</p>
          <p v-else class="no-data">暂无球员简介</p>
        </section>
        <!-- Honors -->
        <section class="card honors">
          <h2>个人荣誉</h2>
          <ul v-if="honors.length > 0">
            <li v-for="(honor, idx) in honors" :key="idx">
              <img v-if="honor.honorImage" :src="honor.honorImage" alt="" style="width:32px;height:32px;margin-right:8px;vertical-align:middle;" />
              <span class="year">{{ honor.years }}</span>
              <span>{{ honor.honorName }}</span>
              <span v-if="honor.count">x{{ honor.count }}</span>
            </li>
          </ul>
          <p v-else class="no-data">暂无荣誉记录</p>
        </section>
      </div>

      <!-- Right column -->
      <div class="right-col">
        <!-- Abilities -->
        <section class="card abilities">
          <h2>能力评估</h2>
          <!-- Radar chart placeholder -->
          <div v-if="abilities && abilities.length > 0" id="ability-chart" class="chart"></div>
          <div v-else class="chart">
            <span>{{ abilitiesData ? '暂无能力评估数据' : '加载中...' }}</span>
          </div>
        </section>
        <!-- Position heatmap -->
        <section class="card heatmap">
          <h2>位置热力图</h2>
          <!-- Heatmap image or component -->
          <div id="heatmap" class="chart">
            <span v-if="!positions.positionHeatmapJson">暂无位置热力图数据</span>
          </div>
        </section>
        <!-- Transfers -->
        <section class="card transfers">
          <h2>转会记录</h2>
          <table v-if="transfers.length > 0">
            <thead>
              <tr>
                <th>日期</th>
                <th>类型</th>
                <th>费用(万)</th>
                <th>来自</th>
                <th>去向</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(t, idx) in transfers"
                :key="t.transferDate + '-' + (t.toTeamId || '') + '-' + (t.fromTeamId || '') + '-' + idx">
                <td>{{ t.transferDate }}</td>
                <td>{{ transferTypeText(t.transferType) }}</td>
                <td>{{ t.fee != null ? t.fee : '-' }}</td>
                <td>
                  <NuxtLink 
                    v-if="t.fromTeamId"
                    :to="`/data/team-${t.fromTeamId}`" 
                    class="team-link"
                  >
                    {{ t.fromTeamName || '-' }}
                  </NuxtLink>
                  <span v-else>{{ t.fromTeamName || '-' }}</span>
                </td>
                <td>
                  <NuxtLink 
                    v-if="t.toTeamId"
                    :to="`/data/team-${t.toTeamId}`" 
                    class="team-link"
                  >
                    {{ t.toTeamName || '-' }}
                  </NuxtLink>
                  <span v-else>{{ t.toTeamName || '-' }}</span>
                </td>
              </tr>
            </tbody>
          </table>
          <p v-else class="no-data">暂无转会记录</p>
        </section>
        <!-- Season Stats -->
        <section class="card stats">
          <h2>本赛季统计</h2>
          <div class="stats-grid">
            <div class="stat-item">
              <div class="value">{{ seasonStats.matchesTotal }}</div>
              <div class="label">出场次数</div>
            </div>
            <div class="stat-item">
              <div class="value">{{ seasonStats.matchesStarter }}</div>
              <div class="label">首发</div>
            </div>
            <div class="stat-item">
              <div class="value">{{ seasonStats.matchesSubstitute }}</div>
              <div class="label">替补</div>
            </div>
            <div class="stat-item">
              <div class="value">{{ seasonStats.minutesPlayed }}</div>
              <div class="label">出场分钟</div>
            </div>
            <div class="stat-item">
              <div class="value">{{ seasonStats.goals }}</div>
              <div class="label">进球数</div>
            </div>
            <div class="stat-item">
              <div class="value">{{ seasonStats.assists }}</div>
              <div class="label">助攻数</div>
            </div>
            <div class="stat-item">
              <div class="value">{{ seasonStats.yellowCards }}</div>
              <div class="label">黄牌</div>
            </div>
            <div class="stat-item">
              <div class="value">{{ seasonStats.redCards }}</div>
              <div class="label">红牌</div>
            </div>
            <div class="stat-item">
              <div class="value">{{ seasonStats.goalsPerMatch }}</div>
              <div class="label">场均进球</div>
            </div>
            <div class="stat-item">
              <div class="value">{{ seasonStats.assistsPerMatch }}</div>
              <div class="label">场均助攻</div>
            </div>
            <div class="stat-item">
              <div class="value">{{ seasonStats.averageRating || '-' }}</div>
              <div class="label">平均评分</div>
            </div>
          </div>
          <div v-if="seasonStats.detailedStatsJson" class="stats-detail">
            <h3 style="margin:16px 0 8px 0;font-size:15px;color:var(--primary-color);">详细数据</h3>
            <ul class="stats-detail-list">
              <li v-for="(val, key) in JSON.parse(seasonStats.detailedStatsJson)" :key="key" class="stats-detail-item">
                <span class="stats-detail-label">{{ statKeyMap[key] || key }}:</span> {{ val }}
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import * as echarts from 'echarts'

const route = useRoute()
const playerId = route.params.pid

const player = ref({})
const abilities = ref([])
const honors = ref([])
const positions = ref({})
const transfers = ref([])
const seasonStats = ref({})

// 使用 SSR 数据获取
const { data: playerData } = await useAsyncData(`player-${playerId}`, () => 
  $fetch(`/sport/api/v3/player/${playerId}`)
)
const { data: abilitiesData } = await useAsyncData(`player-abilities-${playerId}`, () => 
  $fetch(`/sport/api/v3/player/${playerId}/abilities`)
)
const { data: honorsData } = await useAsyncData(`player-honors-${playerId}`, () => 
  $fetch(`/sport/api/v3/player/${playerId}/honors`)
)
const { data: positionsData } = await useAsyncData(`player-positions-${playerId}`, () => 
  $fetch(`/sport/api/v3/player/${playerId}/positions`)
)
const { data: seasonStatsData } = await useAsyncData(`player-season-stats-${playerId}`, () => 
  $fetch(`/sport/api/v3/player/${playerId}/season-stats`)
)
const { data: transfersData } = await useAsyncData(`player-transfers-${playerId}`, () => 
  $fetch(`/sport/api/v3/player/${playerId}/transfers`)
)

// 处理响应数据
const processData = () => {
  if (playerData.value?.code === 1 && playerData.value?.result) {
    player.value = playerData.value.result
  }
  
  if (abilitiesData.value?.code === 1 && abilitiesData.value?.result) {
    abilities.value = abilitiesData.value.result.abilities || []
  }
  
  // 兼容荣誉字段变化
  if (honorsData.value?.code === 1 && honorsData.value?.result && Array.isArray(honorsData.value.result.honors)) {
    honors.value = honorsData.value.result.honors.map(honor => ({
      honorName: honor.honorName,
      honorImage: honor.honorImage,
      count: honor.count,
      years: honor.years
    }))
  } else {
    honors.value = []
  }
  
  if (positionsData.value?.code === 1 && positionsData.value?.result) {
    positions.value = positionsData.value.result
  }
  
  // 赛季统计兼容字段
  if (seasonStatsData.value?.code === 1 && seasonStatsData.value?.result) {
    seasonStats.value = {
      matchesTotal: seasonStatsData.value.result.matchesTotal || 0,
      matchesStarter: seasonStatsData.value.result.matchesStarter || 0,
      matchesSubstitute: seasonStatsData.value.result.matchesSubstitute || 0,
      goals: seasonStatsData.value.result.goals || 0,
      assists: seasonStatsData.value.result.assists || 0,
      averageRating: seasonStatsData.value.result.averageRating || '-',
      minutesPlayed: seasonStatsData.value.result.minutesPlayed || 0,
      yellowCards: seasonStatsData.value.result.yellowCards || 0,
      redCards: seasonStatsData.value.result.redCards || 0,
      goalsPerMatch: seasonStatsData.value.result.goalsPerMatch || 0,
      assistsPerMatch: seasonStatsData.value.result.assistsPerMatch || 0,
      detailedStatsJson: seasonStatsData.value.result.detailedStatsJson || '{}'
    }
  } else {
    seasonStats.value = { 
      matchesTotal: 0, 
      matchesStarter: 0, 
      matchesSubstitute: 0, 
      goals: 0, 
      assists: 0, 
      averageRating: '-', 
      minutesPlayed: 0, 
      yellowCards: 0, 
      redCards: 0, 
      goalsPerMatch: 0, 
      assistsPerMatch: 0, 
      detailedStatsJson: '{}' 
    }
  }
  
  if (transfersData.value?.code === 1 && transfersData.value?.result && Array.isArray(transfersData.value.result.transfers)) {
    transfers.value.splice(0, transfers.value.length, ...transfersData.value.result.transfers)
  } else {
    transfers.value.splice(0, transfers.value.length)
  }
}

// 初始化数据处理
processData()

const formatValue = (val) => {
  if (!val) return '0万欧'
  return (val / 10000).toFixed(1) + '万欧'
}

const formatDominantFoot = (foot) => {
  const footMap = {
    'left': '左脚',
    'right': '右脚',
    'both': '双脚'
  }
  return footMap[foot] || foot || '-'
}

const renderAbilityChart = () => {
  const chartDom = document.getElementById('ability-chart')
  if (!chartDom || !abilities.value || abilities.value.length === 0) return
  
  // 清空容器，彻底防止重复渲染导致 DOM 错误
  chartDom.innerHTML = ''
  
  try {
    const chart = echarts.init(chartDom)
    const names = abilities.value.map(a => a.name)
    const values = abilities.value.map(a => a.value)
    
    chart.setOption({
      tooltip: {
        trigger: 'item'
      },
      radar: { 
        indicator: names.map((n, i) => ({ name: n, max: 100 })),
        radius: '70%'
      },
      series: [{ 
        type: 'radar', 
        data: [{ 
          value: values, 
          name: player.value.name || '球员能力',
          areaStyle: {
            opacity: 0.3
          },
          lineStyle: {
            color: 'var(--primary-color)'
          },
          itemStyle: {
            color: 'var(--primary-color)'
          }
        }] 
      }]
    })
    
    // 响应式调整
    window.addEventListener('resize', () => {
      chart.resize()
    })
  } catch (error) {
    console.error('渲染能力图表失败:', error)
  }
}

const renderHeatmap = () => {
  // TODO: parse positions.positionHeatmapJson and render
}

const transferTypeText = (type) => {
  switch (type) {
    case 'join': return '加盟';
    case 'leave': return '离队';
    case 'loan': return '租借';
    case 'return': return '回归';
    default: return type || '-';
  }
}

const statKeyMap = {
  shots_total: '射门总数',
  passes_total: '传球总数',
  pass_accuracy: '传球成功率',
  shot_accuracy: '射门命中率',
  shots_on_target: '射正数'
}

// 监听数据变化以重新渲染图表
watch([abilitiesData, playerData], () => {
  // 重新处理数据
  processData()
  
  nextTick(() => {
    renderAbilityChart()
    renderHeatmap()
  })
}, { immediate: false })

onMounted(() => {
  // 确保在DOM挂载后渲染图表
  setTimeout(() => {
    renderAbilityChart()
    renderHeatmap()
  }, 100)
})
</script>

<style scoped>
.player-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  background: #f5f5f5;
  min-height: 100vh;
  width: 100%;
  max-width: 100%;
  margin: 0;
}

.player-header {
  display: flex;
  justify-content: space-between;
  background: var(--primary-gradient);
  color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 16px var(--primary-alpha-30);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.avatar {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid rgba(255, 255, 255, 0.3);
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.shirt-number {
  position: absolute;
  bottom: -4px;
  right: -4px;
  background: #fff;
  color: var(--primary-color);
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  min-width: 24px;
  text-align: center;
}

.info h1 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
}

.info small {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  margin-left: 8px;
}

.position {
  margin-top: 4px;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 24px;
}

.club {
  display: flex;
  align-items: center;
  gap: 8px;
}

.club img {
  width: 32px;
  height: 32px;
  object-fit: cover;
  border-radius: 4px;
}

.club-link {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.club-link:hover {
  color: #fff;
  text-decoration: underline;
}

.team-link {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.team-link:hover {
  color: var(--primary-dark);
  text-decoration: underline;
}

.value {
  font-size: 16px;
  background: rgba(255, 255, 255, 0.2);
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 500;
}

.player-content {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 16px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

.card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.card h2 {
  margin-top: 0;
  font-size: 18px;
  margin-bottom: 16px;
  color: #333;
  font-weight: 600;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 8px;
}

.card ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.card li {
  margin-bottom: 12px;
  font-size: 14px;
  color: #666;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #f5f5f5;
}

.card li:last-child {
  border-bottom: none;
}

.card li .label {
  font-weight: 500;
  color: #333;
  min-width: 100px;
}

.card li .value {
  font-weight: 400;
  color: #666;
  text-align: right;
}

.biography p {
  line-height: 1.6;
  color: #666;
  margin: 0;
}

.honors li {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: flex-start;
}

.honors .year {
  font-weight: bold;
  color: var(--primary-color);
  min-width: 60px;
}

.chart {
  width: 100%;
  height: 240px;
  background: #f8f9fa;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
}

.transfers table {
  width: 100%;
  border-collapse: collapse;
}

.transfers th,
.transfers td {
  padding: 12px 8px;
  text-align: left;
  border-bottom: 1px solid #f0f0f0;
  font-size: 14px;
}

.transfers th {
  background: #f8f9fa;
  font-weight: 600;
  color: #555;
}

.transfers td {
  color: #666;
}

.stats-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.stats-grid .stat-item {
  text-align: center;
  flex: 1 1 160px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  min-width: 120px;
  box-sizing: border-box;
}

.stats-grid .value {
  font-size: 24px;
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 4px;
}

.stats-grid .label {
  font-size: 12px;
  color: #666;
  font-weight: 500;
}

.left-col {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.right-col {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  /* 防止溢出父级 */
  overflow-x: hidden;
}

@media (max-width: 768px) {
  .player-content {
    grid-template-columns: 1fr;
  }

  .player-header {
    flex-direction: column;
    gap: 16px;
  }

  .header-right {
    justify-content: space-between;
  }
}

.no-data {
  color: #999;
  font-style: italic;
  text-align: center;
  padding: 20px;
  margin: 0;
}

.stats-detail-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 0;
  list-style: none;
}
.stats-detail-item {
  font-size: 13px;
  color: #666;
  flex: 0 1 160px;
}
.stats-detail-label {
  font-weight: 500;
  color: #333;
  min-width: 80px;
  display: inline-block;
}
</style>
