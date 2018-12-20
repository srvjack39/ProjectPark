<template >
<div class="content">
  <div class="container-fluid">
    <div class="tile is-child box">
      <table class="table is-hoverable" >
          <thead>
              <tr>
                  <th scope="col">ชื่อลานจอดรถ </th>
                  <th scope="col">จำนวนที่จอดรถ</th>
                  <th scope="col">Submit</th>
              </tr>
          </thead>
          <tbody >
              <td > <input class="input" type="text" placeholder="name" v-model="namepark"> </td>
              <td > <input class="input" type="number" placeholder="Text input" v-model="num"> </td>
              <td ><a class="button is-danger is-normal" @click="CommitPark()">Submit</a></td>
          </tr>
      </tbody>
  </table>
</div><br>
<div  class="table1" >
  <div class="tile is-child box">
     <table class="table is-hoverable">
     <thead >
       <tr>
         <th scope="col"><center>No. </center></th>
         <th scope="col"><center>Namepark</center></th>
         <th cope="col"><center>จำนวนพื้นที่จอดรถทั้งหมด</center></th>
         <th cope="col"> <center>แก้ไขจำนวนที่จอดรถ</center> </th>
         <th scope="col"><center>Delete</center></th>
       </tr>
     </thead>
       <tbody v-if="checkEdit !== key" v-for = " (parks, key, count) in showpark">
         <tr >
         <td> <center>{{ count+1 }}</center></td>
         <td> <center>{{ parks.name }}</center> </td>
         <td> <center>{{ parks.Total }}</center></td>
         <td> <center> <a class="button is-success " @click="swap(key)"><i class="fas fa-pen-square"></i></a>  </center></td>
         <td> <center> <a class="button is-danger" @click="deletePark(key)"><i class="fas fa-trash-alt"></i></a>  </center></td>
       </tr>
     </tbody>
     <tbody v-else>
        <tr >
        <td> <center>{{ count+1 }}</center></td>
        <td> <center>{{ parks.name }}</center> </td>
        <td> <input type="number" name=""  v-model="parks.Total"></td>
           <td> <button type="button" class="button button is-success " name="buttonAdd" @click="UpdateTotal(key,parks.Total,parks.name)" >Save money</button> 
            <button type="button" class="button is-danger" name="buttonAdd" @click="cancel()" >Cancel</button></td>
            <td> <center> <a class="button is-danger" @click="deletePark(key)"><i class="fas fa-trash-alt"></i></a>  </center></td>
      </tr>
    </tbody>
   </table>
  </div>
  </div>



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
        components: {
      Checkbox,
      Card,
      LTable,
      ChartCard,
      StatsCard,
    },
        data () {
          return {
            data: {
              namepark: '',
              num: 0
            },
            namepark:'',
            num:'',
            showParksubmit:'',
            showpark:'',
            totalnew:'',
            checkEdit:'',
        todayhous: moment().format('HH:mm'),
        todayDay: moment().format('D'),
        todayMont: moment().format('MMMM'),
        todayYear: moment().format('YYYY')
          }
        },
        mounted () {
        const dbRefObject = firebase.database().ref().child('/Park/')
        const dbRefimage = firebase.database().ref().child('image')
        const dbRefuser = firebase.database().ref().child('users')
        const dbReport = firebase.database().ref().child('Parksubmit')
        dbRefObject.on('value', snap => {
          this.showpark = snap.val()
        }),
        dbRefimage.on('value', snap => {
          this.showimage = snap.val()
        }),
        dbRefuser.on('value', snap => {
          this.showusers = snap.val()
        })
        dbReport.on('value', snap => {
          this.showParksubmit = snap.val()
        })
        for (var parksub in this.showParksubmit) {
                for(var parksubs in this.showParksubmit[parksub]) {
                }               
        }
        if (this.todayhous > this.showParksubmit[parksub][parksubs].End) {
          firebase.database().ref('/Parksubmit/').child(parksub).child(parksubs).update({
            status: 'Off'
          })
        }
        else {
          firebase.database().ref('/Parksubmit/').child(parksub).child(parksubs).update({
            status: 'On'
          })
        }
        this.pullData()
      },
        methods: {
          pullData: function () {   /* แสดงชือตาราง User ที่ส่งรูปมาให้ Approved */
            let that = this
            firebase.database().ref('/users/').once('value').then(function (snapshot) {
              that.showusers = snapshot.val()
            })
          },
          CommitPark () {
            var tmp = ({
              name: this.namepark,
              Total: this.num,
              count: '0',
              carin: 0
            })
            firebase.database().ref('Park').push(tmp) //ฟังชั่นของ Admin เพิ่มลานจอดรถ
            this.pullData()
          },
          UpdateTotal (key,total,park) {
            this.checkEdit
            for (var apark in this.showpark) {
            var countnum = parseFloat(this.showpark[apark].carin, 10)
            if (this.showpark[apark].name === park){
            var count = parseFloat(1, 10)
            firebase.database().ref('Park').child(apark).update({
            Total: total
        })
      }
      //ฟังก์ชั่นเลือกที่จอดรถ จำวนชั่วโมง และเลือกเวลา หักเครดิต แล้วนำมาทำการรวมกันแล้วเก็บข้อมูลลง Firebase
    }
    this.checkEdit = '',
    this.pullData()
          },
          deletePark (key) {
              firebase.database().ref('/Park/').child(key).set(null) //ฟังก์ชั่นลบข้อมูลลานจอดรถ
              this.pullData()
            },
            swap: function (key) {
              this.checkEdit = key
          },
          cancel: function () {
      this.checkEdit = ''
      }
      }
      }
      </script>
      
      <style lang="css">
      </style>
      