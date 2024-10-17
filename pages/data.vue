<template>
    <div class="database-wrapper">
        <div class="database-container">
            <div class="left">
                <div class="catalog">
                    <div class="catalog-wrapper">
                        <div class="area-levels">
                            <div class="area active" v-for="area in areas">
                                <div class="area-title">
                                    <div class="text">
                                        {{ area.name }}
                                    </div>
                                    <div class="arrow"></div>
                                </div>
                                <div class="country-levels">
                                    <div class="country active" v-for="country in countries[area.id]">
                                        <div class="country-title">
                                            <div class="check"></div>
                                            <div class="logo"
                                                style="background-image: url(https://cdn.leisu.com/nationflag/1552909490161265.png!avatar);">
                                            </div>
                                            <div class="text">{{ country.name }}</div>
                                        </div>
                                        <div class="competition-levels">
                                            <div class="competition" v-for="competition in competitions[country.id]">
                                                <NuxtLink class="link" :page-key="route => route.fullPath"
                                                    :to="'/data/comp-' + competition.id">{{ competition.name }}
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
            <div class="right">
                <NuxtPage />
            </div>
        </div>
    </div>
</template>
<script setup>
const areas = [{ name: '国际', id: 'international' }, { name: '欧洲', id: 'european' }]
const countries = {
    international: [
        {
            name: '国际赛事',
            id: 'international_international',
        },
        {
            name: '沙滩赛事',
            id: 'international_beach',
        }
    ],
    european: [
        {
            name: '欧洲',
            id: 'european_european'
        },
        {
            name: '英格兰',
            id: 'european_england'
        }
    ]
}
const competitions = {
    european_european: [
        {
            name: '世欧预',
            id: '2'
        },
        {
            name: '欧洲杯',
            id: '3'
        }
    ],
    european_england: []
}
</script>