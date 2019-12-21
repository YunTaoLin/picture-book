<template>
  <div class="send">
    <div class="container  wow fadeIn">
      <div class="send_info">
        <h1><i class="fa fa-truck" aria-hidden="true"></i> 寄送說明</h1>
        <hr>
        <ol>
          <li>台灣地址一率使用郵局為唯一遞送管道，運費酌收60元。運費優惠活動請見公告說明。</li>
          <li>大陸/香港/澳門地址一率使用順豐到付，依實際重量支付運費。香港地址請提供中文版本。</li>
          <li>非上述之其他地址暫無配送服務，如不慎購買可全額退費。</li>
          <li>訂單包含現貨與預購商品則待預購到貨後一併出貨。如欲現貨先出請於訂單內備註並支付兩段運費或分開下單。</li>
          <li>如因個人因素招致退件請支付退回費用與第二段運費，確認款項後我們會盡快為您處理。</li>
          <li>商品約需3~5個工作天寄送，工作天不包含週末假日與任何非上班日。海外地區不在此限。</li>
          <li>如遇出貨量較大時，訂單將延遲1~2日出貨，實際出貨時間將以您收到的出貨通知E-mail為準，敬請見諒！</li>
          <li>任何包裹與寄送方式皆附帶一定程度之風險， 請恕本商店無法承擔包裹延遲，毀損，遺失等因物流造成之損失。</li>
          <li>收到包裹後如有疑問請於七個工作日內與我們聯繫，可來信<router-link to="/contact">官網客服</router-link>或致電給我們。</li>
          <li>如有國外大量採購需求，歡迎透過與我們連繫，並將所需產品及數量告知，我們將由專人為您服務，感謝所有會員支持。</li>
        </ol>
      </div>
    </div>
    <MyFooter />
  </div>
</template>

<script>
import MyFooter from '@/components/Footer.vue'
export default {
  components: {
      MyFooter
  },
  data(){
    return{
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_base.scss';
.send{
  margin-top: 200px;
  h1{
    text-align:left;
    font-size: 26px;
    font-weight: 700;
  }
}
.send_info{
  height: 60vh;
  li{
    text-align: left;
    line-height: 2;
    margin: 12px 0;
  }
}

</style>