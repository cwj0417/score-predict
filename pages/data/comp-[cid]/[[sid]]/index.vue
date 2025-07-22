<template>
    <div>
        <div class="table-show">
            <div class="table-show-wrapper">
                <div class="data-wrapper ">
                    <div class="match-table-type">
                        <!-- 第一部分：阶段筛选器（stages） -->
                        <div class="stage-filter" v-if="props.stages && props.stages.length">
                            <div class="stage-btn" v-for="stage in props.stages" :key="stage.id"
                                :class="{ active: currentStageId === stage.id }"
                                @click="selectStage(stage)">
                                {{ stage.name }}
                            </div>
                        </div>
                        <!-- 第二部分：分组筛选器（groups） -->
                        <div class="group-filter" v-if="props.groups && props.groups.length">
                            <div class="group-btn" v-for="group in props.groups" :key="group.id"
                                :class="{ active: currentGroupId === group.id }"
                                @click="selectGroup(group)">
                                {{ group.name }}
                            </div>
                        </div>
                        <!-- 比赛列表部分 -->
                        <div class="table-match">
                            <div class="table-wrapper match">
                                <table class="active">
                                    <thead>
                                        <tr>
                                            <th v-if="showGroupColumn">分组</th>
                                            <th>轮次</th>
                                            <th>时间</th>
                                            <th class="team">主队</th>
                                            <th>
                                                <div>比分</div>
                                                <div>(半场)</div>
                                            </th>
                                            <th class="team">客队</th>
                                            <th class="lan">
                                                <div class="play">让球</div>
                                                <div class="chang"><span>全场</span> <span>半场</span></div>
                                            </th>
                                            <th class="lv">
                                                <div class="play">进球数</div>
                                                <div class="chang"><span>全场</span> <span>半场</span></div>
                                            </th>
                                            <th class="w130">数据</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="match_data" v-for="item in matches" :key="item.id">
                                            <td v-if="showGroupColumn">{{ item.groupName || '-' }}</td>
                                            <td>{{ item.roundName }}</td>
                                            <td>{{ item.matchDate }} {{ item.matchTime }}</td>
                                            <td class="home">
                                                <NuxtLink class="link" :to="'/data/team-' + item.homeTeamId">
                                                    {{ item.homeTeamName }}
                                                </NuxtLink>
                                            </td>
                                            <td class="score">
                                                <a class="link">
                                                    <div v-if="item.matchStatus === 'finished'" class="whole_score">{{ item.homeScore }}-{{ item.awayScore }}</div>
                                                    <span v-else class="no-score">VS</span>
                                                </a>
                                            </td>
                                            <td class="away">
                                                <NuxtLink class="link" :to="'/data/team-' + item.awayTeamId">
                                                    {{ item.awayTeamName }}
                                                </NuxtLink>
                                            </td>
                                            <td class="odd-asian">
                                                <div class="odd-wrapper">
                                                    <div class="asian">{{ item.handicapFull }}</div>
                                                    <div class="half-asian">{{ item.handicapHalf }}</div>
                                                </div>
                                            </td>
                                            <td class="odd-europe">
                                                <div class="odd-wrapper">
                                                    <div class="europe">{{ item.totalGoalsFull }}</div>
                                                    <div class="half-europe">{{ item.totalGoalsHalf }}</div>
                                                </div>
                                            </td>
                                            <td class="data"><a target="_blank">数据</a> <a target="_blank">历史</a></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed, watch } from 'vue'
const props = defineProps({
    competition: Object,
    seasons: Array,
    currentSeason: Object,
    stages: Array,
    currentStage: Object,
    groups: Array,
    currentGroup: Object,
    matches: Array
})

const currentStageId = ref(props.currentStage?.id || (props.stages && props.stages[0]?.id))
const currentGroupId = ref(props.currentGroup?.id || (props.groups && props.groups[0]?.id))
const showGroupColumn = computed(() => props.groups && props.groups.length > 0)
const matches = ref(props.matches || [])

// 监听 props.matches 变化，同步更新本地 matches
watch(() => props.matches, (newMatches) => {
    if (newMatches && newMatches.length > 0) {
        matches.value = newMatches
    }
}, { immediate: true })

watch([currentStageId, currentGroupId], fetchMatches)

function selectStage(stage) {
    currentStageId.value = stage.id
    if (props.groups && props.groups.length > 0) {
        currentGroupId.value = props.groups[0].id
    }
}
function selectGroup(group) {
    currentGroupId.value = group.id
}

async function fetchMatches() {
    if (!currentStageId.value) return
    const body = {
        competitionId: +props.competition?.id || 0,
        groupId: currentGroupId.value ? +currentGroupId.value : null,
        seasonId: +props.currentSeason?.id || 0,
        sportId: 1,
        stageId: currentStageId.value ? +currentStageId.value : null
    }
    const res = await $fetch('/sport/api/v3/competition/matches', {
        method: 'POST',
        body
    })
    matches.value = res?.result?.matches || []
}
</script>
<style scoped>
.stage-filter {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    background: #fff;
    border-radius: 28px 28px 0 0;
    padding: 16px 24px 0 24px;
    align-content: flex-start;
}
.stage-btn {
    min-width: 24px;
    width: auto;
    text-align: center;
    padding: 2px 6px;
    font-size: 12px;
    color: var(--primary-color);
    border: 1px solid var(--primary-alpha-20);
    border-radius: 4px;
    background: #fff;
    cursor: pointer;
    transition: all 0.2s;
    margin-bottom: 6px;
    white-space: nowrap;
    flex-shrink: 0;
    height: 24px;
    line-height: 20px;
}
.stage-btn.active {
    color: #fff;
    background: var(--primary-color);
    border: 2px solid var(--primary-color);
}
.group-filter {
    display: flex;
    gap: 1px;
    background: #fff;
    border-radius: 0 0 24px 24px;
    padding: 0 24px 10px 24px;
}
.group-btn {
    flex: 1;
    text-align: center;
    font-size: 16px;
    color: #888;
    background: #f5f5f5;
    border: none;
    border-radius: 0;
    padding: 8px 0;
    cursor: pointer;
    transition: all 0.2s;
}
.group-btn.active {
    color: #fff;
    background: var(--primary-color);
    border-radius: 16px 0 0 16px;
}
.group-btn:first-child.active {
    border-radius: 16px 0 0 16px;
}
.group-btn:last-child.active {
    border-radius: 0 16px 16px 0;
}
</style>