<template>
  <div class="animdated fadeIn" align="center">
    <!--<h1>Report Portal</h1>-->
    <br><br><br>
    <CModal title="Please scan user ID" :show.sync="showQrUser">
      <!--<div v-if="noCamera">
        No camera!
      </div>
      <qrcode-stream @init="onInit" @decode="onDecodeUser"/>-->
      <qrcode-stream @decode="onDecodeUser"/>
      <br>
      <qr-code :size=100 :text="'970317'"/>
      970317
    </CModal>

    <CModal title="Please scan job ID" :show.sync="showQrJob">
      <qrcode-stream @decode="onDecodeJob"/>
      <br>
      <qr-code :size=100 :text="'20200219-0001_FHN01CPN0008_2'"/>
      20200219-0001_FHN01CPN0008_2
    </CModal>
    
    <CModal title="Please scan machine ID" :show.sync="showQrMachine">
      <qrcode-stream @decode="onDecodeMachine"/>
      <br>
      <qr-code :size=100 :text="'T-23'"/>
      T-23
    </CModal>

    <CInput placeholder="User ID" size="lg" v-model="uid" class="col-6" @input="check()">
      <template #append>
        <CButton color="secondary" @click="showQrUser=true; uid=''; check()">
          <CIcon :content="$options.freeSet.cilQrCode"></CIcon>
        </CButton>
        <!--<CButton color="secondary">
          tet
        </CButton>-->
      </template>
    </CInput>

    <CInput placeholder="Job ID" size="lg" v-model="jid" class="col-6" @input="check()">
      <template #append>
        <CButton color="secondary" @click="showQrJob=true; jid=''; check()">
          <CIcon :content="$options.freeSet.cilQrCode"></CIcon>
        </CButton>
      </template>
    </CInput>
    
    <CInput placeholder="Machine ID" size="lg" v-model="mid" class="col-6" @input="check()">
      <template #append>
        <CButton color="secondary" @click="showQrMachine=true; mid=''; check()">
          <CIcon :content="$options.freeSet.cilQrCode"></CIcon>
        </CButton>
      </template>
    </CInput>

    <CButton block :color="color" :disabled="disabled" class="col-5" size="lg"
      :href="'https://localhost:8080/#/jobreport/jobreport/' + uid + '/' + jid + '/' + mid"><b>確認</b> (前往報工表單)
    </CButton>

  </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'    //npm install --save vue-qrcode-reader
import VueQRCodeComponent from 'vue-qrcode-component'   //for printing QR code
import { freeSet } from '@coreui/icons'

export default {
  freeSet,
  components: { 'qrcode-stream': QrcodeStream,
                'qr-code': VueQRCodeComponent},

  data () {
    return {
      showQrUser: false,
      showQrJob: false,
      showQrMachine: false,

      error: '',
      noCamera: true,

      uid: '',
      mid: '',
      jid: '',

      disabled: true,

      color: 'primary'
    }
  },

  created() {
    //setInterval(this.myFocus, 500);
  },

  methods: {
    onDecodeUser (value) {
      this.uid = value;
      this.showQrUser = false;
      this.check();
      //document.getElementById('myInput').value = value;
      //this.parseInput();
    },

    onDecodeJob (value) {
      this.jid = value;
      this.showQrJob = false;
      this.check();
      //document.getElementById('myInput').value = value;
      //this.parseInput();
    },

    onDecodeMachine (value) {
      this.mid = value;
      this.showQrMachine = false;
      this.check();
      //document.getElementById('myInput').value = value;
      //this.parseInput();
    },

    check()
    {
      if (this.uid != '' && this.mid != '' && this.jid != '')
      {
        this.disabled = false;
        //this.color = "success";
      }
      else
      {
        this.disabled = true;
        //this.color = "secondary";
      }
    },

    onInit()
    {
      //this.error = "OK";
      //console.log('Having camera :)')
      this.noCamera = false;
    },
    /*async onInit (promise) {
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

      var newLen, newStr;
      if(test.substr(0, 4).toLowerCase() == 'uid:' || test.substr(0, 4).toLowerCase() == 'uid=')
      {
        newLen = test.length - 4;
        newStr = test.substr(4, newLen).trim();
        this.uid = newStr;
      }
      if(test.substr(0, 4).toLowerCase() == 'mid:' || test.substr(0, 4).toLowerCase() == 'mid=')
      {
        newLen = test.length - 4;
        newStr = test.substr(4, newLen).trim();
        this.mid = newStr;
      }
      else if(test.substr(0, 4).toLowerCase() == 'jid:' || test.substr(0, 4).toLowerCase() == 'jid=')
      {
        newLen = test.length - 4;
        newStr = test.substr(4, newLen).trim();
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
