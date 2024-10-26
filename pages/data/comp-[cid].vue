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
useAsyncData('comp-data', () => $fetch(`/api/v1/sport/divisionInfo/${route.params.cid}`)).then((res) => {
    const { data } = res
    // console.log(data.value.result)
    const { divisionInfo } = data.value.result;
    info.value = divisionInfo
})
</script>