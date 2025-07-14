<template>
  <div class="team-matches">
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
        <select v-model="selectedSeason" @change="fetchMatches" class="season-select">
          <option v-for="season in availableSeasons" :key="season.seasonId" :value="season.seasonId">
            {{ season.seasonName }}
          </option>
        </select>
        <div class="home-away-filter">
          <label><input type="radio" value="" v-model="homeOrAway" @change="fetchMatches"> 全部</label>
          <label><input type="radio" value="home" v-model="homeOrAway" @change="fetchMatches"> 主场</label>
          <label><input type="radio" value="away" v-model="homeOrAway" @change="fetchMatches"> 客场</label>
        </div>
      </div>
    </div>

    <!-- 比赛列表 -->
    <div class="matches-table">
      <table>
        <thead>
          <tr>
            <th>赛事</th>
            <th>轮次</th>
            <th>时间</th>
            <th>主队</th>
            <th>比分</th>
            <th>客队</th>
            <th>半场</th>
            <th>功能</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="match in matches" :key="match.matchId" class="match-row">
            <td>{{ match.competitionName }}</td>
            <td>{{ match.round || '-' }}</td>
            <td>{{ match.date }}</td>
            <td class="team-cell">
              <img v-if="match.homeTeam.logo" :src="match.homeTeam.logo" class="team-logo" />
              <span>{{ match.homeTeam.name }}</span>
            </td>
            <td class="score-cell">
              <span v-if="match.status === 'finished'" class="score">{{ match.score }}</span>
              <span v-else class="vs">VS</span>
            </td>
            <td class="team-cell">
              <img v-if="match.awayTeam.logo" :src="match.awayTeam.logo" class="team-logo" />
              <span>{{ match.awayTeam.name }}</span>
            </td>
            <td>{{ match.halfScore || '-' }}</td>
            <td class="function-cell">
              <button class="func-btn">技术统计</button>
              <button class="func-btn">历史</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 分页 -->
    <div class="pagination" v-if="totalPages > 1">
      <button @click="goToPage(1)" :disabled="currentPage === 1">首页</button>
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">上一页</button>
      <span class="page-info">{{ currentPage }}</span>
      <span>/</span>
      <span class="page-info">{{ totalPages }}</span>
      <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">下一页</button>
      <button @click="goToPage(totalPages)" :disabled="currentPage === totalPages">尾页</button>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'

const props = defineProps({
  teamInfo: Object,
  honors: Array,
  competitions: Array,
  seasons: Array,
  allSeasons: Object // Map 对象，存储每个赛事的赛季数据
})

const route = useRoute()
const teamId = route.params.tid

const matches = ref([])
const selectedCompetition = ref(0) // 默认选择全部赛事
const selectedSeason = ref(0) // 默认选择全部赛季
const homeOrAway = ref('')
const currentPage = ref(1)
const totalPages = ref(1)
const pageSize = 20

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

onMounted(() => {
  // 设置默认值
  if (props.competitions && props.competitions.length > 0) {
    selectedCompetition.value = props.competitions[0].competitionId
  }
  if (props.seasons && props.seasons.length > 0) {
    selectedSeason.value = props.seasons[0].seasonId
  }
  fetchMatches()
})

function selectCompetition(competition) {
  selectedCompetition.value = competition.competitionId
  // 切换赛事时重置赛季选择为"全部赛季"
  selectedSeason.value = 0
  currentPage.value = 1
  fetchMatches()
}

async function fetchMatches() {
  try {
    const params = new URLSearchParams({
      page: currentPage.value,
      size: pageSize
    })
    
    if (selectedSeason.value && selectedSeason.value !== 0) params.append('seasonId', selectedSeason.value)
    if (selectedCompetition.value && selectedCompetition.value !== 0) params.append('competitionId', selectedCompetition.value)
    if (homeOrAway.value) params.append('homeOrAway', homeOrAway.value)

    const response = await $fetch(`/sport/api/v3/team/${teamId}/matches?${params}`)
    matches.value = response.result || []
    
    // 假设返回数据中有分页信息，这里先模拟
    totalPages.value = Math.ceil(matches.value.length / pageSize) || 1
  } catch (error) {
    console.error('获取比赛数据失败:', error)
    // 使用模拟数据
    matches.value = [
      {
        matchId: '1',
        competitionName: '英超',
        round: '第1轮',
        date: '2024-08-17',
        homeTeam: { name: '曼联', logo: '' },
        awayTeam: { name: '利物浦', logo: '' },
        status: 'finished',
        score: '2-1',
        halfScore: '1-0'
      }
    ]
    totalPages.value = 1
  }
}

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    fetchMatches()
  }
}
</script>
<style scoped>
.team-matches {
  background: #fff;
  border-radius: 28px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.04);
}

.filter-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
}

.filter-left {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 6px 16px;
  border: 1px solid #ddd;
  border-radius: 20px;
  background: #fff;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
}

.filter-btn.active {
  background: #e94d4d;
  color: #fff;
  border-color: #e94d4d;
}

.filter-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.season-label {
  color: #666;
  font-size: 14px;
}

.season-select {
  padding: 4px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.home-away-filter {
  display: flex;
  gap: 12px;
}

.home-away-filter label {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  cursor: pointer;
}

.matches-table {
  overflow-x: auto;
}

.matches-table table {
  width: 100%;
  border-collapse: collapse;
}

.matches-table th,
.matches-table td {
  padding: 12px 8px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.matches-table th {
  background: #f8f9fa;
  color: #666;
  font-weight: 500;
}

.team-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}

.team-logo {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  object-fit: cover;
}

.score-cell {
  text-align: center;
  font-weight: bold;
}

.score {
  color: #e94d4d;
}

.vs {
  color: #999;
}

.function-cell {
  display: flex;
  gap: 8px;
}

.func-btn {
  padding: 4px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
  color: #666;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s;
}

.func-btn:hover {
  background: #f0f0f0;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
}

.pagination button {
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}

.pagination button:hover:not(:disabled) {
  background: #f0f0f0;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  color: #666;
  font-size: 14px;
}

.match-row:hover {
  background: #f8f9fa;
}
</style>
