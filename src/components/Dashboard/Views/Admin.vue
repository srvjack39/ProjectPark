<template lang="html">
  <div >
     <!-- แทปฟ้า -->
    <!-- <section class="hero is-primary is-bold ">
        <div class="container">
            <h1 class="title is-3" style="font-family: 'Seymour One', sans-serif; margin-top: 0.5%">
              <img src=""   width= "2.5%">
                W a s h
              <h2 class="is-pulled-right" style="margin-top: 1%">

                <a class="button is-white is-outlined" @click = "logout()"><i class="fa fa-sign-out" aria-hidden="true">&nbsp;Logout</i></a>
              </h2>
            </h1>
              <h6 class="subtitle is-7">Admin : {{this.user}}</h6>
        </div>
    </section> -->
  <!--  จบ แทปฟ้า -->
<br>
<!--  แทปเมนูต่างๆ -->
  <!-- <div class="tabs is-centered is-boxed">
    <ul>
        <li >
          <a>
            <span class="icon is-small"><i class="fa fa-users"></i></span>
            <span v-on:click="home()">MEMBER</span>
          </a>
        </li>

        <li>
          <a>
            <span class="icon is-small"><i class="fa fa-user-plus"></i></span>
            <span v-on:click="addadmin()" >Add admin</span>
          </a>
        </li>

        <li class="is-active">
          <a>
            <span class="icon is-small"><i class="fa fa-money"></i></span>
            <span  v-on:click="Add_user_credit()" >Add user credit</span>
          </a>
        </li>

        <li>
          <a>
            <span class="icon is-small"><i class="fa fa-pie-chart"></i></span>
            <span  v-on:click="Earnings_Revenue1()">Earnings Revenue 1</span>
          </a>
        </li>

        <li>
          <a>
            <span class="icon is-small"><i class="fa fa-pie-chart"></i></span>
            <span  v-on:click="Earnings_Revenue2()">Earnings Revenue 2</span>
          </a>
        </li>
    </ul>
  </div> -->
  <!-- จบ แทปเมนูต่างๆ -->

 <!-- เมนูย่อย เครดิต -->
  <!-- <div class="columns">
    <div class="column"></div>
      <div class="column is-four-fifths">
        <div class="tabs is-fullwidth">

            <ul class="nav nav-pills mb-3"  role="tablist">
              <li class="nav-item" v-on:click="credit_left()">
                <a class="btn btn-outline-warning active"  data-toggle="pill"   aria-controls="pills-home" aria-selected="true">Add Credit</a>
              </li>

              <li class="nav-item" v-on:click="Add_credit_center()" >
                <a class="btn btn-outline-success"  data-toggle="pill"   aria-controls="pills-profile" aria-selected="false">Success Approve</a>
              </li>

              <li class="nav-item" v-on:click="Add_credit_right()">
              <li class="nav-item" >
                <a class="btn btn-outline-info"  data-toggle="pill"   aria-controls="pills-contact" aria-selected="false">Credit</a>
              </li>
            </ul>
        </div>
      </div>
    <div class="column"></div>
  </div> -->
<!-- จบ เมนูย่อย เครดิต -->
<center><p style="font-size:200%;">เพิ่มลานจอดรถ</p> </center>
<div  class="table1" >
<div class="tile is-child box">
   <table class="table is-hoverable" >
   <thead>
     <tr>
       <th scope="col">ชื่อลานจอดรถ</th>
       <th scope="col">จำนวนที่จอดรถ</th>
       <th scope="col">Submit</th>
     </tr>
   </thead>
     <tbody >
       <td > <input class="input" type="text" placeholder="name" v-model="name"> </td>
       <td > <input class="input" type="number" placeholder="Text input" v-model="num"> </td>
       <td ><a class="button is-danger is-normal" @click="CommitPark()">Submit</a></td>
     </tr>
   </tbody>
 </table>
