<template>
  <div class="animdated fadeIn" align="center">
    <br>
    <h1>Please scan QR codes</h1>

    <!--
    <div class="col-6">
      <qrcode-stream @decode="onDecode" @init="onInit"/>
    </div>
    -->

    <div style="position: absolute; left: -9999px;">
      <input type="password" id="myInput" @keypress="checkEnter()" autofocus="true"></input>
    </div>

    <br>
    <CInput placeholder="User ID" v-model="uid" class="col-6" readonly/>
    <CInput placeholder="Job ID" v-model="jid" class="col-6" readonly/>
    <CInput placeholder="Machine ID" v-model="mid" class="col-6" readonly/>

    <CButton block :color="color" :disabled="disabled" class="col-4"
      :href="'http://localhost:8080/#/pages/jobreport/' + uid + '/' + jid + '/' + mid">確認 (前往報工)
    </CButton>

    <br><br><br>
    <h4>Samples:</h4>
    <CRow>
      <CCol class="col-4">
        <qr-code :size=150 :text="'uid: 970317'">
        </qr-code>
      </CCol>
      <CCol class="col-4">
        <qr-code :size=150 :text="'jid: J511-1'">
        </qr-code>
      </CCol>
      <CCol class="col-4">
        <qr-code :size=150 :text="'mid: M413'">
        </qr-code>
      </CCol>
    </CRow>

  </div>
</template>

<script>
//import { QrcodeStream } from 'vue-qrcode-reader'    //npm install --save vue-qrcode-reader

import Vue from 'vue'   //for QR code
import VueQRCodeComponent from 'vue-qrcode-component'   //for printing QR code
Vue.component('qr-code', VueQRCodeComponent)            //for printing QR code

export default {
  //components: { QrcodeStream },

  data () {
    return {
      error: '',

      uid: '',
      mid: '',
      jid: '',

      disabled: true,

      color: 'secondary'
    }
  },

  created() {
    setInterval(this.myFocus, 500);
  },

  methods: {
    /*onDecode (value) {
      document.getElementById('myInput').value = value;
      this.parseInput();
    },

    async onInit (promise) {
      console.log("onInit");
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = "ERROR: you need to grant camera access permisson"
        } else if (error.name === 'NotFoundError') {
          this.error = "ERROR: no camera on this device"
        } else if (error.name === 'NotSupportedError') {
          this.error = "ERROR: secure context required (HTTPS, localhost)"
        } else if (error.name === 'NotReadableError') {
          this.error = "ERROR: is the camera already in use?"
        } else if (error.name === 'OverconstrainedError') {
          this.error = "ERROR: installed cameras are not suitable"
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = "ERROR: Stream API is not supported in this browser"
        }
      }
    },*/

    myFocus() {
      //if(document.getElementById("myInput") != null)
        document.getElementById("myInput").focus();
    },

    checkEnter() {
      var x = event.keyCode;
      if(x != 13)
        return;

      this.parseInput();
    },

    parseInput() {
      var test = document.getElementById('myInput').value.trim();
      document.getElementById('myInput').value= '';

      if(test.substr(0, 4).toLowerCase() == 'uid:' || test.substr(0, 4).toLowerCase() == 'uid=')
      {
        var newLen = test.length - 4;
        var newStr = test.substr(4, newLen).trim();
        this.uid = newStr;
      }
      if(test.substr(0, 4).toLowerCase() == 'mid:' || test.substr(0, 4).toLowerCase() == 'mid=')
      {
        var newLen = test.length - 4;
        var newStr = test.substr(4, newLen).trim();
        this.mid = newStr;
      }
      else if(test.substr(0, 4).toLowerCase() == 'jid:' || test.substr(0, 4).toLowerCase() == 'jid=')
      {
        var newLen = test.length - 4;
        var newStr = test.substr(4, newLen).trim();
        this.jid = newStr;
      }

      if (this.uid != '' && this.mid != '' && this.jid != '')
      {
        this.disabled = false;
        this.color = "primary";
      }
      else
      {
        this.disabled = true;
        this.color = "secondary";
      }
    },
  }
}
</script>
