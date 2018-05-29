<template>
<div class="page-item">
  <a class="link-item" href="./index.html">每家每户</a>
  <a class="link-item sub" href="./detail.html">详情（请从首页列表进入）</a>
  <a class="link-item" href="./activity.html">活动</a>
  <a class="link-item sub" href="./get.html">领取</a>
  <a class="link-item" href="./company.html">公司简介</a>
  <a class="link-item" href="./products.html">产品介绍</a>
  <a class="link-item" href="./custom.html">定制须知</a>
  <a class="link-item" href="./team.html">团队展示</a>
</div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.page-item {
  padding-left: .5rem;
}
.link-item {
  display: block;
  margin: .3rem 0;
  padding: .2rem 0;
  text-decoration: none;
  font-size: .46rem;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    background-color: #e0e0e0;
    width: 100%;
    height: 1px;
    transform: scaleY(.5);
  }
  &.sub {
    margin-left: .5rem;
    padding-left: .2rem;
    border-left: .08rem solid #e0e0e0;
  }
}
</style>
