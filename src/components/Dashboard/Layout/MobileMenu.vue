<template>
    <ul class="nav nav-mobile-menu">

        <li class="nav-item">
            <a class="nav-link" href="#">
                {{ this.name }}
            </a>
          </li>
          <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="nc-icon nc-money-coins"></i>
                <span class="d-lg-block">&nbsp;
                   {{ this.money1 }} 
                  </span>
              </a>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link" @click="logout()">
                  Log out
                </a>
              </li>
    </ul>
  </template>
  <script>
    import firebase from 'firebase'
    import DropDown from 'src/components/UIComponents/Dropdown.vue'
  
    export default {
      components: {
        DropDown
      },
      computed: {
      routeName () {
        const {name} = this.$route
        return this.capitalizeFirstLetter(name)
      }
    },
    data () {
      return {
        activeNotifications: false,
        moneyshowuser: '',
        money1: '',
        position1: ''
      }
    },
    mounted () {
    const dbRefObject = firebase.database().ref().child('/Park/')
    const dbRefimage = firebase.database().ref().child('image')
    const dbRefuser = firebase.database().ref().child('users')
    const dbactive = firebase.database().ref().child('/active/')
    dbRefObject.on('value', snap => {
      this.showpark = snap.val()
    }),
    dbRefimage.on('value', snap => {
      this.showimage = snap.val()
    }),
    dbactive.on('value', snap => {
      this.showactive = snap.val()
    }),
    dbRefuser.on('value', snap => {
      this.showuser = snap.val()
      for (var users in this.showuser) {
            if (this.showuser[users].id === this.id) {
              this.money1 = this.showuser[users].money
              console.log(this.showuser[users].id === this.id)
            }
          }
          for (var users in this.showuser) {
            if (this.showuser[users].id === this.id) {
              this.position1 = this.showuser[users].position
            }
          }
    })
  },
      created: function () { /* แสดงชื่อ  */
        var user = firebase.auth().currentUser
        if (user) {
          this.name = user.displayName
          this.id = user.uid
        }
        this.pullData() 
    },
      pullData: function () {
        let that = this
        firebase.database().ref('/active/').on('value').then(function (snapshot) {
          that.active = snapshot.val()
        })
        firebase.database().ref('/users/').on('value').then(function (snapshot) {
          that.showuser = snapshot.val()
        })
      },
      methods: {
        logout: function () {
        firebase.auth().signOut().then(() => {
          var vm = this
          vm.$router.replace('/')
        })
      }
      }
    }
  </script>
  <style>
  </style>
  