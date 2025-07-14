<template>
    <div class="team-page">
        <div class="team-header">
            <div class="team-header-main">
                <div class="team-logo">
                    <img :src="teamInfo?.logo" alt="logo" v-if="teamInfo?.logo" />
                </div>
                <div class="team-header-title">
                    <div class="zh-name">{{ teamInfo?.name }}</div>
                    <div class="en-name" v-if="teamInfo?.englishName">{{ teamInfo?.englishName }}</div>
                    <div class="team-header-meta">
                        <span>所属联赛：{{ teamInfo?.leagueName }}</span>
                        <span>成立时间：{{ teamInfo?.foundedYear }}</span>
                        <span>容量：{{ teamInfo?.stadiumCapacity }}人</span>
                        <span>球场：{{ teamInfo?.stadium }}</span>
                        <span v-if="teamInfo?.coachName">主教练：{{ teamInfo?.coachName }}</span>
                    </div>
                </div>
                <div class="team-header-value">
                    <div class="value-label">球队市值</div>
                    <div class="value-num">{{ (teamInfo?.marketValue/10000).toFixed(0) }}万欧</div>
                </div>
            </div>
            <div class="team-header-desc">
                {{ teamInfo?.description }}
            </div>
            <div class="team-header-honors">
                <div class="honor-item" v-for="honor in honors.slice(0,5)" :key="honor.id">
                    <img v-if="honor.logoUrl" :src="honor.logoUrl" class="honor-img" />
                    <div class="honor-title">{{ honor.honorName }}</div>
                    <div class="honor-num">{{ honor.times }}</div>
                </div>
                <div class="honor-more">更多</div>
            </div>
        </div>
        <div class="team-tabs">
            <NuxtLink class="tab" :class="{ active: isTabActive('') }" :to="`/data/team-${route.params.tid}`">比赛</NuxtLink>
            <NuxtLink class="tab" :class="{ active: isTabActive('data') }" :to="`/data/team-${route.params.tid}/data`">数据</NuxtLink>
            <NuxtLink class="tab" :class="{ active: isTabActive('lineup') }" :to="`/data/team-${route.params.tid}/lineup`">阵容</NuxtLink>
            <NuxtLink class="tab" :class="{ active: isTabActive('transfer') }" :to="`/data/team-${route.params.tid}/transfer`">转会</NuxtLink>
        </div>
        <NuxtPage 
          :teamInfo="teamInfo" 
          :honors="honors" 
          :competitions="competitions" 
          :seasons="seasons"
          :allSeasons="allSeasons" 
        />
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRoute, useAsyncData } from '#imports'
const route = useRoute()
const teamInfo = ref({})
const honors = ref([])
const competitions = ref([])
const seasons = ref([])
const allSeasons = ref(new Map()) // 存储每个赛事的赛季数据
const availableSeasons = ref([]) // 临时存储所有赛季数据

// 获取球队基本信息
const { data } = await useAsyncData('team-overview', () => $fetch(`/sport/api/v3/team/${route.params.tid}`))
const result = data.value?.result || data.value || {}
teamInfo.value = result || {}
honors.value = result.honors?.honors || []

// 获取球队参与的赛事列表
const { data: competitionsData } = await useAsyncData('team-competitions', () => $fetch(`/sport/api/v3/team/${route.params.tid}/competitions`))
if (competitionsData.value?.result) {
  competitions.value = competitionsData.value.result
  // 检查是否已经存在"全部赛事"选项，避免重复添加
  const hasAllOption = competitions.value.some(comp => comp.competitionId === 0)
  if (!hasAllOption) {
    competitions.value.unshift({ competitionId: 0, competitionName: '全部赛事' })
  }
} else {
  // 模拟数据（已包含"全部赛事"选项）
  competitions.value = [
    { competitionId: 0, competitionName: '全部赛事' },
    { competitionId: 82, competitionName: '英超' },
    { competitionId: 120, competitionName: '西甲' },
    { competitionId: 78, competitionName: '德甲' }
  ]
}

