<template>
    <div>
        <div class="table-related">
            <div class="nav-wrapper">
                <div class="table-head">
                    <div class="tabs">
                        <NuxtLink class="tab" :to="'/data/comp-' + route.params.cid + '/' + route.params.sid">
                            比赛
                        </NuxtLink>
                        <NuxtLink class="tab active" :to="'/data/comp-' + route.params.cid + '/' + route.params.sid + '/point'">
                            积分
                        </NuxtLink>
                        <NuxtLink class="tab" :to="'/data/comp-' + route.params.cid + '/' + route.params.sid + '/data'">
                            数据
                        </NuxtLink>
                        <NuxtLink class="tab" :to="'/data/comp-' + route.params.cid + '/' + route.params.sid + '/analyze'">
                            分析
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
        <div class="table-show">
            积分...
        </div>
    </div>
</template>
<script setup>

const route = useRoute()
</script>