<template>
  <div>
    <div>
      <router-link to="/product/a">产品分类</router-link>
      <router-link to="/product/b">产品信息</router-link>
    </div>
    <div class="mt-20">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<style lang="scss">
.mt-20 {
  margin-top: 20px;
}
</style>
