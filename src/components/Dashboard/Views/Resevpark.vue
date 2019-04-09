<template>
    <card >
    <div class="row">
      <div class="col-md-4 form-group" >
        <h4 slot="header" class="card-title">Select Parking</h4>
        <select class="form-control" v-model="selectparking">
            <option :value="null" disabled>-- Parking --</option>
            <option v-for="(p,key) in park" :value="p.name">{{p.name}} </option>
        </select>
      </div>
    </div>
    <div class="row">
            <div class="col-md-12" >
              <center><h1 slot="header" class="card-title" >Parking : {{ selectparking }} </h1></center><br>
                <!-- <div v-for="(n,index) in park">
                    <div v-for="n1 in n" v-if="n.name == selectparking" class="btn-toolbar mb-1" role="toolbar" aria-label="Toolbar with button groups">
                            <center><div v-for="(n2,index,key) in n[n1]" class="btn-group mr-3" role="group" aria-label="First group">
                                    <center><a class="button is-success" v-if="n2.status == 'On' " @click="isResaver(index+1,key,index)" style="color:white;">ช่องจอดรถที่ {{ key+1 }}
                                    </a>
                                    <a class="button is-danger" v-if="n2.status == 'Off' " @click="isResaver(index+1,key,index)"  style="color:white;">ช่องจอดรถที่ {{ key+1 }}
                                    </a> <br>
                                    <i class="fas fa-exclamation-circle" @click="warn(index,key)" v-if="n2.status == 'On'"></i>
                                    <i class="fas fa-exclamation-circle" @click="warn(index,key)" v-if="n2.status == 'Off'" style="color:red;" ></i>
                                    </center>
                            </div></center>
                    </div>
                </div> -->
                                <div v-for="(n,index) in parkadd" >
                                  <div class="btn-toolbar mb-1" role="toolbar" aria-label="Toolbar with button groups">
                                    <center><div v-if="n.park == selectparking" v-for="(n1,index,key) in n" 
                                    class="btn-group mr-1" role="group" aria-label="First group">

                                    <center><a class="button is-success"   v-if="n1.status == 'On'" @click="isResaver(index,key,index)" style="color:white;">ช่องจอดรถที่ {{ key }}
                                    </a>
                                    <a class="button is-danger"  v-if="n1.status == 'Off'" @click="isResaver(index,key,index)"  style="color:white;">ช่องจอดรถที่ {{ key }}
                                    </a><br>
                                    <i class="fas fa-exclamation-circle" @click="warn(index,key)" v-if="n1.status == 'On'"></i>
                                    <i class="fas fa-exclamation-circle" @click="warn(index,key)" v-if="n1.status == 'Off'" style="color:red;" ></i>
                                    </center>
                                  </div></center>
                                  </div>
                </div>
            </div>
    </div>
    <b-modal :active.sync="iswarn">
            <br>
              <div v-for="(n,index) in park" >
                  <div v-for="(v,index) in n" v-if="index == selectparking">

                  </div>
              </div>
            <br>
    </b-modal>
    <b-modal :active.sync="isResave">
            <br>
            <center><div><h3>ชื่อลานจอดรถ : {{ selectparking }}</h3></div></center> <br>
            <center><div><h4>เลขลานจอดรถ : {{ this.index }}</h4></div></center>
            <div>
              <div class="container">
                <div class="row">
                </div>
              <div class="row">
                  <div class="col-md-8">
                       <p>เลือกเวลาเข้าจอดรถ </p>
                  </div>
              </div>
              <div class="row">
                <div class="col-md-4">
                  <select class="form-control " v-model="selectedtime">
                    <option :value="null" >-- เลือกเวลา -- </option>
                    <option value="0" v-if="parseFloat(todayhous,10).toFixed(0)+ '.' + parseFloat(todayminit,10).toFixed(0)  <= 0.00 || 
                    parseFloat(todayhous,10).toFixed(0)+ '.' + parseFloat(todayminit,10).toFixed(0) < 0.59 &&
                    this.timelate < 0.59">0</option>
                    <!-- <option value="1" v-if="parseFloat(todayhous,10).toFixed(2) < 1.59 && 
                    this.timelate < 1.59">1 </option> -->
                    <option value="01" v-if="todayhous < '01:59'">01 </option>
                    <option value="02" v-if="todayhous < '02:59'">02 </option>
                    <option value="03" v-if="todayhous < '03:59'">03 </option>
                    <option value="04" v-if="todayhous < '04:59'">04 </option>
                    <option value="05" v-if="todayhous < '05:59'">05 </option>
                    <option value="06" v-if="todayhous < '06:59'">06 </option>
                    <option value="07" v-if="todayhous < '07:59'">07 </option>
                    <option value="08" v-if="todayhous < '08:59'">08 </option>
                    <option value="09" v-if="todayhous < '09:59'">09 </option>
                    <option value="10" v-if="todayhous < '10:59'">10 </option>
                    <option value="11" v-if="todayhous < '11:59'">11 </option>
                    <option value="12" v-if="todayhous < '12:59'">12 </option>
                    <option value="13" v-if="todayhous < '13:59'">13 </option>
                    <option value="14" v-if="todayhous < '14:59'">14 </option>
                    <option value="15" v-if="todayhous < '15:59'">15 </option>
                    <option value="16" v-if="todayhous < '16:59'">16 </option>
                    <option value="17" v-if="todayhous < '17:59'">17 </option>
                    <option value="18" v-if="todayhous < '18:59'">18 </option>
                    <option value="19" v-if="todayhous < '19:59'">19 </option>
                    <option value="20" v-if="todayhous < '20:59'">20 </option>
                    <option value="21" v-if="todayhous < '21:59'">21 </option>
                    <option value="21" v-if="todayhous < '21:59'">21</option>
                    <option value="22" v-if="todayhous < '22:59'">22 </option>
                    <option value="23" v-if="todayhous < '23:59'">23 </option>
                    <!-- <option value="1" v-if="parseFloat(todayhous,10).toFixed(2) < 1.59 &&
                    parseFloat(1.00,10).toFixed(2) < parseFloat(timestart,10).toFixed(2) 
                    && parseFloat(1.00,10).toFixed(2) < parseFloat(timelate,10).toFixed(2)">1</option>
                    <option value="1" v-if="parseFloat(todayhous,10).toFixed(2) < 2.59 &&
                    parseFloat(1.00,10).toFixed(2) > parseFloat(timestart,10).toFixed(2) 
                    && parseFloat(1.00,10).toFixed(2) > parseFloat(timelate,10).toFixed(2)">1</option>
                    <option value="2" v-if="parseFloat(todayhous,10).toFixed(2) < 2.59 &&
                    parseFloat(2.00,10).toFixed(2) < parseFloat(timestart,10).toFixed(2) 
                    && parseFloat(2.00,10).toFixed(2) < parseFloat(timelate,10).toFixed(2)">2</option>
                    <option value="2" v-if="parseFloat(todayhous,10).toFixed(2) < 2.59 &&
                    parseFloat(2.00,10).toFixed(2) > parseFloat(timestart,10).toFixed(2) 
                    && parseFloat(2.00,10).toFixed(2) > parseFloat(timelate,10).toFixed(2)">2</option>
                    <option value="3" v-if="parseFloat(todayhous,10).toFixed(2) < 3.59 &&
                    parseFloat(3.00,10).toFixed(2) < parseFloat(timestart,10).toFixed(2) 
                    && parseFloat(3.00,10).toFixed(2) < parseFloat(timelate,10).toFixed(2)">3</option>
                    <option value="3" v-if="parseFloat(todayhous,10).toFixed(2) < 3.59 &&
                    parseFloat(3.00,10).toFixed(2) > parseFloat(timestart,10).toFixed(2) 
                    && parseFloat(3.00,10).toFixed(2) > parseFloat(timelate,10).toFixed(2)">3</option>
                    <option value="4" v-if="parseFloat(todayhous,10).toFixed(2) < 4.59 &&
                    parseFloat(4.00,10).toFixed(2) < parseFloat(timestart,10).toFixed(2) 
                    && parseFloat(4.00,10).toFixed(2) < parseFloat(timelate,10).toFixed(2)">4</option>
                    <option value="4" v-if="parseFloat(todayhous,10).toFixed(2) < 4.59 &&
                    parseFloat(4.00,10).toFixed(2) > parseFloat(timestart,10).toFixed(2) 
                    && parseFloat(4.00,10).toFixed(2) > parseFloat(timelate,10).toFixed(2)">4</option>
                    <option value="5" v-if="parseFloat(todayhous,10).toFixed(2) < 5.59 &&
                    parseFloat(5.00,10).toFixed(2) < parseFloat(timestart,10).toFixed(2) 
                    && parseFloat(5.00,10).toFixed(2) < parseFloat(timelate,10).toFixed(2)">5</option>
                    <option value="5" v-if="parseFloat(todayhous,10).toFixed(2) < 5.59 &&
                    parseFloat(5.00,10).toFixed(2) > parseFloat(timestart,10).toFixed(2) 
                    && parseFloat(5.00,10).toFixed(2) > parseFloat(timelate,10).toFixed(2)">5</option>
                    <option value="6" v-if="parseFloat(todayhous,10).toFixed(2) < 6.59 &&
                    parseFloat(6.00,10).toFixed(2) < parseFloat(timestart,10).toFixed(2) 
                    && parseFloat(6.00,10).toFixed(2) < parseFloat(timelate,10).toFixed(2)">6</option>
                    <option value="6" v-if="parseFloat(todayhous,10).toFixed(2) < 6.59 &&
                    parseFloat(6.00,10).toFixed(2) > parseFloat(timestart,10).toFixed(2) 
                    && parseFloat(6.00,10).toFixed(2) > parseFloat(timelate,10).toFixed(2)">6</option>
                    <option value="7" v-if="parseFloat(todayhous,10).toFixed(2) < 7.59 &&
                    parseFloat(7.00,10).toFixed(2) < parseFloat(timestart,10).toFixed(2) 
                    && parseFloat(7.00,10).toFixed(2) < parseFloat(timelate,10).toFixed(2)">7</option>
                    <option value="7" v-if="parseFloat(todayhous,10).toFixed(2) < 7.59 &&
                    parseFloat(7.00,10).toFixed(2) > parseFloat(timestart,10).toFixed(2) 
                    && parseFloat(7.00,10).toFixed(2) > parseFloat(timelate,10).toFixed(2)">7</option>
                    <option value="8" v-if="parseFloat(todayhous,10).toFixed(2) < 8.59 &&
                    parseFloat(8.00,10).toFixed(2) < parseFloat(timestart,10).toFixed(2) 
                    && parseFloat(8.00,10).toFixed(2) < parseFloat(timelate,10).toFixed(2)">8</option>
                    <option value="8" v-if="parseFloat(todayhous,10).toFixed(2) < 8.59 &&
                    parseFloat(8.00,10).toFixed(2) > parseFloat(timestart,10).toFixed(2) 
                    && parseFloat(8.00,10).toFixed(2) > parseFloat(timelate,10).toFixed(2)">8</option>
                    <option value="9" v-if="parseFloat(todayhous,10).toFixed(2) < 9.59 &&
                    parseFloat(9.00,10).toFixed(2) < parseFloat(timestart,10).toFixed(2) 
                    && parseFloat(9.00,10).toFixed(2) < parseFloat(timelate,10).toFixed(2)">9</option>
                    <option value="9" v-if="parseFloat(todayhous,10).toFixed(2) < 9.59 &&
                    parseFloat(9.00,10).toFixed(2) > parseFloat(timestart,10).toFixed(2) 
                    && parseFloat(9.00,10).toFixed(2) > parseFloat(timelate,10).toFixed(2)">9</option>
                    <option value="10" v-if="parseFloat(todayhous,10).toFixed(2) < 10.59 &&
                    parseFloat(10.00,10).toFixed(2) < parseFloat(timestart,10).toFixed(2) 
                    && parseFloat(10.00,10).toFixed(2) < parseFloat(timelate,10).toFixed(2)">10</option>
                    <option value="10" v-if="parseFloat(todayhous,10).toFixed(2) < 10.59 &&
                    parseFloat(10.00,10).toFixed(2) > parseFloat(timestart,10).toFixed(2) 
                    && parseFloat(10.00,10).toFixed(2) > parseFloat(timelate,10).toFixed(2)">10</option>
                    <option value="11" v-if="parseFloat(todayhous,10).toFixed(2) < 11.59 &&
                    parseFloat(11.00,10).toFixed(2) < parseFloat(timestart,10).toFixed(2) 
                    && parseFloat(11.00,10).toFixed(2) < parseFloat(timelate,10).toFixed(2)">11</option>
                    <option value="11" v-if="parseFloat(todayhous,10).toFixed(2) < 11.59 &&
                    parseFloat(11.00,10).toFixed(2) > parseFloat(timestart,10).toFixed(2) 
                    && parseFloat(11.00,10).toFixed(2) > parseFloat(timelate,10).toFixed(2)">11</option>
                    <option value="12" v-if="parseFloat(todayhous,10).toFixed(2) < 12.59 &&
                    parseFloat(12.00,10).toFixed(2) < parseFloat(timestart,10).toFixed(2) 
                    && parseFloat(12.00,10).toFixed(2) < parseFloat(timelate,10).toFixed(2)">12</option>
                    <option value="12" v-if="parseFloat(todayhous,10).toFixed(2) < 12.59 &&
                    parseFloat(12.00,10).toFixed(2) > parseFloat(timestart,10).toFixed(2) 
                    && parseFloat(12.00,10).toFixed(2) > parseFloat(timelate,10).toFixed(2)">12</option>
                    <option value="13" v-if="parseFloat(todayhous,10).toFixed(2) < 13.59 &&
                    parseFloat(13.00,10).toFixed(2) < parseFloat(timestart,10).toFixed(2) 
                    && parseFloat(13.00,10).toFixed(2) < parseFloat(timelate,10).toFixed(2)">13</option>
                    <option value="13" v-if="parseFloat(todayhous,10).toFixed(2) < 13.59 &&
                    parseFloat(13.00,10).toFixed(2) > parseFloat(timestart,10).toFixed(2) 
                    && parseFloat(13.00,10).toFixed(2) > parseFloat(timelate,10).toFixed(2)">13</option>
                    <option value="14" v-if="parseFloat(todayhous,10).toFixed(2) < 14.59 &&
                    parseFloat(14.00,10).toFixed(2) < parseFloat(timestart,10).toFixed(2) 
                    && parseFloat(14.00,10).toFixed(2) < parseFloat(timelate,10).toFixed(2)">14</option>
                    <option value="14" v-if="parseFloat(todayhous,10).toFixed(2) < 14.59 &&
                    parseFloat(14.00,10).toFixed(2) > parseFloat(timestart,10).toFixed(2) 
                    && parseFloat(14.00,10).toFixed(2) > parseFloat(timelate,10).toFixed(2)">14</option>
                    <option value="15" v-if="parseFloat(todayhous,10).toFixed(2) < 15.59 &&
                    parseFloat(15.00,10).toFixed(2) < parseFloat(timestart,10).toFixed(2) 
                    && parseFloat(15.00,10).toFixed(2) < parseFloat(timelate,10).toFixed(2)">15</option>
                    <option value="15" v-if="parseFloat(todayhous,10).toFixed(2) < 15.59 &&
                    parseFloat(15.00,10).toFixed(2) > parseFloat(timestart,10).toFixed(2) 
                    && parseFloat(15.00,10).toFixed(2) > parseFloat(timelate,10).toFixed(2)">15</option>
                    <option value="16" v-if="parseFloat(todayhous,10).toFixed(2) < 16.59 &&
                    parseFloat(16.00,10).toFixed(2) < parseFloat(timestart,10).toFixed(2) 
                    && parseFloat(16.00,10).toFixed(2) < parseFloat(timelate,10).toFixed(2)">16</option>
                    <option value="16" v-if="parseFloat(todayhous,10).toFixed(2) < 16.59 &&
                    parseFloat(16.00,10).toFixed(2) > parseFloat(timestart,10).toFixed(2) 
                    && parseFloat(16.00,10).toFixed(2) > parseFloat(timelate,10).toFixed(2)">16</option>
                    <option value="17" v-if="parseFloat(todayhous,10).toFixed(2) < 17.59 &&
                    parseFloat(17.00,10).toFixed(2) < parseFloat(timestart,10).toFixed(2) 
                    && parseFloat(17.00,10).toFixed(2) < parseFloat(timelate,10).toFixed(2)">17</option>
                    <option value="17" v-if="parseFloat(todayhous,10).toFixed(2) < 17.59 &&
                    parseFloat(17.00,10).toFixed(2) > parseFloat(timestart,10).toFixed(2) 
                    && parseFloat(17.00,10).toFixed(2) > parseFloat(timelate,10).toFixed(2)">17</option>
                    <option value="18" v-if="parseFloat(todayhous,10).toFixed(2) < 18.59 &&
                    parseFloat(18.00,10).toFixed(2) < parseFloat(timestart,10).toFixed(2) 
                    && parseFloat(18.59,10).toFixed(2) > parseFloat(timelate,10).toFixed(2)">18</option>
                    <option value="18" v-if="parseFloat(todayhous,10).toFixed(2) < 18.59 &&
                    parseFloat(18.00,10).toFixed(2) > parseFloat(timestart,10).toFixed(2) 
                    && parseFloat(18.59,10).toFixed(2) > parseFloat(timelate,10).toFixed(2)">18</option>
                    <option value="19" v-if="parseFloat(todayhous,10).toFixed(2) < 19.59 &&
                    parseFloat(19.00,10).toFixed(2) < parseFloat(timestart,10).toFixed(2) 
                    && parseFloat(19.00,10).toFixed(2) < parseFloat(timelate,10).toFixed(2)">19</option>
                    <option value="19" v-if="parseFloat(todayhous,10).toFixed(2) < 19.59 &&
                    parseFloat(19.00,10).toFixed(2) > parseFloat(timestart,10).toFixed(2) 
                    && parseFloat(19.00,10).toFixed(2) > parseFloat(timelate,10).toFixed(2)">19</option>
                    <option value="20" v-if="parseFloat(todayhous,10).toFixed(2) < 20.59 &&
                    parseFloat(20.00,10).toFixed(2) < parseFloat(timestart,10).toFixed(2) 
                    && parseFloat(20.00,10).toFixed(2) < parseFloat(timelate,10).toFixed(2)">20</option>
                    <option value="20" v-if="parseFloat(todayhous,10).toFixed(2) < 20.59 &&
                    parseFloat(20.00,10).toFixed(2) > parseFloat(timestart,10).toFixed(2) 
                    && parseFloat(20.00,10).toFixed(2) > parseFloat(timelate,10).toFixed(2)">20</option>
                    <option value="21" v-if="parseFloat(todayhous,10).toFixed(2) < 21.59 &&
                    parseFloat(21.00,10).toFixed(2) < parseFloat(timestart,10).toFixed(2) 
                    && parseFloat(21.00,10).toFixed(2) < parseFloat(timelate,10).toFixed(2)">21</option>
                    <option value="21" v-if="parseFloat(todayhous,10).toFixed(2) < 21.59 &&
                    parseFloat(21.00,10).toFixed(2) > parseFloat(timestart,10).toFixed(2) 
                    && parseFloat(21.00,10).toFixed(2) > parseFloat(timelate,10).toFixed(2)">21</option>
                    <option value="22" v-if="parseFloat(todayhous,10).toFixed(2) < 22.59 &&
                    parseFloat(22.00,10).toFixed(2) < parseFloat(timestart,10).toFixed(2) 
                    && parseFloat(22.00,10).toFixed(2) < parseFloat(timelate,10).toFixed(2)">22</option>
                    <option value="22" v-if="parseFloat(todayhous,10).toFixed(2) < 22.59 &&
                    parseFloat(22.00,10).toFixed(2) > parseFloat(timestart,10).toFixed(2) 
                    && parseFloat(22.00,10).toFixed(2) > parseFloat(timelate,10).toFixed(2)">22</option>
                    <option value="23" v-if="parseFloat(todayhous,10).toFixed(2) < 23.59 &&
                    parseFloat(23.00,10).toFixed(2) < parseFloat(timestart,10).toFixed(2) 
                    && parseFloat(23.00,10).toFixed(2) < parseFloat(timelate,10).toFixed(2)">23</option>
                    <option value="23" v-if="parseFloat(todayhous,10).toFixed(2) < 23.59 &&
                    parseFloat(23.00,10).toFixed(2) > parseFloat(timestart,10).toFixed(2) 
                    && parseFloat(23.00,10).toFixed(2) > parseFloat(timelate,10).toFixed(2)">23</option> -->
                  </select>
                  </div>
                  <div class="col-md-4">
                      <select class="form-control " v-model="selectedminit">
                          <option :value="null" disabled> -- นาที -- </option>
                          <!-- <option value="00" v-if="selectedtime == 5 &&
                          parseFloat(todayhous,10).toFixed(2) < 5.01"> 00 น. </option>
                          <option value="05" v-if="selectedtime == 5 && parseFloat(todayhous,10).toFixed(2)  < 5.05 ">05 น. </option>
                          <option value="10" v-if="selectedtime == 5 && parseFloat(todayhous,10).toFixed(2)  < 5.10 ">10 น. </option>
                          <option value="15" v-if="selectedtime == 5 && parseFloat(todayhous,10).toFixed(2) <  5.15 ">15 น.</option>
                          <option value="20" v-if="selectedtime == 5 && parseFloat(todayhous,10).toFixed(2)  < 5.20 ">20 น.</option>
                          <option value="25" v-if="selectedtime == 5 && parseFloat(todayhous,10).toFixed(2)  < 5.25">25 น.</option>
                          <option value="30" v-if="selectedtime == 5 && parseFloat(todayhous,10).toFixed(2)  < 5.30 ">30 น. </option>
                          <option value="35" v-if="selectedtime == 5 && parseFloat(todayhous,10).toFixed(2)  < 5.35">35 น.</option>
                          <option value="40" v-if="selectedtime == 5 && parseFloat(todayhous,10).toFixed(2)  < 5.40 ">40 น.</option>
                          <option value="45" v-if="selectedtime == 5 && parseFloat(todayhous,10).toFixed(2)  < 5.45 ">45 น.</option>
                          <option value="50" v-if="selectedtime == 5 && parseFloat(todayhous,10).toFixed(2)  < 5.50">50 น.</option>
                          <option value="55" v-if="selectedtime == 5 && parseFloat(todayhous,10).toFixed(2)  < 5.55">55 น.</option> -->

                          <option value="00" v-if="selectedtime <= '03:00' && todayhous < '03:01'"> 00 น. </option>
                          <option value="05" v-if="selectedtime <= '03:05' && todayhous  < '03:05' ">05 น. </option>
                          <option value="10" v-if="selectedtime <= '03:10' && todayhous  < '03:10' ">10 น. </option>
                          <option value="15" v-if="selectedtime <= '03:15' && todayhous <  '03:15' ">15 น.</option>
                          <option value="20" v-if="selectedtime <= '03:20' && todayhous  < '03:20' ">20 น.</option>
                          <option value="25" v-if="selectedtime <= '03:25' && todayhous  < '03:25'">25 น.</option>
                          <option value="30" v-if="selectedtime <= '03:30' && todayhous  < '03:30' ">30 น. </option>
                          <option value="35" v-if="selectedtime <= '03:35' && todayhous  < '03:35'">35 น.</option>
                          <option value="40" v-if="selectedtime <= '03:40' && todayhous  < '03:40' ">40 น.</option>
                          <option value="45" v-if="selectedtime <= '03:45' && todayhous  < '03:45' ">45 น.</option>
                          <option value="50" v-if="selectedtime <= '03:50' && todayhous  < '03:50'">50 น.</option>
                          <option value="55" v-if="selectedtime <= '03:55' && todayhous  < '21:55'">55 น.</option>

                          <option value="00" v-if="selectedtime <= '04:00' && todayhous < '04:01'"> 00 น. </option>
                          <option value="05" v-if="selectedtime <= '04:05' && todayhous  < '04:05' ">05 น. </option>
                          <option value="10" v-if="selectedtime <= '04:10' && todayhous  < '04:10' ">10 น. </option>
                          <option value="15" v-if="selectedtime <= '04:15' && todayhous <  '04:15' ">15 น.</option>
                          <option value="20" v-if="selectedtime <= '04:20' && todayhous  < '04:20' ">20 น.</option>
                          <option value="25" v-if="selectedtime <= '04:25' && todayhous  < '04:25'">25 น.</option>
                          <option value="30" v-if="selectedtime <= '04:30' && todayhous  < '04:30' ">30 น. </option>
                          <option value="35" v-if="selectedtime <= '04:35' && todayhous  < '04:35'">35 น.</option>
                          <option value="40" v-if="selectedtime <= '04:40' && todayhous  < '04:40' ">40 น.</option>
                          <option value="45" v-if="selectedtime <= '04:45' && todayhous  < '04:45' ">45 น.</option>
                          <option value="50" v-if="selectedtime <= '04:50' && todayhous  < '04:50'">50 น.</option>
                          <option value="55" v-if="selectedtime <= '04:55' && todayhous  < '21:55'">55 น.</option>


                          <option value="00" v-if="selectedtime <= '05:00' && todayhous < '05:01'"> 00 น. </option>
                          <option value="05" v-if="selectedtime <= '05:05' && todayhous  < '05:05' ">05 น. </option>
                          <option value="10" v-if="selectedtime <= '05:10' && todayhous  < '05:10' ">10 น. </option>
                          <option value="15" v-if="selectedtime <= '05:15' && todayhous <  '05:15' ">15 น.</option>
                          <option value="20" v-if="selectedtime <= '05:20' && todayhous  < '05:20' ">20 น.</option>
                          <option value="25" v-if="selectedtime <= '05:25' && todayhous  < '05:25'">25 น.</option>
                          <option value="30" v-if="selectedtime <= '05:30' && todayhous  < '05:30' ">30 น. </option>
                          <option value="35" v-if="selectedtime <= '05:35' && todayhous  < '05:35'">35 น.</option>
                          <option value="40" v-if="selectedtime <= '05:40' && todayhous  < '05:40' ">40 น.</option>
                          <option value="45" v-if="selectedtime <= '05:45' && todayhous  < '05:45' ">45 น.</option>
                          <option value="50" v-if="selectedtime <= '05:50' && todayhous  < '05:50'">50 น.</option>
                          <option value="55" v-if="selectedtime <= '05:55' && todayhous  < '21:55'">55 น.</option>
                          
                          <option value="00" v-if="selectedtime <= '06:00' && todayhous < '06:01'"> 00 น. </option>
                          <option value="05" v-if="selectedtime <= '06:05' && todayhous  < '06:05' ">05 น. </option>
                          <option value="10" v-if="selectedtime <= '06:10' && todayhous  < '06:10' ">10 น. </option>
                          <option value="15" v-if="selectedtime <= '06:15' && todayhous <  '06:15' ">15 น.</option>
                          <option value="20" v-if="selectedtime <= '06:20' && todayhous  < '06:20' ">20 น.</option>
                          <option value="25" v-if="selectedtime <= '06:25' && todayhous  < '06:25'">25 น.</option>
                          <option value="30" v-if="selectedtime <= '06:30' && todayhous  < '06:30' ">30 น. </option>
                          <option value="35" v-if="selectedtime <= '06:35' && todayhous  < '06:35'">35 น.</option>
                          <option value="40" v-if="selectedtime <= '06:40' && todayhous  < '06:40' ">40 น.</option>
                          <option value="45" v-if="selectedtime <= '06:45' && todayhous  < '06:45' ">45 น.</option>
                          <option value="50" v-if="selectedtime <= '06:50' && todayhous  < '06:50'">50 น.</option>
                          <option value="55" v-if="selectedtime <= '06:55' && todayhous  < '06:55'">55 น.</option>

                          <option value="00" v-if="selectedtime <= '07:00' && todayhous < '07:01'"> 00 น. </option>
                          <option value="05" v-if="selectedtime <= '07:05' && todayhous  < '07:05' ">05 น. </option>
                          <option value="10" v-if="selectedtime <= '07:10' && todayhous  < '07:10' ">10 น. </option>
                          <option value="15" v-if="selectedtime <= '07:15' && todayhous <  '07:15' ">15 น.</option>
                          <option value="20" v-if="selectedtime <= '07:20' && todayhous  < '07:20' ">20 น.</option>
                          <option value="25" v-if="selectedtime <= '07:25' && todayhous  < '07:25'">25 น.</option>
                          <option value="30" v-if="selectedtime <= '07:30' && todayhous  < '07:30' ">30 น. </option>
                          <option value="35" v-if="selectedtime <= '07:35' && todayhous  < '07:35'">35 น.</option>
                          <option value="40" v-if="selectedtime <= '07:40' && todayhous  < '07:40' ">40 น.</option>
                          <option value="45" v-if="selectedtime <= '07:45' && todayhous  < '07:45' ">45 น.</option>
                          <option value="50" v-if="selectedtime <= '07:50' && todayhous  < '07:50'">50 น.</option>
                          <option value="55" v-if="selectedtime <= '07:55' && todayhous  < '07:55'">55 น.</option>

                          <option value="00" v-if="selectedtime <= '08:00' && todayhous < '08:01'"> 00 น. </option>
                          <option value="05" v-if="selectedtime <= '08:05' && todayhous  < '08:05' ">05 น. </option>
                          <option value="10" v-if="selectedtime <= '08:10' && todayhous  < '08:10' ">10 น. </option>
                          <option value="15" v-if="selectedtime <= '08:15' && todayhous <  '08:15' ">15 น.</option>
                          <option value="20" v-if="selectedtime <= '08:20' && todayhous  < '08:20' ">20 น.</option>
                          <option value="25" v-if="selectedtime <= '08:25' && todayhous  < '08:25'">25 น.</option>
                          <option value="30" v-if="selectedtime <= '08:30' && todayhous  < '08:30' ">30 น. </option>
                          <option value="35" v-if="selectedtime <= '08:35' && todayhous  < '08:35'">35 น.</option>
                          <option value="40" v-if="selectedtime <= '08:40' && todayhous  < '08:40' ">40 น.</option>
                          <option value="45" v-if="selectedtime <= '08:45' && todayhous  < '08:45' ">45 น.</option>
                          <option value="50" v-if="selectedtime <= '08:50' && todayhous  < '08:50'">50 น.</option>
                          <option value="55" v-if="selectedtime <= '08:55' && todayhous  < '08:55'">55 น.</option>

                          <option value="00" v-if="selectedtime <= '09:00' && todayhous < '09:01'"> 00 น. </option>
                          <option value="05" v-if="selectedtime <= '09:05' && todayhous  < '09:05' ">05 น. </option>
                          <option value="10" v-if="selectedtime <= '09:10' && todayhous  < '09:10' ">10 น. </option>
                          <option value="15" v-if="selectedtime <= '09:15' && todayhous <  '09:15' ">15 น.</option>
                          <option value="20" v-if="selectedtime <= '09:20' && todayhous  < '09:20' ">20 น.</option>
                          <option value="25" v-if="selectedtime <= '09:25' && todayhous  < '09:25'">25 น.</option>
                          <option value="30" v-if="selectedtime <= '09:30' && todayhous  < '09:30' ">30 น. </option>
                          <option value="35" v-if="selectedtime <= '09:35' && todayhous  < '09:35'">35 น.</option>
                          <option value="40" v-if="selectedtime <= '09:40' && todayhous  < '09:40' ">40 น.</option>
                          <option value="45" v-if="selectedtime <= '09:45' && todayhous  < '09:45' ">45 น.</option>
                          <option value="50" v-if="selectedtime <= '09:50' && todayhous  < '09:50'">50 น.</option>
                          <option value="55" v-if="selectedtime <= '09:55' && todayhous  < '09:55'">55 น.</option>

                          <option value="00" v-if="selectedtime <= '10:00' && todayhous < '10:01'"> 00 น. </option>
                          <option value="05" v-if="selectedtime <= '10:05' && todayhous  < '10:05' ">05 น. </option>
                          <option value="10" v-if="selectedtime <= '10:10' && todayhous  < '10:10' ">10 น. </option>
                          <option value="15" v-if="selectedtime <= '10:15' && todayhous <  '10:15' ">15 น.</option>
                          <option value="20" v-if="selectedtime <= '10:20' && todayhous  < '10:20' ">20 น.</option>
                          <option value="25" v-if="selectedtime <= '10:25' && todayhous  < '10:25'">25 น.</option>
                          <option value="30" v-if="selectedtime <= '10:30' && todayhous  < '10:30' ">30 น. </option>
                          <option value="35" v-if="selectedtime <= '10:35' && todayhous  < '10:35'">35 น.</option>
                          <option value="40" v-if="selectedtime <= '10:40' && todayhous  < '10:40' ">40 น.</option>
                          <option value="45" v-if="selectedtime <= '10:45' && todayhous  < '10:45' ">45 น.</option>
                          <option value="50" v-if="selectedtime <= '10:50' && todayhous  < '10:50'">50 น.</option>
                          <option value="55" v-if="selectedtime <= '10:55' && todayhous  < '10:55'">55 น.</option>

                          <option value="00" v-if="selectedtime <= '11:00' && todayhous < '11:01'"> 00 น. </option>
                          <option value="05" v-if="selectedtime <= '11:05' && todayhous  < '11:05' ">05 น. </option>
                          <option value="10" v-if="selectedtime <= '11:11' && todayhous  < '11:10' ">10 น. </option>
                          <option value="15" v-if="selectedtime <= '11:15' && todayhous <  '11:15' ">15 น.</option>
                          <option value="20" v-if="selectedtime <= '11:20' && todayhous  < '11:20' ">20 น.</option>
                          <option value="25" v-if="selectedtime <= '11:25' && todayhous  < '11:25'">25 น.</option>
                          <option value="30" v-if="selectedtime <= '11:30' && todayhous  < '11:30' ">30 น. </option>
                          <option value="35" v-if="selectedtime <= '11:35' && todayhous  < '11:35'">35 น.</option>
                          <option value="40" v-if="selectedtime <= '11:40' && todayhous  < '11:40' ">40 น.</option>
                          <option value="45" v-if="selectedtime <= '11:45' && todayhous  < '11:45' ">45 น.</option>
                          <option value="50" v-if="selectedtime <= '11:50' && todayhous  < '11:50'">50 น.</option>
                          <option value="55" v-if="selectedtime <= '11:55' && todayhous  < '11:55'">55 น.</option>

                          <option value="00" v-if="selectedtime <= '12:00' && todayhous < '12:01'"> 00 น. </option>
                          <option value="05" v-if="selectedtime <= '12:05' && todayhous  < '12:05' ">05 น. </option>
                          <option value="10" v-if="selectedtime <= '12:10' && todayhous  < '12:10' ">10 น. </option>
                          <option value="15" v-if="selectedtime <= '12:15' && todayhous <  '12:15' ">15 น.</option>
                          <option value="20" v-if="selectedtime <= '12:20' && todayhous  < '12:20' ">20 น.</option>
                          <option value="25" v-if="selectedtime <= '12:25' && todayhous  < '12:25'">25 น.</option>
                          <option value="30" v-if="selectedtime <= '12:30' && todayhous  < '12:30' ">30 น. </option>
                          <option value="35" v-if="selectedtime <= '12:35' && todayhous  < '12:35'">35 น.</option>
                          <option value="40" v-if="selectedtime <= '12:40' && todayhous  < '12:40' ">40 น.</option>
                          <option value="45" v-if="selectedtime <= '12:45' && todayhous  < '12:45' ">45 น.</option>
                          <option value="50" v-if="selectedtime <= '12:50' && todayhous  < '12:50'">50 น.</option>
                          <option value="55" v-if="selectedtime <= '12:55' && todayhous  < '12:55'">55 น.</option>
                          
                          <option value="00" v-if="selectedtime <= '13:00' && todayhous < '13:01'"> 00 น. </option>
                          <option value="05" v-if="selectedtime <= '13:05' && todayhous  < '13:05' ">05 น. </option>
                          <option value="10" v-if="selectedtime <= '13:10' && todayhous  < '13:10' ">10 น. </option>
                          <option value="15" v-if="selectedtime <= '13:15' && todayhous <  '13:15' ">15 น.</option>
                          <option value="20" v-if="selectedtime <= '13:20' && todayhous  < '13:20' ">20 น.</option>
                          <option value="25" v-if="selectedtime <= '13:25' && todayhous  < '13:25'">25 น.</option>
                          <option value="30" v-if="selectedtime <= '13:30' && todayhous  < '13:30' ">30 น. </option>
                          <option value="35" v-if="selectedtime <= '13:35' && todayhous  < '13:35'">35 น.</option>
                          <option value="40" v-if="selectedtime <= '13:40' && todayhous  < '13:40' ">40 น.</option>
                          <option value="45" v-if="selectedtime <= '13:45' && todayhous  < '13:45' ">45 น.</option>
                          <option value="50" v-if="selectedtime <= '13:50' && todayhous  < '13:50'">50 น.</option>
                          <option value="55" v-if="selectedtime <= '13:55' && todayhous  < '13:55'">55 น.</option>

                          <option value="00" v-if="selectedtime <= '14:00' && todayhous < '14:01'"> 00 น. </option>
                          <option value="05" v-if="selectedtime <= '14:05' && todayhous  < '14:05' ">05 น. </option>
                          <option value="10" v-if="selectedtime <= '14:10' && todayhous  < '14:10' ">10 น. </option>
                          <option value="15" v-if="selectedtime <= '14:15' && todayhous <  '14:15' ">15 น.</option>
                          <option value="20" v-if="selectedtime <= '14:20' && todayhous  < '14:20' ">20 น.</option>
                          <option value="25" v-if="selectedtime <= '14:25' && todayhous  < '14:25'">25 น.</option>
                          <option value="30" v-if="selectedtime <= '14:30' && todayhous  < '14:30' ">30 น. </option>
                          <option value="35" v-if="selectedtime <= '14:35' && todayhous  < '14:35'">35 น.</option>
                          <option value="40" v-if="selectedtime <= '14:40' && todayhous  < '14:40' ">40 น.</option>
                          <option value="45" v-if="selectedtime <= '14:45' && todayhous  < '14:45' ">45 น.</option>
                          <option value="50" v-if="selectedtime <= '14:50' && todayhous  < '14:50'">50 น.</option>
                          <option value="55" v-if="selectedtime <= '14:55' && todayhous  < '14:55'">55 น.</option>

                          <option value="00" v-if="selectedtime <= '15:00' && todayhous < '15:01'"> 00 น. </option>
                          <option value="05" v-if="selectedtime <= '15:05' && todayhous  < '15:05' ">05 น. </option>
                          <option value="10" v-if="selectedtime <= '15:10' && todayhous  < '15:10' ">10 น. </option>
                          <option value="15" v-if="selectedtime <= '15:15' && todayhous <  '15:15' ">15 น.</option>
                          <option value="20" v-if="selectedtime <= '15:20' && todayhous  < '15:20' ">20 น.</option>
                          <option value="25" v-if="selectedtime <= '15:25' && todayhous  < '15:25'">25 น.</option>
                          <option value="30" v-if="selectedtime <= '15:30' && todayhous  < '15:30' ">30 น. </option>
                          <option value="35" v-if="selectedtime <= '15:35' && todayhous  < '15:35'">35 น.</option>
                          <option value="40" v-if="selectedtime <= '15:40' && todayhous  < '15:40' ">40 น.</option>
                          <option value="45" v-if="selectedtime <= '15:45' && todayhous  < '15:45' ">45 น.</option>
                          <option value="50" v-if="selectedtime <= '15:50' && todayhous  < '15:50'">50 น.</option>
                          <option value="55" v-if="selectedtime <= '15:55' && todayhous  < '15:55'">55 น.</option>

                          <option value="00" v-if="selectedtime <= '16:00' && todayhous < '16:01'"> 00 น. </option>
                          <option value="05" v-if="selectedtime <= '16:05' && todayhous  < '16:05' ">05 น. </option>
                          <option value="10" v-if="selectedtime <= '16:10' && todayhous  < '16:10' ">10 น. </option>
                          <option value="15" v-if="selectedtime <= '16:15' && todayhous <  '16:15' ">15 น.</option>
                          <option value="20" v-if="selectedtime <= '16:20' && todayhous  < '16:20' ">20 น.</option>
                          <option value="25" v-if="selectedtime <= '16:25' && todayhous  < '16:25'">25 น.</option>
                          <option value="30" v-if="selectedtime <= '16:30' && todayhous  < '16:30' ">30 น. </option>
                          <option value="35" v-if="selectedtime <= '16:35' && todayhous  < '16:35'">35 น.</option>
                          <option value="40" v-if="selectedtime <= '16:40' && todayhous  < '16:40' ">40 น.</option>
                          <option value="45" v-if="selectedtime <= '16:45' && todayhous  < '16:45' ">45 น.</option>
                          <option value="50" v-if="selectedtime <= '16:50' && todayhous  < '16:50'">50 น.</option>
                          <option value="55" v-if="selectedtime <= '16:55' && todayhous  < '16:55'">55 น.</option>
                          
                          <option value="00" v-if="selectedtime <= '17:00' && todayhous < '17:01'"> 00 น. </option>
                          <option value="05" v-if="selectedtime <= '17:05' && todayhous  < '17:05' ">05 น. </option>
                          <option value="10" v-if="selectedtime <= '17:10' && todayhous  < '17:10' ">10 น. </option>
                          <option value="15" v-if="selectedtime <= '17:15' && todayhous <  '17:15' ">15 น.</option>
                          <option value="20" v-if="selectedtime <= '17:20' && todayhous  < '17:20' ">20 น.</option>
                          <option value="25" v-if="selectedtime <= '17:25' && todayhous  < '17:25'">25 น.</option>
                          <option value="30" v-if="selectedtime <= '17:30' && todayhous  < '17:30' ">30 น. </option>
                          <option value="35" v-if="selectedtime <= '17:35' && todayhous  < '17:35'">35 น.</option>
                          <option value="40" v-if="selectedtime <= '17:40' && todayhous  < '17:40' ">40 น.</option>
                          <option value="45" v-if="selectedtime <= '17:45' && todayhous  < '17:45' ">45 น.</option>
                          <option value="50" v-if="selectedtime <= '17:50' && todayhous  < '17:50'">50 น.</option>
                          <option value="55" v-if="selectedtime <= '17:55' && todayhous  < '17:55'">55 น.</option>

                          <option value="00" v-if="selectedtime <= '18:00' && todayhous < '18:01'"> 00 น. </option>
                          <option value="05" v-if="selectedtime <= '18:05' && todayhous  < '18:05' ">05 น. </option>
                          <option value="10" v-if="selectedtime <= '18:10' && todayhous  < '18:10' ">10 น. </option>
                          <option value="15" v-if="selectedtime <= '18:15' && todayhous <  '18:15' ">15 น.</option>
                          <option value="20" v-if="selectedtime <= '18:20' && todayhous  < '18:20' ">20 น.</option>
                          <option value="25" v-if="selectedtime <= '18:25' && todayhous  < '18:25'">25 น.</option>
                          <option value="30" v-if="selectedtime <= '18:30' && todayhous  < '18:30' ">30 น. </option>
                          <option value="35" v-if="selectedtime <= '18:35' && todayhous  < '18:35'">35 น.</option>
                          <option value="40" v-if="selectedtime <= '18:40' && todayhous  < '18:40' ">40 น.</option>
                          <option value="45" v-if="selectedtime <= '18:45' && todayhous  < '18:45' ">45 น.</option>
                          <option value="50" v-if="selectedtime <= '18:50' && todayhous  < '18:50'">50 น.</option>
                          <option value="55" v-if="selectedtime <= '18:55' && todayhous  < '18:55'">55 น.</option>

                          <option value="00" v-if="selectedtime <= '19:00' && todayhous < '19:01'"> 00 น. </option>
                          <option value="05" v-if="selectedtime <= '19:05' && todayhous  < '19:05' ">05 น. </option>
                          <option value="10" v-if="selectedtime <= '19:10' && todayhous  < '19:10' ">10 น. </option>
                          <option value="15" v-if="selectedtime <= '19:15' && todayhous <  '19:15' ">15 น.</option>
                          <option value="20" v-if="selectedtime <= '19:20' && todayhous  < '19:20' ">20 น.</option>
                          <option value="25" v-if="selectedtime <= '19:25' && todayhous  < '19:25'">25 น.</option>
                          <option value="30" v-if="selectedtime <= '19:30' && todayhous  < '19:30' ">30 น. </option>
                          <option value="35" v-if="selectedtime <= '19:35' && todayhous  < '19:35'">35 น.</option>
                          <option value="40" v-if="selectedtime <= '19:40' && todayhous  < '19:40' ">40 น.</option>
                          <option value="45" v-if="selectedtime <= '19:45' && todayhous  < '19:45' ">45 น.</option>
                          <option value="50" v-if="selectedtime <= '19:50' && todayhous  < '19:50'">50 น.</option>
                          <option value="55" v-if="selectedtime <= '19:55' && todayhous  < '19:55'">55 น.</option>

                          <option value="00" v-if="selectedtime <= '20:00' && todayhous < '20:01'"> 00 น. </option>
                          <option value="05" v-if="selectedtime <= '20:05' && todayhous  < '20:05' ">05 น. </option>
                          <option value="10" v-if="selectedtime <= '20:10' && todayhous  < '20:10' ">10 น. </option>
                          <option value="15" v-if="selectedtime <= '20:15' && todayhous <  '20:15' ">15 น.</option>
                          <option value="20" v-if="selectedtime <= '20:20' && todayhous  < '20:20' ">20 น.</option>
                          <option value="25" v-if="selectedtime <= '20:25' && todayhous  < '20:25'">25 น.</option>
                          <option value="30" v-if="selectedtime <= '20:30' && todayhous  < '20:30' ">30 น. </option>
                          <option value="35" v-if="selectedtime <= '20:35' && todayhous  < '20:35'">35 น.</option>
                          <option value="40" v-if="selectedtime <= '20:40' && todayhous  < '20:40' ">40 น.</option>
                          <option value="45" v-if="selectedtime <= '20:45' && todayhous  < '20:45' ">45 น.</option>
                          <option value="50" v-if="selectedtime <= '20:50' && todayhous  < '20:50'">50 น.</option>
                          <option value="55" v-if="selectedtime <= '20:55' && todayhous  < '20:55'">55 น.</option>
        
                          <option value="00" v-if="selectedtime <= '21:00' && todayhous < '21:01'"> 00 น. </option>
                          <option value="05" v-if="selectedtime <= '21:05' && todayhous  < '21:05' ">05 น. </option>
                          <option value="10" v-if="selectedtime <= '21:10' && todayhous  < '21:10' ">10 น. </option>
                          <option value="15" v-if="selectedtime <= '21:15' && todayhous <  '21:15' ">15 น.</option>
                          <option value="20" v-if="selectedtime <= '21:20' && todayhous  < '21:20' ">20 น.</option>
                          <option value="25" v-if="selectedtime <= '21:25' && todayhous  < '21:25'">25 น.</option>
                          <option value="30" v-if="selectedtime <= '21:30' && todayhous  < '21:30' ">30 น. </option>
                          <option value="35" v-if="selectedtime <= '21:35' && todayhous  < '21:35'">35 น.</option>
                          <option value="40" v-if="selectedtime <= '21:40' && todayhous  < '21:40' ">40 น.</option>
                          <option value="45" v-if="selectedtime <= '21:45' && todayhous  < '21:45' ">45 น.</option>
                          <option value="50" v-if="selectedtime <= '21:50' && todayhous  < '21:50'">50 น.</option>
                          <option value="55" v-if="selectedtime <= '21:55' && todayhous  < '21:55'">55 น.</option>
        
                          <option value="00" v-if="selectedtime <= '22:00' && todayhous < '22:01'"> 00 น. </option>
                          <option value="05" v-if="selectedtime <= '22:05' && todayhous  < '22:05' ">05 น. </option>
                          <option value="10" v-if="selectedtime <= '22:10' && todayhous  < '22:10' ">10 น. </option>
                          <option value="15" v-if="selectedtime <= '22:15' && todayhous <  '22:15' ">15 น.</option>
                          <option value="20" v-if="selectedtime <= '22:20' && todayhous  < '22:20' ">20 น.</option>
                          <option value="25" v-if="selectedtime <= '22:25' && todayhous  < '22:25'">25 น.</option>
                          <option value="30" v-if="selectedtime <= '22:30' && todayhous  < '22:30' ">30 น. </option>
                          <option value="35" v-if="selectedtime <= '22:35' && todayhous  < '22:35'">35 น.</option>
                          <option value="40" v-if="selectedtime <= '22:40' && todayhous  < '22:40' ">40 น.</option>
                          <option value="45" v-if="selectedtime <= '22:45' && todayhous  < '22:45' ">45 น.</option>
                          <option value="50" v-if="selectedtime <= '22:50' && todayhous  < '22:50'">50 น.</option>
                          <option value="55" v-if="selectedtime <= '22:55' && todayhous  < '22:55'">55 น.</option>
        
                          <option value="00" v-if="selectedtime <= '23:00' && todayhous < '23:01'"> 00 น. </option>
                          <option value="05" v-if="selectedtime <= '23:05' && todayhous  < '23:05' ">05 น. </option>
                          <option value="10" v-if="selectedtime <= '23:10' && todayhous  < '23:10' ">10 น. </option>
                          <option value="15" v-if="selectedtime <= '23:15' && todayhous <  '23:15' ">15 น.</option>
                          <option value="20" v-if="selectedtime <= '23:20' && todayhous  < '23:20' ">20 น.</option>
                          <option value="25" v-if="selectedtime <= '23:25' && todayhous  < '23:25'">25 น.</option>
                          <option value="30" v-if="selectedtime <= '23:30' && todayhous  < '23:30' ">30 น. </option>
                          <option value="35" v-if="selectedtime <= '23:35' && todayhous  < '23:35'">35 น.</option>
                          <option value="40" v-if="selectedtime <= '23:40' && todayhous  < '23:40' ">40 น.</option>
                          <option value="45" v-if="selectedtime <= '23:45' && todayhous  < '23:45' ">45 น.</option>
                          <option value="50" v-if="selectedtime <= '23:50' && todayhous  < '23:50'">50 น.</option>
                          <option value="55" v-if="selectedtime <= '23:55' && todayhous  < '23:55'">55 น.</option>
                        </select>
                  </div>
              </div>
                  <div class="row">
                      <div class="col-md-8">
                          <p>เลือกจำนวนชั่วโมงที่จอด </p>
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-md-8">
                         <select class="form-control " v-model="selectedhoues" >
                            <option value="null" disabled>-- เลือกจำนวนชั่วโมง --  </option>
                            <!-- <option value="0.30" v-if="(23.60-todayhous) > 0.30">30 นาที</option> -->
                            <option value="1" v-if="(parseFloat('24:00')- parseFloat(todayhous,10)) > 1.00">1 ชั่วโมง</option>
                            <option value="2" v-if="(parseFloat('24:00')- parseFloat(todayhous,10)) > 2.00">2 ชั่วโมง</option>
                            <option value="3" v-if="(parseFloat('24:00')- parseFloat(todayhous,10)) > 3.00">3 ชั่วโมง</option>
                            <option value="5" v-if="(parseFloat('24:00')- parseFloat(todayhous,10)) > 5.00">5 ชั่วโมง</option>
                            <option value="8" v-if="(parseFloat('24:00')- parseFloat(todayhous,10)) > 8.00">8 ชั่วโมง</option>
                            <option value="12" v-if="(parseFloat('24:00')- parseFloat(todayhous,10)) > 12.00">12 ชั่วโมง</option>
                      </select>
                      </div>
                  </div><br>
                  <div class="row">
                      <div class="col-md-8">
                          <a class="button is-dark is-large is-fullwidth" style="color:#ffffff;"  @click="isalertSubmit()">Submit</a>
                      <br></div>
                  </div>
            </div>
            </div>
        </b-modal>
      <!-- <a class="button" @click="addResport">Resportday</a> -->
    </card>
  </template>
  <script>
  import storage from 'firebase/storage'
  import firebase from 'firebase'
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  import moment from 'moment'
   var database = firebase.database()
  var reportmoneyRef = database.ref('/Reportmoney')
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
          selectparking:null,
          data : {
            image:'',
          },
          dataImg:'',
          showimage: '',
          isImageModalActive: false,
          park:'',
          iswarn:false,
          isResave:false,
          isResave:false,
        selectedlan:null,
        creditD:'',
        optionslan: [],
        selectedhoues: null,  
        selectedtime: null,
        selectedminit: null,
        optionstime: [],
        todayminit: moment().format('mm'),
        todayhous: moment().format('HH:mm'),
        // todayDate: moment().format('D MMMM  YYYY'),
        todayDay: moment().format('D'),
        todayMont: moment().format('MMMM'),
        todayYear: moment().format('YYYY'),
        todaydate: moment().format('dddd'),
        todaynummonth: moment().format('MM')    
      }
    },
    mounted () {
      const dbRefuser = firebase.database().ref().child('users')
      const dbPark = firebase.database().ref().child('Park')
      const dbusers = firebase.database().ref().child('/users/')
      const dbsubmit = firebase.database().ref().child('/Parksubmit/')
      const dbparkadd = firebase.database().ref().child('/Parkadd/')
      dbsubmit.on('value', snap => {
        this.showparksub = snap.val()
      })
      dbPark.on('value', snap => {
        this.park = snap.val()
      })
      dbRefuser.on('value', snap => {
        this.showusers = snap.val()
      })
      dbusers.on('value', snap => {
      this.usershow = snap.val()
      })
      dbparkadd.on('value', snap => {
      this.parkadd = snap.val()
      })
      this.pullData()
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
    methods: {
    //   checkTime (start) {
    //     let str = start +':00'
    //   var d = new Date(str)
    //   console.log(d)
    //   return date.subtract(new Date(), d).toMinutes()
    // },
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
          firebase.database().ref('Park').once('value').then(function (snapshot) {
            that.showpark1 = snapshot.val()
      })
      },
      warn(index,key) {
        console.log(index)
        console.log(key)
        this.iswarn = true
        },
        isResaver(key,num,index,ve){
        console.log(index)
        this.isResave = true
        this.num = num
        this.index = index
        for(var s in this.showpark){
            if(s == num)
        console.log(index)
        }
        for(var submit in this.showparksub) {
              for(var submit2 in this.showparksub[submit]){
              }
        }
        for(var parker in this.park){
            if(this.park[parker].name === this.selectparking){
              console.log("เข้าทำ loop 501")
               this.timelate = this.park[parker][this.selectparking][index].timelast
               this.timeminit = this.park[parker][this.selectparking][index].timeminit
               this.timestart = this.park[parker][this.selectparking][index].timestart
            }
            }
    },
    isalertSubmit() {

      for (var variable in this.showuser) {
        if (this.showuser[variable].id === this.id) {
          if (this.showuser[variable].status_submit === 'Off') {
            console.log("คุณไม่สามารจองได้เนื่องจากได้ทำการจองไปแล้ว")
            this.$swal({
          title: 'คุณไม่สามารจองได้เนื่องจากได้ทำการจองไปแล้ว',
          type: 'warning',
          confirmButtonText: 'ตกลง',
          showLoaderOnConfirm: true,
          }).then((result) => {
            if(result.value) {
              this.$router.replace('/admin/Resevation')
            }
          }) 
          }
          else {
            var timestart = parseFloat(this.selectedtime,10).toFixed(0) + '.' + this.selectedminit
            var time = parseFloat(timestart,10) + parseFloat(this.selectedhoues, 10)
        this.$swal({
          title: 'ยืนยันการจอง',
          html: 
          'ชื่อลานจอดรถ : ' +this.selectparking + '<br><br>'
          + 'จอง : ' + this.selectedhoues + ' ชั่วโมง <br><br>' + 
          'ตั้งแต่เวลา : ' + timestart + 
          ' น. ถึงเวลา ' 
          + parseFloat(time,10).toFixed(2)
          + ' น. <br><br> ค่าบริการ : ' + parseFloat(this.selectedhoues, 10)*10 + ' บาท ' ,
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'ยืนยัน',
          cancelButtonText: 'ยกเลิก',
          showCloseButton: true,
          showLoaderOnConfirm: true,
          }).then((result) => {
            if(result.value) {
            this.commitReser ()
            this.reportday()
            this.reportmonth()
            this.reportyear()
            this.$swal('ยืนยัน', 'ได้ยืนยันการจองลานจอดรถ :' + this.selectparking , 'success' )
            this.isResave = false
            this.isImageModalActive = false
          } else {
            this.$swal('ยกเลิก', 'คุณได้ยกเลิกการจองลานจอดรถ', 'info')
          }
        })
          }
        }
      }
      },
      commitReser () {
        var timestart = parseFloat(this.selectedtime,10).toFixed(0) + ':' + this.selectedminit
        var time = parseFloat(timestart,10) + parseFloat(this.selectedhoues, 10)
        var timeEnd = time + ':' + this.selectedminit
      for (var variable in this.showuser) {
        if (this.showuser[variable].id === this.id) {
          var id = this.id
          var name = this.name
          var credit = parseFloat(this.selectedhoues, 10)*10
          var result = (parseFloat(this.selectedtime, 10) + parseFloat(this.selectedhoues, 10)).toFixed(2)
          var resultcredit = this.showuser[variable].money - credit
          var hours = parseFloat(this.selectedhoues, 10).toFixed(2)
          let tmp = {
            money:credit,
            name: name,
            park: this.selectparking,
            hours: hours,
            start: timestart,
            End: timeEnd,
            time : this.todayhous,
            date : this.todaydate,
            Day : this.todayDay,
            Month : this.todayMont,
            Year : this.todayYear,
            Nummonth : this.todaynummonth,
            status_in: 'Wait',
            status_out: 'Wait',
            numpark: this.index
          }
          var moenyset = parseFloat(this.selectedhoues, 10)*10
          console.log(moenyset)
          if(this.usershow[variable].money < moenyset){
            alert("No money")
            this.$router.replace('/admin/user')
          }else{
            for (var apark in this.showpark1) {
            var countnum = parseFloat(this.showpark1[apark].count, 10)
            if (this.showpark1[apark].name === this.selectparking && this.showpark1[apark].count <= this.showpark1[apark].Total-1){
              console.log("true")
              var count = parseFloat(1, 10)
            firebase.database().ref('Park').child(apark).update({
            count: countnum+1
        })
        for(var parker in this.showpark1){
            if(this.showpark1[parker].name === this.selectparking){
              console.log("เข้าทำ loop 703")
              // console.log(this.showpark1[parker][this.selectparking][this.index].countsub)
              // var countsubput = this.showpark1[parker][this.selectparking][this.index].countsub
              // this.showpark1[parker]
              firebase.database().ref('Park').child(parker).child(this.selectparking).push(tmp)
              // firebase.database().ref('Park').child(parker).child(this.selectparking).child(this.index).update({
              //   timelast:parseFloat(time,10).toFixed(2),
              //   timestart:parseFloat(timestart,10).toFixed(2),
              //   timeminit:parseFloat(this.selectedminit,10)
              //   ,countsub:countsubput+1
              // })
              firebase.database().ref('Parksubmit').child(id).push(tmp)
            }
            }
          firebase.database().ref('/users/').child(variable).update({
            money: resultcredit,
            status_in: 'On',
            status_submit : 'Off'
          })
          firebase.database().ref('/money/').child(variable).update({
            money: resultcredit
          })
          this.isSubmit = false
      }
      if(this.showpark1[apark].name === this.selectparking && this.showpark1[apark].count >= this.showpark1[apark].Total){
        firebase.database().ref('Park').child(apark).update({
            status: 'Off'
        })
        alert("Park Full")
      }
    }
          }
        }
      }
      this.pullData()
    },
     reportday() {
      let foundday = ''
      let day = moment().tz('Asia/Bangkok').format().slice(0, 10)
      var timestart = parseFloat(this.selectedtime,10).toFixed(0) + ':' + this.selectedminit
        var time = parseFloat(timestart,10) + parseFloat(this.selectedhoues, 10)
        var timeEnd = time + ':00'
      for (var variable in this.showuser) {
        if (this.showuser[variable].id === this.id) {
          var id = this.id
          var name = this.name
          var credit = parseFloat(this.selectedhoues, 10)*10
          var result = (parseFloat(this.selectedtime, 10) + parseFloat(this.selectedhoues, 10)).toFixed(2)
          var resultcredit = this.showuser[variable].money - credit
          var hours = parseFloat(this.selectedhoues, 10).toFixed(2)
        }
      }
      console.log(reportmoneyRef.child('report').child(this.selectparking).child('day').orderByChild('label').equalTo(day))
      const reportday = reportmoneyRef.child('report').child(this.selectparking).child('day').orderByChild('label').equalTo(day)
      reportday.on('child_added', snap => {
        foundday = snap.val()
      })
      if (foundday === '') {
        console.log("สร้างวันใหม่")
        let data = {
          label: day,
          value: credit
        }
        reportmoneyRef.child('report').child(this.selectparking).child('day').child(day).set(data)
        reportmoneyRef.child('detail').child(this.selectparking).child('countdoing').set(1)
      } else {
        console.log("เงินรวมคาบบ")
        let updatavalue = foundday.value + credit
        reportmoneyRef.child('report').child(this.selectparking).child('day').child(day).child('value').set(updatavalue)
      }
    },
    reportmonth () {
      let foundmonth = ''
      let month  = moment().tz('Asia/Bangkok').format().slice(0, 10)
      var timestart = parseFloat(this.selectedtime,10).toFixed(0) + '.' + this.selectedminit
        var time = parseFloat(timestart,10) + parseFloat(this.selectedhoues, 10)
        var timeEnd = parseFloat(time,10).toFixed(2)
      for (var variable in this.showuser) {
        if (this.showuser[variable].id === this.id) {
          var id = this.id
          var name = this.name
          var credit = parseFloat(this.selectedhoues, 10)*10
          var result = (parseFloat(this.selectedtime, 10) + parseFloat(this.selectedhoues, 10)).toFixed(2)
          var resultcredit = this.showuser[variable].money - credit
          var hours = parseFloat(this.selectedhoues, 10).toFixed(2)
        }
      }
      const reportmonth = reportmoneyRef.child('report').child(this.selectparking).child('month').orderByChild('label').equalTo(month)
      reportmonth.on('child_added', snap => {
        foundmonth = snap.val()
      })
      console.log(reportmoneyRef)
      if (foundmonth === '') {
        console.log("เงินสร้างใหม่เดือน")
        let data = {
          label: month,
          value: credit
        }
        reportmoneyRef.child('report').child(this.selectparking).child('month').child(month).set(data)
      } else {
        console.log("เงินรวมเดือนครับ")
        let updatavalue = foundmonth.value + credit
        reportmoneyRef.child('report').child(this.selectparking).child('month').child(month).child('value').set(updatavalue)
      }
    },
    reportyear () {
      let foundyear = ''
      let year = moment().tz('Asia/Bangkok').format().slice(0, 4)
      var timestart = parseFloat(this.selectedtime,10).toFixed(0) + '.' + this.selectedminit
        var time = parseFloat(timestart,10) + parseFloat(this.selectedhoues, 10)
        var timeEnd = parseFloat(time,10).toFixed(2)
      for (var variable in this.showuser) {
        if (this.showuser[variable].id === this.id) {
          var id = this.id
          var name = this.name
          var credit = parseFloat(this.selectedhoues, 10)*10
          var result = (parseFloat(this.selectedtime, 10) + parseFloat(this.selectedhoues, 10)).toFixed(2)
          var resultcredit = this.showuser[variable].money - credit
          var hours = parseFloat(this.selectedhoues, 10).toFixed(2)
        }
      }
      const reportyear = reportmoneyRef.child('report').child(this.selectparking).child('year').orderByChild('label').equalTo(year)
      reportyear.on('child_added', snap => {
        foundyear = snap.val()
      })
      console.log(reportmoneyRef)
      if (foundyear === '') {
        console.log("เงินสร้างใหม่เดือน")
        let data = {
          label: year,
          value: credit
        }
        reportmoneyRef.child('report').child(this.selectparking).child('year').child(year).set(data)
      } else {
        console.log("เงินรวมเดือนครับ")
        let updatavalue = foundyear.value + credit
        reportmoneyRef.child('report').child(this.selectparking).child('year').child(year).child('value').set(updatavalue)
      }
    }
  }
}
  </script>
  <style>
  
  </style>
  