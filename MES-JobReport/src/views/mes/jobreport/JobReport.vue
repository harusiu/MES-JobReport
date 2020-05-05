<template>
  <div :key="componentKey">
    <CRow>
      <CCol sm="6" md="6">
        <CCard>
          <CCardHeader>
            <b>人員: {{uid}}</b>
          </CCardHeader>
        </CCard>
      </CCol>
      <CCol sm="6" md="6">
        <CCard>
          <CCardHeader>
            <b>機台: {{mid}}</b>
          </CCardHeader>
        </CCard>
      </CCol>
      <CCol sm="6" md="6">
        <CCard>
          <CCardHeader>
            <b>工單: {{jid}}</b>
          </CCardHeader>
          <CCardBody>
            <li>製令: {{order_id}}</li>
            <li>產品: {{product_id}}</li>
            <li>工序: {{step}} - {{job_description}}</li>
            <li>數量: {{target_qty}} pcs</li>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol sm="6" md="6">
        <CCard>
          <CCardHeader>
            <b>時間</b>
          </CCardHeader>
          <CCardBody>
            <li>產品交期: {{due_date}}</li>
            <br>
            <li v-if="sch_duration>0">計畫時間: {{sch_time}} ({{(sch_duration/60).toFixed(1)}} mins)</li>
            <li v-if="sch_duration<=0">計畫時間: {{sch_time}}</li>
            <!--<li>實際時間: {{act_time}} ({{(act_duration/60).toFixed(1)}} mins)</li>-->
            <li>實際時間: {{act_time}}</li>
            <br>
            <li>資料時間: {{timestamp}}</li>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol sm="6" md="6">
        <CCard>
          <CCardHeader>
            <b>進度: {{100 * acc_good / target_qty}}%</b>
          </CCardHeader>
          <CCardBody>
            <li>目標數量: {{target_qty}} pcs</li>
            <li>累計良品數: {{acc_good}} pcs</li>
            <li>累計不良品數: {{acc_ng}} pcs</li>
            <br>
          <!--<CProgress :value="acc_good" :max="target_qty" show-percentage color="success"></CProgress>-->
          <!--<CProgress :value="acc_good" :max="target_qty" show-percentage></CProgress>-->
          </CCardBody>
        </CCard>
      </CCol>
      <CCol sm="6" md="6">
        <CCard>
          <CCardHeader>
            <b>狀態: {{state}}</b>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol v-if="state=='未進站'">
                <CButton block color="primary" @click="resume()">進站 (開工)</CButton>
              </CCol>
              <CCol v-if="state=='生產中'">
                <CButton block color="primary" @click="showPauseModal=true">中斷</CButton>
              </CCol>
              <CCol v-if="state=='中斷'">
                <CButton block color="primary" @click="resume()">重啟</CButton>
              </CCol>
              <CCol v-if="state=='生產中'">
                <CButton block disabled color="primary" @click="showCheckoutModal=true">出站 (完工)</CButton>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>

    <CModal title="中斷表單" :show.sync="showPauseModal">
      良品數
      <CInput type="number" v-model="inc_good">
      </CInput>
      不良品數
      <CInput type="number" v-model="inc_ng">
      </CInput>
      <CButton color="primary" @click="newState='中斷'; pauseOrCheckout()">確認</CButton>
    </CModal>

    <CModal title="出站表單" :show.sync="showCheckoutModal">
      良品數
      <CInput type="number" v-model="inc_good">
      </CInput>
      不良品數
      <CInput type="number" v-model="inc_ng">
      </CInput>
      <CButton color="primary" @click="newState='已出站'; pauseOrCheckout()">確認</CButton>
    </CModal>

  </div>
</template>

<script>
import * as moment from 'moment'
//import { parse } from '@babel/core';

