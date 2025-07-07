<template>
    <div class="right-data">
        <div class="competition-header">
            <div class="competition-header-main">
                <div class="competition-header-logo">
                    <img :src="competition?.logoUrl" alt="logo" v-if="competition?.logoUrl" />
                </div>
                <div class="competition-header-title">
                    <div class="zh-name">{{ competition?.name }}</div>
                    <div class="en-name" v-if="competition?.nameEn">{{ competition?.nameEn }}</div>
                </div>
                <div class="competition-header-season-select">
                    <div class="season-select">
                        <div class="current" @click="showSeasonDropdown = !showSeasonDropdown">
                            {{ currentSeason?.name || '赛季' }}
                            <span class="arrow">▼</span>
                        </div>
                        <div class="dropdown" v-if="showSeasonDropdown">
                            <ul>
                                <li v-for="season in seasons" :key="season.id">
                                    <a @click="selectSeason(season)">{{ season.name }}</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="competition-header-info">
                <div class="info-item">
                    <span>所属：</span>{{ competition?.region?.name || competition?.name || '-' }}
                </div>
                <div class="info-item" v-if="competition?.totalTeams">
                    <span>球队数量：</span>{{ competition.totalTeams }}
                </div>
                <div class="info-item" v-if="competition?.totalPlayers">
                    <span>球员数量：</span>{{ competition.totalPlayers }}
                </div>
                <div class="info-item" v-if="competition?.foreignPlayers">
                    <span>非本土球员：</span>{{ competition.foreignPlayers }}
                </div>
                <div class="info-item" v-if="competition?.totalMarketValue">
                    <span>所有球队市值：</span>€ {{ competition.totalMarketValue.toLocaleString() }}
                </div>
            </div>
        </div>
        <!-- tabs 区域移动到这里 -->
        <div class="table-related">
            <div class="nav-wrapper">
                <div class="table-head">
                    <div class="tabs">
                        <NuxtLink class="tab" :class="{ active: isTabActive('') }" :to="'/data/comp-' + route.params.cid + '/' + route.params.sid">
                            比赛
                        </NuxtLink>
                        <NuxtLink class="tab" :class="{ active: isTabActive('point') }" :to="'/data/comp-' + route.params.cid + '/' + route.params.sid + '/point'">
                            积分
                        </NuxtLink>
                        <NuxtLink class="tab" :class="{ active: isTabActive('data') }" :to="'/data/comp-' + route.params.cid + '/' + route.params.sid + '/data'">
                            数据
                        </NuxtLink>
                        <NuxtLink class="tab" :class="{ active: isTabActive('analyze') }" :to="'/data/comp-' + route.params.cid + '/' + route.params.sid + '/analyze'">
                            分析
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
        <NuxtPage :competition="competition" :seasons="seasons" :currentSeason="currentSeason" :stages="stages" :currentStage="currentStage" :groups="groups" :currentGroup="currentGroup" :matches="matches" />
    </div>
</template>
<script setup>
import { ref } from 'vue'
const route = useRoute()
const competition = ref()
const currentSeason = ref()
const seasons = ref([])
const currentStage = ref()
const stages = ref([])
const groups = ref([])
const currentGroup = ref()
const matches = ref([])
const showSeasonDropdown = ref(false)

async function fetchData() {
    const regionId = route.params.cid
    const seasonId = route.params.sid || ''
    const { data } = await useAsyncData(
        'competition-overview',
        () => $fetch(`/sport/api/v3/competition/region/${regionId}/overview?seasonId=${seasonId}&sportId=1`)
    )
    const result = data.value?.result || data.value || {}
    competition.value = result.competition
    seasons.value = result.seasons || []
    currentSeason.value = result.currentSeason
    stages.value = result.stages || []
    currentStage.value = result.currentStage
    groups.value = result.groups || []
    currentGroup.value = result.groups && result.groups.length ? result.groups[0] : null
    matches.value = result.matches || []
    // 如果没有sid，跳转到当前赛季
    if (!route.params.sid && currentSeason.value) {
        navigateTo({ params: { sid: currentSeason.value.id } })
    }
}

fetchData()

function selectSeason(season) {
    showSeasonDropdown.value = false
    navigateTo({ params: { sid: season.id } })
}

function isTabActive(tab) {
    // 判断当前tab是否激活
    const path = route.fullPath
    if (!tab) return !/\/(point|data|analyze)$/.test(path)
    return path.endsWith('/' + tab)
}
</script>
<style scoped>
.competition-header {
    background: #fff;
    border-radius: 28px;
    padding: 32px 40px 24px 40px;
    margin-bottom: 24px;
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.04);
}
.competition-header-main {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.competition-header-logo img {
    width: 72px;
    height: 72px;
    border-radius: 16px;
    background: #f5f5f5;
    object-fit: contain;
}
.competition-header-title {
    flex: 1;
    margin-left: 32px;
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
.competition-header-season-select {
    min-width: 120px;
    text-align: right;
}
.season-select {
    position: relative;
    display: inline-block;
}
.season-select .current {
    padding: 8px 24px;
    border: 1px solid #e0e0e0;
    border-radius: 24px;
    background: #fafafa;
    cursor: pointer;
    font-size: 18px;
    color: #444;
}
.season-select .arrow {
    margin-left: 8px;
    font-size: 12px;
}
.season-select .dropdown {
    position: absolute;
    top: 110%;
    left: 0;
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.08);
    z-index: 10;
    min-width: 120px;
}
.season-select ul {
    list-style: none;
    margin: 0;
    padding: 0;
}
.season-select li {
    padding: 8px 24px;
    cursor: pointer;
    font-size: 16px;
    color: #444;
}
.season-select li:hover {
    background: #f5f5f5;
}
.competition-header-info {
    display: flex;
    flex-wrap: wrap;
    margin-top: 24px;
    gap: 32px;
    font-size: 18px;
    color: #666;
}
.info-item {
    min-width: 200px;
}
</style>