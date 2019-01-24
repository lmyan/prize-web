<template>
  <div class='container'>
    <h1>{{ msg }}</h1>
    <div class="resultBox">
      <el-table :data="list" @row-click="goPrize" highlight-current-row stripe v-loading="listLoading" style="width: 100%;" header-cell-class-name="table-header" border>
      <el-table-column prop="roundName" label="名称"></el-table-column>
      <el-table-column prop="usedCnt" label="已抽奖"></el-table-column>
      <el-table-column prop="totalCnt" label="总奖品"></el-table-column>
      <el-table-column label="抽奖率">
        <template slot-scope="scope">
          <el-progress :text-inside="true" :stroke-width="18" :percentage="parseFloat(scope.row.usedPercent)"></el-progress>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="开始时间"></el-table-column>
    </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Prize',
  data () {
    return {
      msg: '抽奖纪录',
      listLoading: true,
      list: []
    }
  },
  methods: {
    requestSummary () {
      let param = {}
      this.listLoading = true
      this.$api.reqRoundInfoSummary(param).then(res => {
        var dataList = res
        for (var idx in dataList) {
          var uPercent = Number((dataList[idx].usedCnt * 100) / dataList[idx].totalCnt).toFixed(2)
          if (uPercent > 100) {
            uPercent = 100
          }
          dataList[idx].usedPercent = uPercent
        }
        this.list = dataList
        this.listLoading = false
      })
    },
    goPrize (row) {
      this.$router.push({ name: 'prize-detail', query: { roundId: row.roundId } })
    }
  },
  mounted () {
    this.requestSummary()
  }
}
</script>
<style scoped>
.resultBox {
  width: 60%;
  margin: 20px auto;
}
</style>