</div>
</div>
<center><p style="font-size:200%;">ลบลานจอดรถ</p> </center>
<div  class="table1" >
<div class="tile is-child box">
   <table class="table is-hoverable">
   <thead>
     <tr>
       <th scope="col">No. </th>
       <th scope="col">Namepark</th>
       <th cope="col">จำนวนพื้นที่จอดรถทั้งหมด</th>
       <th scope="col">Delete</th>
     </tr>
   </thead>
     <tbody v-for = " (parks, key, count) in showpark">
       <td> {{ count+1 }} </td>
       <td> {{ parks.name }} </td>
       <td> {{ parks.Total }}</td>
       <td> <a class="button is-danger" @click="deletePark(key)"><i class="fas fa-trash-alt"></i></a> </td>
     </tr>
   </tbody>
 </table>
</div>
</div>

<center><p style="font-size:200%;">รายชื่อคนที่เติมเงินเข้ามา</p> </center>
<div  class="table1" >
<div class="tile is-child box">
   <table class="table is-hoverable" v-if="checkEdit !== key"  v-for = " (image, key, count) in showimage">
   <thead>
     <tr>
       <th scope="col">No. </th>
       <th scope="col">Name</th>
       <th scope="col">Money</th>
       <th scope="col">Submit</th>
     </tr>
   </thead>
     <tbody v-for = " (images, key, count) in image">
        <td> {{ count+1 }} </td>
       <td > {{ images.name }} </td>
       <td > {{ images.money }} </td>
       <td ><a class="button is-danger is-normal" @click="SubmitDeposit(key,image)">เติมเงิน</a></td>
     </tr>
   </tbody>
 </table>
</div>
</div>


<center><p style="font-size:200%;">แก้ไขเงินเมื่อ User เติมเงินเข้ามา</p> </center> <br>
<!--  ตาราง user เครดิต -->
  <div  class="table1" >
<div class="tile is-child box">


  <!-- <table class="table is-hoverable" v-if= " type === 'addcredit'" >
    <thead>
      <tr>
        <th scope="col">FaceBook</th>
        <th scope="col">Photo</th>
        <th scope="col">Status</th>
        <th scope="col">Approved</th>
      </tr>
    </thead>
      <tbody  v-for = " (Users, key, count) in showimage"  >
         <tr   v-if= "Users.status === 'Waiting for Approve'">
        <tr>
          <td>  {{Users.name}} </td>
          <td width="17%">
              <img data-toggle="modal" :data-target="'#'+key" class="image is-32x32" v-bind:src="Users.url"/>
            <div :id="key" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body">
                    <center>  <img v-bind:src="Users.url"/> </center>
                    </div>
                </div>
              </div>
            </div>
          </td>
            <td>  <span class="tag is-danger">{{Users.status}}</span>   </td>
            <td>   <a class="button is-info is-outlined" data-toggle="modal" :href="'#'+Users.uid"  @click="keyimage(key)">Approved  </a>
               <div   v-for = " (User, key, count) in showusers"  >
                 <div class="modal fade" :id="User.id" tabindex="-1" role="dialog"  :href="'#'+Users.uid" aria-hidden="true">
                   <div class="modal-dialog" role="document">
                     <div class="modal-content">
                       <div class="modal-header">
                         <h5 class="modal-title" :id="User.id"><i class="fa fa-money" aria-hidden="true"></i> Add credit (<b>{{User.email}}</b>)</h5>
                         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                           <span aria-hidden="true">&times;</span>
                         </button>
                       </div>
                       <div class="modal-body">
                          Do you want to add money <input type="number" min="0" max="1000" class="button" name="" value="0" v-model="addmoney"> Bath
                       </div>
                       <div class="modal-footer">
                         <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                         <button type="button" class="btn btn-primary" data-dismiss="modal" @click="update(key,Users.key,User.money,addmoney,User.email,User.id,User.name,User.Transfer_money)" >Submit</button>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </td>
     </tr>
      </tbody>
  </table> -->
  <!-- Modal -->


  <!-- ------------------------------------ -->
  <!-- <table class="table is-hoverable" v-if= " type === 'Success Approve'" >
    <thead>
      <tr>

        <th scope="col">E-mail</th>
        <th scope="col">Photo</th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <th scope="col">Status</th>
      </tr>
    </thead>
      <tbody v-for = " (Users, key, count) in showimage"  >
        <tr   v-if= "Users.status === 'Approved'">

          <td>  {{Users.email}}  </td>
          <td width="17%">
            <img data-toggle="modal" :data-target="'#'+key" class="image is-32x32" v-bind:src="Users.url"/>
          <div :id="key" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                  <div class="modal-body">
                  <center>  <img v-bind:src="Users.url"/></center>
                  </div>
              </div>
            </div>
          </div>
          </td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <td>  <span class="tag is-success">{{Users.status}}</span>    </td>

            <!-- <td> <br><br> <a class="btn btn-primary" data-toggle="collapse" :href="'#'+Users.uid" aria-expanded="false" aria-controls="collapseExample"> Approved </a></td> -->
  <!-- </a>
     </tr>
      </tbody>
  </table> -->
  <!--  ----------------------------- -->
   <!-- <table class="table is-hoverable" v-if= " type === 'credit'" > -->
     <table class="table is-hoverable">
     <thead>
       <tr>
         <th scope="col">No.</th>
         <th scope="col">Name</th>
         <th scope="col">Money</th>
          <th scope="col">Edit money</th>
       </tr>
     </thead>
       <tbody v-if="checkEdit !== key"  v-for = " (User, key, count) in showusers">
         <tr >

            <td>  {{count+1}}  </td>
           <td>  {{User.displayName}}  </td>
           <td> {{User.money}}</td>
           <td><button type="button" class="button is-info " name="buttonAdd" @click="swap(key)" >Edit money</button> </td>

         </tr>
       </tbody>
       <tbody v-else >
         <tr >
            <td>  {{count+1}}  </td>
           <td>  {{User.displayName}}  </td>
           <td> <input type="number" name=""  v-model="User.money"></td>
           <td> <button type="button" class="button button is-success " name="buttonAdd" @click="Editmoney(key,User.money,User.email)" >Save money</button> </td>
           <td> <button type="button" class="button is-danger" name="buttonAdd" @click="cancel()" >Cancel</button> </td>
         </tr>
       </tbody>
   </table>

  </div>
