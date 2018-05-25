<template>
<div class="content-cont">
  <div class="content-inner" v-if="content">
    <div class="title">{{content.title}}</div>
  </div>
</div>
</template>

<script>
export default {
  props: [ 'content' ]
}
</script>

<style lang="scss"></style>
