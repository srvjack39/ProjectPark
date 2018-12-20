<template lang="html"  >
  <div class="container" >
  <div class="">
  <center>
  <span class="button is-info" @click="login()" style="margin-top:25%;">Login Facebook</span>
</center>
  </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import LTable from 'src/components/UIComponents/Table.vue'
import Card from 'src/components/UIComponents/Cards/Card.vue'
import ChartCard from 'src/components/UIComponents/Cards/ChartCard.vue'
import StatsCard from 'src/components/UIComponents/Cards/StatsCard.vue'
import Checkbox from 'src/components/UIComponents/Inputs/Checkbox.vue'
var provider = new firebase.auth.FacebookAuthProvider()
provider.addScope('public_profile')
provider.setCustomParameters({
  'display': 'popup'
})
export default {
  data ()  {
    return {
      showuser: ''
    }
  },
  created: function () {
    this.pullData()
  },
  methods: {
    pullData: function () {
        let that = this
        firebase.database().ref('/users/').once('value').then(function (snapshot) {
          that.showuser = snapshot.val()
        })//ดึงข้อมูล User จาก Firebase
    },
    login () {
      var vm = this
      console.log(vm.showuser);
      firebase.auth().signInWithPopup(provider).then(function (result) {
        var token = result.credential.accessToken
        var user = result.user
        var data = {
          id: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
          money: '0',
          position: 'User',
          status_in:'Off',
          status_out:'Off'
        }
        var st = true
        for (var variable in vm.showuser) {
          if (user.uid === vm.showuser[variable].id) {
            // firebase.database().ref('active').set(user.uid)
            st = false
          }
        }
        if (st) {
          firebase.database().ref('active').push(user.uid)
          firebase.database().ref('users').push(data)
          // firebase.database().ref('status').push(data)
        }
        vm.$router.replace('/admin/overview')
      }).catch(function (error) {
        console.log(error)
      })
    } //โค๊ด login Facebook ดึง uid,ชื่อเฟสบุ๊ค,ดึงรูป, แล้วก็สร้างกระเป๋าเงินเพิ่ม
  }
}
</script>

<style lang="css">
 body {
   background-color: #F0FFF0;
 }
</style>
