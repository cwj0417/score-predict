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
                <div class="comp" v-for="comp in comps" :key="comp.id">
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
                <div class="comp team-card" v-for="team in teams" :key="team.id">
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
    id: 154
}]
const teams = [{
    name: '尤文图斯',
    id: 10457
}, {
    name: '巴塞罗那',
    id: 10015
}]
</script>

<style scoped>
.right {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.hot-comps, .hot-teams {
  margin-bottom: 40px;
}

.title {
  margin-bottom: 20px;
}

.part-title {
  display: flex;
  align-items: center;
}

.red-line {
  width: 4px;
  height: 18px;
  background: var(--primary-color);
  margin-right: 10px;
  border-radius: 2px;
}

.text {
  font-size: 18px;
  font-weight: 600;
  color: var(--gray-900);
}

.comp-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.comp {
  background: var(--white);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: all 0.2s ease;
  border: 1px solid var(--gray-200);
}

.comp:hover {
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  transform: translateY(-2px);
}

.team-card {
  border: 1px solid var(--primary-color);
  background: var(--white);
}

.team-card:hover {
  box-shadow: 0 4px 16px rgba(76,175,80,0.2);
}

.logo {
  margin-bottom: 16px;
  text-align: center;
}

.img {
  display: inline-block;
  width: 60px;
  height: 60px;
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  transition: transform 0.2s ease;
}

.comp:hover .img {
  transform: scale(1.05);
}

.comp-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--gray-900);
  text-decoration: none;
  margin-bottom: 12px;
  text-align: center;
  display: block;
  transition: color 0.2s ease;
}

.comp-name:hover {
  color: var(--primary-color);
}

.links {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.link {
  padding: 6px 12px;
  background: var(--gray-100);
  color: var(--gray-700);
  text-decoration: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.2s ease;
  text-align: center;
  flex: 1;
}

.link:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.link.a1 {
  background: var(--primary-alpha-10);
  color: var(--primary-color);
}

.link.a1:hover {
  background: var(--primary-color);
  color: var(--white);
}

.link.a2 {
  background: var(--info-alpha-10);
  color: var(--info-color);
}

.link.a2:hover {
  background: var(--info-color);
  color: var(--white);
}

.link.a3 {
  background: var(--warning-alpha-10);
  color: var(--warning-color);
}

.link.a3:hover {
  background: var(--warning-color);
  color: var(--white);
}

@media (max-width: 768px) {
  .comp-wrapper {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .right {
    padding: 16px;
  }
  
  .hot-comps, .hot-teams {
    margin-bottom: 32px;
  }
  
  .comp {
    padding: 16px;
  }
  
  .img {
    width: 50px;
    height: 50px;
  }
  
  .links {
    gap: 6px;
  }
  
  .link {
    padding: 6px 8px;
    font-size: 12px;
  }
}
</style>