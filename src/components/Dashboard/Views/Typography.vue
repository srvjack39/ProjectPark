
<template>
  <div class="content">
      <div class="container-fluid">
          <div class="row" v-for="parksub in showparksub">
              <div class="col-12" v-for="(sub,key) in parksub" v-if="sub.name === name">
          <table>
              <tr>
                <th><center>ชื่อลานจอดรถ</center></th>
                <th><center>ชื่อผู้จอง</center></th>
                <th><center>จอง</center></th>
                <th><center>จองตอนเวลา</center></th>
                <th><center>ค่าใช้จ่าย</center></th>
                <th> <center>เปิดลานจอดรถ</center> </th>
              </tr>
              <tr>
                <td><center>{{ sub.park }}</center></td>
                <td><center>{{ sub.name }}</center></td>
                <td><center>{{ sub.start }} -{{ sub.End }}</center> </td>
                <td><center>{{ sub.time }}</center></td>
                <td><center>{{ sub.money }}</center></td>
                <td v-if="sub.status_in === 'On'"> <center><a class="button is-primary" @click="onstatus_in(key,sub.park)" >เปิด in</a></center> </td>
                <td v-if="sub.status_out === 'On'"> <center><a class="button is-danger" @click="onstatus_out(key,sub.park)">เปิด out</a></center> </td>
        </tr>
        </table>
      </div>
    </div>
        </div>
    <!-- <div class="container-fluid" v-if="this.statusin === 'On'">
      <div class="row">
        <div class="col-12">
            <p>ปุ่มเปิดเพื่อเข้าสู่ลานจอดรถ</p>
            <a class="button is-success " @click="onstatus_in">เปิด</a>
        </div>
      </div>
    </div>
    <div class="container-fluid" v-if="this.statusout === 'On'">
      <div class="row">
        <div class="col-12">
            <p>ปุ่มเปิดเพื่อออกจากลานจอดรถ</p>
            <a class="button is-danger " @click="onstatus_out">เปิด</a>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  import firebase from 'firebase'
  export default {
    data () {
      return {
        device: '',
        control: '',
        statusin: '',
        statusout: '',
        showpark: '',
        user:'',
        parksubuser:'',
        name:'',
        showparksub:''
      }
    },
    created: function () { /* แสดงชื่อ  */
        var user = firebase.auth().currentUser
        if (user) {
          this.name = user.displayName
          this.id = user.uid
          this.pic = user.photoURL
        }
        this.pullData() 
    },
    mounted () {
    const dbRefObject = firebase.database().ref().child('Park')
    const dbRefparksub = firebase.database().ref().child('Parksubmit')
    const dbRefuser = firebase.database().ref().child('users')
    dbRefObject.on('value', snap => {
      this.showpark = snap.val()
    })
    dbRefuser.on('value', snap => {
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
    dbRefparksub.on('value', snap => {
      this.showparksub = snap.val()
    })
    for(var user in this.showparksub) {
        if(this.id === user)
        {
          for(var userr in this.showparksub[this.id]) {
            this.parksubuser = this.showparksub[this.id][userr]
            this.statusinsub = this.showparksub[this.id][userr].status_in
            this.statusoutsub = this.showparksub[this.id][userr].status_out
          }
        }
      }
  },
  methods: {
    pullData () {
      let that = this
      firebase.database().ref('/device/').on('value', function (snapshot) {
        that.device = snapshot.val()
      })
      firebase.database().ref('/device/control').on('value', function (snapshot) {
        var control = snapshot.val()
        that.status = control.status
      })
    },
    onstatus_in (key,park) {
      firebase.database().ref('/device/control').update({
        status_in: 1
      })
      for (var users in this.showuser) {
            if (this.showuser[users].id === this.id) {
              this.statusin = this.showuser[users].status_in
              this.statusout = this.showuser[users].status_out
              firebase.database().ref('/users/').child(users).update({
        status_in: "Off"
      })
              firebase.database().ref('/users/').child(users).update({
        status_out: "On"
      })
          firebase.database().ref('/Parksubmit/').child(this.id).child(key).update({
        status_out: "On"
      })
      firebase.database().ref('/Parksubmit/').child(this.id).child(key).update({
        status_in: "Off"
      })
            }
          }
        for (var apark in this.showpark) {
            var countnum = parseFloat(this.showpark[apark].carin, 10)
            if (this.showpark[apark].name === park){
            var count = parseFloat(1, 10)
            firebase.database().ref('Park').child(apark).update({
            carin: countnum+1
        })
      } //ฟังก์ชั่นเลือกที่จอดรถ จำวนชั่วโมง และเลือกเวลา หักเครดิต แล้วนำมาทำการรวมกันแล้วเก็บข้อมูลลง Firebase
    }
      this.status = 1
      this.pullData()
    },
    onstatus_out (key,park) {
      firebase.database().ref('/device/control').update({
        status_out: 1
      })
      for (var users in this.showuser) {
            if (this.showuser[users].id === this.id) {
              this.statusin = this.showuser[users].status_in
              this.statusout = this.showuser[users].status_out
              firebase.database().ref('/users/').child(users).update({
        status_in: "On"
      })
              firebase.database().ref('/users/').child(users).update({
        status_out: "Off"
      })
      firebase.database().ref('/Parksubmit/').child(this.id).child(key).update({
        status_out: "Off"
      })
      firebase.database().ref('/Parksubmit/').child(this.id).child(key).update({
        status_in: "On"
      })
            }
          }
          for (var apark in this.showpark) {
            var countnum = parseFloat(this.showpark[apark].carin, 10)
            if (this.showpark[apark].name === park){
            var count = parseFloat(1, 10)
            firebase.database().ref('Park').child(apark).update({
            carin: countnum-1
        })
      } //ฟังก์ชั่นเลือกที่จอดรถ จำวนชั่วโมง และเลือกเวลา หักเครดิต แล้วนำมาทำการรวมกันแล้วเก็บข้อมูลลง Firebase
    }
      this.status = 1 
      this.pullData()
    }
  }
}
</script>
<style>

</style>
