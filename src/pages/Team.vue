<template>
<div class="page-item">
  <div v-for="(item, index) in teamData" :key="index" class="team-cont-item">
    <div class="title">{{item.title}}</div>
    <div v-for="(item2, index2) in item.team" :key="index2" class="team-cont">
      <div class="team-item">
        <div class="avatar">
          <img :src="item2.avatar">
        </div>
        <div class="text-cont">
          <div class="title-cont">
            <div class="name">{{item2.name}}</div>
            <div class="wechat">+ 微信</div>
          </div>
          <div class="intro">{{item2.intro}}</div>
        </div>
      </div>
    </div>
  </div>
  <order-btn></order-btn>
</div>
</template>

<script>
import axios from 'axios'
import { origin } from '@/config'
import OrderBtn from '@/components/OrderBtn.vue'

export default {
  data () {
    return {
      teamData: [
        {
          title: '设计团队',
          team: [
            {
              name: '张佳',
              avatar: require('../assets/imgs/tmp/avatar.jpg'),
              intro: '从业12年 擅长欧美风格设计 简约设计风格'
            },
            {
              name: '张佳',
              avatar: require('../assets/imgs/tmp/avatar.jpg'),
              intro: '从业12年 擅长欧美风格设计 简约设计风格'
            }
          ]
        },
        {
          title: '项目组',
          team: [
            {
              name: '张佳',
              avatar: require('../assets/imgs/tmp/avatar.jpg'),
              intro: '从业12年 擅长欧美风格设计 简约设计风格'
            },
            {
              name: '张佳',
              avatar: require('../assets/imgs/tmp/avatar.jpg'),
              intro: '从业12年 擅长欧美风格设计 简约设计风格'
            }
          ]
        }
      ]
    }
  },
  components: {
    OrderBtn
  },
  created () {
    axios({
      url: origin + '/cjjjapi/wx/findBizBizTeamGroup.action',
      method: 'post',
      data: { id: 'tuanduizhanshi' }
    })
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style lang="scss">
@import '../assets/css/reset.scss';
@import '../assets/css/common.scss';

.team-cont-item {
  padding: .2rem 0 .2rem .2rem;
  .title {
    padding-left: .1rem;
    margin: .2rem 0;
    font-size: .3rem;
  }
  .team-item {
    position: relative;
    display: flex;
    align-items: center;
    padding: .2rem;
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
    .avatar {
      flex-shrink: 0;
      width: 1rem;
      height: 1rem;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .text-cont {
      flex-grow: 1;
      margin-left: .4rem;
    }
    .title-cont {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .wechat {
        padding: .1rem .2rem;
        font-size: .24rem;
        color: #fff;
        background-color: #245350;
      }
    }
    .intro {
      margin-top: .2rem;
      color: #666;
    }
  }
}
</style>
