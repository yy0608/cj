<template>
<div class="rich-content" v-html="richContent"></div>
</template>

<script>
export default {
  props: [ 'richContent' ]
}
</script>

<style lang="scss">
.rich-content {
  padding: .3rem;
  img {
    width: 100%;
    display: block;
    margin: 0 auto .2rem 0;
    max-width: 100%;
  }
  p {
    line-height: .45rem;
    text-align: justify;
  }
}
</style>
