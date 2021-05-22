<template>
  <div>
    <div>
      <router-link to="/product/a">产品A</router-link>
      <router-link to="/product/b">产品B</router-link>
    </div>
    <div class="mt-20">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="scss">
.mt-20 {
  margin-top: 20px;
}
</style>
