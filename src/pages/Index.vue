<template>
<div class="page-item">
  <header>
    <div class="nav-item">
      <div class="inner" @click="getTypeList('city')">城市</div>
    </div>
    <div class="nav-item">
      <div class="inner" @click="getTypeList('area')">楼盘</div>
    </div>
    <div class="nav-item">
      <div class="inner" @click="getTypeList('type')">户型</div>
    </div>
    <!-- <div class="type-list-cont" v-show="showTypeCont"> -->
    <div class="type-list-cont" :style="typeStyle">
      <div
        class="type-list-item"
        @click="changeType(item.id)"
        v-for="item in typeList"
        :key="item.id">{{item.name}}</div>
    </div>
  </header>
  <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
    <div class="list-cont" v-if="caseList.length">
      <div class="list-item" v-for="(item, index) in caseList" :key="item.id" @click="goDetail(item.id)">
        <div class="img-cont">
          <img :src="staticOrigin + item.mainPicPath">
        </div>
        <div class="title">{{item.cityName}}/{{item.areaName}}/精装</div>
        <div class="info-cont">
          <div class="desc">{{item.typeName}}/{{item.styleInfo}}</div>
          <div class="tags">
            <div class="views">{{item.readCount}}</div>
            <div :class="[item.liked ? 'liked' : 'like', '']" @click.stop="like(item.id, index)">{{item.favoriteCount}}</div>
          </div>
        </div>
        <div class="designer" @click.stop="goTeam">设计 | {{item.designer}}</div>
      </div>
    </div>
    <div class="no-data" v-else>暂无数据</div>
  </mt-loadmore>
  <div class="mask-cont" v-show="typeStyle['max-height']" @touchstart="maskTouch($event)"></div>
  <order-btn></order-btn>
</div>
</template>

<script>
import axios from 'axios'
import { origin, staticOrigin } from '@/config'
import OrderBtn from '@/components/OrderBtn.vue'

export default {
  data () {
    return {
      typeList: [],
      curType: '',
      curId: '',
      pageNo: 1,
      pageSize: 15,
      allLoaded: false,
      yjjjCaseLikedIdArray: [],
      origin,
      staticOrigin,
      caseList: [],
      typeStyle: { 'max-height': 0 }
    }
  },
  components: {
    OrderBtn
  },
  created () {
    this.getCaseList()
    try {
      this.yjjjCaseLikedIdArray = JSON.parse(localStorage.yjjjCaseLikedIdArray)
    } catch (e) {
      this.yjjjCaseLikedIdArray = []
    }
  },
  watch: {
    typeStyle (newVal) {
      if (!newVal['max-height']) {
        setTimeout(() => {
          this.typeList = []
        }, 200)
      }
    },
    caseList (newVal) {
      for (let i = 0; i < newVal.length; i++) {
        if (this.yjjjCaseLikedIdArray.includes(this.caseList[i].id)) {
          this.$set(this.caseList[i], 'liked', true)
        }
      }
    }
  },
  methods: {
    maskTouch (e) {
      this.typeStyle = { 'max-height': 0 }
      e.preventDefault()
    },
    getTypeList (type) {
      this.$indicator.open({ spinnerType: 'fading-circle' })
      if (type === this.curType) {
        if (!this.typeStyle['max-height']) {
          this.typeStyle = { 'max-height': '999px' }
        } else {
          this.typeStyle = { 'max-height': 0 }
        }
      } else {
        this.typeStyle = { 'max-height': '999px' }
      }
      this.curType = type
      // this.typeList = []

      axios({
        url: origin + '/cjjjapi/wx/findBizHouses.action',
        method: 'post',
        data: { type }
      })
        .then(res => {
          this.$indicator.close()
          if (res.data.code) {
            return this.$toast(res.data.msg)
          }
          this.typeList = res.data.data
        })
        .catch(err => {
          this.$indicator.close()
          console.log(err)
          this.$toast('客户端请求出错')
        })
    },
    changeType (id) {
      this.curId = id
      this.typeStyle = { 'max-height': 0 }
      this.getCaseList(true)
    },
    getCaseList (init) {
      this.$indicator.open({ spinnerType: 'fading-circle' })
      if (init) {
        this.pageNo = 1
        this.allLoaded = false
      }
      let options = {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      switch (this.curType) {
        case 'city':
          options = Object.assign({}, { cityId: this.curId })
          break
        case 'area':
          options = Object.assign({}, { buildingId: this.curId })
          break
        case 'type':
          options = Object.assign({}, { typeId: this.curId })
          break
      }
      axios({
        url: origin + '/cjjjapi/wx/findBizHouseBeautifys.action',
        method: 'post',
        data: options
      })
        .then(res => {
          this.$indicator.close()
          this.$refs.loadmore.onBottomLoaded()
          if (res.data.code) {
            return this.$toast(res.data.msg)
          }
          if (res.data.page.pages === this.pageNo) {
            this.allLoaded = true
          }
          if (init) {
            this.caseList = res.data.data
          } else {
            this.caseList = this.caseList.concat(res.data.data)
          }
        })
        .catch(err => {
          this.$indicator.close()
          console.log(err)
          this.$toast('客户端请求出错')
        })
    },
    like (id, index) {
      // let count = this.caseList[index].favoriteCount
      if (this.caseList[index].liked) {
        return this.$toast('已点赞')
      }
      axios({
        url: origin + '/cjjjapi/wx/saveOrDelBizCollection.action',
        method: 'post',
        data: {
          type: 'save',
          userId: Date.now(),
          beautifyId: id
        }
      })
        .then(res => {
          if (res.data.code) {
            return this.$toast(res.data.msg)
          }
          this.$set(this.caseList[index], 'liked', true)
          this.caseList[index].favoriteCount++
          this.yjjjCaseLikedIdArray.push(id)
          localStorage.yjjjCaseLikedIdArray = JSON.stringify(this.yjjjCaseLikedIdArray)
        })
        .catch(err => {
          this.$indicator.close()
          console.log(err)
          this.$toast('客户端请求出错')
        })
    },
    goDetail (id) {
      window.location.href = '/detail.html?id=' + id
    },
    goTeam () {
      window.location.href = '/team.html'
    },
    loadBottom () {
      if (!this.loadmore) {
        this.pageNo++
        this.getCaseList()
      }
      // this.allLoaded = true
      // setTimeout(() => {
      //   this.$refs.loadmore.onBottomLoaded()
      // }, 2000)
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/reset.scss';
@import '../assets/css/common.scss';

body {
  padding-top: 1rem;
}
.mask-cont {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, .5);
}
header {
  display: flex;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 10;
  background-color: #fff;
  .type-list-cont {
    position: absolute;
    width: 100%;
    left: 0;
    top: .9rem;
    font-size: .3rem;
    background-color: #fff;
    max-height: 0;
    overflow: hidden;
    transition: max-height .2s ease;
    .type-list-item {
      padding-left: .75rem;
      line-height: 1rem;
    }
  }
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
    position: relative;
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
  .designer {
    position: absolute;
    right: .3rem;
    top: .3rem;
    padding: .05rem;
    font-size: .24rem;
    color: #fff;
    background-color: #20504e;
  }
}
.no-data {
  line-height: 2rem;
  text-align: center;
}
</style>
