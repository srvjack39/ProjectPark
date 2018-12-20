<template>
        <div class="content">
          <div class="tile is-child box" >
            <table >
            <tbody>
            <tr class="table-primary">
              <th colspan="31" ><center> <h5>  ค่าบริการลานจอดรถธันวาคม </h5> </center> </th>
            </tr>
            <tr>
              <td v-if="Day === 1"> {{ this.Dayss.Month12.Day1.credit.toFixed(2) }}</td>
              <td v-if="Day === 2">{{ this.Dayss.Month12.Day2.credit.toFixed(2) }}</td>
              <td v-if="Day === 3"> {{ this.Dayss.Month12.Day3.credit.toFixed(2) }}</td>
              <td v-if="Day === 4">{{ this.Dayss.Month12.Day4.credit.toFixed(2) }}</td>
              <td v-if="Day === 5"> {{ this.Dayss.Month12.Day5.credit.toFixed(2) }}</td>
              <td v-if="Day === 6">{{ this.Dayss.Month12.Day6.credit.toFixed(2) }}</td>
              <td v-if="Day === 7"> {{ this.Dayss.Month12.Day7.credit.toFixed(2) }}</td>
              <td v-if="Day === 8">{{ this.Dayss.Month12.Day8.credit.toFixed(2) }}</td>
              <td v-if="Day === 9"> {{ this.Dayss.Month12.Day9.credit.toFixed(2) }}</td>
              <td v-if="Day === 10">{{ this.Dayss.Month12.Day10.credit.toFixed(2) }}</td>
              <td v-if="Day === 11"> {{ this.Dayss.Month12.Day11.credit.toFixed(2) }}</td>
              <td v-if="Day === 12">{{ this.Dayss.Month12.Day12.credit.toFixed(2) }}</td>
              <td v-if="Day === 13"> {{ this.Dayss.Month12.Day13.credit.toFixed(2) }}</td>
              <td v-if="Day === 14">{{ this.Dayss.Month12.Day14.credit.toFixed(2) }}</td>
              <td v-if="Day === 15"> {{ this.Dayss.Month12.Day15.credit.toFixed(2) }}</td>
              <td v-if="Day === 16">{{ this.Dayss.Month12.Day16.credit.toFixed(2) }}</td>
              <td v-if="Day === 17"> {{ this.Dayss.Month12.Day17.credit.toFixed(2) }}</td>
              <td v-if="Day === 18">{{ this.Dayss.Month12.Day18.credit.toFixed(2) }}</td>
              <td v-if="Day === 19"> {{ this.Dayss.Month12.Day19.credit.toFixed(2) }}</td>
              <td v-if="Day.Day === 20">{{ this.Dayss.Month12.Day20.credit.toFixed(2) }}</td>
              <td v-if="Day === 21">{{ this.Dayss.Month12.Day21.credit.toFixed(2) }}</td>
              <td v-if="Day === 22"> {{ this.Dayss.Month12.Day22.credit.toFixed(2) }}</td>
              <td v-if="Day === 23">{{ this.Dayss.Month12.Day23.credit.toFixed(2) }}</td>
              <td v-if="Day === 24"> {{ this.Dayss.Month12.Day24.credit.toFixed(2) }}</td>
              <td v-if="Day === 25">{{ this.Dayss.Month12.Day25.credit.toFixed(2) }}</td>
              <td v-if="Day === 26"> {{ this.Dayss.Month12.Day26.credit.toFixed(2) }}</td>
              <td v-if="Day === 27">{{ this.Dayss.Month12.Day27.credit.toFixed(2) }}</td>
              <td v-if="Day === 28"> {{ this.Dayss.Month12.Day28.credit.toFixed(2) }}</td>
              <td v-if="Day === 29">{{ this.Dayss.Month12.Day29.credit.toFixed(2) }}</td>
              <td v-if="Day === 30"> {{ this.Dayss.Month12.Day30.credit.toFixed(2) }}</td>
              <td v-if="Day === 31">{{ this.Dayss.Month12.Day31.credit.toFixed(2) }}</td>
            </tr>
          </tbody>
          </table>
        </div>
      </div>
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
  export default {
    name: 'Addpark',
    data () {
      return {
        data: {
          name: '',
          num: 0
        },
        showpark:'',
        showimage:'',
        Month:'',
        Day:'',
        todaynum: moment().format('D'),
        todaynummonth: moment().format('MM'),
        todayMont: moment().format('MMMM'),
        todayYear: moment().format('YYYY'),
        todaydate: moment().format('dddd'),
        todayDay: moment().format('D'),
        daynum: moment().format('DD'),
        Reportmonth:'',
        moneyTotal:0,
        Day:'',
        showparksub:'',
        Water:'',
        Dayss:'',
        doday:'',
        seventeen: 17,
        credit:'0 '
      }
    },
    components: {
      Checkbox,
      Card,
      LTable,
      ChartCard,
      StatsCard,
    },
    created: function () { /* แสดงชื่อ Admin */
      var user = firebase.auth().currentUser
      if (user) {
      } else {
  
      }
      this.pullData()
    },
    mounted () {
    const dbRefObject = firebase.database().ref().child('/Months/')
    const dbRefimage = firebase.database().ref().child('image')
    const dbRefuser = firebase.database().ref().child('users')
    const dbRefDays = firebase.database().ref().child('/Day/')
    const dbRefMonthafter = firebase.database().ref().child('Month')
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
      this.Day = snap.val()
    })
    dbRefMonthafter.on('value', snap => {
      this.MonthAfter = snap.val()
    })
    firebase.database().ref('Day').update({ Day : parseFloat(this.todayDay,10)})
    firebase.database().ref('Month').update({ Month : parseFloat(this.todaynummonth,10)})
    this.pullData()
  },
    methods: {
      pullData: function () {   /* แสดงชือตาราง User ที่ส่งรูปมาให้ Approved */

      },
    money () {
      this.menu = 'Money'
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