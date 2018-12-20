<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <select class="form-control form-control-lg" v-model="selectedlan" >
            <option :value="null" disabled>-- เลือกลานจอดรถ --</option>
            <option v-for="(apark, key) in showpark"  :value="apark.name" >{{apark.name}}</option>
          </select><br>
          <select class="form-control form-control-lg" v-model="selectedhoues" >
              <option value="null" disabled>-- เลือกจำนวนชั่วโมง --</option>
              <option value="1" >1 ชั่วโมง</option>
              <option value="2" >2 ชั่วโมง</option>
              <option value="3" >3 ชั่วโมง</option>
              <option value="5" >5 ชั่วโมง</option>
              <option value="8" >8 ชั่วโมง</option>
              <option value="12" >12 ชั่วโมง</option>
        </select>
        <br>
        <select class="form-control form-control-lg" v-model="selectedtime">
          <option :value="null" disabled>-- เลือกเวลา -- </option>
          <option value="1" >1.00 น.</option>
          <option value="2" >2.00 น.</option>
          <option value="3" >3.00 น.</option>
          <option value="4" >4.00 น.</option>
          <option value="5" >5.00 น.</option>
          <option value="6" >6.00 น.</option>
          <option value="7" >7.00 น.</option>
          <option value="8" >8.00 น.</option>
          <option value="9" >9.00 น.</option>
          <option value="10" >10.00 น.</option>
          <option value="11" >11.00 น.</option>
          <option value="12" >12.00 น.</option>
          <option value="13" >13.00 น.</option>
          <option value="14" >14.00 น.</option>
          <option value="15" >15.00 น.</option>
          <option value="16" >16.00 น.</option>
          <option value="17" >17.00 น.</option>
          <option value="18" >18.00 น.</option>
          <option value="19" >19.00 น.</option>
          <option value="20" >20.00 น.</option>
          <option value="21" >21.00 น.</option>
          <option value="22" >22.00 น.</option>
          <option value="23" >23.00 น.</option>
          <option value="24" >24.00 น.</option>
        </select><br>
          <a class="button is-primary is-medium is-fullwidth" @click="commitReser">Submit</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import firebase from 'firebase'
  import LTable from 'src/components/UIComponents/Table.vue'
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  import moment from 'moment'
  export default {
    data () {
      return {
        park: '',
        hours: '',
        start: '',
        stop: '',
        showpark: '',
        showuser: '',
        showpark1: '',
        result: '',
        status:'',credit: '',
        selectedlan:null,
        optionslan: [],
        selectedhoues: null,
        selectedtime: null,
        optionstime: [],
        todayhous: moment().format('HH:mm'),
        // todayDate: moment().format('D MMMM  YYYY'),
        todayDay: moment().format('D'),
        todayMont: moment().format('MMMM'),
        todayYear: moment().format('YYYY'),
        todaydate: moment().format('dddd'),
        todaynummonth: moment().format('MM')
      }
    },
    created: function () { /* แสดงชื่อ  */
        var user = firebase.auth().currentUser
        if (user) {
          this.name = user.displayName
          this.id = user.uid
        }
        this.pullData() 
    },
    // mounted () {
    //   let that = this
    //   firebase.database().ref('/Park/').on('value').then(function (snapshot) {
    //     that.showpark = snapshot.val()
    //   })
    // }
    mounted () {
    const dbRefObject22 = firebase.database().ref().child('/Month/Month12/')
    const dbRefObject = firebase.database().ref().child('/Park/')
    const dbReport = firebase.database().ref().child('/Months/')
    const dbusers = firebase.database().ref().child('/users/')
    dbRefObject22.on('value', snap => {
      this.Dayss = snap.val()
    })
    dbRefObject.on('value', snap => {
      this.showpark = snap.val()
    })
    dbReport.on('value', snap => {
      this.Month = snap.val()
    })
    dbusers.on('value', snap => {
      this.usershow = snap.val()
    }) 
  },
    methods: {
      pullData: function () {
          let that = this
          firebase.database().ref('/users/').once('value').then(function (snapshot) {
            that.showuser = snapshot.val()
          })
          firebase.database().ref('Park').once('value').then(function (snapshot) {
            that.showpark1 = snapshot.val()
          })
          firebase.database().ref('Day').once('value').then(function (snapshot) {
            that.dayr = snapshot.val()
          })
      },
      commitReser () {
      for (var variable in this.showuser) {
        if (this.showuser[variable].id === this.id) {
          var id = this.id
          var name = this.name
          var credit = parseFloat(this.selectedhoues, 10)*10
          var result = (parseFloat(this.selectedtime, 10) + parseFloat(this.selectedhoues, 10)).toFixed(2)
          var resultcredit = this.showuser[variable].money - credit
          var hours = parseFloat(this.selectedhoues, 10).toFixed(2)
          var start = parseFloat(this.selectedtime, 10).toFixed(2)
          let tmp = {
            money:credit,
            name: name,
            park: this.selectedlan,
            hours: hours,
            start: start,
            End: result,
            time : this.todayhous,
            date : this.todaydate,
            Day : this.todayDay,
            Month : this.todayMont,
            Year : this.todayYear,
            Nummonth : this.todaynummonth,
            status_in: 'On',
            status_out: 'Off'
          }
          let tmp2 = {
            credit:credit,
            name: name,
            park: this.selectedlan,
            hours: hours,
            start: start,
            End: result,
            time : this.todayhous,
            date : this.todaydate,
            Day : this.todayDay,
            Month : this.todayMont,
            Year : this.todayYear,
            Nummonth : this.todaynummonth
          }
          if(this.usershow[variable].money <= 0){
            alert("No money")
          }else{
            for (var apark in this.showpark1) {
            var countnum = parseFloat(this.showpark1[apark].count, 10)
            if (this.showpark1[apark].name === this.selectedlan){
            var count = parseFloat(1, 10)
            firebase.database().ref('Park').child(apark).update({
            count: countnum+1
        })
      } //ฟังก์ชั่นเลือกที่จอดรถ จำวนชั่วโมง และเลือกเวลา หักเครดิต แล้วนำมาทำการรวมกันแล้วเก็บข้อมูลลง Firebase
    }
          firebase.database().ref('Parksubmit').child(id).push(tmp)
          firebase.database().ref('/users/').child(variable).update({
            money: resultcredit,
            status_in: 'On'
          })
          firebase.database().ref('/money/').child(variable).update({
            money: resultcredit
          })
          for(var m in this.Month)
          {
            for (var mm in this.Month[m]){
              var day = this.todayDay
              var days = 'Day'+day
              for (var mmm in this.Month[m][mm]){
                var reportm = this.Month[m]['Day'+this.todayDay]
              }
            }
          }
          var credits = parseFloat(this.selectedhoues, 10)*10
          if(reportm == null) {
                  console.log('true ray')
                   firebase.database().ref('Months').child('/Month'+this.todaynummonth).child('Day'+this.todayDay).update({
                     'credit': credits ,'day' : this.todayDay
                     })
                     firebase.database().ref({'Day': this.todayDay})
                }else {
                  var moneysub = this.Month[m]['Day'+this.todayDay].credit + credits
                  console.log(this.Month[m]['Day'+this.todayDay].credit + credits)
                  firebase.database().ref('Months').child('/Month'+this.todaynummonth).child('Day'+this.todayDay).update({
                     'credit': moneysub ,'day' : this.todayDay
                })
            }
          }
        }
      }
      this.pullData()
    }
  }
}
</script>
<style>
</style>
