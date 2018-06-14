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
  padding: 0 .1rem;
  img {
    width: 100%;
    display: block;
    margin: .1rem 0;
    max-width: 100%;
  }
  p {
    line-height: .45rem;
    margin: .1rem 0;
    text-align: justify;
  }
}
</style>
