<template>
  <div>
    <!-- <NuxtRouteAnnouncer />
    <NuxtWelcome /> -->
    <div id="head">
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
</style>