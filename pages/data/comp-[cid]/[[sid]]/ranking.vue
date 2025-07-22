<template>
  <div class="ranking-page">
    <!-- 顶部球员/球队切换 -->
    <div class="entity-tabs">
      <button 
        :class="{ active: entityType === 'player' }"
        @click="switchEntityType('player')"
      >
        球员
      </button>
      <button 
        :class="{ active: entityType === 'team' }"
        @click="switchEntityType('team')"
      >
        球队
      </button>
    </div>
    
    <div class="ranking-content">
      <!-- 左侧分类导航 -->
      <div class="category-sidebar">
        <div 
          v-for="config in filteredConfigs" 
          :key="config.id"
          :class="['category-item', { active: selectedConfig?.id === config.id }]"
          @click="selectConfig(config)"
        >
          <span class="icon">{{ config.icon || '📊' }}</span>
          <span class="text">{{ config.categoryCn }}</span>
        </div>
      </div>
      
      <!-- 右侧排行榜表格 -->
      <div class="ranking-main">
        <div class="ranking-table" v-if="rankings.length > 0">
          <table>
            <thead>
              <tr>
                <th>排名</th>
                <th>球员</th>
                <th>球队</th>
                <th>{{ selectedConfig?.unit ? `总数(${selectedConfig.unit})` : '总数' }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in rankings" :key="item.id || index">
                <td class="rank">{{ index + 1 }}</td>
                <td class="player-cell">
                  <template v-if="entityType === 'player'">
                    <img :src="item.playerAvatar || '/default-avatar.png'" :alt="item.playerName" />
                    <NuxtLink 
                      :to="`/data/player-${item.playerId}`" 
                      class="name player-link"
                    >
                      {{ item.playerName }}
                    </NuxtLink>
                  </template>
                  <template v-else>
                    <span class="name">-</span>
                  </template>
                </td>
                <td class="team-cell">
                  <img :src="item.teamLogo || '/default-team.png'" :alt="item.teamName" />
                  <NuxtLink 
                    :to="`/data/team-${item.teamId}`" 
                    class="name team-link"
                  >
                    {{ item.teamName }}
                  </NuxtLink>
                </td>
                <td class="value">{{ formatStatValue(item.statValue) }}</td>
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
const selectedConfig = ref(null)
const entityType = ref('player')
const rankings = ref([])
const loading = ref(false)

// 根据当前entityType过滤配置
const filteredConfigs = computed(() => {
  if (entityType.value === 'team') {
    return configs.value.filter(config => config.category.startsWith('team_'))
  } else {
    return configs.value.filter(config => !config.category.startsWith('team_'))
  }
})

onMounted(() => {
  fetchConfigs()
})

const fetchConfigs = async () => {
  try {
    const response = await $fetch('/sport/api/v3/statistics/rankings/configs?sportId=1&isActive=true')
    if (response.code === 1000) {
      configs.value = response.data || []
      // 根据当前entityType选择第一个配置
      if (filteredConfigs.value.length > 0) {
        selectedConfig.value = filteredConfigs.value[0]
        fetchRankings()
      }
    }
  } catch (error) {
    console.error('Failed to fetch configs:', error)
  }
}

const switchEntityType = (type) => {
  entityType.value = type
  // 切换类型时选择第一个配置
  if (filteredConfigs.value.length > 0) {
    selectedConfig.value = filteredConfigs.value[0]
    fetchRankings()
  }
}

const selectConfig = (config) => {
  selectedConfig.value = config
  fetchRankings()
}

const fetchRankings = async () => {
  if (!selectedConfig.value) return
  
  loading.value = true
  try {
    const response = await $fetch('/sport/api/v3/statistics/rankings/list', {
      method: 'POST',
      body: {
        configId: selectedConfig.value.id,
        seasonId: route.params.sid,
        entityType: entityType.value,
        limit: 15,
        includePlayerInfo: true,
        includeTeamInfo: true
      }
    })
    
    if (response.success) {
      rankings.value = response.data?.rankings || []
    }
  } catch (error) {
    console.error('Failed to fetch rankings:', error)
  } finally {
    loading.value = false
  }
}

const formatStatValue = (value) => {
  if (selectedConfig.value?.decimalPlaces > 0) {
    return parseFloat(value).toFixed(selectedConfig.value.decimalPlaces)
  }
  return value
}
</script>

<style scoped>
.ranking-page {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.entity-tabs {
  display: flex;
  background: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
}

.entity-tabs button {
  flex: 1;
  padding: 12px 24px;
  border: none;
  background: transparent;
  font-size: 14px;
  font-weight: 500;
  color: #6c757d;
  cursor: pointer;
  transition: all 0.2s;
  border-bottom: 3px solid transparent;
}

.entity-tabs button.active {
  color: #e74c3c;
  background: #fff;
  border-bottom-color: #e74c3c;
}

.ranking-content {
  display: flex !important;
  min-height: 500px !important;
  width: 100% !important;
  position: relative !important;
}

.category-sidebar {
  width: 180px;
  background: #f8f9fa !important;
  border-right: 1px solid #dee2e6 !important;
  padding: 16px 0 !important;
  flex-shrink: 0;
  min-height: 500px;
}

.category-item {
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

.category-item:hover {
  background: #e9ecef !important;
}

.category-item.active {
  background: #fff !important;
  color: #e74c3c !important;
  border-left-color: #e74c3c !important;
  font-weight: 500 !important;
}

.category-item .icon {
  font-size: 16px !important;
  width: 20px !important;
  text-align: center !important;
  flex-shrink: 0 !important;
}

.ranking-main {
  flex: 1;
  overflow: hidden;
}

.ranking-table {
  height: 100%;
  overflow-y: auto;
}

.ranking-table table {
  width: 100%;
  border-collapse: collapse;
}

.ranking-table th {
  background: #6c757d;
  color: #fff;
  padding: 12px 16px;
  text-align: left;
  font-weight: 500;
  font-size: 14px;
  position: sticky;
  top: 0;
  z-index: 10;
}

.ranking-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #f1f3f4;
  vertical-align: middle;
  font-size: 14px;
}

.ranking-table tr:hover {
  background: #f8f9fa;
}

.rank {
  font-weight: 600;
  color: #495057;
  text-align: center;
  width: 60px;
}

.player-cell,
.team-cell {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 120px;
}

.player-cell img,
.team-cell img {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.name,
.team-name {
  color: #e74c3c;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.player-link,
.team-link {
  color: #e74c3c !important;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.player-link:hover,
.team-link:hover {
  color: #c0392b !important;
  text-decoration: underline;
}

.value {
  font-weight: 600;
  color: #28a745;
  text-align: center;
  min-width: 80px;
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
  .ranking-content {
    flex-direction: column;
  }
  
  .category-sidebar {
    width: 100%;
    display: flex;
    overflow-x: auto;
    padding: 8px 0;
  }
  
  .category-item {
    white-space: nowrap;
    border-left: none;
    border-bottom: 3px solid transparent;
    min-width: auto;
  }
  
  .category-item.active {
    border-left: none;
    border-bottom-color: #e74c3c;
  }
  
  .ranking-table {
    overflow-x: auto;
  }
  
  .ranking-table table {
    min-width: 600px;
  }
}
</style>
