<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row" v-for="parksub in showparksub">
        <div class="col-xl-3 col-md-6" v-for="(sub,key) in parksub" v-if="sub.name === name ">
          <stats-card>
            <div slot="footer">
              <p class="card-title">ชื่อลานจอดรถ: {{ sub.park }}</p>
              <p class="card-title">เลขลานจอดรถ: {{ sub.numpark }}</p>
              <p class="card-title">ชื่อผู้จอง: {{ sub.name }}</p>
              <p class="card-title">จอง: {{ sub.start }} - {{  sub.End }} น.</p>
              <p class="card-title">จองตอนเวลา: {{ sub.time }} น.</p>
              <p class="card-title">ค่าใช้จ่าย: {{ sub.money }} บาท </p>
              <p class="card-title" v-if="sub.status_in === 'On' ">
                <a
                  class="button is-primary"
                  @click="onstatus_in(key,sub,sub.numpark)"
                  style="color:white"
                >เปิด in</a>
                 <a
                  v-if="checkTime(sub)<30"
                  class="button is-info"
                  style="color:white"
                  @click="Addtime_Time = true"
                >เพิ่มเวลา </a>
              </p>
              <p class="card-title" v-if="sub.status_out === 'On' ">
                <a
                  class="button is-danger"
                  @click="onstatus_out(key,sub.park,sub.numpark)"
                  style="color:white"
                >เปิด out</a>
                <!--<a v-if="(parseFloat(sub.start,10) + parseFloat(0.30,10)).toFixed(2) > parseFloat(todayhous,10).toFixed(2)" class="button is-info" style="color:white" @click="Addtime_Time = true" >เพิ่มเวลา</a></p>-->
               </p>
              <a
                class="button is-primary"
                v-if="sub.status_in === 'Wait' && sub.status_out === 'Wait'"
                style="color:white"
                disabled
              >รอเวลา</a>
              <a
                class="button is-info"
                v-if="sub.status_out === 'Off' && sub.status_in === 'Off'"
                style="color:white"
                @click="onstatus_off(key,sub)"
              >เกินเวลา</a>
              <a
                class="button is-info"
                v-if="sub.status_out === 'Full' && sub.status_in === 'Full'"
                style="color:white"
                @click="onstatus_FullModal = true"
              >เลือกที่จอดใหม่</a>
              <a
                v-if="sub.status_in === 'Set' && sub.status_out === 'Set'"
                class="button is-info"
                style="color:white"
                @click="onstatus_Set(key,sub)"
              >เปิดช่องจอดรถ</a>
            </div>
          </stats-card>
        </div>
      </div>
    </div>

    <div class="row" v-for="parksub in showparksub">
      <div v-for="(sub,key) in parksub" v-if="sub.name === name ">
        <center>
          <b-modal :active.sync="onstatus_FullModal">
            <br>
            <h3>เลือกที่จอดรถใหม่</h3>
            <div v-for="(sp,key,index) in showparkadd" v-if="sp.park == sub.park">
              <div v-for="(spp,key) in sp" v-if="spp.status == 'On'">
                <br>
                <a
                  class="button is-danger"
                  @click="updatepark(key)"
                  style="color:white"
                >{{ spp.numpark }}</a>
              </div>
              <br>
              <br>
            </div>
          </b-modal>
        </center>
      </div>
    </div>
    <center>
      <b-modal :active.sync="Addtime_Time">
        <div>
          <br>
          <h3>เพิ่มเวลา</h3>
          <select class="form-control" v-model="selectedhoues">
            <option value="null" disabled>-- เลือกจำนวนชั่วโมง --</option>
            <!-- <option value="0.30" v-if="(23.60-todayhous) > 0.30">30 นาที</option> -->
            <option value="1" v-if="(23.60-todayhous) > 1.00">1 ชั่วโมง</option>
            <option value="2" v-if="(23.60-todayhous) > 2.00">2 ชั่วโมง</option>
            <option value="3" v-if="(23.60-todayhous) > 3.00">3 ชั่วโมง</option>
            <option value="5" v-if="(23.60-todayhous) > 5.00">5 ชั่วโมง</option>
            <option value="8" v-if="(23.60-todayhous) > 8.00">8 ชั่วโมง</option>
            <option value="12" v-if="(23.60-todayhous) > 12.00">12 ชั่วโมง</option>
          </select>
          <br>
          <a class="button is-info" @click="UpdateTime()" style="color:white">ยืนยัน</a>
          <a class="button is-info" @click="UpdateCancle()" style="color:white">ยกเลิก</a>
        </div>
        <br>
      </b-modal>
    </center>
  </div>
