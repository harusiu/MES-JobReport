<template>
  <div>
    <CTableWrapper
      :items="jobs"
      :fields="tableFields"
      hover
      striped
      bordered
      small
      fixed
      caption="Combined All Table"
    />
  </div>
</template>

<script>
//import MainChartExample from './charts/MainChartExample'
//import WidgetsDropdown from './widgets/WidgetsDropdown'
//import WidgetsBrand from './widgets/WidgetsBrand'
import CTableWrapper from './Table.vue'
import * as moment from 'moment'

export default {
  name: 'JobStatus',
  components: { CTableWrapper },
  /*components: {
    MainChartExample,
    WidgetsDropdown,
    WidgetsBrand
  },*/
  data () {
    return {
      /*selected: 'Month',
      tableItems: [
        {
          avatar: { url: 'img/avatars/1.jpg', status: 'success' },
          user: { name: 'Yiorgos Avraamu', new: true, registered: 'Jan 1, 2015' },
          country: { name: 'USA', flag: 'cif-us' },
          usage: { value: 50, period: 'Jun 11, 2015 - Jul 10, 2015' },
          payment: { name: 'Mastercard', icon: 'cib-cc-mastercard' },
          activity: '10 sec ago'
        },
        {
          avatar: { url: 'img/avatars/2.jpg', status: 'danger' },
          user: { name: 'Avram Tarasios', new: false, registered: 'Jan 1, 2015' },
          country: { name: 'Brazil', flag: 'cif-br' },
          usage: { value: 22, period: 'Jun 11, 2015 - Jul 10, 2015' },
          payment: { name: 'Visa', icon: 'cib-cc-visa' },
          activity: '5 minutes ago'
        },
      ],
      tableFields: [
        { key: 'avatar', label: '', _classes: 'text-center' },
        { key: 'user' },
        { key: 'country', _classes: 'text-center' },
        { key: 'usage' },
        { key: 'payment', label: 'Payment method', _classes: 'text-center' },
        { key: 'activity' },
      ]
      */
    
      jobs: [],

      tableFields: [
        {key: 'order_id',     label: '製令',   sortable: true},
        {key: 'product_id',   label: '產品',     sortable: true},
        {key: 'step',         label: '工序',     sortable: true},
        {key: 'job_description',  label: '工作描述',  sortable: true},
        {key: 'machine_id',         label: '工位',     sortable: true},
        {key: 'target_qty',   label: '數量',     sortable: true},
        {key: 'progress',     label: '%',       sortable: true},
        {key: 'schTime',      label: '計畫時間',   sortable: true},
        {key: 'actTime',      label: '實際時間',     sortable: true},
        {key: 'status',      label: '狀態',     sortable: true},
      ],

      timestamp: '',
    }
  },

  //mounted() {
  created() {
    this.getJobStatus();
    setInterval(this.getJobStatus, 1000);
  },

  methods: {
    /*encrypt(str)
    {
      const crypto = require('crypto')
      const mykey = crypto.createCipher('aes-128-cbc', 'ssc8u7occfhqm3q6gkhm0gvcua')
      var encStr = mykey.update(str, 'utf8', 'hex') + mykey.final('hex')
      return encStr
    },*/

    getJobStatus()
    {
      var sql = "SELECT MAX(timestamp) FROM mes.job_status";
      //console.log(sql)
      let param = {sql: sql};
      this.$http.post('generalQuery', {data: param}).then(res => {
        var newTimestamp = res.data[0].max; //['MAX(timestamp)'];
        if(newTimestamp != this.timestamp)
        {
          sql = "SELECT * FROM mes.job_status";
          param = {sql: sql};
          this.$http.post('generalQuery', {data: param}).then(res => {
            //console.log(res.data)
            this.jobs = res.data;
            for(var i=0; i<this.jobs.length; i++)
            {
              this.jobs[i].progress = Math.floor(100 * this.jobs[i].acc_good / this.jobs[i].target_qty);
              this.jobs[i].schTime = (this.jobs[i].sch_start_time==null ? ' ~ ' : moment(this.jobs[i].sch_start_time).format('MM/DD HH:mm ~ '))
                                      + (this.jobs[i].sch_end_time==null ? '' : moment(this.jobs[i].sch_end_time).format('MM/DD HH:mm'));

              this.jobs[i].actTime = (this.jobs[i].act_start_time==null ? ' ~ ' : moment(this.jobs[i].act_start_time).format('MM/DD HH:mm ~ '))
                                      + (this.jobs[i].act_end_time==null ? '' : moment(this.jobs[i].act_end_time).format('MM/DD HH:mm'));

              this.jobs[i].status = this.jobs[i].state;

              if (this.jobs[i].machine_id == null)
                this.jobs[i].machine_id = '';
            }
          });

          this.timestamp = newTimestamp;
        }
      });
    },

    /*color (value) {
      let $color
      if (value <= 25) {
        $color = 'info'
      } else if (value > 25 && value <= 50) {
        $color = 'success'
      } else if (value > 50 && value <= 75) {
        $color = 'warning'
      } else if (value > 75 && value <= 100) {
        $color = 'danger'
      }
      return $color
    }*/
  }
}
</script>
