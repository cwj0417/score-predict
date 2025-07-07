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
                                            {{ area.name }}
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
                                                    :style="country.flagIcon ? `background-image: url(${country.flagIcon});` : ''">
                                                </div>
                                                <div class="text">{{ country.name }}</div>
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

// 新接口获取全部地区数据
useAsyncData('nav-data', () => $fetch('/sport/api/v3/regions/all')).then((res) => {
    const data = res?.data?.value?.result || res?.data?.result || res?.result || []
    console.log(data)
    // 一级分类/大洲
    areas.value = data.filter(item => item.level === 0 || item.level === 1)
    // 国家，按parentId分组
    data.filter(item => item.level === 2).forEach(country => {
        if (!countries[country.parentId]) countries[country.parentId] = []
        countries[country.parentId].push(country)
    })
    // competitions 需要后端接口支持，暂不处理
})

const setActArea = (aid) => {
    if (activeIds.area === aid) {
        activeIds.area = ''
        return
    }
    activeIds.area = aid
    // 不再需要请求，数据已全部获取
}

const setActCont = (cid) => {
    if (activeIds.cont === cid) {
        activeIds.cont = ''
        return
    }
    activeIds.cont = cid
    // competitions 需要后端接口支持，暂不处理
}
</script>