</template>
<script>
import Card from "src/components/UIComponents/Cards/Card.vue"
import ChartCard from "src/components/UIComponents/Cards/ChartCard.vue"
import StatsCard from "src/components/UIComponents/Cards/StatsCard.vue"
import LTable from "src/components/UIComponents/Table.vue"
import Checkbox from "src/components/UIComponents/Inputs/Checkbox.vue"
import firebase from "firebase"
import moment from "moment"
import date from "date-and-time"

var database = firebase.database()
var reportcarRef = database.ref("/Reportcar")
export default {
  components: {
    Checkbox,
    Card,
    LTable,
    ChartCard,
    StatsCard
  },
  data() {
    return {
      device: "",
      control: "",
      statusin: "",
      statusout: "",
      showpark: "",
      user: "",
      parksubuser: "",
      name: "",
      showparksub: "",
      carin: "",
      nameparkadd: "",
      Addtime_Time: false,
      onstatus_FullModal: false,
      selectedhoues: "",
      todayhous: moment().format("H:mm"),
      // todayDate: moment().format('D MMMM YYYY'),
      todayDay: moment().format("D"),
      todayMont: moment().format("MMMM"),
      todayYear: moment().format("YYYY"),
      todaydate: moment().format("dddd"),
      todaynummonth: moment().format("MM"),
      todayDate: moment().format('YYYY-MMMM-DD')
    }
  },
  created: function() {
    /* แสดงชื่อ */
    var user = firebase.auth().currentUser
    if (user) {
      this.name = user.displayName
      this.id = user.uid
    } else {
      alert("No user")
      this.$router.replace("/")
    }
    this.pullData()
  },
  computed: {
  },
  mounted() {
    const dbRefObject = firebase
      .database()
      .ref()
      .child("Park")
    const dbRefparksub = firebase
      .database()
      .ref()
      .child("Parksubmit")
    const dbRefuser = firebase
      .database()
      .ref()
      .child("users")
    const dbRefmonth = firebase
      .database()
      .ref()
      .child("Months")
    const dbMonthcarin = firebase
      .database()
      .ref()
      .child("Years")
    const dbYearcarin = firebase
      .database()
      .ref()
      .child("Year")
    const dbparkadd = firebase
      .database()
      .ref()
      .child("Parkadd")
    dbparkadd.on("value", snap => {
      this.showparkadd = snap.val()
    })
    dbYearcarin.on("value", snap => {
      this.Yearcarin = snap.val()
    })
    dbMonthcarin.on("value", snap => {
      this.Monthcarin = snap.val()
    })
    dbRefObject.on("value", snap => {
      this.showpark = snap.val()
    })
    dbRefmonth.on("value", snap => {
      this.months = snap.val()
    })
    dbRefuser.on("value", snap => {
      this.showuser = snap.val()
      for (var users in this.showuser) {
        if (this.showuser[users].id === this.id) {
          this.money1 = this.showuser[users].money
        }
      }
      for (var users in this.showuser) {
        if (this.showuser[users].id === this.id) {
          this.statusin = this.showuser[users].status_in
          this.statusout = this.showuser[users].status_out
        }
      }
    })
    dbRefparksub.on("value", snap => {
      this.showparksub = snap.val()
    })
    for (var user in this.showparksub) {
      if (this.id === user) {
        for (var userr in this.showparksub[this.id]) {
          this.parksubuser = this.showparksub[this.id][userr]
          this.statusinsub = this.showparksub[this.id][userr].status_in
          this.statusoutsub = this.showparksub[this.id][userr].status_out
          this.checktime = this.showparksub[this.id][userr].start
          this.park = this.showparksub[this.id][userr].park
          this.numpark = this.showparksub[this.id][userr].numpark
          if (
            this.todayhous >=
              this.showparksub[this.id][userr].start &&
            this.todayhous <=
              this.showparksub[this.id][userr].End
          ) {
            var id = this.id
            console.log("พร้อมใช้งาน")
            for (var nn in this.showparkadd) {
            }
            // console.log(this.showparkadd[this.park][this.numpark].status)
            if (
              this.showparkadd[this.park][this.numpark].status == "On" &&
              this.statusinsub == "Wait" &&
              this.statusoutsub == "Wait"
            ) {
              console.log("ว่างเข้าได้")
              firebase
                .database()
                .ref("Parksubmit")
                .child(id)
                .child(userr)
                .update({
                  status_in: "Set",
                  status_out: "Set"
                })
            } else if (
              this.showparkadd[this.park][this.numpark].status == "Off"
            ) {
              console.log("ไม่ว่างมีรถจอดอยู่หาที่ใหม่")
              // for(var check = 1 check <=this.showparkadd[this.park].numpark  check++) {
              // if(this.showparkadd[this.park]['numpark'+check].status == 'On') {
              // var numparkset
              // numparkset += 'numpark'+check+'\n'
              // console.log("ว่าง")
              // }
              // console.log(numparkset)
              // }
              firebase
                .database()
                .ref("Parksubmit")
                .child(id)
                .child(userr)
                .update({
                  status_in: "Full",
                  status_out: "Full"
                })
            }
          } else if (this.todayhous >= this.showparksub[this.id][userr].End) {
            console.log(this.todayhous + "เกินเวลา")
            var id = this.id
            firebase
              .database()
              .ref("Parksubmit")
              .child(id)
              .child(userr)
              .update({
                status_in: "Off",
                status_out: "Off"
              })
          }
          if (this.showparksub[this.id][userr].status_out == "On") {
            console.log("เปิดตอนเข้าแล้ว")
            firebase
              .database()
              .ref("Parksubmit")
              .child(id)
              .child(userr)
              .update({
                status_in: "Off"
              })
          }
        }
      }
    }
  },
  methods: {
        checkTime (parksub) {
        let str = parksub.Year+'/'+parksub.Month+'/'+parksub.Day+' '+ parksub.start +':00'
      var d = new Date(str)
      console.log(d)
      return date.subtract(new Date(), d).toMinutes()
    },
    pullData() {
      let that = this
      firebase
        .database()
        .ref("/device/")
        .on("value", function(snapshot) {
          that.device = snapshot.val()
        })
      firebase
        .database()
        .ref("/device/control")
        .on("value", function(snapshot) {
          var control = snapshot.val()
          that.status = control.status
        })
      firebase
        .database()
        .ref("Park")
        .once("value")
        .then(function(snapshot) {
          that.showpark1 = snapshot.val()
        })
    },
    reportcarinday(sub) {
      let foundcarinday = ""
      let day = moment()
        .tz("Asia/Bangkok")
        .format()
        .slice(0, 10)
      const reportcarday = reportcarRef
        .child("reportcarin")
        .child(sub)
        .child("day")
        .orderByChild("label")
        .equalTo(day)
      reportcarday.on("child_added", snap => {
        foundcarinday = snap.val()
      })
      console.log(reportcarRef)
      if (foundcarinday === "") {
        console.log("สร้างวันใหม่")
        let data = {
          label: day,
          carin: 1
        }
        reportcarRef
          .child("reportcarin")
          .child(sub)
          .child("day")
          .child(day)
          .set(data)
        reportcarRef
          .child("detail")
          .child(sub)
          .child("countdoing")
          .set(1)
      } else {
        console.log("เงินรวมคาบบ")
        let updatavalue = foundcarinday.carin + 1
        reportcarRef
          .child("reportcarin")
          .child(sub)
          .child("day")
          .child(day)
          .child("carin")
          .set(updatavalue)
      }
    },
    reportcarinmonth(sub) {
      let foundcarinmonth = ""
      let month = moment()
        .tz("Asia/Bangkok")
        .format()
        .slice(0, 10)
      const reportcarday = reportcarRef
        .child("reportcarin")
        .child(sub)
        .child("month")
        .orderByChild("label")
        .equalTo(month)
      reportcarday.on("child_added", snap => {
        foundcarinmonth = snap.val()
      })
      console.log(reportcarRef)
      if (foundcarinmonth === "") {
        console.log("สร้างวันใหม่")
        let data = {
          label: month,
          value: 1
        }
        reportcarRef
          .child("reportcarin")
          .child(sub)
          .child("month")
          .child(month)
          .set(data)
        reportcarRef
          .child("detail")
          .child(sub)
          .child("countdoing")
          .set(1)
      } else {
        console.log("เงินรวมคาบบ")
        let updatavalue = foundcarinmonth.value + 1
        reportcarRef
          .child("reportcarin")
          .child(sub)
          .child("month")
          .child(month)
          .child("value")
          .set(updatavalue)
      }
    },
    reportcarinyear(sub) {
      let foundcarinyear = ""
      let year = moment()
        .tz("Asia/Bangkok")
        .format()
        .slice(0, 4)
      const reportcarday = reportcarRef
        .child("reportcarin")
        .child(sub)
        .child("year")
        .orderByChild("label")
        .equalTo(year)
      reportcarday.on("child_added", snap => {
        foundcarinyear = snap.val()
      })
      console.log(reportcarRef)
      if (foundcarinyear === "") {
        console.log("สร้างวันใหม่")
        let data = {
          label: year,
          value: 1
        }
        reportcarRef
          .child("reportcarin")
          .child(sub)
          .child("year")
          .child(year)
          .set(data)
        reportcarRef
          .child("detail")
          .child(sub)
          .child("countdoing")
          .set(1)
      } else {
        console.log("เงินรวมคาบบ")
        let updatavalue = foundcarinyear.value + 1
        reportcarRef
          .child("reportcarin")
          .child(sub)
          .child("year")
          .child(year)
          .child("value")
          .set(updatavalue)
      }
    },
    reportcaroutday(sub) {
      let foundcaroutday = ""
      let day = moment()
        .tz("Asia/Bangkok")
        .format()
        .slice(0, 10)
      const reportcarday = reportcarRef
        .child("reportcarout")
        .child(sub)
        .child("day")
        .orderByChild("label")
        .equalTo(day)
      reportcarday.on("child_added", snap => {
        foundcaroutday = snap.val()
      })
      console.log(reportcarRef)
      if (foundcaroutday === "") {
        console.log("สร้างวันใหม่")
        let data = {
          label: day,
          carout: 1
        }
        reportcarRef
          .child("reportcarout")
          .child(sub)
          .child("day")
          .child(day)
          .set(data)
        reportcarRef
          .child("detail")
          .child(sub)
          .child("countdoing")
          .set(1)
      } else {
        console.log("เงินรวมคาบบ")
        let updatavalue = foundcaroutday.carout + 1
        reportcarRef
          .child("reportcarout")
          .child(sub)
          .child("day")
          .child(day)
          .child("carout")
          .set(updatavalue)
      }
    },
    reportcaroutmonth(sub) {
      let foundcaroutmonth = ""
      let month = moment()
        .tz("Asia/Bangkok")
        .format()
        .slice(0, 10)
      const reportcarday = reportcarRef
        .child("reportcarout")
        .child(sub)
        .child("month")
        .orderByChild("label")
        .equalTo(month)
      reportcarday.on("child_added", snap => {
        foundcaroutmonth = snap.val()
      })
      console.log(reportcarRef)
      if (foundcaroutmonth === "") {
        console.log("สร้างวันใหม่")
        let data = {
          label: month,
          carout: 1
        }
        reportcarRef
          .child("reportcarout")
          .child(sub)
          .child("month")
          .child(month)
          .set(data)
        reportcarRef
          .child("detail")
          .child(sub)
          .child("countdoing")
          .set(1)
      } else {
        console.log("เงินรวมคาบบ")
        let updatavalue = foundcaroutmonth.carout + 1
        reportcarRef
          .child("reportcarout")
          .child(sub)
          .child("month")
          .child(month)
          .child("carout")
          .set(updatavalue)
      }
    },
    reportcaroutyear(sub) {
      let foundcaroutyear = ""
      let year = moment()
        .tz("Asia/Bangkok")
        .format()
        .slice(0, 4)
      const reportcarday = reportcarRef
        .child("reportcarout")
        .child(sub)
        .child("year")
        .orderByChild("label")
        .equalTo(year)
      reportcarday.on("child_added", snap => {
        foundcaroutyear = snap.val()
      })
      console.log(reportcarRef)
      if (foundcaroutyear === "") {
        console.log("สร้างวันใหม่")
        let data = {
          label: year,
          carout: 1
        }
        reportcarRef
          .child("reportcarout")
          .child(sub)
          .child("year")
          .child(year)
          .set(data)
        reportcarRef
          .child("detail")
          .child(sub)
          .child("countdoing")
          .set(1)
      } else {
        console.log("เงินรวมคาบบ")
        let updatavalue = foundcaroutyear.carout + 1
        reportcarRef
          .child("reportcarout")
          .child(sub)
          .child("year")
          .child(year)
          .child("carout")
          .set(updatavalue)
      }
    },
    onstatus_Set(key,sub) {
      for (var users in this.showuser) {
        if (this.showuser[users].id === this.id) {
          this.statusin = this.showuser[users].status_in
          this.statusout = this.showuser[users].status_out
          firebase
            .database()
            .ref("/Parksubmit/")
            .child(this.id)
            .child(key)
            .update({
              status_in: "On"
            })
          firebase
            .database()
            .ref("/Parksubmit/")
            .child(this.id)
            .child(key)
            .update({
              status_out: "Off"
            })
        }
      }
      //ทำ update ที่เปิดช่องจอดรถ
      for (var user in this.showparksub) {
        if (this.id === user) {
          for (var userr in this.showparksub[this.id]) {
            this.parksubuser = this.showparksub[this.id][userr]
            this.statusinsub = this.showparksub[this.id][userr].status_in
            this.statusoutsub = this.showparksub[this.id][userr].status_out
            this.checktime = this.showparksub[this.id][userr].start
            this.park = this.showparksub[this.id][userr].park
            this.numpark = this.showparksub[this.id][userr].numpark
            console.log(this.showparksub[this.id][userr].park)
            firebase
              .database()
              .ref("Parksubmit")
              .child(this.id)
              .child(userr)
              .update({
                numpark: key
              })
            firebase
              .database()
              .ref("Parksubmit")
              .child(this.id)
              .child(userr)
              .update({
                numpark: key,
                status_in: "On",
                status_out: "Off"
              })
          }
        }
      }
    },
    onstatus_in(key,sub, parkcar) {
      firebase
        .database()
        .ref("/device/control")
        .update({
          status_in: 1
        })
      for (var users in this.showuser) {
        if (this.showuser[users].id === this.id) {
          this.statusin = this.showuser[users].status_in
          this.statusout = this.showuser[users].status_out
          firebase
            .database()
            .ref("/Parksubmit/")
            .child(this.id)
            .child(key)
            .update({
              status_in: "Off"
            })
          firebase
            .database()
            .ref("/Parksubmit/")
            .child(this.id)
            .child(key)
            .update({
              status_out: "On"
            })
        }
      }
      console.log(parkcar)
      for (var apark in this.showpark) {
        var countnum = parseFloat(this.showpark[apark].carin, 10)
        if (this.showpark[apark].name === sub.park) {
          var count = parseFloat(1, 10)
          if (this.showpark[apark].status == "On") {
            console.log("ที่จอดรถช่องนี้ว่างจ้า")
          } else {
            console.log("ที่จอดรถช่องนี้ไม่ว่างจ้า")
          }
          firebase
            .database()
            .ref("Park")
            .child(apark)
            .update({
              carin: countnum + 1
            })
        }
      }
      console.log(sub.park)
      this.reportcarinday(sub.park)
      this.reportcarinmonth(sub.park)
      this.reportcarinyear(sub.park)
      this.status = 1
      this.pullData()
    },
    updatepark(key) {
      for (var user in this.showparksub) {
        if (this.id === user) {
          for (var userr in this.showparksub[this.id]) {
            this.parksubuser = this.showparksub[this.id][userr]
            this.statusinsub = this.showparksub[this.id][userr].status_in
            this.statusoutsub = this.showparksub[this.id][userr].status_out
            this.checktime = this.showparksub[this.id][userr].start
            this.park = this.showparksub[this.id][userr].park
            this.numpark = this.showparksub[this.id][userr].numpark
            console.log(this.showparksub[this.id][userr].park)
            firebase
              .database()
              .ref("Parksubmit")
              .child(this.id)
              .child(userr)
              .update({
                numpark: key
              })
            firebase
              .database()
              .ref("Parksubmit")
              .child(this.id)
              .child(userr)
              .update({
                numpark: key,
                status_in: "On",
                status_out: "Off"
              })
          }
        }
      }
      let tmp = {
        name: this.showparksub[this.id][userr].name,
        park: this.showparksub[this.id][userr].park,
        hours: this.showparksub[this.id][userr].hours,
        start: this.showparksub[this.id][userr].start,
        End: this.showparksub[this.id][userr].End,
        time: this.showparksub[this.id][userr].time,
        date: this.showparksub[this.id][userr].date,
        Day: this.showparksub[this.id][userr].Day,
        Month: this.showparksub[this.id][userr].Month,
        Year: this.showparksub[this.id][userr].Year,
        Nummonth: this.showparksub[this.id][userr].Nummonth,
        status_in: "Wait",
        status_out: "Wait",
        numpark: this.showparksub[this.id][userr].numpark
      }
      this.$swal({
        title: "ยืนยันการเลือกที่จอดใหม่",
        html: "ชื่อที่จอดรถ : " + key + "<br><br>",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",
        showCloseButton: true,
        showLoaderOnConfirm: true
      }).then(result => {
        if (result.value) {
          for (var sp in this.showpark) {
            if (this.showpark[sp].name === this.park) {
              console.log(this.showpark[sp][this.park][this.numpark][this.id])
              var tt = this.showpark[sp][this.park][this.numpark].timeminit
              firebase
                .database()
                .ref("Park")
                .child(sp)
                .child(this.park)
                .child(key)
                .child(this.id)
                .push(tmp)
              firebase
                .database()
                .ref("Park")
                .child(sp)
                .child(this.park)
                .child(key)
                .update({
                  countsub: 1,
                  timelast: this.showparksub[this.id][userr].End,
                  timeminit: tt,
                  timestart: this.showparksub[this.id][userr].start
                })
              firebase
                .database()
                .ref("Park")
                .child(sp)
                .child(this.park)
                .child(this.numpark)
                .child(this.id)
                .set(null)
              firebase
                .database()
                .ref("Park")
                .child(sp)
                .child(this.park)
                .child(this.numpark)
                .update({
                  countsub: 0,
                  timelast: 0,
                  timeminit: 0,
                  timestart: 0
                })
            }
          }
          this.onstatus_FullModal = false
          this.$swal(
            "ยืนยัน",
            "ได้ยืนยันการเลือกที่จอดรถใหม่ :" + key,
            "success"
          )
        } else {
          this.$swal("ยกเลิก", "คุณได้ยกเลิกการเลือกที่จอดรถใหม่", "info")
          this.onstatus_FullModal = false
        }
      })
    },
    onstatus_off(key, sub) {
      console.log("เกินเวลา" + parseFloat(sub.End, 10).toFixed(0))
      if (parseFloat(this.todayhous).toFixed(0) - parseFloat(sub.End, 10) < 1) {
        console.log("น้อยกว่า 1 ชม.")
        var timewarning = 10
        console.log(timewarning)
      } else if (
        parseFloat(this.todayhous, 10).toFixed(0) -
          parseFloat(sub.End, 10).toFixed(0) >
        1
      ) {
        timewarning =
          (parseFloat(this.todayhous, 10).toFixed(0) -
            parseFloat(sub.End, 10).toFixed(0)) *
          10
        var timefine = parseFloat(timewarning, 10).toFixed(0)
        console.log(timefine)
        console.log("มากกว่า 1 ชม.")
        console.log(parseFloat(timewarning).toFixed(0))
        console.log(
          parseFloat(this.todayhous).toFixed(0) -
            parseFloat(sub.End, 10).toFixed(0)
        )
      }
      this.$swal({
        title: "เสียค่าปรับ",
        html:
          "ชื่อลานจอดรถ : " +
          sub.park +
          "<br><br>" +
          "ต้องเสียค่าปรับทั้งหมด : " +
          timewarning +
          " บาท",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "ยืนยัน",
        showCloseButton: true,
        showLoaderOnConfirm: true
      }).then(result => {
        if (result.value) {
          this.commitfine(timewarning)
          this.$swal(
            "ยืนยัน",
            "จ่ายค่าปรับเรียบร้อย :" + timewarning + "บาท",
            "success"
          )
          this.isResave = false
          this.isImageModalActive = false
        }
      })
      console.log(this.todayhous - 1.0)
      for (var users in this.showuser) {
        if (this.showuser[users].id === this.id) {
          this.statusin = this.showuser[users].status_in
          this.statusout = this.showuser[users].status_out
          firebase
            .database()
            .ref("/Parksubmit/")
            .child(this.id)
            .child(key)
            .update({
              status_in: "Off"
            })
          firebase
            .database()
            .ref("/Parksubmit/")
            .child(this.id)
            .child(key)
            .update({
              status_out: "On"
            })
          firebase
            .database()
            .ref("/Parksubmit/")
            .child(this.id)
            .child(key)
            .update({
              status_in: "Off"
            })
          firebase
            .database()
            .ref("/Parksubmit/")
            .child(this.id)
            .child(key)
            .update({
              End: this.todayhous - 1.0
            })
        }
      }
    },
    onstatus_Full(key, sub) {},
    commitfine(n) {
      for (var users in this.showuser) {
        if (this.showuser[users].id === this.id) {
          console.log(users)
          this.moneyuser = this.showuser[users].money
          var finetotal = this.moneyuser - +n
          firebase
            .database()
            .ref("/users/")
            .child(users)
            .update({
              money: finetotal
            })
          firebase
            .database()
            .ref("/users/")
            .child(users)
            .update({
              money: finetotal
            })
        }
      }
    },
    onstatus_out(key, sub, numpark) {
      firebase
        .database()
        .ref("/device/control")
        .update({
          status_out: 1
        })
      for (var users in this.showuser) {
        if (this.showuser[users].id === this.id) {
        //   this.statusin = this.showuser[users].status_in
        //   this.statusout = this.showuser[users].status_out
        //   firebase
        //     .database()
        //     .ref("/Parksubmit/")
        //     .child(this.id)
        //     .child(key)
        //     .update({
        //       status_in: "On"
        //     })
        //   firebase
        //     .database()
        //     .ref("/Parksubmit/")
        //     .child(this.id)
        //     .child(key)
        //     .update({
        //       status_out: "Off"
        //     })
        }
      }
      for (var apark in this.showpark) {
        var countnum = parseFloat(this.showpark[apark].carin, 10)
        var countcar = parseFloat(this.showpark[apark].count, 10)
        if (this.showpark[apark].name === sub) {
          var count = parseFloat(1, 10)
          firebase
            .database()
            .ref("Park")
            .child(apark)
            .update({
              carin: countnum - 1
            })
          firebase
            .database()
            .ref("Park")
            .child(apark)
            .update({
              count: countcar - 1
            })
            for (var users in this.showuser) {
            if (this.showuser[users].id === this.id) {
              firebase
                .database()
                .ref("/users/")
                .child(users)
                .update({
                  status_submit: "On"
                })
            }
          }
          console.log(sub)
          for(var userr in this.showparksub) {
          console.log(this.showparksub[userr])
          }
          firebase
            .database()
            .ref("Parksubmit")
            .child(this.id)
            .child(key)
            .set(null)
        //   for (var parker in this.showpark1) {
        //     if (this.showpark1[parker].name === sub) {
        //       var countsubput = this.showpark1[parker][sub][numpark].countsub
        //       console.log("เข้าทำ loop 703")
        //       console.log(this.showpark1[parker])
        //       firebase
        //         .database()
        //         .ref("Park")
        //         .child(parker)
        //         .child(sub)
        //         .child(numpark)
        //         .child(this.id)
        //         .set(null)
        //       firebase
        //         .database()
        //         .ref("Park")
        //         .child(parker)
        //         .child(sub)
        //         .child(numpark)
        //         .update({
        //           countsub: countsubput - 1
        //         })
        //     }
        //   }
        //   for (var parker in this.showpark) {
        //     if (this.showpark[parker].name === sub) {
        //       var countsubput = this.showpark[parker][sub][numpark].countsub
        //       console.log("เข้าทำ loop 403")
        //       console.log(this.showpark[parker][sub][numpark].countsub == 0)
        //       if (this.showpark[parker][sub][numpark].countsub == 0) {
        //         console.log("เข้า 406")
        //         firebase
        //           .database()
        //           .ref("Park")
        //           .child(parker)
        //           .child(sub)
        //           .child(numpark)
        //           .update({
        //             timelast: 0,
        //             timestart: 0
        //           })
        //         firebase
        //           .database()
        //           .ref("Park")
        //           .child(parker)
        //           .child(sub)
        //           .child(numpark)
        //           .update({
        //             timeminit: 0
        //           })
        //       }
        //     }
        //   }
        }
      }
      console.log(sub)
      this.reportcaroutday(sub)
      this.reportcaroutmonth(sub)
      this.reportcaroutyear(sub)
      this.status = 1
      this.pullData()
    },
    UpdateTime() {
      console.log(this.selectedhoues)
      console.log(this.id)
      for (var userr in this.showparksub[this.id]) {
        this.parksubuser = this.showparksub[this.id][userr]
        this.statusinsub = this.showparksub[this.id][userr].status_in
        this.statusoutsub = this.showparksub[this.id][userr].status_out
        this.checktime = this.showparksub[this.id][userr].start
        this.park = this.showparksub[this.id][userr].park
        this.numpark = this.showparksub[this.id][userr].numpark
        this.End = this.numpark = this.showparksub[this.id][userr].End
        this.Hours = this.showparksub[this.id][userr].hours
        var Hours = this.Hours
        var End = parseFloat(this.End, 10).toFixed(2)
        var salect = parseFloat(this.selectedhoues, 10).toFixed(2)
        var Result = (
          parseFloat(this.End, 10) + parseFloat(this.selectedhoues, 10)
        ).toFixed(2)
        console.log(
          parseFloat(this.Hours, 10) + parseFloat(this.selectedhoues, 10)
        )
        this.$swal({
          title: "ยืนยันการเพิ่มเวลา",
          html:
            "ชื่อลานจอดรถ : " +
            this.park +
            "<br><br>" +
            "เพิ่มเวลา : " +
            this.selectedhoues +
            " ชั่วโมง <br><br>" +
            " ถึงเวลา " +
            Result +
            " น. <br><br>" +
            "เสียค่าใช้จ่ายเพิ่ม : " +
            this.selectedhoues * 10 +
            " บาท",
          type: "warning",
          showCancelButton: true,
          confirmButtonText: "ยืนยัน",
          cancelButtonText: "ยกเลิก",
          showCloseButton: true,
          showLoaderOnConfirm: true
        }).then(result => {
          if (result.value) {
            this.UpdatetimeSelect()
            this.Addtime_Time = false
            this.$swal(
              "ยืนยัน",
              "ได้ยืนยันการเพิ่มเวลา :" + this.selectedhoues + " ชั่วโมง",
              "success"
            )
          } else {
            this.$swal("ยกเลิก", "คุณได้ยกเลิกการเพิ่มเวลา", "info")
            this.Addtime_Time = false
          }
        })
      }
    },
    UpdatetimeSelect() {
      for (var user in this.showparksub) {
        for (var userr in this.showparksub[this.id]) {
          this.parksubuser = this.showparksub[this.id][userr]
          this.statusinsub = this.showparksub[this.id][userr].status_in
          this.statusoutsub = this.showparksub[this.id][userr].status_out
          this.checktime = this.showparksub[this.id][userr].start
          this.park = this.showparksub[this.id][userr].park
          this.numpark = this.showparksub[this.id][userr].numpark
          this.End = this.numpark = this.showparksub[this.id][userr].End
          this.Hours = this.showparksub[this.id][userr].hours
          var Hours = this.Hours
          var End = parseFloat(this.End, 10).toFixed(2)
          var salect = parseFloat(this.selectedhoues, 10).toFixed(2)
          var Resulttime = (
            parseFloat(this.End, 10) + parseFloat(this.selectedhoues, 10)
          ).toFixed(2)
          var MoneyTotal =
            this.showparksub[this.id][userr].money +
            parseFloat(this.selectedhoues, 10) * 10
          // console.log(MoneyTotal)
          firebase
            .database()
            .ref("/Parksubmit/")
            .child(this.id)
            .child(userr)
            .update({
              End: Resulttime,
              hours:
                parseFloat(this.Hours, 10) + parseFloat(this.selectedhoues, 10),
              money: MoneyTotal
            })
          //อย่าลืมทำหักเงิน จาก User
        }
      }
    }
  }
}
</script>
<style>
</style>