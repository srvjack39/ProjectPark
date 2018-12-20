<template>
  <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
          <a class="navbar-brand" href="#">Park</a>
          <button type="button"
                  class="navbar-toggler navbar-toggler-right"
                  :class="{toggled: $sidebar.showSidebar}"
                  aria-controls="navigation-index"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                  @click="toggleSidebar">
            <span class="navbar-toggler-bar burger-lines"></span>
            <span class="navbar-toggler-bar burger-lines"></span>
            <span class="navbar-toggler-bar burger-lines"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end">
            <ul class="nav navbar-nav mr-auto">
            </ul>
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <a class="nav-link" href="#">
                        <img :src='this.pic' alt="" >
                    </a>
                  </li>
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
          </div>
        </div>
    <!-- <div class="container-fluid">
      <div class="collapse navbar-collapse " >
        <ul class="nav navbar-nav mr-auto">
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nc-icon nc-circle-09"></i>
              <span class="d-lg-block">&nbsp;
                 {{ this.name }}  
                </span>
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
        </ul>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link" href="#">
              Account
            </a>
          </li> -->
          <!-- <drop-down title="Dropdown">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something</a>
            <div class="divider"></div>
            <a class="dropdown-item" href="#">Separated link</a>
          </drop-down> -->
          <!-- <li class="nav-item" >
            <a href="#" class="nav-link" @click="logout()">
              Log out
            </a>
          </li>
        </ul>
      </div>
    </div> -->
  </nav>
</template>
<script>
  import firebase from 'firebase'
  export default {
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
          this.pic = user.photoURL
        }
        this.pullData() 
    },
    methods: {
      capitalizeFirstLetter (string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
      },
      toggleNotificationDropDown () {
        this.activeNotifications = !this.activeNotifications
      },
      closeDropDown () {
        this.activeNotifications = false
      },
      toggleSidebar () {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
      },
      hideSidebar () {
        this.$sidebar.displaySidebar(false)
      },
      logout: function () {
        firebase.auth().signOut().then(() => {
          var vm = this
          vm.$router.replace('/')
        })
      },
      pullData: function () {
        let that = this
        firebase.database().ref('/active/').on('value').then(function (snapshot) {
          that.active = snapshot.val()
        })
        firebase.database().ref('/users/').on('value').then(function (snapshot) {
          that.showuser = snapshot.val()
        })
      }
  }
}
</script>
<style>
img {
  border: 3px solid #fff; /* เส้นขอบขนาด 3px solid: เส้น #fff:โค้ดสีขาว */
  border-radius: 50%; /* ปรับเป็น 50% คือความโค้งของเส้นขอบ*/
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2); /* เงาของรูป */
}
</style>