<!-- จบ ตาราง user เครดิต -->
<!-- Button trigger modal -->
</div>
 </div>
</template>

<script>
// Initialize Firebase
import firebase from 'firebase'
export default {
  name: 'Add_user_credit',
  data () {
    return {
      mail: '',
      input: 'show',
      status: '',
      data: {
        name: '',
        surname: '',
        addmoney: 0
      },
      name:'',
      showusers: '',
      showimage: '',
      checkEdit: '',
      checkEdit1: '',
      type: 'addcredit',
      img: this.$route.params.img,
      keyimage1: '',
      addEditmoney: 0,
      num: 0,
      Status: 'Waiting for Approve',
      Transfer_money: 0,
      money: 0
    }
  },
  created: function () { /* แสดงชื่อ Admin */
    var user = firebase.auth().currentUser
    if (user) {
      this.user = user.email
    } else {

    }
    this.pullData()
  },
  mounted () {
  const dbRefObject = firebase.database().ref().child('/Park/')
  const dbRefimage = firebase.database().ref().child('image')
  const dbRefuser = firebase.database().ref().child('users')
  dbRefObject.on('value', snap => {
    this.showpark = snap.val()
    console.log(this.users)
  }),
  dbRefimage.on('value', snap => {
    this.showimage = snap.val()
  }),
  dbRefuser.on('value', snap => {
    this.showusers = snap.val()
  })
},
  methods: {
    pullData: function () {   /* แสดงชือตาราง User ที่ส่งรูปมาให้ Approved */
      let that = this
      firebase.database().ref('/users/').once('value').then(function (snapshot) {
        that.showusers = snapshot.val()
      })
      for (var mai in that.showimage) {
        that.num = 5
        if (that.showimage[mai].status === 'Waiting for Approve') {
        }
      }
    },
    update: function (key, key1, money, addmoney, mail, id, name, Transfer) {
      console.log(key)
      console.log(this.keyimage)
      money = +money + +addmoney
      this.Transfer_money = +Transfer + +addmoney
      if (addmoney > 0 && addmoney <= 1000) {
        this.$dialog.confirm({
          title: 'Add Credit',
          message: 'Are you sure you want to <u>Add Credit </u> </br><b> ' + mail + ' </br> <h3> Money : ' + addmoney + '  Bath.</h3></b>',
          confirmText: 'Confirm',
          type: 'is-success',
          hasIcon: true,
          onConfirm: () => {
            if (money >= 0) {
              firebase.database().ref('/users/').child(key).update({
                money: money,
                Transfer_money: this.Transfer_money
              })
              firebase.database().ref('/image/').child(this.keyimage1).update({
                status: 'Approved'
              })
              this.$toast.open({
                message: '<i class="fa fa-check-circle"></i> Add credit Success !',
                type: 'is-success'
              })
              this.checkEdit = ''
              this.addmoney = 0
              this.pullData()
            } else {
              firebase.database().ref('/users/' + key).set({
                money: addmoney,
                email: mail,
                name: name,
                id: id
              })
              firebase.database().ref('/image/').child(this.keyimage1).update({
                status: 'Approved'
              })
              this.$toast.open({
                message: '<i class="fa fa-check-circle"></i>Add credit Success !',
                type: 'is-success'
              })
            }
            this.checkEdit = ''
            this.addmoney = 0
            this.pullData()
          }
        })
      } else {
        this.$dialog.alert({
          title: 'Error',
          message: 'Please enter the money 1-1000 bath</br> <b>Please try again. </b> ',
          type: 'is-danger',
          hasIcon: true,
          icon: 'times-circle',
          iconPack: 'fa'
        })
        this.pullData()
      }
      this.checkEdit = ''
      this.addmoney = 0
      this.pullData()
    },
    cancel: function () {
      this.checkEdit = ''
    },
    SubmitDeposit: function (key,image) {
      var money = image[key].money
      for(var test in this.showimage) {
        if (image[key].id === test ) {
          for (var id in this.showusers) {
            if (image[key].id === this.showusers[id].id) {
              console.log(image[key].id)
              var total = +money + +this.showusers[id].money
              console.log(total)
              firebase.database().ref('/users/').child(id).update({
                money: total
              })
              firebase.database().ref('/money/').child(id).update({
                money: total
              })
              for (var remo in this.showimage) {
                firebase.database().ref('image').child(remo).child(key).set(null)
              }
          }
        }
      }
    }
  },
    CommitPark () {
      var tmp = ({
        name: this.name,
        Total: this.num,
        count: '0'
      })
      console.log(this.name)
      console.log(this.num)
      firebase.database().ref('Park').push(tmp) //ฟังชั่นของ Admin เพิ่มลานจอดรถ
      this.pullData()
    },
    swap: function (key) {
      this.checkEdit = key
    },
    swap2: function () {
      this.checkEdit1 = 'edit'
    },
    credit_left: function () {
      this.type = 'addcredit'
    },
    Add_credit_right: function () {
      this.type = 'credit'
    },
    Add_credit_center: function () {
      this.type = 'Success Approve'
    },
    status: function (key) {
      this.status = key
    },
    keyimage (key) {
      console.log('pass')
      console.log(key)
      this.keyimage1 = key
    },
    deletePark (key) {
      console.log(key)
      firebase.database().ref('/Park/').child(key).set(null) //ฟังก์ชั่นลบข้อมูลลานจอดรถ
      this.pullData()
    },
    Editmoney: function (key, addEditmoney, email) {
      console.log('passdsa')
      this.checkEdit = ''
      if (addEditmoney > 0 && addEditmoney <= 1000) {
        this.$dialog.confirm({
          title: 'Edit Credit',
          message: 'Are you sure you want to <u>Edit Credit </u> </br><b> ' + email + ' </br> <h3> Money : ' + addEditmoney + '  Bath.</h3></b>',
          confirmText: 'Confirm',
          type: 'is-success',
          hasIcon: true,
          onConfirm: () => {
            firebase.database().ref('/users/').child(key).update({
              money: addEditmoney
            })
            this.pullData()
          }
        })
      } else {
        this.$dialog.alert({
          title: 'Error',
          message: 'Please enter the money 1-1000 bath</br> <b>Please try again. </b> ',
          type: 'is-danger',
          hasIcon: true,
          icon: 'times-circle',
          iconPack: 'fa'
        })
        this.pullData()
      }
      this.pullData()
    }
  }
}
</script>

<style lang="css">
.table1{
  width: 70%;
  margin-left: 14%;
}
</style>
