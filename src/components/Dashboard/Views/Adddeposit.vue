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
                               <td scope="col">Pic</td>
                               <th scope="col">Submit</th>
                             </tr>
                           </thead>
                             <tbody v-for = " (images, key, count) in image">
                                <td> {{ count+1 }} </td>
                               <td > {{ images.name }} </td>
                               <td > {{ images.money }} </td>
                               <td> 
                                   <center><img v-url={filename:images.pic} width="100" height="100"></center> 
                               </td>
                               <td ><a class="button is-danger is-normal" @click="SubmitDeposit(key,image)">เติมเงิน</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
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
          deletePark (key) {
              firebase.database().ref('/Park/').child(key).set(null) //ฟังก์ชั่นลบข้อมูลลานจอดรถ
              this.pullData()
            },
            SubmitDeposit: function (key,image) {
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