export default {
  name: 'JobReport',

  data () {
    return {
      componentKey: 0,
      timestamp: '',

      showPauseModal: false,
      showCheckoutModal: false,

      uid: this.$route.params.uid,
      jid: this.$route.params.jid,
      mid: this.$route.params.mid,

      order_id: '',
      product_id: '',
      step: '',
      job_description: '',

      state: '',
      newState: '',

      target_qty: 0,
      acc_good: 0,
      acc_ng: 0,
      inc_good: 0,
      inc_ng: 0,

      due_date: '',
      sch_time: '',
      sch_duration: 0,
      act_time: '',
      act_duration: 0,
    }
  },

  //mounted() {
  created() {
    this.getJob();
  },

  methods: {
    /*encrypt(str)
    {
      const crypto = require('crypto')
      const mykey = crypto.createCipher('aes-128-cbc', 'ssc8u7occfhqm3q6gkhm0gvcua')
      var encStr = mykey.update(str, 'utf8', 'hex') + mykey.final('hex')
      return encStr
    },*/

    getJob()
    {
      var sql = `SELECT * FROM mes.job_status WHERE job_id='${this.jid}'`;
      let param = {sql: sql};
      this.$http.post('generalQuery', {data: param}).then(res => {
        if(res.data.length<=0)
          return;

        this.order_id = res.data[0].order_id;
        this.product_id = res.data[0].product_id;
        this.step = res.data[0].step;
        this.job_description = res.data[0].job_description;

        this.target_qty = res.data[0].target_qty;
        this.acc_good = res.data[0].acc_good;
        this.acc_ng = res.data[0].acc_ng;

        this.state = res.data[0].state;
        this.timestamp = moment(res.data[0].timestamp).format('YYYY/MM/DD HH:mm:ss');

        //this.mid = res.data[0].machine_id;

        this.due_date = moment(res.data[0].due_date).format('YYYY/MM/DD');

        this.sch_time = (res.data[0].sch_start_time==null ? ' ~ ' : moment(res.data[0].sch_start_time).format('MM/DD HH:mm ~ '))
                      + (res.data[0].sch_end_time==null ? '' : moment(res.data[0].sch_end_time).format('MM/DD HH:mm'));
        this.sch_duration = res.data[0].sch_exe_time;

        this.act_time = (res.data[0].act_start_time==null ? ' ~ ' : moment(res.data[0].act_start_time).format('MM/DD HH:mm ~ '))
                      + (res.data[0].act_end_time==null ? '' : moment(res.data[0].act_end_time).format('MM/DD HH:mm'));
      });
    },

    pauseOrCheckout()//中斷、出站
    {
      var newAccGood = parseInt(this.acc_good) + parseInt(this.inc_good);
      var newAccNg = parseInt(this.acc_ng) + parseInt(this.inc_ng);

      var sql = `UPDATE mes.job_status SET
                  acc_good=${newAccGood},
                  acc_ng=${newAccNg},
                  state='${this.newState}' WHERE
                  job_id='${this.jid}'`;
      let param = {sql: sql};
      this.$http.post('generalQuery', {data: param}).then(res => {
        console.log(res);
        this.showPauseModal = false;
        this.showCheckoutModal = false;
        this.inc_good = 0;
        this.inc_ng = 0;
        //location.reload();
        this.getJob();
        this.componentKey++;
      });
    },

    resume()//進站、重啟
    {
      var sql;
      
      if(this.state=='未進站')
      {
        var curTime = moment().format('YYYY-MM-DD HH:mm:ss');
        sql = `UPDATE mes.job_status SET state='生產中',
                act_start_time='${curTime}' WHERE
                job_id='${this.jid}'`;
      }
      else// if(this.state=='中斷')
      {
        sql = `UPDATE mes.job_status SET state='生產中' WHERE job_id='${this.jid}'`;
      }

      let param = {sql: sql};
      this.$http.post('generalQuery', {data: param}).then(res => {
        console.log(res);
        this.getJob();
        this.componentKey++;
      });
    },
  }
}
</script>
