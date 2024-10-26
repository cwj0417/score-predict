<template>
    <div class="database-wrapper">
        <div class="database-container">
            <div class="main-area">
                <div class="left-nav">
                    <div class="catalog">
                        <div class="catalog-wrapper">
                            <div class="area-levels">
                                <div class="area" @click="setActArea(area.id)"
                                    :class="{ active: activeIds.area === area.id }" v-for="area in areas">
                                    <div class="area-title">
                                        <div class="text">
                                            {{ area.divisionName }}
                                        </div>
                                        <div class="arrow"></div>
                                    </div>
                                    <div class="country-levels">
                                        <div class="country" @click.prevent.stop="setActCont(country.id)"
                                            :class="{ active: activeIds.cont === country.id }"
                                            v-for="country in countries[area.id]">
                                            <div class="country-title">
                                                <div class="check"></div>
                                                <div class="logo"
                                                    style="background-image: url(https://cdn.leisu.com/nationflag/1552909490161265.png!avatar);">
                                                </div>
                                                <div class="text">{{ country.divisionName }}</div>
                                            </div>
                                            <div class="competition-levels">
                                                <div class="competition"
                                                    v-for="competition in competitions[country.id]">
                                                    <NuxtLink class="link" :page-key="route => route.fullPath"
                                                        :to="'/data/comp-' + competition.id">{{ competition.divisionName
                                                        }}
                                                    </NuxtLink>
                                                    <div class="collection iconfont icon-collecth"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <NuxtPage />
            </div>
        </div>
    </div>
</template>
<script setup>

import { reactive, ref } from 'vue';

const activeIds = reactive({
    area: '',
    cont: '',
})

const areas = ref([])
const countries = reactive({})
const competitions = reactive({})

useAsyncData('nav-data', () => $fetch('/api/v1/sport/scoreDivision/list/0')).then((res) => {
    const { data } = res
    areas.value = data?.value?.result
})

const setActArea = (aid) => {
    if (activeIds.area === aid) {
        activeIds.area = ''
        return
    }
    activeIds.area = aid
    $fetch('/api/v1/sport/scoreDivision/list/' + aid).then(({ result }) => {
        countries[aid] = result
    })
}

const setActCont = (cid) => {
    if (activeIds.cont === cid) {
        activeIds.cont = ''
        return
    }
    activeIds.cont = cid
    if (!competitions[cid]) {
        $fetch('/api/v1/sport/scoreDivision/list/' + cid).then(({ result }) => {
            competitions[cid] = result
        })
    }
}
</script>