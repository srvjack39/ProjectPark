<template>
  <div class="content">
    <div class="container-fluid" >
      <div class="row" >
        <div class="col-xl-6 col-md-6" v-for="park in showpark" v-if="park.status == 'On'">
          <stats-card >
            <div slot="header" class="icon-info">
              <i class="nc-icon nc-check-2 text-success"></i>
            </div>
            <div slot="content">
              <h3 class="card-title" >{{ park.name }}</h3>
              <h8 class="card-title" style="color:green;"><i class="fas fa-check-circle" style="color:green;"></i> :  {{ park.count }}/{{ park.Total }}</h8 ><br>
              <h8 class="card-title" style="color:green;"><i class="fas fa-car" style="color:green;"></i> : {{ park.carin }}/{{ park.Total }}</h8><br>
              <div v-for="parks in park[todayDay]" > <i class="fas fa-parking"></i> <i class="fas fa-car"></i> : {{ parks.carall }}  คัน </div>
            </div>
            <div slot="footer" >
              <i class="fa fa-refreshis-center"></i>
                <p>{{ todayDate }}</p>
                <a class="btn " :href="'https://www.google.com/maps/@'+ park.long +','+park.la + ',' + park.zoommap">เส้นทาง </a>
                  <button class="btn"
                  @click="resev(park.name,park.Total)">
                  จอง
                  </button>
            </div>
          </stats-card>
          <div class="col-12">
            <b-modal :active.sync="isImageModalActive">
              <br>
              <center><div><h3>จองที่จอดรถ {{ parkname  }}</h3></div></center>
              <div v-for="(s,key,index) in showpark" >
                <table v-for="(n,index) in s.Total" v-if="s.name === parkname">
                  <tr>
                    <center><td><a class="btn is-success" @click="isResaver(index+1,key,index)" >จองที่จอดรถที่ {{index+1 }} <br>
                    </a></td></center>
                  </tr>
                </table>
              </div>
              <br>
          </b-modal>
          <b-modal :active.sync="isResave">
              <br>
              <center><div><h3>จองที่จอดรถ {{ parkname }}</h3></div></center>
              <div>
                <div class="container-fluid">
                  <div class="row">
                  </div>
                <div class="row">
                    <div class="col-md-38">
                        <p>เลือกเวลาเข้าจอดรถ </p>
                    </div>
                </div>
                <div class="row">
                  <div class="col-md-4">
                    <select class="form-control " v-model="selectedtime">
                      <option :value="null" >-- เลือกเวลา -- </option>
                      <option value="0" v-if="parseFloat(todayhous,10).toFixed(0)+ '.' + parseFloat(todayminit,10).toFixed(0)  <= 0.00 || 
                      parseFloat(todayhous,10).toFixed(0)+ '.' + parseFloat(todayminit,10).toFixed(0) < 0.59">0</option>
                      <option value="1" v-if="parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit < 1.59">1 </option>
                      <option value="2" v-if="parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit < 2.59">2 </option>            
                      <option value="3" v-if="parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit < 3.59">3 </option>            
                      <option value="4" v-if="parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit < 4.59">4 </option>            
                      <option value="5" v-if="parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit < 5.59">5 </option>            
                      <option value="6" v-if="parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit < 6.59">6 </option>            
                      <option value="7" v-if="parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit < 7.59">7 </option>
                      <option value="8" v-if="parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit < 8.59">8 </option>
                      <option value="9" v-if="parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit < 9.59">9 </option>
                      <option value="10" v-if="parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit < 10.59">10 </option>
                      <option value="11" v-if="parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit < 11.59">11 </option>
                      <option value="12" v-if="parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit < 12.59">12 </option>
                      <option value="13" v-if="parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit < 13.59">13 </option>
                      <option value="14" v-if="parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit < 14.59">14 </option>
                      <option value="15" v-if="parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit < 15.59">15 </option>
                      <option value="16" v-if="parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit < 16.59">16 </option>
                      <option value="17" v-if="parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit < 17.59">17 </option>
                      <option value="18" v-if="parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit < 18.59">18 </option>
                      <option value="19" v-if="parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit < 19.59">19 </option>
                      <option value="20" v-if="parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit < 20.59">20 </option>
                      <option value="21" v-if="parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit < 21.59">21 </option>
                      <option value="22" v-if="parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit < 22.59">22 </option>
                      <option value="23" v-if="parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit < 22.59">23 </option>
                    </select>
                    </div>
                    <div class="col-md-4">
                        <select class="form-control " v-model="selectedminit">
                            <option :value="null" disabled> -- นาที -- </option>
                            <option value="00" v-if="selectedtime == 5 &&
                            parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit < 5.05"> 00 น. </option>
                            <option value="05" v-if="selectedtime == 5 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 5.05 ">05 น. </option>
                            <option value="10" v-if="selectedtime == 5 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 5.10 ">10 น. </option>
                            <option value="15" v-if="selectedtime == 5 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit <  5.15 ">15 น.</option>
                            <option value="20" v-if="selectedtime == 5 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 5.20 ">20 น.</option>
                            <option value="25" v-if="selectedtime == 5 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 5.25">25 น.</option>
                            <option value="30" v-if="selectedtime == 5 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 5.30 ">30 น. </option>
                            <option value="35" v-if="selectedtime == 5 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 5.35">35 น.</option>
                            <option value="40" v-if="selectedtime == 5 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 5.40 ">40 น.</option>
                            <option value="45" v-if="selectedtime == 5 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 5.45 ">45 น.</option>
                            <option value="50" v-if="selectedtime == 5 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 5.50">50 น.</option>
                            <option value="55" v-if="selectedtime == 5 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 5.55">55 น.</option>
          
                            <option value="00" v-if="selectedtime == 6 &&
                            parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit < 6.05"> 00 น. </option>
                            <option value="05" v-if="selectedtime == 6 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 6.05 ">05 น. </option>
                            <option value="10" v-if="selectedtime == 6 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 6.10 ">10 น. </option>
                            <option value="15" v-if="selectedtime == 6 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit <  6.15 ">15 น.</option>
                            <option value="20" v-if="selectedtime == 6 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 6.20 ">20 น.</option>
                            <option value="25" v-if="selectedtime == 6 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 6.25">25 น.</option>
                            <option value="30" v-if="selectedtime == 6 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 6.30 ">30 น. </option>
                            <option value="35" v-if="selectedtime == 6 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 6.35">35 น.</option>
                            <option value="40" v-if="selectedtime == 6 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 6.40 ">40 น.</option>
                            <option value="45" v-if="selectedtime == 6 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 6.45 ">45 น.</option>
                            <option value="50" v-if="selectedtime == 6 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 6.50">50 น.</option>
                            <option value="55" v-if="selectedtime == 6 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 6.55">55 น.</option>
          
                            <option value="00" v-if="selectedtime == 7 &&
                            parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit < 7.05"> 00 น. </option>                  
                        <option value="05" v-if="selectedtime == 7 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 7.05 ">05 น. </option>
                        <option value="10" v-if="selectedtime == 7 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 7.10 ">10 น. </option>
                        <option value="15" v-if="selectedtime == 7 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit <  7.15 ">15 น.</option>
                        <option value="20" v-if="selectedtime == 7 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 7.20 ">20 น.</option>
                        <option value="25" v-if="selectedtime == 7 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 7.25">25 น.</option>
                        <option value="30" v-if="selectedtime == 7 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 7.30 ">30 น. </option>
                        <option value="35" v-if="selectedtime == 7 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 7.35">35 น.</option>
                        <option value="40" v-if="selectedtime == 7 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 7.40 ">40 น.</option>
                        <option value="45" v-if="selectedtime == 7 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 7.45 ">45 น.</option>
                        <option value="50" v-if="selectedtime == 7 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 7.50">50 น.</option>
                        <option value="55" v-if="selectedtime == 7 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 7.55">55 น.</option>
          
                        <option value="00" v-if="selectedtime == 8 &&
                        parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit < 8.05"> 00 น. </option>      
                        <option value="05" v-if="selectedtime == 8 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 8.05 ">05 น. </option>
                            <option value="10" v-if="selectedtime == 8 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 8.10 ">10 น. </option>
                            <option value="15" v-if="selectedtime == 8 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit <  8.15 ">15 น.</option>
                            <option value="20" v-if="selectedtime == 8 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 8.20 ">20 น.</option>
                            <option value="25" v-if="selectedtime == 8 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 8.25">25 น.</option>
                            <option value="30" v-if="selectedtime == 8 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 8.30 ">30 น. </option>
                            <option value="35" v-if="selectedtime == 8 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 8.35">35 น.</option>
                            <option value="40" v-if="selectedtime == 8 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 8.40 ">40 น.</option>
                            <option value="45" v-if="selectedtime == 8 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 8.45 ">45 น.</option>
                            <option value="50" v-if="selectedtime == 8 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 8.50">50 น.</option>
                            <option value="55" v-if="selectedtime == 8 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 8.55">55 น.</option>
          
                            
                        <option value="00" v-if="selectedtime == 9 &&
                        parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit < 9.05"> 00 น. </option>  
                            <option value="05" v-if="selectedtime == 9 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 9.05 ">05 น. </option>
                            <option value="10" v-if="selectedtime == 9 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 9.10 ">10 น. </option>
                            <option value="15" v-if="selectedtime == 9 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit <  9.15 ">15 น.</option>
                            <option value="20" v-if="selectedtime == 9 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 9.20 ">20 น.</option>
                            <option value="25" v-if="selectedtime == 9 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 9.25">25 น.</option>
                            <option value="30" v-if="selectedtime == 9 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 9.30 ">30 น. </option>
                            <option value="35" v-if="selectedtime == 9 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 9.35">35 น.</option>
                            <option value="40" v-if="selectedtime == 9 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 9.40 ">40 น.</option>
                            <option value="45" v-if="selectedtime == 9 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 9.45 ">45 น.</option>
                            <option value="50" v-if="selectedtime == 9 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 9.50">50 น.</option>
                            <option value="55" v-if="selectedtime == 9 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 9.55">55 น.</option>
          
                        <option value="00" v-if="selectedtime == 10 &&
                        parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit < 10.05"> 00 น. </option>  
                        <option value="05" v-if="selectedtime == 10 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 10.05 ">05 น. </option>
                        <option value="10" v-if="selectedtime == 10 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 10.10 ">10 น. </option>
                        <option value="15" v-if="selectedtime == 10 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit <  10.15 ">15 น.</option>
                        <option value="20" v-if="selectedtime == 10 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 10.20 ">20 น.</option>
                        <option value="25" v-if="selectedtime == 10 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 10.25">25 น.</option>
                        <option value="30" v-if="selectedtime == 10 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 10.30 ">30 น. </option>
                        <option value="35" v-if="selectedtime == 10 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 10.35">35 น.</option>
                        <option value="40" v-if="selectedtime == 10 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 10.40 ">40 น.</option>
                        <option value="45" v-if="selectedtime == 10 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 10.45 ">45 น.</option>
                        <option value="50" v-if="selectedtime == 10 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 10.50">50 น.</option>
                        <option value="55" v-if="selectedtime == 10 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 10.55">55 น.</option>
          
                        
                        <option value="00" v-if="selectedtime == 11 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit < 11.05"> 00 น. </option>
                        <option value="05" v-if="selectedtime == 11 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 11.05 ">05 น. </option>
                        <option value="10" v-if="selectedtime == 11 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 11.10 ">10 น. </option>
                        <option value="15" v-if="selectedtime == 11 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit <  11.15 ">15 น.</option>
                        <option value="20" v-if="selectedtime == 11 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 11.20 ">20 น.</option>
                        <option value="25" v-if="selectedtime == 11 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 11.25">25 น.</option>
                        <option value="30" v-if="selectedtime == 11 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 11.30 ">30 น. </option>
                        <option value="35" v-if="selectedtime == 11 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 11.35">35 น.</option>
                        <option value="40" v-if="selectedtime == 11 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 11.40 ">40 น.</option>
                        <option value="45" v-if="selectedtime == 11 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 11.45 ">45 น.</option>
                        <option value="50" v-if="selectedtime == 11 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 11.50">50 น.</option>
                        <option value="55" v-if="selectedtime == 11 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 11.55">55 น.</option>
          
                        <option value="00" v-if="selectedtime == 12 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit < 12.05"> 00 น. </option>
                        <option value="05" v-if="selectedtime == 12 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 12.05 ">05 น. </option>
                        <option value="10" v-if="selectedtime == 12 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 12.10 ">10 น. </option>
                        <option value="15" v-if="selectedtime == 12 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit <  12.15 ">15 น.</option>
                        <option value="20" v-if="selectedtime == 12 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 12.20 ">20 น.</option>
                        <option value="25" v-if="selectedtime == 12 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 12.25">25 น.</option>
                        <option value="30" v-if="selectedtime == 12 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 12.30 ">30 น. </option>
                        <option value="35" v-if="selectedtime == 12 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 12.35">35 น.</option>
                        <option value="40" v-if="selectedtime == 12 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 12.40 ">40 น.</option>
                        <option value="45" v-if="selectedtime == 12 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 12.45 ">45 น.</option>
                        <option value="50" v-if="selectedtime == 12 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 12.50">50 น.</option>
                        <option value="55" v-if="selectedtime == 12 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 12.55">55 น.</option>
          
                        <option value="00" v-if="selectedtime == 13 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit < 13.05"> 00 น. </option>
                        <option value="05" v-if="selectedtime == 13 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 13.05 ">05 น. </option>
                        <option value="10" v-if="selectedtime == 13 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 13.10 ">10 น. </option>
                        <option value="15" v-if="selectedtime == 13 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit <  13.15 ">15 น.</option>
                        <option value="20" v-if="selectedtime == 13 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 13.20 ">20 น.</option>
                        <option value="25" v-if="selectedtime == 13 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 13.25">25 น.</option>
                        <option value="30" v-if="selectedtime == 13 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 13.30 ">30 น. </option>
                        <option value="35" v-if="selectedtime == 13 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 13.35">35 น.</option>
                        <option value="40" v-if="selectedtime == 13 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 13.40 ">40 น.</option>
                        <option value="45" v-if="selectedtime == 13 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 13.45 ">45 น.</option>
                        <option value="50" v-if="selectedtime == 13 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 13.50">50 น.</option>
                        <option value="55" v-if="selectedtime == 13 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 13.55">55 น.</option>
          
                        <option value="00" v-if="selectedtime == 14 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit < 14.05"> 00 น. </option>
                        <option value="05" v-if="selectedtime == 14 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 14.05 ">05 น. </option>
                        <option value="10" v-if="selectedtime == 14 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 14.10 ">10 น. </option>
                        <option value="15" v-if="selectedtime == 14 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit <  14.15 ">15 น.</option>
                        <option value="20" v-if="selectedtime == 14 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 14.20 ">20 น.</option>
                        <option value="25" v-if="selectedtime == 14 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 14.25">25 น.</option>
                        <option value="30" v-if="selectedtime == 14 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 14.30 ">30 น. </option>
                        <option value="35" v-if="selectedtime == 14 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 14.35">35 น.</option>
                        <option value="40" v-if="selectedtime == 14 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 14.40 ">40 น.</option>
                        <option value="45" v-if="selectedtime == 14 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 14.45 ">45 น.</option>
                        <option value="50" v-if="selectedtime == 14 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 14.50">50 น.</option>
                        <option value="55" v-if="selectedtime == 14 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 14.55">55 น.</option>
          
                            <option value="00" v-if="selectedtime == 15 &&
                                parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit < 15.05"> 00 น. </option>
                            <option value="05" v-if="selectedtime == 15 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 15.05 ">05 น. </option>
                            <option value="10" v-if="selectedtime == 15 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 15.10 ">10 น. </option>
                            <option value="15" v-if="selectedtime == 15 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit <  15.15 ">15 น.</option>
                            <option value="20" v-if="selectedtime == 15 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 15.20 ">20 น.</option>
                            <option value="25" v-if="selectedtime == 15 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 15.25">25 น.</option>
                            <option value="30" v-if="selectedtime == 15 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 15.30 ">30 น. </option>
                            <option value="35" v-if="selectedtime == 15 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 15.35">35 น.</option>
                            <option value="40" v-if="selectedtime == 15 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 15.40 ">40 น.</option>
                            <option value="45" v-if="selectedtime == 15 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 15.45 ">45 น.</option>
                            <option value="50" v-if="selectedtime == 15 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 15.50">50 น.</option>
                            <option value="55" v-if="selectedtime == 15 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 15.55">55 น.</option>
          
                            <option value="00" v-if="selectedtime == 16 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit < 16.05"> 00 น. </option>
                            <option value="05" v-if="selectedtime == 16 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 16.05 ">05 น. </option>
                            <option value="10" v-if="selectedtime == 16 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 16.10 ">10 น. </option>
                            <option value="15" v-if="selectedtime == 16 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit <  16.15 ">15 น.</option>
                            <option value="20" v-if="selectedtime == 16 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 16.20 ">20 น.</option>
                            <option value="25" v-if="selectedtime == 16 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 16.25">25 น.</option>
                            <option value="30" v-if="selectedtime == 16 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 16.30 ">30 น. </option>
                            <option value="35" v-if="selectedtime == 16 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 16.35">35 น.</option>
                            <option value="40" v-if="selectedtime == 16 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 16.40 ">40 น.</option>
                            <option value="45" v-if="selectedtime == 16 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 16.45 ">45 น.</option>
                            <option value="50" v-if="selectedtime == 16 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 16.50">50 น.</option>
                            <option value="55" v-if="selectedtime == 16 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 16.55">55 น.</option>
          
                            <option value="00" v-if="selectedtime == 17 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit < 17.05"> 00 น. </option>
                            <option value="05" v-if="selectedtime == 17 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 17.05 ">05 น. </option>
                            <option value="10" v-if="selectedtime == 17 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 17.10 ">10 น. </option>
                            <option value="15" v-if="selectedtime == 17 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit <  17.15 ">15 น.</option>
                            <option value="20" v-if="selectedtime == 17 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 17.20 ">20 น.</option>
                            <option value="25" v-if="selectedtime == 17 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 17.25">25 น.</option>
                            <option value="30" v-if="selectedtime == 17 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 17.30 ">30 น. </option>
                            <option value="35" v-if="selectedtime == 17 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 17.35">35 น.</option>
                            <option value="40" v-if="selectedtime == 17 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 17.40 ">40 น.</option>
                            <option value="45" v-if="selectedtime == 17 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 17.45 ">45 น.</option>
                            <option value="50" v-if="selectedtime == 17 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 17.50">50 น.</option>
                            <option value="55" v-if="selectedtime == 17 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 17.55">55 น.</option>
          
                            <option value="00" v-if="selectedtime == 18 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit < 18.05"> 00 น. </option>
                            <option value="05" v-if="selectedtime == 18 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 18.05 ">05 น. </option>
                            <option value="10" v-if="selectedtime == 18 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 18.10 ">10 น. </option>
                            <option value="15" v-if="selectedtime == 18 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit <  18.15 ">15 น.</option>
                            <option value="20" v-if="selectedtime == 18 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 18.20 ">20 น.</option>
                            <option value="25" v-if="selectedtime == 18 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 18.25">25 น.</option>
                            <option value="30" v-if="selectedtime == 18 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 18.30 ">30 น. </option>
                            <option value="35" v-if="selectedtime == 18 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 18.35">35 น.</option>
                            <option value="40" v-if="selectedtime == 18 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 18.40 ">40 น.</option>
                            <option value="45" v-if="selectedtime == 18 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 18.45 ">45 น.</option>
                            <option value="50" v-if="selectedtime == 18 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 18.50">50 น.</option>
                            <option value="55" v-if="selectedtime == 18 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 18.55">55 น.</option>
          
                            <option value="00" v-if="selectedtime == 19 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit < 19.05"> 00 น. </option>
                            <option value="05" v-if="selectedtime == 19 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 19.05 ">05 น. </option>
                            <option value="10" v-if="selectedtime == 19 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 19.10 ">10 น. </option>
                            <option value="15" v-if="selectedtime == 19 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit <  19.15 ">15 น.</option>
                            <option value="20" v-if="selectedtime == 19 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 19.20 ">20 น.</option>
                            <option value="25" v-if="selectedtime == 19 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 19.25">25 น.</option>
                            <option value="30" v-if="selectedtime == 19 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 19.30 ">30 น. </option>
                            <option value="35" v-if="selectedtime == 19 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 19.35">35 น.</option>
                            <option value="40" v-if="selectedtime == 19 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 19.40 ">40 น.</option>
                            <option value="45" v-if="selectedtime == 19 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 19.45 ">45 น.</option>
                            <option value="50" v-if="selectedtime == 19 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 19.50">50 น.</option>
                            <option value="55" v-if="selectedtime == 19 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 19.55">55 น.</option>
          
                            <option value="00" v-if="selectedtime == 20 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit < 20.05"> 00 น. </option>
                            <option value="05" v-if="selectedtime == 20 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 20.05 ">05 น. </option>
                            <option value="10" v-if="selectedtime == 20 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 20.10 ">10 น. </option>
                            <option value="15" v-if="selectedtime == 20 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit <  20.15 ">15 น.</option>
                            <option value="20" v-if="selectedtime == 20 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 20.20 ">20 น.</option>
                            <option value="25" v-if="selectedtime == 20 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 20.25">25 น.</option>
                            <option value="30" v-if="selectedtime == 20 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 20.30 ">30 น. </option>
                            <option value="35" v-if="selectedtime == 20 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 20.35">35 น.</option>
                            <option value="40" v-if="selectedtime == 20 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 20.40 ">40 น.</option>
                            <option value="45" v-if="selectedtime == 20 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 20.45 ">45 น.</option>
                            <option value="50" v-if="selectedtime == 20 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 20.50">50 น.</option>
                            <option value="55" v-if="selectedtime == 20 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 20.55">55 น.</option>
          
                            <option value="00" v-if="selectedtime == 21 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit < 21.05"> 00 น. </option>
                            <option value="05" v-if="selectedtime == 21 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 21.05 ">05 น. </option>
                            <option value="10" v-if="selectedtime == 21 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 21.10 ">10 น. </option>
                            <option value="15" v-if="selectedtime == 21 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit <  21.15 ">15 น.</option>
                            <option value="20" v-if="selectedtime == 21 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 21.20 ">20 น.</option>
                            <option value="25" v-if="selectedtime == 21 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 21.25">25 น.</option>
                            <option value="30" v-if="selectedtime == 21 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 21.30 ">30 น. </option>
                            <option value="35" v-if="selectedtime == 21 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 21.35">35 น.</option>
                            <option value="40" v-if="selectedtime == 21 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 21.40 ">40 น.</option>
                            <option value="45" v-if="selectedtime == 21 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 21.45 ">45 น.</option>
                            <option value="50" v-if="selectedtime == 21 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 21.50">50 น.</option>
                            <option value="55" v-if="selectedtime == 21 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 21.55">55 น.</option>
          
                            <option value="00" v-if="selectedtime == 22 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit < 22.05"> 00 น. </option>
                            <option value="05" v-if="selectedtime == 22 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 22.05 ">05 น. </option>
                            <option value="10" v-if="selectedtime == 22 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 22.10 ">10 น. </option>
                            <option value="15" v-if="selectedtime == 22 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit <  22.15 ">15 น.</option>
                            <option value="20" v-if="selectedtime == 22 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 22.20 ">20 น.</option>
                            <option value="25" v-if="selectedtime == 22 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 22.25">25 น.</option>
                            <option value="30" v-if="selectedtime == 22 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 22.30 ">30 น. </option>
                            <option value="35" v-if="selectedtime == 22 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 22.35">35 น.</option>
                            <option value="40" v-if="selectedtime == 22 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 22.40 ">40 น.</option>
                            <option value="45" v-if="selectedtime == 22 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 22.45 ">45 น.</option>
                            <option value="50" v-if="selectedtime == 22 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 22.50">50 น.</option>
                            <option value="55" v-if="selectedtime == 22 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 22.55">55 น.</option>
          
                            <option value="00" v-if="selectedtime == 23 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit < 23.05"> 00 น. </option>
                            <option value="05" v-if="selectedtime == 23 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 23.05 ">05 น. </option>
                            <option value="10" v-if="selectedtime == 23 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 23.10 ">10 น. </option>
                            <option value="15" v-if="selectedtime == 23 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit <  23.15 ">15 น.</option>
                            <option value="20" v-if="selectedtime == 23 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 23.20 ">20 น.</option>
                            <option value="25" v-if="selectedtime == 23 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 23.25">25 น.</option>
                            <option value="30" v-if="selectedtime == 23 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 23.30 ">30 น. </option>
                            <option value="35" v-if="selectedtime == 23 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 23.35">35 น.</option>
                            <option value="40" v-if="selectedtime == 23 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 23.40 ">40 น.</option>
                            <option value="45" v-if="selectedtime == 23 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 23.45 ">45 น.</option>
                            <option value="50" v-if="selectedtime == 23 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 23.50">50 น.</option>
                            <option value="55" v-if="selectedtime == 23 && parseFloat(todayhous,10).toFixed(0)+ '.' + todayminit  < 23.55">55 น.</option>
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
                              <option value="null" disabled>-- เลือกจำนวนชั่วโมง -- </option>
                              <!-- <option value="0.30" v-if="(23.60-todayhous) > 0.30">30 นาที</option> -->
                              <option value="1" v-if="(23.60-todayhous) > 1.00">1 ชั่วโมง</option>
                              <option value="2" v-if="(23.60-todayhous) > 2.00">2 ชั่วโมง</option>
                              <option value="3" v-if="(23.60-todayhous) > 3.00">3 ชั่วโมง</option>
                              <option value="5" v-if="(23.60-todayhous) > 5.00">5 ชั่วโมง</option>
                              <option value="8" v-if="(23.60-todayhous) > 8.00">8 ชั่วโมง</option>
                              <option value="12" v-if="(23.60-todayhous) > 12.00">12 ชั่วโมง</option>
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
      </div>
        </div>

        <div class="col-xl-6 col-md-6" v-for="park in showpark" v-if="park.status == 'Off'">
          <stats-card>
            <div slot="header" class="icon-info">
              <i class="nc-icon nc-simple-remove text-danger"></i>
            </div>
            <div slot="content">
              <p class="card-category">{{ park.name }} </p>
              <h8 class="card-title" style="color:red;"><i class="fas fa-check-circle" style="color:red;"></i> :  {{ park.count }}/{{ park.Total }}</h8 ><br>
              <h8 class="card-title" style="color:red;"><i class="fas fa-car" style="color:red;"></i> : {{ park.carin }}/{{ park.Total }}</h8><br>
              <!-- <div v-for="parks in park[todayDay]" style="color:blue;"> <i class="fas fa-parking"></i> <i class="fas fa-car"></i> : {{ parks.carall }}  คัน </div> -->
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
        showpark:'',
        todayhous: moment().format('HH:mm'),
        // todayDate: moment().format('D MMMM  YYYY'),
        todayDay: moment().format('D'),
        todayMont: moment().format('MMMM'),
        todayYear: moment().format('YYYY'),
        todaydate: moment().format('dddd'),
        todaynummonth: moment().format('MM'),
        carins:'',
        isImageModalActive: false,
        parkname:'',
        isResave:false,
        selectedlan:null,
        creditD:'',
        optionslan: [],
        selectedhoues: null,  
        selectedtime: null,
        selectedminit: null,
        optionstime: [],
        isSubmit: false,
        credit:'',
        todayminit: moment().format('mm'),
        todayhous: moment().format('HH.mm'),
        // todayDate: moment().format('D MMMM  YYYY'),
        todayDay: moment().format('D'),
        todayMont: moment().format('MMMM'),
        todayYear: moment().format('YYYY'),
        todaydate: moment().format('dddd'),
        todaynummonth: moment().format('MM')
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
    const dbMonth = firebase.database().ref().child('/Months/'+this.todayDay)
    const dbcarall = firebase.database().ref().child('/Carall/')
    const dbusers = firebase.database().ref().child('/users/')
    dbcarall.on('value', snap => {
      this.carall = snap.val()
    }),
    dbRefObject.on('value', snap => {
      this.showpark = snap.val()
    }),
    dbMonth.on('value', snap => {
      this.showcarin = snap.val()
    }),
    dbusers.on('value', snap => {
      this.usershow = snap.val()
    }), 
    dbRefimage.on('value', snap => {
      this.showimage = snap.val()
    }) //ฟังชั่น ดึงข้อมูลใน Firebasee โดยดึงข้อมูลจที่จอดรถและการเติมเงิน
    for(var caralls in this.carall) {
      this.caralle = this.carall[caralls]
      console.log(this.caralle)
    }
    this.daydat = this.todaydate+this.todayDay
  },
  methods: {
    pullData: function () {
      let that = this
      firebase.database().ref('/users/').once('value').then(function (snapshot) {
            that.showuser = snapshot.val()
      })
      firebase.database().ref('Park').once('value').then(function (snapshot) {
            that.showpark1 = snapshot.val()
      })
    },
    updateCurrentTime() {
      this.currentTime = moment().format('LTS');
    },
    created() {
   this.currentTime = moment().format('LTS');
   setInterval(() => this.updateCurrentTime(), 1 * 1000);
 } //ฟังชั่นดึงเวลาปัจจุปันตามเวลาของประเทศไทย  
 ,
 resev(parkname,parktotal) {
  console.log(parkname)
  this.parkname = parkname
  this.parktotal = parktotal
  this.isImageModalActive = true
 },
 isResaver(key,num,index){
   this.isResave = true
   this.num = num
   this.index = index
   for(var s in this.showpark){
     if(s == num)
      console.log(num)
   }
 },
 reportday() {
      let foundday = ''
      let day = moment().tz('Asia/Bangkok').format().slice(0, 10)
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
      const reportday = reportmoneyRef.child('report').child(this.selectedlan).child('day').orderByChild('label').equalTo(day)
      reportday.on('child_added', snap => {
        foundday = snap.val()
      })
      console.log(reportmoneyRef)
      if (foundday === '') {
        console.log("สร้างวันใหม่")
        let data = {
          label: day,
          value: credit
        }
        reportmoneyRef.child('report').child(this.selectedlan).child('day').child(day).set(data)
        reportmoneyRef.child('detail').child(this.selectedlan).child('countdoing').set(1)
      } else {
        console.log("เงินรวมคาบบ")
        let updatavalue = foundday.value + credit
        reportmoneyRef.child('report').child(this.selectedlan).child('day').child(day).child('value').set(updatavalue)
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
      const reportmonth = reportmoneyRef.child('report').child(this.selectedlan).child('month').orderByChild('label').equalTo(month)
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
        reportmoneyRef.child('report').child(this.selectedlan).child('month').child(month).set(data)
      } else {
        console.log("เงินรวมเดือนครับ")
        let updatavalue = foundmonth.value + credit
        reportmoneyRef.child('report').child(this.selectedlan).child('month').child(month).child('value').set(updatavalue)
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
      const reportyear = reportmoneyRef.child('report').child(this.selectedlan).child('year').orderByChild('label').equalTo(year)
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
        reportmoneyRef.child('report').child(this.selectedlan).child('year').child(year).set(data)
      } else {
        console.log("เงินรวมเดือนครับ")
        let updatavalue = foundyear.value + credit
        reportmoneyRef.child('report').child(this.selectedlan).child('year').child(year).child('value').set(updatavalue)
      }
    },
    isalertSubmit() {
        var timestart = parseFloat(this.selectedtime,10).toFixed(0) + '.' + this.selectedminit
        var time = parseFloat(timestart,10) + parseFloat(this.selectedhoues, 10)
        console.log(time)
        this.$swal({
          title: 'ยืนยันการจอง',
          html: 
          'ชื่อลานจอดรถ : ' +this.parkname + '<br><br>'
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
            this.$swal('ยืนยัน', 'ได้ยืนยันการจองลานจอดรถ :' + this.parkname , 'success' )
          } else {
            this.$swal('ยกเลิก', 'คุณได้ยกเลิกการจองลานจอดรถ', 'info')
          }
        })
      },
    commitReser () {
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
          let tmp = {
            money:credit,
            name: name,
            park: this.parkname,
            hours: hours,
            start: timestart,
            End: parseFloat(time,10).toFixed(2),
            time : this.todayhous,
            date : this.todaydate,
            Day : this.todayDay,
            Month : this.todayMont,
            Year : this.todayYear,
            Nummonth : this.todaynummonth,
            status_in: 'Off',
            status_out: 'Off'
          }
          var moenyset = parseFloat(this.selectedhoues, 10)*10
          console.log(moenyset)
          if(this.usershow[variable].money < moenyset){
            alert("No money")
            this.$router.replace('/admin/user')
          }else{
            for (var apark in this.showpark1) {
            var countnum = parseFloat(this.showpark1[apark].count, 10)
            if (this.showpark1[apark].name === this.parkname && this.showpark1[apark].count <= this.showpark1[apark].Total-1){
              console.log("true")
              var count = parseFloat(1, 10)
            firebase.database().ref('Park').child(apark).update({
            count: countnum+1
        })
        firebase.database().ref('Park').child(this.num).child(this.parktotal).child(this.index+1).push(tmp)
          firebase.database().ref('/users/').child(variable).update({
            money: resultcredit,
            status_in: 'On'
          })
          firebase.database().ref('/money/').child(variable).update({
            money: resultcredit
          })
          this.reportday()
          this.reportmonth()
          this.reportyear ()
          this.isSubmit = false
          this.$router.replace('/admin/overview')
      }
      if(this.showpark1[apark].name === this.parkname && this.showpark1[apark].count >= this.showpark1[apark].Total){
        firebase.database().ref('Park').child(apark).update({
            status: 'Off'
        })
        alert("Park Full")
        this.$router.replace('/admin/overview')
      }
    }
          }
        }
      }
      this.pullData()
    }
}
}
</script>
<style>
  body {
    background-color:#ffffff;
  }
</style>
