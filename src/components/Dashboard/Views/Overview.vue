<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row" >
        <div class="col-xl-3 col-md-6" v-for="park in showpark">
          <stats-card>
            <div slot="header" class="icon-info">
              <i class="nc-icon nc-check-2 text-success"></i>
            </div>
            <div slot="content">
              <p class="card-category">{{ park.name }}</p>
              <h8 class="card-title">จอง:  {{ park.count }}/{{ park.Total }}</h8><br>
              <h8 class="card-title">รถเข้า:  {{ park.carin }}/{{ park.Total }}</h8>
            </div>
            <div slot="footer" >
              <i class="fa fa-refreshis-center"></i>
                <p>{{ todayDate }}</p>
              </router-link>
            </div>
          </stats-card>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>
<script>
  import firebase from 'firebase'
  import ChartCard from 'src/components/UIComponents/Cards/ChartCard.vue'
  import StatsCard from 'src/components/UIComponents/Cards/StatsCard.vue'
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  import LTable from 'src/components/UIComponents/Table.vue'
  import Checkbox from 'src/components/UIComponents/Inputs/Checkbox.vue'
  import moment from 'moment'
  export default {
    components: {
      Checkbox,
      Card,
      LTable,
      ChartCard,
      StatsCard,
    },
    data () {
      return {
        todayhous: moment().format('HH:mm'),
        todayDate: moment().format('D MMMM  YYYY'),
        showpark:''
      }
    },
    mounted () {
    const dbRefObject = firebase.database().ref().child('/Park/')
    const dbRefimage = firebase.database().ref().child('/image/')
    dbRefObject.on('value', snap => {
      this.showpark = snap.val()
    }),
    dbRefimage.on('value', snap => {
      this.showimage = snap.val()
    }) //ฟังชั่น ดึงข้อมูลใน Firebasee โดยดึงข้อมูลจที่จอดรถและการเติมเงิน
  },
  methods: {
    pullData: function () {
      let that = this
      firebase.database().ref('/users/').once('value').then(function (snapshot) {
        that.showusers = snapshot.val()
      })
    },
    updateCurrentTime() {
      this.currentTime = moment().format('LTS');
    },
    created() {
   this.currentTime = moment().format('LTS');
   setInterval(() => this.updateCurrentTime(), 1 * 1000);
 } //ฟังชั่นดึงเวลาปัจจุปันตามเวลาของประเทศไทย  
}
}
</script>
<style>

</style>
