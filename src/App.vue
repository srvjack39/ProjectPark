<template>
  <div :class="{'nav-open': $sidebar.showSidebar}">
    <notifications></notifications>
    <router-view></router-view>
  </div>
</template>

<script>
  import firebase from 'firebase'
import moment from 'moment-timezone'
import Chart from 'chart.js'
var config = {
  apiKey: 'AIzaSyAUF7bT1FjOmWQXVYhwvXIKWE_8NN6kK6g',
  authDomain: 'project-1a610.firebaseapp.com',
  databaseURL: 'https://project-1a610.firebaseio.com',
  projectId: 'project-1a610',
  storageBucket: 'project-1a610.appspot.com',
  messagingSenderId: '366814039383'
}
var provider = new firebase.auth.FacebookAuthProvider()
firebase.initializeApp(config)
moment.tz.setDefault('Asia/thailand')
  export default {
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
    },
        mounted: function () {
    var ctx = document.getElementById('graph').getContext('2d')
    var bar = new Chart(ctx, {
      type: 'bar',
      data: {
        labels:['1','2' ,'3'],
        datasets: [
          {
            label: '# of Vote',
            data: [12,45,67]
          }]
      }
    })
    console.log(bar)
    } //โค๊ด login Facebook ดึง uid,ชื่อเฟสบุ๊ค,ดึงรูป, แล้วก็สร้างกระเป๋าเงินเพิ่ม
  }
</script>
<style lang="scss">
  .vue-notifyjs.notifications{
    .list-move {
      transition: transform 0.3s, opacity 0.4s;
    }
    .list-item {
      display: inline-block;
      margin-right: 10px;

    }
    .list-enter-active {
      transition: transform 0.2s ease-in, opacity 0.4s ease-in;
    }
    .list-leave-active {
      transition: transform 1s ease-out, opacity 0.4s ease-out;
    }

    .list-enter {
      opacity: 0;
      transform: scale(1.1);

    }
    .list-leave-to {
      opacity: 0;
      transform: scale(1.2, 0.7);
    }
  }
</style>