// 获取所有赛事的赛季数据
// 获取每个赛事的赛季数据
for (const competition of competitions.value) {
  if (competition.competitionId !== 0) { // 跳过"全部赛事"选项
    try {
      const { data: seasonsData } = await useAsyncData(`competition-${competition.competitionId}-seasons`, () => 
        $fetch(`/sport/api/v3/competition/${competition.competitionId}/seasons`)
      )
      
      if (seasonsData.value?.result?.seasons) {
        const seasonsList = seasonsData.value.result.seasons.map(season => ({
          seasonId: season.id,
          seasonName: season.name,
          competitionId: competition.competitionId,
          year: season.year,
          isCurrent: season.isCurrent
        }))
        allSeasons.value.set(competition.competitionId, seasonsList)
        
        // 将所有赛季添加到可用赛季列表中
        availableSeasons.value.push(...seasonsList)
      }
    } catch (error) {
      console.error(`获取赛事 ${competition.competitionId} 的赛季数据失败:`, error)
    }
  }
}

// 去重并按年份排序
const uniqueSeasons = Array.from(
  new Map(availableSeasons.value.map(season => [season.seasonId, season])).values()
).sort((a, b) => b.year - a.year) // 按年份降序排列

// 添加"全部赛季"选项
seasons.value = [
  { seasonId: 0, seasonName: '全部赛季', competitionId: 0 },
  ...uniqueSeasons
]

function isTabActive(tab) {
    const path = route.fullPath
    if (!tab) return !/(data|lineup|transfer)$/.test(path)
    return path.endsWith('/' + tab)
}
</script>
<style scoped>
.team-page {
    width: 100%;
    background: #fff;
    border-radius: 28px;
    padding: 32px 40px 24px 40px;
    margin-bottom: 24px;
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.04);
}
.team-header {
    width: 100%;
}
.team-header-main {
    display: flex;
    align-items: stretch;
    width: 100%;
    gap: 32px;
}
.team-logo img {
    width: 72px;
    height: 72px;
    border-radius: 16px;
    background: #f5f5f5;
    object-fit: cover;
}
.team-header-title {
    flex: 2 1 0%;
    min-width: 0;
    margin-left: 32px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.zh-name {
    font-size: 32px;
    font-weight: 600;
    color: #444;
}
.en-name {
    font-size: 16px;
    color: #888;
    margin-top: 4px;
}
.team-header-meta {
    margin-top: 8px;
    color: #888;
    font-size: 15px;
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
}
.team-header-value {
    background: #e94d4d;
    color: #fff;
    border-radius: 16px;
    padding: 12px 24px;
    text-align: center;
    min-width: 90px;
    align-self: center;
}
.value-label {
    font-size: 14px;
}
.value-num {
    font-size: 24px;
    font-weight: bold;
}
.team-header-desc {
    margin: 24px 0 16px 0;
    color: #666;
    font-size: 16px;
}
.team-header-honors {
    display: flex;
    align-items: center;
    gap: 32px;
    margin-bottom: 16px;
}
.honor-item {
    text-align: center;
}
.honor-img {
    width: 48px;
    height: 48px;
    border-radius: 8px;
    background: #f5f5f5;
    object-fit: cover;
}
.honor-title {
    font-size: 14px;
    color: #444;
    margin-top: 4px;
}
.honor-num {
    font-size: 18px;
    color: #e94d4d;
    font-weight: bold;
}
.honor-more {
    color: #888;
    font-size: 15px;
    cursor: pointer;
}
.team-tabs {
    display: flex;
    gap: 24px;
    margin: 24px 0 0 0;
    border-bottom: 1.5px solid #eee;
}
.tab {
    font-size: 18px;
    color: #888;
    padding: 8px 24px;
    border-radius: 16px 16px 0 0;
    background: #fff;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
    border-bottom: 2px solid transparent;
}
.tab.active {
    color: #e94d4d;
    font-weight: bold;
    border-bottom: 2px solid #e94d4d;
    background: #fff;
}
</style>