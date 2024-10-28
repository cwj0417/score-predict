<template>
    <div>
        <div class="table-related">
            <div class="nav-wrapper">
                <div class="table-head">
                    <div class="tabs">
                        <NuxtLink class="tab" :to="'/data/comp-' + route.params.cid + '/' + route.params.sid">
                            比赛
                        </NuxtLink>
                        <NuxtLink class="tab" :to="'/data/comp-' + route.params.cid + '/' + route.params.sid + '/point'">
                            积分
                        </NuxtLink>
                        <NuxtLink class="tab" :to="'/data/comp-' + route.params.cid + '/' + route.params.sid + '/data'">
                            数据
                        </NuxtLink>
                        <NuxtLink class="tab active" :to="'/data/comp-' + route.params.cid + '/' + route.params.sid + '/analyze'">
                            分析
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
        <div class="table-show">
            <div style="width: 100%; height: 200px;">
                <VChart :option="opt1" />
            </div>
            <div style="width: 100%; height: 200px;">
                <VChart :option="opt2" />
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'

const opt1 = ref()
const opt2 = ref()

const route = useRoute()
useAsyncData('ana-1', () => $fetch('/api/v1/sport/competitionSeason/round/summary', {
    method: 'POST',
    body: {
        "seasonId": route.params.sid,
        "groupId": null,
        "roundId": null
    }
})
    .then(res => {
        opt1.value = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['大', '中', '小', '上', '走', '下']
            },
            xAxis: [
                {
                    type: 'category',
                    axisTick: { show: false },
                    data: res.result.map(i => `第${i.roundName}轮`)
                }
            ],
            yAxis: {show: false},
            series: [
                {
                    name: '大',
                    type: 'bar',
                    barGap: 0,
                    // label: labelOption,
                    emphasis: {
                        focus: 'series'
                    },
                    data: res.result.map(i => i.greaterCount)
                },
                {
                    name: '中',
                    type: 'bar',
                    // label: labelOption,
                    emphasis: {
                        focus: 'series'
                    },
                    data: res.result.map(i => i.eqCount)
                },
                {
                    name: '小',
                    type: 'bar',
                    // label: labelOption,
                    emphasis: {
                        focus: 'series'
                    },
                    data: res.result.map(i => i.lessCount)
                },
                {
                    name: '上',
                    type: 'bar',
                    // label: labelOption,
                    emphasis: {
                        focus: 'series'
                    },
                    data: res.result.map(i => i.upCount)
                },
                {
                    name: '走',
                    type: 'bar',
                    // label: labelOption,
                    emphasis: {
                        focus: 'series'
                    },
                    data: res.result.map(i => i.walkCount)
                },
                {
                    name: '下',
                    type: 'bar',
                    // label: labelOption,
                    emphasis: {
                        focus: 'series'
                    },
                    data: res.result.map(i => i.downCount)
                }
            ]
        }
    })
)
useAsyncData('ana-2', () => $fetch('/api/v1/sport/competitionSeason/round/flat-summary', {
    method: 'POST',
    body: {
        "seasonId": route.params.sid,
        "groupId": null,
        "roundId": null
    }
})
    .then(res => {
        // console.log(res.result)
        opt2.value = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['平', '减1平', '减2平']
            },
            xAxis: [
                {
                    type: 'category',
                    axisTick: { show: false },
                    data: res.result.map(i => `第${i.roundName}轮`)
                }
            ],
            yAxis: {show: false},
            series: [
                {
                    name: '平',
                    type: 'line',
                    emphasis: {
                        focus: 'series'
                    },
                    data: res.result.map(i => i.flatCount)
                },
                {
                    name: '减1平',
                    type: 'line',
                    emphasis: {
                        focus: 'series'
                    },
                    data: res.result.map(i => i.flatSub1Count)
                },
                {
                    name: '减2平',
                    type: 'line',
                    emphasis: {
                        focus: 'series'
                    },
                    data: res.result.map(i => i.flatSub2Count)
                }
            ]
        }
    })
)
</script>