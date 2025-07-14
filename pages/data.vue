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
                                                    v-for="competition in competitions[country.id]"
                                                    :key="competition.id">
                                                    <NuxtLink class="link" :class="{ active: isCompetitionActive(competition.id) }" :page-key="route => route.fullPath"
                                                        :to="'/data/comp-' + competition.id">{{ competition.name
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

import { reactive, ref, watch } from 'vue';

const route = useRoute()

const activeIds = reactive({
    area: '',
    cont: '',
})

const areas = ref([])
const countries = reactive({})
const competitions = reactive({})
let allRegionsData = [] // 缓存所有地区数据

// 新接口获取全部地区数据
useAsyncData('nav-data', () => $fetch('/sport/api/v3/regions/all')).then((res) => {
    const data = res?.data?.value?.result || res?.data?.result || res?.result || []
    console.log('regions data:', data)
    
    // 缓存数据
    allRegionsData = data
    
    // level 0: 顶级分类作为大洲/区域
    areas.value = data.filter(item => item.level === 0)
    
    // level 1: 国家/二级分类，按parentId分组到对应的顶级分类下
    data.filter(item => item.level === 1).forEach(country => {
        if (!countries[country.parentId]) countries[country.parentId] = []
        countries[country.parentId].push(country)
    })
    
    // level 2: 具体赛事/联赛，按parentId分组到对应的国家/二级分类下
    data.filter(item => item.level === 2).forEach(competition => {
        if (!competitions[competition.parentId]) competitions[competition.parentId] = []
        competitions[competition.parentId].push(competition)
    })
    
    console.log('areas:', areas.value)
    console.log('countries:', countries)
    console.log('competitions:', competitions)
    
    // 根据当前路由自动展开导航
    autoExpandNavigation(data)
})

// 根据当前路由自动展开导航
function autoExpandNavigation(data) {
    const currentPath = route.path
    
    // 如果当前在 comp 页面，提取 cid
    const compMatch = currentPath.match(/\/data\/comp-(\d+)/)
    if (compMatch) {
        const compId = compMatch[1]
        
        // 找到当前赛事
        const currentComp = data.find(item => item.id === compId && item.level === 2)
        if (currentComp) {
            // 找到父级国家/分类 (level 1)
            const parentCountry = data.find(item => item.id === currentComp.parentId && item.level === 1)
            if (parentCountry) {
                // 展开国家
                activeIds.cont = parentCountry.id
                
                // 找到祖父级区域 (level 0) 
                const grandParentArea = data.find(item => item.id === parentCountry.parentId && item.level === 0)
                if (grandParentArea) {
                    // 展开区域
                    activeIds.area = grandParentArea.id
                }
            }
        }
    }
}

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

// 判断当前赛事是否激活
function isCompetitionActive(competitionId) {
    const currentPath = route.path
    const compMatch = currentPath.match(/\/data\/comp-(\d+)/)
    if (compMatch) {
        return compMatch[1] === competitionId
    }
    return false
}

// 监听路由变化，自动更新导航状态
watch(() => route.path, (newPath) => {
    if (allRegionsData.length > 0) {
        // 使用缓存的数据进行导航展开
        autoExpandNavigation(allRegionsData)
    }
})

</script>