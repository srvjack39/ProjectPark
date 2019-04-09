<template>
<section>
      <div class="report">
          <link href="https://fonts.googleapis.com/css?family=Prompt" rel="stylesheet">
          <br>
            <div>
              <b-form-select v-model="selectedreport" class="mt-3 mb-2 ml-2 col-2">
              <option :value="null" disabled>-- เลือกแบบ Report --</option>
              <option value="report">ดู Report รายได้</option>
              <option value="reportcarin">ดู Report จำนวนรถเข้าใช้งาน</option>
              </b-form-select>
              <b-form-select v-model="selectedlan" class="mt-3 mb-2 col-2">
                    <option :value="null" disabled>-- เลือกลานจอดรถ --</option>
                    <option v-for="(apark, key) in showpark"  :value="apark.name" >{{apark.name}}</option>
              </b-form-select>
              <b-form-select v-model="selectedperiod" class="mt-3 mb-2 col-2">
                      <option :value="null" disabled>-- เลือกระยะเวลา --</option>
                      <option value="day">ดูรายวัน</option>
                      <option value="month">ดูรายเดือน</option>
                      <option value="year">ดูรายปี</option>
              </b-form-select>
              <a class="button is-danger is-hovered mt-3" @click="SubmitReport(selectedreport,selectedlan,selectedperiod)" >ยืนยัน</a>
  </div><!-- <div class="form-group">
              <label for="exampleFormControlSelect1">เลือก Report  </label>
              <select class="form-control" id="exampleFormControlSelect1" v-model="selectedreport">
                  <option :value="null" disabled>-- เลือกแบบ Report --</option>
                  <!-- <option value="Reportmoney/report/">ดู Report รายได้แบบกราฟ</option>
                  <option value="Reportcar/reportcarin/">ดู Report จำนวนรถเข้าใช้งานแบบกราฟ</option> -->
                  <!-- <option value="report">ดู Report รายได้</option>
                  <option value="reportcarin">ดู Report จำนวนรถเข้าใช้งาน</option>
              </select>
            </div> --> 
            <!-- <div class="form-group">
                <label for="exampleFormControlSelect1">เลือกที่จอดรถที่ต้องการดู</label>
                <select class="form-control" id="exampleFormControlSelect1" v-model="selectedlan" >
                    <option :value="null" disabled>-- เลือกลานจอดรถ --</option>
                    <option v-for="(apark, key) in showpark"  :value="apark.name" >{{apark.name}}</option>
                </select>
              </div> -->
              <!-- <div class="form-group">
                  <label for="exampleFormControlSelect1">เลือกระยะเวลาที่ต้องการดู </label>
                  <select class="form-control" id="exampleFormControlSelect1" v-model="selectedperiod">
                      <option :value="null" disabled>-- เลือกระยะเวลา --</option>
                      <option value="day">ดูรายวัน</option>
                      <option value="month">ดูรายเดือน</option>
                      <option value="year">ดูรายปี</option>
                  </select>
                </div> -->
            <div id="chart-containermoney">

            </div>
            <center>
              <div >
                <h3 v-if="this.carintime != ''">การใช้งานรถวันนี้ : {{ this.carintime }} คัน</h3>
                <h3 v-if="this.moneyreport != ''">การใช้รายได้วันนี้ : {{ this.moneyreport }} คัน</h3>
              </div>
                  </center>
                  <br>
                        </div>
                        </section>
