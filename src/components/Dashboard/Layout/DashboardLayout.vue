<template>
  <div class="wrap per" >
      
    <side-bar  >
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/admin/overview" >
        <i class="nc-icon nc-satisfied"></i>
        <p>หน้าแรก </p>
      </sidebar-link>
      <sidebar-link to="/admin/user" >
        <i class="nc-icon nc-credit-card"></i>
        <p>เติมเงิน</p>
      </sidebar-link>
      <sidebar-link to="/admin/table-list" >
        <i class="nc-icon nc-notes" ></i>
        <p>จองที่จอดรถ</p>
      </sidebar-link>
      <sidebar-link to="/admin/Typography" v-if="'On' === this.statusin || 'On' === statusout">
        <i class="nc-icon nc-simple-delete"></i>
        <p>Open Park</p>
      </sidebar-link>
      <sidebar-link to="/admin/Addpark" v-if="'Admin' === this.position1">
        <i class="nc-icon nc-simple-add"></i>
        <p>เพิ่มลานจอดรถ</p>
      </sidebar-link>
      <sidebar-link to="/admin/Adddeposit" v-if="'Admin' === this.position1">
        <i class="nc-icon nc-badge"></i>
        <p>รายชื่อคนที่เติมเงินเข้ามา</p>
      </sidebar-link>
      <sidebar-link to="/admin/Report" v-if="'Admin' === this.position1">
        <i class="nc-icon nc-simple-delete"></i>
        <p>Report</p>
      </sidebar-link>
      <!-- <sidebar-link to="/admin/icons">
        <i class="nc-icon nc-atom"></i>
        <p>Icons</p>
      </sidebar-link>
      <sidebar-link to="/admin/maps">
        <i class="nc-icon nc-pin-3"></i>
        <p>Maps</p>
      </sidebar-link>
      <sidebar-link to="/admin/notifications">
        <i class="nc-icon nc-bell-55"></i>
        <p>Notifications</p>
      </sidebar-link> -->
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click="toggleSidebar">
          
      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<script>
  import firebase from 'firebase'
  import TopNavbar from './TopNavbar.vue'
  import ContentFooter from './ContentFooter.vue'
  import DashboardContent from './Content.vue'
  import MobileMenu from './MobileMenu.vue'
  export default {
    computed: {
      routeName () {
        const {name} = this.$route
        return this.capitalizeFirstLetter(name)
      }
    },
    data () {
          return {
            showuser:'',
            user:'',
            position1: '',
            money: '',
            name:'',
            position:'',
            statusin:'',
            statusout:''
          }
        },
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent,
      MobileMenu
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
            }
          }
          for (var users in this.showuser) {
            if (this.showuser[users].id === this.id) {
              this.statusin = this.showuser[users].status_in
              this.statusout = this.showuser[users].status_out
              this.position1 = this.showuser[users].position
              console.log(this.status)
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
    methods: {
      pullData: function () {   /* แสดงชือตาราง User ที่ส่งรูปมาให้ Approved */
        let that = this
        firebase.database().ref('/active/').on('value').then(function (snapshot) {
          that.active = snapshot.val()
        })
    },
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
      }
  }
}
</script>
