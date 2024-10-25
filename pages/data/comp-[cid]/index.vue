<template>
    <div>
        <div class="table-related">
            <div class="nav-wrapper">
                <div class="table-head">
                    <div class="tabs">
                        <NuxtLink class="tab active" :to="'/data/comp-' + route.params.cid">
                            比赛
                        </NuxtLink>
                        <NuxtLink class="tab" :to="'/data/comp-' + route.params.cid + '/point'">
                            积分
                        </NuxtLink>
                        <NuxtLink class="tab" :to="'/data/comp-' + route.params.cid + '/data'">
                            数据
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
        <div class="table-show">
            <div class="table-show-wrapper">
                <div class="data-wrapper ">
                    <div class="match-table-type">
                        <!-- 这里有stage和rounds和另外一个v-if, 展示筛选器 -->
                         
                        <div class="stage" v-if="stageList">
                            <div class="stage_name" v-for="stage in stageList">
                                {{ stage.groupName }}
                            </div>
                        </div>

                        <!-- rounds肯定是v-if的 -->
                         <div class="rounds" v-if="roundList">
                            <div class="wrapper active">
                                <div class="round" v-for="round in roundList">
                                    {{ round.roundName }}
                                </div>
                            </div>
                         </div>
                        <div class="table-match">
                            <!-- 这里有2个v-if, 估计是不同类型的表格 -->
                            <div class="table-wrapper match">
                                <table class="active">
                                    <thead>
                                        <tr>
                                            <!-- 这里有2个v-if -->
                                            <!----> <!---->
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
                                        <!---->
                                        <tr class="match_data" v-for="item in list">
                                            <!----> <!---->
                                            <td class="time">{{ item.competitionTime }}</td>
                                            <td class="home">
                                                <NuxtLink class="link" :to="'/data/team-' + item.homeTeamTeamId">
                                                    {{ item.homeTeamName }}
                                                </NuxtLink>
                                            </td>
                                            <td class="score">
                                                <a class="link">
                                                    <!-- <div class="whole_score">sss
                                                    </div>
                                                    <div class="half_score">111</div> -->
                                                    <span class="no-score">VS</span>
                                                </a>
                                            </td>
                                            <td class="away">
                                                <NuxtLink class="link" :to="'/data/team-' + item.guestTeamTeamId">
                                                    {{ item.guestTeamName }}
                                                </NuxtLink>
                                            </td>
                                            <td class="odd-asian">
                                                <div class="odd-wrapper">
                                                    <div class="asian">
                                                        {{ item.fullLetGoal }}
                                                    </div>
                                                    <div class="half-asian">
                                                        {{ item.halfLetGoal }}
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="odd-europe">
                                                <div class="odd-wrapper">
                                                    <div class="europe">
                                                        {{ item.fullSizeGoal }}
                                                    </div>
                                                    <div class="half-europe">
                                                        {{ item.halfSizeGoal }}
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="data"><a target="_blank">数据</a> <!----> <a target="_blank">历史</a>
                                            </td>
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
import { ref } from 'vue'
const route = useRoute()
const list = ref()

const roundList = ref()
const stageList = ref()

useAsyncData('comp-data', () => $fetch(`/api/v1/sport/scoreDivision/${route.params.cid}`)).then((res) => {
    const { data } = res
    const { divisionInfo, competitionSeasonList, competitionScoreList, competitionScheduleList, competitionRoundList, competitionGroupList } = data.value.result;
    list.value = competitionScheduleList
    roundList.value = competitionRoundList
    stageList.value = competitionGroupList
})
</script>