<template>
  <div class="box">
    <el-button class='backBtn' type="primary" icon='el-icon-back' circle @click="goBack" title="返回"></el-button>
    <h2>一等奖</h2>
    <el-row>
      <el-card v-for="(o) in firstList" :key="o.prizeNum" class='imgCard' :body-style="cardBodyStyle" shadow="hover">
          <img :src="o.avatarPath" class="image">
          <span class='prizeInfo'>中奖号：{{ o.prizeNum }}</span>
        </el-card>
    </el-row>
    <h2>二等奖</h2>
    <el-row>
      <el-card v-for="(o) in secondList" :key="o.prizeNum" class='imgCard' :body-style="cardBodyStyle" shadow="hover">
          <img :src="o.avatarPath">
         <span class='prizeInfo'>中奖号：{{ o.prizeNum }}</span>
        </el-card>
    </el-row>
    <h2>三等奖</h2>
    <el-row>
      <el-card v-for="(o) in thirdList" :key="o.prizeNum" class='imgCard' :body-style="cardBodyStyle" shadow="hover">
        <img :src="o.avatarPath" class="image">
        <span class='prizeInfo'>中奖号：{{ o.prizeNum }}</span>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import http from '../api/http'

export default {
  data () {
    return {
      currentDate: new Date(),
      firstList: [],
      secondList: [],
      thirdList: [],
      roundId: -1,
      cardBodyStyle: { padding: '0px', height: '360px', width: '240px' }
    }
  },
  methods: {
    requestSummary () {
      let param = { roundId: this.roundId }
      this.listLoading = true
      this.$api.reqRoundInfoDetail(param).then(res => {
        var dataMap = res
        this.firstList = dataMap.first
        this.replaceAvatarPath(this.firstList)
        this.secondList = dataMap.second
        this.replaceAvatarPath(this.secondList)
        this.thirdList = dataMap.third
        this.replaceAvatarPath(this.thirdList)
      })
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
    }
  },
  mounted () {
    var roundIdParam = this.$route.query.roundId
    if (roundIdParam !== null && roundIdParam !== '' && roundIdParam !== undefined) {
      this.roundId = roundIdParam

      this.requestSummary()
      this.initWebSocket()
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
  width: 240px;
  height: 360px;
  margin: 10px;
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
