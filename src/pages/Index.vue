<template>
<div class="page-item">
  <header>
    <div class="nav-item">
      <div class="inner">城市</div>
    </div>
    <div class="nav-item">
      <div class="inner">楼盘</div>
    </div>
    <div class="nav-item">
      <div class="inner">户型</div>
    </div>
  </header>
  <div class="list-cont">
    <div class="list-item" v-for="(item, index) in listData" :key="index">
      <div class="img-cont">
        <img :src="item.img">
      </div>
      <div class="title">{{item.title}}</div>
      <div class="info-cont">
        <div class="desc">{{item.desc}}</div>
        <div class="tags">
          <div class="views">{{item.view_count}}</div>
          <div :class="[item.liked ? 'liked' : 'like', '']">{{item.like_count}}</div>
        </div>
      </div>
    </div>
  </div>
  <div class="order-btn">我要预约</div>
</div>
</template>

<script>
export default {
  data () {
    return {
      listData: [
        {
          img: require('../assets/imgs/tmp/1.jpg'),
          title: '深圳/万科青城三期/精装',
          desc: '2室1厅/66m²/时尚简约风',
          view_count: 2000,
          like_count: 1000,
          liked: false
        },
        {
          img: require('../assets/imgs/tmp/1.jpg'),
          title: '深圳/万科青城三期/精装',
          desc: '2室1厅/66m²/时尚简约风',
          view_count: 888,
          like_count: 666,
          liked: true
        },
        {
          img: require('../assets/imgs/tmp/1.jpg'),
          title: '深圳/万科青城三期/精装',
          desc: '2室1厅/66m²/时尚简约风',
          view_count: 2000,
          like_count: 1000,
          liked: false
        }
      ]
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/reset.scss';
@import '../assets/css/common.scss';

header {
  display: flex;
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
  .nav-item {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    .inner {
      line-height: 1rem;
      font-size: .34rem;
      padding-right: .4rem;
      background: url('../assets/imgs/arr_down.png') no-repeat right center;
      background-size: .16rem auto;
    }

  }
}

.list-cont {
  padding: .2rem;
  .list-item {
    margin-bottom: .4rem;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .img-cont {
    width: 7.1rem;
    height: 5.2rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .title {
    margin-top: .2rem;
    font-size: .32rem;
  }
  .info-cont {
    display: flex;
    margin-top: .15rem;
    align-items: center;
    justify-content: space-between;
    color: #888;
    .tags {
      display: flex;
      align-items: center;
    }
    .views, .like, .liked {
      height: .4rem;
      line-height: .4rem;
      padding-left: .4rem;
    }
    .views {
      margin-right: .2rem;
      background: url('../assets/imgs/views.png') no-repeat left center;
      background-size: .32rem auto;
    }
    .like {
      background: url('../assets/imgs/like.png') no-repeat left center;
      background-size: .32rem auto;
    }
    .liked {
      background: url('../assets/imgs/liked.png') no-repeat left center;
      background-size: .32rem auto;
    }
  }
}

.order-btn {
  position: fixed;
  right: .3rem;
  bottom: .3rem;
  padding: .2rem .2rem .2rem .6rem;
  background: rgba(198, 164, 53, .5) url('../assets/imgs/clock.png') no-repeat .2rem center;
  background-size: .3rem auto;
}
</style>
