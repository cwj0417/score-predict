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
          <span>{{ player.clubName }}</span>
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
            <li><span class="label">国籍/省籍:</span> <span class="value">{{ player.nationality || '-' }}</span></li>
            <li><span class="label">惯用脚:</span> <span class="value">{{ player.dominantFoot || '-' }}</span></li>
            <li><span class="label">出生日期:</span> <span class="value">{{ player.birthDate || '-' }}</span></li>
            <li><span class="label">身高:</span> <span class="value">{{ player.height ? player.height + 'cm' : '-' }}</span></li>
            <li><span class="label">体重:</span> <span class="value">{{ player.weight ? player.weight + 'kg' : '-' }}</span></li>
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
            <li v-for="honor in honors" :key="honor.id">
              <span class="year">{{ honor.year }}</span> {{ honor.honorName }} x{{ honor.times }}
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
          <div id="ability-chart" class="chart">
            <span v-if="abilities.length === 0">暂无能力评估数据</span>
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
            <thead><tr><th>日期</th><th>类型</th><th>费用(万)</th><th>球队</th></tr></thead>
            <tbody>
              <tr v-for="t in transfers" :key="t.transferDate + t.toTeamId">
                <td>{{ t.transferDate }}</td>
                <td>{{ t.transferType }}</td>
                <td>{{ t.fee || '-' }}</td>
                <td>{{ t.toTeamName || t.fromTeamName }}</td>
              </tr>
            </tbody>
          </table>
          <p v-else class="no-data">暂无转会记录</p>
        </section>
        <!-- Season Stats -->
        <section class="card stats">
          <h2>本赛季统计</h2>
          <div class="stats-grid">
            <div class="stat-item"><div class="value">{{ seasonStats.matchesTotal }}</div><div class="label">出场次数</div></div>
            <div class="stat-item"><div class="value">{{ seasonStats.goals }}</div><div class="label">进球数</div></div>
            <div class="stat-item"><div class="value">{{ seasonStats.assists }}</div><div class="label">助攻数</div></div>
            <div class="stat-item"><div class="value">{{ seasonStats.averageRating }}</div><div class="label">平均评分</div></div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
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

const fetchData = async () => {
  const [p, ab, h, pos, ss, tr] = await Promise.all([
    $fetch(`/sport/api/v3/player/${playerId}`),
    $fetch(`/sport/api/v3/player/${playerId}/abilities`),
    $fetch(`/sport/api/v3/player/${playerId}/honors`),
    $fetch(`/sport/api/v3/player/${playerId}/positions`),
    $fetch(`/sport/api/v3/player/${playerId}/season-stats`),
    $fetch(`/sport/api/v3/player/${playerId}/transfers`)
  ])
  if (p.code === 1 && p.result) player.value = p.result
  if (ab.code === 1) abilities.value = ab.result?.abilities || []
  if (h.code === 1) honors.value = h.result?.honors || []
  if (pos.code === 1 && pos.result) positions.value = pos.result
  // ensure seasonStats always has defaults
  seasonStats.value = (ss.code === 1 && ss.result) ? ss.result : { matchesTotal: 0, goals: 0, assists: 0, averageRating: 0 }
  if (tr.code === 1) transfers.value = tr.result?.transfers || []

  // render charts
  renderAbilityChart()
  renderHeatmap()
}

const formatValue = (val) => {
  if (!val) return '0万欧'
  return (val / 10000).toFixed(1) + '万欧'
}

const renderAbilityChart = () => {
  const chartDom = document.getElementById('ability-chart')
  if (!chartDom || abilities.value.length === 0) return
  const chart = echarts.init(chartDom)
  const names = abilities.value.map(a => a.name)
  const values = abilities.value.map(a => a.value)
  chart.setOption({
    radar: { indicator: names.map((n,i) => ({ name: n, max: 100 })) },
    series: [{ type: 'radar', data: [{ value: values, name: player.value.name }] }]
  })
}

const renderHeatmap = () => {
  // TODO: parse positions.positionHeatmapJson and render
}

onMounted(fetchData)
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
  background: linear-gradient(135deg, #e53e3e 0%, #c53030 100%);
  color: white; 
  padding: 20px; 
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(229, 62, 62, 0.3);
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
  color: #e53e3e; 
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
  color: #e53e3e;
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

.transfers th, .transfers td { 
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
  justify-content: space-around;
  gap: 16px;
}

.stats-grid .stat-item { 
  text-align: center;
  flex: 1;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
}

.stats-grid .value { 
  font-size: 24px; 
  font-weight: bold; 
  color: #e53e3e;
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
</style>
