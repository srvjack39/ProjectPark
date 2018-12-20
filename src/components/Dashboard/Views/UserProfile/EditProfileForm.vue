<template>
  <card>
    <h4 slot="header" class="card-title">Add credit</h4>
    <!-- {{showuser}} -->
    <div class="field">
      <div class="control">
        <input class="input is-info" type="number" v-model="number" placeholder="Info input">
        <div class="file">
            <label class="file-label">
              <input class="file-input" type="file" name="resume"  @change="onFileChange($event.target.files[0])"required>
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">
                  Choose a file…
                  {{this.dataImg.name}}
                </span>
              </span>
            </label>
          </div>
      </div>
    </div>
    <a class="button" @click="add_money()">submit</a>
    <!-- <a class="button" @click="addResport">Resportday</a> -->
  </card>
</template>
<script>
import storage from 'firebase/storage'
import firebase from 'firebase'
import Card from 'src/components/UIComponents/Cards/Card.vue'
import moment from 'moment'
var storageRef = firebase.storage().ref()
export default {
  components: {
    Card
  },
  data () {
    return {
      // money: 0,
      // showuser: '',
      // active: ''
        number: '',
        todayhous: moment().format('HH:mm'),
        // todayDate: moment().format('D MMMM  YYYY'),
        todayDay: moment().format('D'),
        todayMont: moment().format('MMMM'),
        todayYear: moment().format('YYYY'),
        downloadURL:'',
        data : {
          image:'',
        },
        dataImg:'',
        showimage: ''
    }
  },
  mounted () {
    const dbRefObject = firebase.database().ref().child('/Months/')
    const dbRefimage = firebase.database().ref().child('image')
    const dbRefuser = firebase.database().ref().child('users')
    const dbRefDays = firebase.database().ref().child('/Day/')
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
    this.pullData()
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
    pullData: function () {
        let that = this
        firebase.database().ref('/users/').once('value').then(function (snapshot) {
          that.showuser = snapshot.val()
        })
        firebase.database().ref('/active/').once('value').then(function (snapshot) {
          that.active = snapshot.val()
        })
        firebase.database().ref('/image/').once('value').then(function (snapshot) {
          that.image = snapshot.val()
        })
    },
    async add_money () {
      await storageRef.child(this.dataImg.name).put(this.dataImg)
      hours : this.todayhous
      day : this.todayDay
      mont : this.todayMont
      year: this.todayYear
      for (var variable in this.showuser) {
        if (this.showuser[variable].id === this.id) {
          var id = this.showuser[variable].id
          var name = this.showuser[variable].displayName
          let tmp = {
            name: name,
            money: parseFloat(this.number, 10),
            id: id,
            pic : this.dataImg.name
          }
          let tmp1 = {
            name: name,
            money: this.number,
            hours : this.todayhous,
            day : this.todayDay,
            mont : this.todayMont,
            year: this.todayYear
          }
          firebase.database().ref('image').child(id).push(tmp)
          firebase.database().ref('Report').push(tmp1)
        } // ฟังชั่นส่งการเติมเงินของ User และระบุเวลาที่ส่ง-วัน/เดือน/ปี
      }
      this.pullData()
    },
    onFileChange (fileImg) {
      this.dataImg = fileImg
    }
  }
}
</script>
<style>

</style>
