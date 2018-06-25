<template>
<div class="page-item">
  <header>
    <div class="nav-item">
      <div class="inner" @click="getTypeList('city', cityName)">{{cityName === '全部' ? '城市' : cityName}}</div>
    </div>
    <div class="nav-item">
      <div class="inner" @click="getTypeList('area', buildingName)">{{buildingName === '全部' ? '楼盘' : buildingName}}</div>
    </div>
    <div class="nav-item">
      <div class="inner" @click="getTypeList('type', typeName)">{{typeName === '全部' ? '户型' : typeName}}</div>
    </div>
    <!-- <div class="type-list-cont" v-show="showTypeCont"> -->
    <div class="type-list-cont" :style="typeStyle" v-show="this.typeList.length">
      <div
        class="type-list-item"
        @click="changeType(item.id, item.name)"
        v-for="item in typeList"
        :key="item.id">{{item.name}}</div>
    </div>
  </header>
  <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
    <div class="list-cont" v-if="caseList.length">
      <div class="list-item" v-for="(item, index) in caseList" :key="item.id" @click="goDetail(item.id)">
        <div class="img-cont">
          <img :src="displayRealUrl(staticOrigin, item.mainPicPath)">
        </div>
        <!-- <div class="title">{{item.cityName}}/{{item.areaName}}/精装</div> -->
        <div class="title">{{item.title}}</div>
        <div class="info-cont">
          <div class="desc">{{item.typeName}}/{{item.size ? item.size + '/' : item.size}}{{item.styleInfo}}</div>
          <div class="tags">
            <div class="views">{{item.readCount}}</div>
            <div :class="[item.liked ? 'liked' : 'like', '']" @click.stop="like(item.id, index)">{{item.favoriteCount}}</div>
          </div>
        </div>
        <div class="designer" @click.stop="goTeam">设计 | {{item.designer}}</div>
      </div>
    </div>
    <div class="no-data" v-else>暂无数据</div>
    <div class="tc loadmore-txt" v-if="caseList.length && !allLoaded">上拉可加载更多数据</div>
    <div class="tc loadmore-txt" v-if="caseList.length && allLoaded">-- 无更多数据 --</div>
  </mt-loadmore>
  <div class="mask-cont" v-show="typeStyle['max-height']" @touchstart="maskTouch($event)"></div>
  <order-btn></order-btn>
</div>
</template>

<script>
import axios from 'axios'
import { origin, staticOrigin } from '@/config'
import OrderBtn from '@/components/OrderBtn.vue'
import { displayRealUrl } from '@/utils'

