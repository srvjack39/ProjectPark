<template >
<div class="content">
  <div class="container-fluid">
    <div class="tile is-child box">
      <table class="table is-hoverable" >
          <thead>
              <tr>
                  <th scope="col">ชื่อลานจอดรถ </th>
                  <th scope="col">จำนวนที่จอดรถ</th>
                  <th scope="col">ที่อยู่ลานจอดรถ</th>
                  <th scope="col">Submit</th>
              </tr>
          </thead>
          <tbody >
              <td > <input class="input" type="text" placeholder="name" v-model="namepark"> </td>
              <td > <input class="input" type="number" placeholder="Text input" v-model="num"> </td>
              <td> <input class="input" type="text" placeholder="Location" v-model="location"></td>
              <td ><a class="button is-danger is-normal" @click="alertPark()">Submit</a></td>
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
         <td> <center> <a class="button is-danger"@click="alertDelete(key,showpark)"><i class="fas fa-trash-alt"></i></a>  </center></td>
        </tr>
     </tbody>
     <tbody v-else>
        <tr >
        <td> <center>{{ count+1 }}</center></td>
        <td> <center>{{ parks.name }}</center> </td>
        <td> <input type="number" name=""  v-model="parks.Total"></td>
           <td> <button type="button" class="button button is-success " name="buttonAdd" @click="UpdateTotal(key,parks.Total,parks.name)" >Save</button> 
            <button type="button" class="button is-danger" name="buttonAdd" @click="cancel()" >Cancel</button></td>
            <td> <center> <a class="button is-danger" @click="deletePark(key)"><i class="fas fa-trash-alt"></i></a>  </center></td>
      </tr>
    </tbody>

   </table>
  </div>
  </div><br>

  <div  class="table1" >
    <div class="tile is-child box">
       <table class="table is-hoverable">
       <thead >
         <tr>
           <th scope="col"><center>No. </center></th>
           <th scope="col"><center>Namepark</center></th>
           <th cope="col"><center>จำนวนพื้นที่จอดรถทั้งหมด</center></th>
         </tr>
       </thead>
      <tbody v-if="checkEdit !== key" v-for = " (user, key, count) in showusers">
        <tr >
        <td> <center>{{ count+1 }}</center></td>
        <td> <center>{{ user.displayName }}</center> </td>
        <td> <center>{{ user.position }}</center></td>
        <td> <center> <a class="button is-success " @click="swap(key)"><i class="fas fa-pen-square"></i></a>  </center></td>
      </tr>
    </tbody>
    <tbody v-else>
      <tr >
      <td> <center>{{ count+1 }}</center></td>
      <td> <center>{{ user.displayName }}</center> </td>
      <td> <input type="text" name=""  v-model="user.position"></td>
      <td> <center> <a class="button is-success " @click="swap(key)"><i class="fas fa-pen-square"></i></a>  </center></td>
      <td> <button type="button" class="button button is-success " name="buttonAdd" @click="UpdatePosition(key,user.position,user.displayName)" >Save</button> 
        <button type="button" class="button is-danger" name="buttonAdd" @click="cancel()" >Cancel</button></td>
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
              num: ''
            },
            namepark:'',
            num:'',
            showParksubmit:'',
            showpark:'',
            totalnew:'',
            checkEdit:'',
            showimage:'',
            showusers:'',
            isaddpark: false,
            isdeletepark:false,
            localtion:'',
        todayhous: moment().format('HH:mm'),
        todayDay: moment().format('D'),
        todaydate: moment().format('dddd'),
        todayMont: moment().format('MMMM'),
        todayYear: moment().format('YYYY')
          }
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
        const dbRefObject = firebase.database().ref().child('/Park/')
        const dbRefimage = firebase.database().ref().child('image')
        const dbRefuser = firebase.database().ref().child('/users/')
        const dbReport = firebase.database().ref().child('Parksubmit')
        const dbRoad = firebase.database().ref().child('ParkRoad')
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
        dbRoad.on('value', snap => {
          this.showroad = snap.val()
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
              Total: parseFloat(this.num,10),
              count: 0,
              carin: 0,
              status: 'On',
              location:this.location
            })
            var tmp2 = ({ 
              name: this.namepark
            })
            firebase.database().ref('Park').push(tmp)
            // firebase.database().ref('ParkRoad').child(this.namepark).push(tmp)
            // for(var sub in this.showParksubmit){
            //   console.log(sub)
            // }
            for(var parker in this.showpark){
            if(this.showpark[parker].name === this.namepark){
              for (var i = 1; i <= parseFloat(this.num,10); i++) {
              console.log("เข้าทำ loop")
              console.log(this.showpark[parker])
              // firebase.database().ref('Park').child(parker).child(this.showpark[parker].name).child('numpark' + i).update({
              //   status:'On',
              //   countsub:0,
              //   timelast:0.14/6,
              //   timeminit:0,
              // })
              firebase.database().ref('Parkadd').child(this.showpark[parker].name).update({
                numpark:this.num,
                park:this.namepark,
              })
              firebase.database().ref('Parkadd').child(this.showpark[parker].name).child('numpark' + i).update({
                status:'On',
                numpark:'numpark' + i,
                statusSet:'Off'
              })
            }
            }
            }
            this.isaddpark = false //ฟังชั่นของ Admin เพิ่มลานจอดรถ
            this.pullData()
          },
          alertDelete: function (key,showpark) {
            console.log(showpark[key])              
              var namepark = showpark[key].name
              this.$swal({
              title: 'ยืนยันการลบลานจอดรถชื่อ : ' +  namepark,
              imageUrl: '',
              type: 'warning',
              showCancelButton: true,
              confirmButtonText: 'ตกลง',
              cancelButtonText: 'ยกเลิก',
              showCloseButton: true,
              showLoaderOnConfirm: true,
            }).then((result) => {
          if(result.value) {
            this.deletePark(key)
            this.$swal('ยืนยัน', 'ได้ยืนยันการลบลานจอดรถ : ' + namepark, 'success' )
          } else {
            this.$swal('ยกเลิก', 'คุณได้ยกเลิกการลบลานจอดรถ', 'info')
          }
        })
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
          closepark () {
            this.isaddpark = false
          },
          closedeletepark () {
            this.isdeletepark = false
          },
          UpdatePosition(key,position,name){
            this.checkEdit
            for (var user in this.showusers) {
            if (this.showusers[user].displayName === name){
            var count = parseFloat(1, 10)
            firebase.database().ref('users').child(user).update({
            position: position
        })
      }
      //ฟังก์ชั่นเลือกที่จอดรถ จำวนชั่วโมง และเลือกเวลา หักเครดิต แล้วนำมาทำการรวมกันแล้วเก็บข้อมูลลง Firebase
    }
    this.checkEdit = '',
    this.pullData()
          },
          deletePark (key) {
              firebase.database().ref('/Park/').child(key).set(null) //ฟังก์ชั่นลบข้อมูลลานจอดรถ
              this.isdeletepark = false
              this.pullData()
            },
            swap: function (key) {
              this.checkEdit = key
          },
          cancel: function () {
      this.checkEdit = ''
      },
      alertPark: function () {
              this.$swal({
              title: 'ชื่อลานจอดรถ : ' + this.namepark + '<br><br>' + 
              'จำนวนที่จอดรถ : ' + this.num + ' คัน',
              type: 'warning',
              showCancelButton: true,
              confirmButtonText: 'ตกลง',
              cancelButtonText: 'ยกเลิก',
              showCloseButton: true,
              showLoaderOnConfirm: true,
            }).then((result) => {
          if(result.value) {
            this.CommitPark()
            this.$swal('ยืนยัน', 'ได้ยืนยันเพิ่มลานจอดรถ :' + this.namepark + '<br><br>' + 
              'จำนวนที่จอดรถ : ' + this.num + ' คัน', 'success' )
          } else {
            this.$swal('ยกเลิก', 'คุณได้ยกเลิกเพิ่มลานจอดรถ', 'info')
          }
        })
      }
      }
      }
      </script>
      
      <style lang="css">
      </style>
      