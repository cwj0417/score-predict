<template>
    <div class="right">
        <div class="hot-comps">
            <div class="title">
                <div class="part-title">
                    <div class="red-line"></div>
                    <div class="text">热门赛事</div>
                </div>
            </div>
            <div class="comp-wrapper">
                <div class="comp" v-for="comp in comps">
                    <div class="logo">
                        <NuxtLink class="img" style="background-image: url(https://gips2.baidu.com/it/u=3944689179,983354166&fm=3028&app=3028&f=JPEG&fmt=auto?w=1024&h=1024)" :to="'/data/comp-' + comp.id" />
                    </div>
                    <div class="info">
                        <NuxtLink class="comp-name" style="display: block;" :to="'/data/comp-' + comp.id">
                            {{ comp.name }}
                        </NuxtLink>
                        <div class="links">
                            <NuxtLink class="link a1" :to="'/data/comp-' + comp.id">
                                比赛
                            </NuxtLink>
                            <NuxtLink class="link a2" :to="'/data/comp-' + comp.id + '/data'">
                                数据
                            </NuxtLink>
                            <NuxtLink class="link a3" :to="'/data/comp-' + comp.id + '/point'">
                                积分
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="hot-teams">
            <div class="title">
                <div class="part-title">
                    <div class="red-line"></div>
                    <div class="text">热门球队</div>
                </div>
            </div>
            <div class="comp-wrapper">
                <div class="comp active" v-for="team in teams">
                    <div class="logo">
                        <NuxtLink class="img" style="background-image: url(https://gips2.baidu.com/it/u=3944689179,983354166&fm=3028&app=3028&f=JPEG&fmt=auto?w=1024&h=1024)" :to="'/data/team-' + team.id" />
                    </div>
                    <div class="info">
                        <NuxtLink class="comp-name" style="display: block;" :to="'/data/team-' + team.id">
                            {{ team.name }}
                        </NuxtLink>
                        <div class="links">
                            <NuxtLink class="link a1" :to="'/data/team-' + team.id">
                                比赛
                            </NuxtLink>
                            <NuxtLink class="link a2" :to="'/data/team-' + team.id + '/data'">
                                数据
                            </NuxtLink>
                            <NuxtLink class="link a3" :to="'/data/team-' + team.id + '/point'">
                                积分
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
const comps = [{
    name: '西甲',
    id: 120
}, {
    name: '英超',
    id: 82
}]
const teams = [{
    name: '尤文图斯',
    id: 10457
}, {
    name: '巴塞罗那',
    id: 10015
}]
</script>