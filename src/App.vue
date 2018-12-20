<template>
  <div :class="{'nav-open': $sidebar.showSidebar}">
    <notifications></notifications>
    <router-view></router-view>
  </div>
</template>

<script>
import firebase from 'firebase'
import moment from 'moment-timezone'
var config = {
  apiKey: 'AIzaSyAUF7bT1FjOmWQXVYhwvXIKWE_8NN6kK6g',
  authDomain: 'project-1a610.firebaseapp.com',
  databaseURL: 'https://project-1a610.firebaseio.com',
  projectId: 'project-1a610',
  storageBucket: 'project-1a610.appspot.com',
  messagingSenderId: '366814039383'
}
firebase.initializeApp(config)
moment.tz.setDefault('Asia/thailand')
  export default {}
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
