<template>
<div class="order-btn" @click="goOrder">我要预约</div>
</template>

<script>
export default {
  methods: {
    goOrder () {
      window.location.href = './activity.html'
    }
  }
}
</script>

<style lang="scss">
.order-btn {
  position: fixed;
  right: .3rem;
  bottom: .3rem;
  padding: .2rem .2rem .2rem .65rem;
  font-size: .32rem;
  background: #fde97c url('../assets/imgs/clock.png') no-repeat .2rem center;
  background-size: .35rem auto;
}
</style>
