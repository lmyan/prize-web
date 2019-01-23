<template>
  <div class="box">

    <el-row>
      <el-col style="text-align: right">
        <el-button type="primary" round icon="el-icon-back" @click="goBack">返回</el-button>
      </el-col>
    </el-row>

    <span style="font-size: xx-large;">一等奖</span>
    <el-row>
      <el-col :span="8" v-for="(o) in firstList" :key="o.prizeNum">
        <el-card :body-style="{ padding: '0px', height: '360px', width: '240px' }" shadow="hover" style="height: 360px; width: 240px;">
          <img :src="o.avatarPath" class="image">
          <div style="padding: 14px;">
            <span>中奖号：<b><font size="12">{{ o.prizeNum }}</font></b></span>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <p/>
    <hr/>
    <p/>
    <span style="font-size: xx-large;">二等奖</span>

    <el-row>
      <el-col :span="8" v-for="(o) in secondList" :key="o.prizeNum">
        <el-card :body-style="{ padding: '0px', height: '360px', width: '240px' }" shadow="hover" style="height: 360px; width: 240px;">
          <img :src="o.avatarPath" class="image">
          <div style="padding: 14px;">
            <span>中奖号：<b><font size="12">{{ o.prizeNum }}</font></b></span>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <p/>
    <hr/>
    <p/>
    <span style="font-size: xx-large;">三等奖</span>

    <el-row>
      <el-col :span="8" v-for="(o) in thirdList" :key="o.prizeNum">
        <el-card :body-style="{ padding: '0px', height: '360px', width: '240px' }" shadow="hover" style="height: 360px; width: 240px;">
          <img :src="o.avatarPath" class="image">
          <div style="padding: 14px;">
            <span>中奖号：<b><font size="12">{{ o.prizeNum }}</font></b></span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentDate: new Date(),
      firstList: [],
      secondList: [],
      thirdList: [],
      roundId: -1
    }
  },
  methods: {
    requestSummary () {
      let param = {roundId: this.roundId}
      this.listLoading = true
      this.$api.reqRoundInfoDetail(param).then(res => {
        var dataMap = res
        console.log('==>', dataMap)
        this.firstList = dataMap.first
        this.replaceAvatarPath(this.firstList)
        this.secondList = dataMap.second
        this.replaceAvatarPath(this.secondList)
        this.thirdList = dataMap.third
        this.replaceAvatarPath(this.thirdList)
        // console.log('==>', this.firstList)
      })
    },
    replaceAvatarPath (list) {
      var path
      var idx
      for (idx in list) {
        path = 'http://pande.xin:1120/round-info/avatar/' + list[idx].avatarPath
        list[idx].avatarPath = path
      }
    },
    goBack () {
      this.$router.push({name: 'HelloWorld'})
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
        this.websocket = new WebSocket('ws://pande.xin:1120/ws?roundId=' + this.roundId)
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

<style>

  .image {
    width: 100%;
    display: block;
  }

</style>
