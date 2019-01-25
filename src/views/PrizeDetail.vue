<template>
  <div class="box">
    <el-button class='backBtn' type="primary" icon='el-icon-back' circle @click="goBack" title="返回"></el-button>
    <h2>一等奖</h2>
    <el-row>
      <el-card v-for="(o) in firstList" :key="o.prizeNum" class='imgCard' :body-style="cardBodyStyle" shadow="hover">
          <img :src="perfLoadImg" :data-src='o.avatarPath'>
          <span class='prizeInfo'>中奖号：{{ o.prizeNum }}</span>
        </el-card>
    </el-row>
    <h2>二等奖</h2>
    <el-row>
      <el-card v-for="(o) in secondList" :key="o.prizeNum" class='imgCard' :body-style="cardBodyStyle" shadow="hover">
          <img :src="perfLoadImg" :data-src='o.avatarPath'>
         <span class='prizeInfo'>中奖号：{{ o.prizeNum }}</span>
        </el-card>
    </el-row>
    <h2>三等奖</h2>
    <el-row>
      <el-card v-for="(o) in thirdList" :key="o.prizeNum" class='imgCard' :body-style="cardBodyStyle" shadow="hover">
        <img :src="perfLoadImg" :data-src='o.avatarPath'>
        <span class='prizeInfo'>中奖号：{{ o.prizeNum }}</span>
      </el-card>
    </el-row>
  </div>
</template>

<script>
// http请求工具
import http from '../api/http'
// 预加载的图片
import perfLoadImg from '../assets/logo-half.png'

export default {
  data () {
    return {
      currentDate: new Date(),
      firstList: [],
      secondList: [],
      thirdList: [],
      roundId: -1,
      perfLoadImg,
      cardBodyStyle: { padding: '0px', height: '300px', width: '240px' }
    }
  },
  methods: {
    async requestSummary () {
      let param = { roundId: this.roundId }
      this.listLoading = true
      let dataMap = await this.$api.reqRoundInfoDetail(param)
      if (dataMap) {
        this.firstList = dataMap.first
        this.replaceAvatarPath(this.firstList)
        this.secondList = dataMap.second
        this.replaceAvatarPath(this.secondList)
        this.thirdList = dataMap.third
        this.replaceAvatarPath(this.thirdList)
      }
    },
    replaceAvatarPath (list) {
      for (let idx in list) {
        list[idx].avatarPath = `${http.getBaseUrl()}/round-info/avatar/${list[idx].avatarPath}`
      }
    },
    goBack () {
      this.$router.push({ path: '/' })
    },
    webSocketOnMessage (e) {
      console.log(e)
      let json = JSON.parse(e.data)
      console.log(json)
      var first = json.first
      if (first !== undefined) {
        this.firstList = first
        this.replaceAvatarPath(this.firstList)
        console.log('refresh first')
      }
      var second = json.second
      if (second !== undefined) {
        this.secondList = second
        this.replaceAvatarPath(this.secondList)
        console.log('refresh second')
      }
      var third = json.third
      if (third !== undefined) {
        this.thirdList = third
        this.replaceAvatarPath(this.thirdList)
        console.log('refresh third')
      }
    },
    initWebSocket () {
      if ('WebSocket' in window) {
        let ipPort = /.+:\/\/(.+)\//g.exec(http.getBaseUrl())[1]
        this.websocket = new WebSocket(`ws://${ipPort}/ws?roundId=${this.roundId}`)
      } else {
        alert('Sorry, websocket not supported by your browser.')
      }
      // 数据接收
      this.websocket.onmessage = this.webSocketOnMessage
    },
    lazyLoadImg () {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          let arr = document.querySelectorAll('img[data-src]')
          for (var i = 0; i < arr.length; i++) {
            if (arr[i].getBoundingClientRect().top < document.documentElement.clientHeight && !arr[i].isLoad) {
              arr[i].isLoad = true
              if (arr[i].dataset) {
                arr[i].src = arr[i].dataset.src
              } else {
                arr[i].src = arr[i].getAttribute('data-src')
              }
              arr[i].style.cssText = 'transition:opacity 4s;opacity:1;'
            }
          }
          resolve()
        }, 10)
      })
    }
  },
  mounted () {
    var roundIdParam = this.$route.query.roundId
    if (roundIdParam !== null && roundIdParam !== '' && roundIdParam !== undefined) {
      this.roundId = roundIdParam
      this.requestSummary()
      this.initWebSocket()
      // 懒加载图片
      this.lazyLoadImg()
      // 页面滚动
      window.onscroll = () => {
        this.lazyLoadImg()
      }
    }
  }
}
</script>

<style scoped>
.box {
  width: 70%;
  margin: 0px auto;
  border: 1px dotted #E4E7ED;
}
h2 {
  padding: 7px;
  color: #F56C6C;
  background-color: #EBEEF5;
}
.imgCard {
  display: inline-block;
  position: relative;
  margin: 10px;
}
.imgCard img{
  width: 100%;
  opacity: 0;
}
.prizeInfo {
  position: absolute;
  z-index: 9;
  bottom: 4px;
  left: 50%;
  font-weight: bold;
  transform: translateX(-50%);
}
.backBtn {
  position: fixed;
  bottom: 10px;
  right: 10px;
  cursor: pointer;
}
</style>