export default {
  data () {
    return {
      typeList: [],
      curType: '',
      cityId: '',
      displayRealUrl,
      cityName: '城市',
      buildingId: '',
      buildingName: '楼盘',
      typeName: '户型',
      curId: '',
      pageNo: 1,
      pageSize: 5, // 15
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
    window.localStorage.needJump = '1'

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
    getTypeList (type, name) {
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

      let url = origin + '/cjjjapi/wx/'
      let data = {}
      switch (type) {
        case 'city':
          url += 'findBizHouseCitys.action'
          break
        case 'area':
          url += 'findBizHouseAreas.action'
          data = { cityId: this.cityId }
          break
        case 'type':
          url += 'findBizHouseTypes.action'
          data = { buildingId: this.buildingId }
          break
        default:
          break
      }
      this.$indicator.open({ spinnerType: 'fading-circle' })
      axios({
        url,
        method: 'post',
        data: this.filterEmptyValue(data)
      })
        .then(res => {
          this.$indicator.close()
          if (res.data.code) {
            return this.$toast(res.data.message)
          }
          if (['城市', '楼盘', '户型', '全部'].includes(name)) {
            this.typeList = res.data.data
          } else {
            this.typeList = [{
              id: '',
              name: '全部'
            }].concat(res.data.data)
          }
        })
        .catch(err => {
          this.$indicator.close()
          console.log(err)
          this.$toast('客户端请求出错')
        })
    },
    // getTypeListOrigin (type) { // 弃置不用
    //   this.$indicator.open({ spinnerType: 'fading-circle' })
    //   if (type === this.curType) {
    //     if (!this.typeStyle['max-height']) {
    //       this.typeStyle = { 'max-height': '999px' }
    //     } else {
    //       this.typeStyle = { 'max-height': 0 }
    //     }
    //   } else {
    //     this.typeStyle = { 'max-height': '999px' }
    //   }
    //   this.curType = type
    //   // this.typeList = []

    //   axios({
    //     url: origin + '/cjjjapi/wx/findBizHouses.action',
    //     method: 'post',
    //     data: { type }
    //   })
    //     .then(res => {
    //       this.$indicator.close()
    //       if (res.data.code) {
    //         return this.$toast(res.data.message)
    //       }
    //       this.typeList = res.data.data
    //     })
    //     .catch(err => {
    //       this.$indicator.close()
    //       console.log(err)
    //       this.$toast('客户端请求出错')
    //     })
    // },
    changeType (id, name) {
      if (!id) {
        this.cityName = this.buildingName = this.typeName = '全部'
      }
      switch (this.curType) {
        case 'city':
          this.cityId = id
          this.cityName = name
          break
        case 'area':
          this.buildingId = id
          this.buildingName = name
          break
        case 'type':
          this.typeName = name
          break
        default:
          break
      }
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
          options = Object.assign(options, { cityId: this.curId })
          break
        case 'area':
          options = Object.assign(options, { buildingId: this.curId })
          break
        case 'type':
          options = Object.assign(options, { typeId: this.curId })
          break
      }
      axios({
        url: origin + '/cjjjapi/wx/findBizHouseBeautifys.action',
        method: 'post',
        data: this.filterEmptyValue(options)
      })
        .then(res => {
          this.$indicator.close()
          if (res.data.code) {
            return this.$toast(res.data.message)
          }
          if (res.data.page.pages === this.pageNo) {
            this.allLoaded = true
          }
          if (init) {
            this.caseList = res.data.data
          } else {
            this.caseList = this.caseList.concat(res.data.data)
          }
          this.$refs.loadmore.onBottomLoaded()
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
            return this.$toast(res.data.message)
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
      window.location.href = './detail.html?id=' + id
    },
    goTeam () {
      window.location.href = './team.html'
    },
    loadBottom () {
      if (!this.allLoaded) {
        this.pageNo++
        this.getCaseList()
      }
      // this.allLoaded = true
      // setTimeout(() => {
      //   this.$refs.loadmore.onBottomLoaded()
      // }, 2000)
    },
    filterEmptyValue (obj) { // 去掉对象里的空值
      for (var key in obj) {
        if (obj.hasOwnProperty(key) && (obj[key] === null || obj[key] === undefined || obj[key] === '')) {
          delete obj[key]
        }
      }
      return obj
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/reset.scss';
@import '../assets/css/common.scss';

.page-item {
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
    padding: .2rem 0;
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
  padding: .2rem .2rem 1.05rem .2rem;
  .list-item {
    position: relative;
    margin-bottom: .4rem;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .img-cont {
    width: 7.1rem;
    // height: 4.12rem;
    img {
      width: 100%;
      // height: 100%;
    }
  }
  .title {
    margin-top: .2rem;
    font-size: .34rem;
    color: #1f1f1f;
  }
  .info-cont {
    display: flex;
    margin-top: .15rem;
    align-items: center;
    justify-content: space-between;
    color: #b0b0b0;
    .tags {
      display: flex;
      align-items: center;
    }
    .views, .like, .liked {
      height: .4rem;
      line-height: .4rem;
      padding-left: .45rem;
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
    right: .2rem;
    top: .2rem;
    padding: .1rem;
    font-size: .24rem;
    color: #bef0ed;
    background-color: #20504e;
  }
}
.no-data {
  line-height: 2rem;
  text-align: center;
}
.loadmore-txt {
  position: relative;
  top: -.5rem;
  color: #888;
}
</style>
