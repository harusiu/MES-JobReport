<template>
  <div>
    <div align="center">
      <br>
      <h1>報工主頁面</h1>
    </div>
    <br>
    <CRow>
      <CCol col="6">
        <CCard>
          <CCardHeader>
            <b>人: {{uid}}</b>
          </CCardHeader>
        </CCard>
      </CCol>
      <CCol col="6">
        <CCard>
          <CCardHeader>
            <b>機: {{mid}}</b>
          </CCardHeader>
        </CCard>
      </CCol>
    </CRow>

    <Crow>
      <CCard>
        <CCardHeader>
          <b>工: {{jid}}</b>
        </CCardHeader>
        <CCardBody>
          <b>
          <li>工作描述: 攻牙</li>
          <li>目標產量: {{target_qty}}，已完成良品: {{acc_good}}，不良品: {{acc_ng}}</li>
          </b>
        <CProgress :value="acc_good" :max="target_qty" show-percentage color="success"></CProgress>
        </CCardBody>
      </CCard>
    </CRow>

    <Crow>
    <CCard>
    <CCardHeader>
      <b>狀態: {{state}}</b>
    </CCardHeader>
    <CCardBody>
    <CRow>
    <CCol>
    <CButton block color="primary">Start</CButton>
    </CCol>
    <CCol>
    <CButton block color="dark">Pause</CButton>
    </CCol>
    <CCol>
    <CButton block color="dark">Stop</CButton>
    </CCol>
    </CRow>
    </CCardBody>
    </CCard>
    </CRow>
  </div>
</template>

<script>
export default {
  name: 'JobReport',

  data () {
    return {
      uid: this.$route.params.uid,
      jid: this.$route.params.jid,
      mid: this.$route.params.mid,

      state: '生產中',
      target_qty: 100,
      inc_good: 0,
      inc_ng: 0,
      acc_good: 70,
      acc_ng: 3,
    }
  },

  methods: {

  }
}
</script>
