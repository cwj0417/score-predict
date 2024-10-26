<template>
  <div>
    <!-- <NuxtRouteAnnouncer />
    <NuxtWelcome /> -->
    <div id="head">
      <div style="font-size: 24px; padding:5px;">火速足球</div>
      <NuxtLink to="/">首页</NuxtLink>
      <NuxtLink to="/data">资料库</NuxtLink>
      <NuxtLink to="/predict">预测</NuxtLink>
    </div>
    <div>
      <NuxtPage />
    </div>
  </div>
</template>
<style>
#head {
  display: flex;
}
#head > a {
  font-size:22px;
  padding: 5px;
}
</style>