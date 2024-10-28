<template>
    <div class="right-data">
        <div class="match-introd">
            <div class="title">
                <div class="composition-base-info">
                    <div class="competition-logo">
                        <img :src="info?.divisionLogo" alt="">
                    </div>
                    <div class="competition-name">
                        <h1 class="top">
                            {{ info?.divisionName }}
                        </h1>
                    </div>
                </div>
                <div class="selects">
                    <div class="select">
                        <div class="select-box">
                            <div class="current">
                                {{ seasonList?.find(i => i.id == route.params.sid)?.seasonName }}
                            </div>
                            <div class="arrow"></div>
                            <div class="down">
                                <ul>
                                    <li v-for="season in seasonList">
                                        <a @click="changeSeason(season)">{{ season.seasonName }}</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="info">
                <div class="belong">
                    {{ info?.divisionDesc }}
                </div>
            </div>
        </div>
        <NuxtPage />
    </div>
</template>
<script setup>
import { ref } from 'vue'
const route = useRoute()
const info = ref()
const seasonList = ref()
useAsyncData('comp-data', () => $fetch(`/api/v1/sport/divisionInfo/${route.params.cid}`)).then((res) => {
    const { data } = res
    // console.log({route})
    // console.log({ res })
    const { divisionInfo, competitionSeasonList } = data.value?.result || data.value;
    if (!route.params.sid) {
        navigateTo({
            params: {
                sid: competitionSeasonList?.[0].id
            }
        })
    }
    info.value = divisionInfo
    seasonList.value = competitionSeasonList
})
const changeSeason = (season) => {
    // console.log(season)
    // console.log(route)
    navigateTo({
        params: {
            sid: season.id
        }
    })
}
</script>