</template>
<script>
  // Initialize Firebase
  import firebase from 'firebase'
  import ChartCard from 'src/components/UIComponents/Cards/ChartCard.vue'
  import StatsCard from 'src/components/UIComponents/Cards/StatsCard.vue'
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  import LTable from 'src/components/UIComponents/Table.vue'
  import Checkbox from 'src/components/UIComponents/Inputs/Checkbox.vue'
  import moment from 'moment'
  import FusionCharts from 'FusionCharts'
  export default {
    name: 'Addpark',
    data () {
      return {
        getvalue:[],
        day: 'day',
        month: 'month',
        year: 'year',
        data: {
          name: '',
          num: 0,
        },
        showpark:'',
        showimage:'',
        Month:'',
        Day:'',
        selectday: null,
        selectmonth:null,
        selectedreport:null,
        selectedperiod:null,
        selectedlan:null,
        todaynum: moment().format('D'),
        todaynummonth: moment().format('MM'),
        todayMont: moment().format('MMMM'),
        todayYear: moment().format('YYYY'),
        todaydate: moment().format('dddd'),
        todayDay: moment().format('D'),
        daynum: moment().format('DD'),
        todayDate: moment().format('YYYY-MM-DD'),
        Reportmonth:'',
        moneyTotal:0,
        Day:'',
        showparksub:'',
        Water:'',
        Dayss:'',
        doday:'',
        Days:'',
        seventeen: 17,
        credit:'',
        Yearsshow:'',
        Credityear:'',
        cartestone: '',
        timecheck:'',
        carintime:'',
        moneyreport:''
      }
    },
    components: {
      Checkbox,
      Card,
      LTable,
      ChartCard,
      StatsCard,
    },
    created: function () { /* แสดงชื่อ  */
        var user = firebase.auth().currentUser
        if (user) {
          this.name = user.displayName
          this.id = user.uid
        }else {
          alert('No user')
          this.$router.replace('/')
        }
        this.pullData() 
    },
    mounted () {
    const dbRefObject = firebase.database().ref().child('/Months/')
    const dbRefimage = firebase.database().ref().child('image')
    const dbRefuser = firebase.database().ref().child('users')
    const dbRefDays = firebase.database().ref().child('/Day/')
    const dbRefMonthafter = firebase.database().ref().child('Month')
    const dbRefYear = firebase.database().ref().child('Years')
    const dbRefYears = firebase.database().ref().child('Year')
    const dbRefpark = firebase.database().ref().child('Park')
    dbRefpark.on('value', snap => {
      this.showpark = snap.val()
    })
    dbRefYears.on('value', snap => {
      this.Yearsshow = snap.val()
    })
    dbRefObject.on('value', snap => {
      this.Dayss = snap.val()
    })
    dbRefimage.on('value', snap => {
      this.showimage = snap.val()
    })
    dbRefuser.on('value', snap => {
      this.showusers = snap.val()
    })
    dbRefDays.on('value', snap => {
      this.Days = snap.val()
    })
    dbRefMonthafter.on('value', snap => {
      this.Month = snap.val()
    })
    dbRefYear.on('value', snap => {
      this.MonYearTotal = snap.val()
    })
    dbRefmoney.on('value', snap => {
      this.refmoney = snap.val()
    })
    this.pullData()
  },
    methods: {
     checkTime (parksub) {
        let str = parksub.Year+'/'+parksub.Month+'/'+parksub.Day+' '+ parksub.start +':00'
      var d = new Date(str)
      console.log(d)
      return date.subtract(new Date(), d).toMinutes()
    },
      pullData: function () {
          let that = this
          firebase.database().ref('/users/').once('value').then(function (snapshot) {
            that.showuser = snapshot.val()
          })
          firebase.database().ref('/active/').once('value').then(function (snapshot) {
            that.active = snapshot.val()
          })
          firebase.database().ref('/image/').once('value').then(function (snapshot) {
            that.image = snapshot.val()
          })
          firebase.database().ref('Park').once('value').then(function (snapshot) {
            that.showpark1 = snapshot.val()
            })
          firebase.database().ref('/Reportcar/').once('value').then(function (snapshot) {
            that.reportcar = snapshot.val()
            })
          firebase.database().ref('/Reportmoney/').once('value').then(function (snapshot) {
            that.reportmoney = snapshot.val()
          })
      this.timecheck = this.todayDate
      console.log(timecheck)
      },
    money () {
      this.menu = 'Money'
    },
    exportPdf () {
      var tempTitle = document.title
      document.title = 'Report.pdf'
      window.print()
      document.title = tempTitle
    },
    SubmitReport(report,getvalue,scale) {
      // for(var car in this.reportcar) {
      // this.carintime = this.reportcar[this.selectedreport][this.selectedlan][this.selectedperiod][this.todayDate].carin
      // console.log(this.reportcar[this.selectedreport][this.selectedlan][this.selectedperiod][this.todayDate].carin)
      // console.log(this.reportcar)
      // }
      for(var moneyreport in this.reportmoney) {
      this.moneyreport = this.reportmoney[this.selectedreport][this.selectedlan][this.selectedperiod][this.todayDate].value
      console.log(this.moneyreport)
    }
    //   this.$swal({
    //       title: 'ดู Report รายได้',
    //       html: 'ที่จอดรถ : ' + this.selectedlan ,
    //       type: 'warning', 
    //       confirmButtonText: 'ยืนยัน'
    //       })
    //       var ref = firebase.database().ref(report + this.selectedlan + '/' + scale )
    //       console.log(ref)
    //       ref.once('value', snap => {
    //     var data = []
    //     snap.forEach(ss => {
    //       var item = ss.val()
    //       data.push(item)
    //     })
    //     this.getvalue = data
    //     this.ShowGraph(this.getvalue)
    //   })
      },
    getDataFirebase (getvalue, scale) {
      console.log(getvalue)
      console.log(scale)
      this.$swal({
          title: 'ดู Report รายได้',
          html: 'ที่จอดรถ : ' + this.selectedlan ,
          type: 'warning', 
          confirmButtonText: 'ยืนยัน'
          })
      var ref = firebase.database().ref('Reportmoney/report/' + this.selectedlan + '/' + scale )
      console.log(ref)
      ref.once('value', snap => {
        var data = []
        snap.forEach(ss => {
          var item = ss.val()
          data.push(item)
        })
        this.getvalue = data
        this.ShowGraph(this.getvalue)
        this.ShowGraphcar(this.getvalue)
      })
    },
    ShowGraph: function (getvalue) {
      var firebaseChart = new FusionCharts({
        type: 'column2d',
        renderAt: 'chart-containermoney',
        width: '800',
        height: '400',
        dataFormat: 'json',
        dataSource: {
          'chart': {
            'caption': 'Report',
            'subCaption': 'Inc.',
            'subCaptionFontBold': '0',
            'captionFontSize': '20',
            'subCaptionFontSize': '17',
            'captionPadding': '15',
            'captionFontColor': '#8C8C8C',
            'baseFontSize': '22',
            'baseFont': 'Barlow',
            'canvasBgAlpha': '0',
            'bgColor': '#FFFFFF',
            'bgAlpha': '100',
            'showBorder': '0',
            'showCanvasBorder': '0',
            'showPlotBorder': '0',
            'showAlternateHGridColor': '0',
            'usePlotGradientColor': '0',
            'paletteColors': '#6AC1A5',
            'showValues': '1',
            'divLineAlpha': '5',
            'showAxisLines': '1',
            'drawAnchors': '0',
            'xAxisLineColor': '#8C8C8C',
            'xAxisLineThickness': '0.7',
            'xAxisLineAlpha': '50',
            'yAxisLineColor': '#8C8C8C',
            'yAxisLineThickness': '0.7',
            'yAxisLineAlpha': '50',
            'baseFontColor': '#8C8C8C',
            'toolTipBgColor': '#FA8D67',
            'toolTipPadding': '10',
            'toolTipColor': '#FFFFFF',
            'toolTipBorderRadius': '3',
            'toolTipBorderAlpha': '0',
            'drawCrossLine': '1',
            'crossLineColor': '#8C8C8C',
            'crossLineAlpha': '60',
            'crossLineThickness': '0.7',
            'alignCaptionWithCanvas': '1'
          },
          'data': getvalue
        }
      })
      firebaseChart.render()
    },
    ShowGraphcar: function (getvalue) {
      var firebaseChart = new FusionCharts({
        type: 'column2d',
        renderAt: 'chart-containercar',
        width: '800',
        height: '400',
        dataFormat: 'json',
        dataSource: {
          'chart': {
            'caption': 'Report',
            'subCaption': 'car.',
            'subCaptionFontBold': '0',
            'captionFontSize': '20',
            'subCaptionFontSize': '17',
            'captionPadding': '15',
            'captionFontColor': '#8C8C8C',
            'baseFontSize': '22',
            'baseFont': 'Barlow',
            'canvasBgAlpha': '0',
            'bgColor': '#FFFFFF',
            'bgAlpha': '100',
            'showBorder': '0',
            'showCanvasBorder': '0',
            'showPlotBorder': '0',
            'showAlternateHGridColor': '0',
            'usePlotGradientColor': '0',
            'paletteColors': '#6AC1A5',
            'showValues': '1',
            'divLineAlpha': '5',
            'showAxisLines': '1',
            'drawAnchors': '0',
            'xAxisLineColor': '#8C8C8C',
            'xAxisLineThickness': '0.7',
            'xAxisLineAlpha': '50',
            'yAxisLineColor': '#8C8C8C',
            'yAxisLineThickness': '0.7',
            'yAxisLineAlpha': '50',
            'baseFontColor': '#8C8C8C',
            'toolTipBgColor': '#FA8D67',
            'toolTipPadding': '10',
            'toolTipColor': '#FFFFFF',
            'toolTipBorderRadius': '3',
            'toolTipBorderAlpha': '0',
            'drawCrossLine': '1',
            'crossLineColor': '#8C8C8C',
            'crossLineAlpha': '60',
            'crossLineThickness': '0.7',
            'alignCaptionWithCanvas': '1'
          },
          'data': getvalue
        }
      })
      firebaseChart.render()
    }
    }
  }
  </script>
  
  <style lang="css">
  .table1{
    width: 70%;
    margin-left: 14%;
  }
  </style>