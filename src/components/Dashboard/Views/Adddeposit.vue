<template>
        <div class="content">
            <div  class="table1" >
                <div class="tile is-child box">
                    <center><p style="font-size:200%;">รายชื่อคนที่เติมเงินเข้ามา</p> </center>
                    <table class="table is-hoverable" v-for = " (image, key, count) in showimage" :key="key">
                        <thead>
                            <tr>
                               <th scope="col">No. </th>
                               <th scope="col">Name</th>
                               <th scope="col">Money</th>
                               <th scope="col">Time</th>
                               <th scope="col">dd/mm/yy</th>
                               <th scope="col">Pic</th>
                               <th scope="col">Edit</th>
                               <th scope="col">Submit</th>
                             </tr>
                           </thead>
                             <tbody v-for = " (images, key, count) in image">
                                <td> {{ count+1 }} </td>
                                <td> {{ images.name }}</td>
                               <td >  {{ images.money }} </td>
                               <td > {{ images.hours }}</td>
                               <td> {{ images.daysub }} </td>
                               <td> 
                                 <div><img v-url={filename:images.pic} style="width:80px;height:50px;" v-on:click="sisZoompic(key,images)"/></div>
                                </td> <!-- SubmitDeposit(key,image)-->
                                <td> <a class="button is-warning is-normal" v-on:click="alertEdit(key,image)">แก้ไข</a></td>
                               <td ><a class="button is-danger is-normal" v-on:click="alertDisplay(key,image)">เติมเงิน</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
          </div>
    </template>
    <script>
      // Initialize Firebase
      import firebase from 'firebase'
      import storage from 'firebase/storage'
      var storageRef = firebase.storage().ref()
      export default {
        name: 'Addpark',
        data () {
          return {
            data: {
              name: '',
              num: 0
            },
            showpark:'',
            showimage:'',
            downloadURL:'',
        data : {
          image:'',
        },
        isZoompic: false,
        isSubmitDepo: false,
        namepic: ''
          }
        },
        created: function () { /* แสดงชื่อ  */
        var user = firebase.auth().currentUser
        if (user) {
          this.name = user.displayName
          this.id = user.uid
        }else {
          alert('No user')
          this.$router.replace('/')
        }
        this.pullData() 
    },
        mounted () {
        const dbRefObject = firebase.database().ref().child('/Park/')
        const dbRefimage = firebase.database().ref().child('/image/')
        const dbRefuser = firebase.database().ref().child('users')
        dbRefObject.on('value', snap => {
          this.showpark = snap.val()
        }),
        dbRefimage.on('value', snap => {
          this.showimage = snap.val()
        }),
        dbRefuser.on('value', snap => {
          this.showusers = snap.val()
        })
        this.pullData()
      },
        methods: {
          pullData: function () {   /* แสดงชือตาราง User ที่ส่งรูปมาให้ Approved */
            let that = this
            firebase.database().ref('/users/').once('value').then(function (snapshot) {
              that.showusers = snapshot.val()
            })
          },
          CommitPark () {
            var tmp = ({
              name: this.name,
              Total: this.num,
              count: '0'
            })
            firebase.database().ref('Park').push(tmp) //ฟังชั่นของ Admin เพิ่มลานจอดรถ
            this.pullData()
          },
          CancleSubmitDe () {
            this.isSubmitDepo = false
          },
          deletePark (key) {
              firebase.database().ref('/Park/').child(key).set(null) //ฟังก์ชั่นลบข้อมูลลานจอดรถ
              this.pullData()
            },
            sisZoompic: function(key,image) {
              console.log(image.pic)
              storageRef.child(image.pic).getDownloadURL().then(downloadURL => {
              this.downloadURL = downloadURL
              console.log(this.downloadURL)
              this.$swal({
              imageUrl: this.downloadURL,
              confirmButtonText: 'Ok',
              showCloseButton: true,
            })
              })
            },
            alertDisplay: function (key,image) {
              var money = image[key].money
              var name = image[key].name
              var pic = image[key].pic
              this.$swal({
              title: 'ชื่อผู้เติม : ' + name + '<br><br>' +'ยืนยันการเติมเงินจำนวน : ' + money + ' บาท ',
              imageUrl: this.url,
              type: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Ok',
              cancelButtonText: 'Cancle',
              showCloseButton: true,
              showLoaderOnConfirm: true,
            }).then((result) => {
          if(result.value) {
            this.SubmitDeposit(key,image)
            this.$swal('ยืนยัน', 'ได้ยืนยันการเติมเงินจำนวน : ' + money + ' บาท ', 'success' )
          } else {
            this.$swal('ยกเลิก', 'คุณได้ยกเลิกการเติมเงิน', 'info')
          }
        })
      },
            SubmitDeposit: function (key,image) {
              console.log(image[key].money)              
              var money = image[key].money
              for(var test in this.showimage) {
                if (image[key].id === test ) {
                  for (var id in this.showusers) {
                    if (image[key].id === this.showusers[id].id) {
                      var total = +money + +this.showusers[id].money
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
    this.isSubmitDepo = false
  },
  alertEdit(key,image) {
    console.log(image[key].money)
    this.$swal({
              title: 'ชื่อผู้เติมแก้ไข : ' + image[key].name,
              type: 'question',
              input: 'number',
              showCancelButton: true,
              confirmButtonText: 'ตกลง',
              cancelButtonText: 'ยกเลิก',
              showCloseButton: true,
              showLoaderOnConfirm: true,
            }).then((result) => {
          if(result.value) {
            this.$swal({
            title: 'แก้ไขจำนวนเงิน',
            html:
            result.value + 
            ' บาท </code></pre>',
            confirmButtonText: 'Ok'
            })
            console.log(key)
            var numberedit = result.value
            this.editnumber(numberedit,key,image)
          } else {
            this.$swal('ยกเลิก', 'ยกเลิกการแก้ไขการเติมเงิน', 'info')
          }
        })
  },
  editnumber(number,key,image){
    console.log(this.id)
    firebase.database().ref('image').child(this.id).child(key).update({
      money : number
    })
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