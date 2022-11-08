<template>
  <div id="app" class="container mt-4">
    <div class="card mb-4" v-if="tamamlandi">
      <div class="card-body">
        Tebrikleri yarışmayı {{this.puan}} ile tamamladınız
      </div>
    </div>

    <div class="card mt-4" v-if="!mevcutSoru">
      <div class="card-header">
        <h5 class="mb-0">Kelime Oyunu Yarışmasına Hoşgeldiniz!</h5>
      </div>
      <div class="card-body">Yarışmaya Başlamak için yarışmaya başla buttonuna basın</div>
      <div class="card-footer">
        <button class="btn btn-primary" @click="basla">Yarışmaya Başla</button>
      </div> 
    </div>
    <div class="card" v-else>
      <div class="card-header"><h3 class="mb-0">{{mevcutSoru.soru}}</h3></div>
      <div class="card-body">
        <div class="d-flex">
          <div class="harf shadow mr-3" v-for="(harf,index) in harfler" :key="'harf-'+index">
            <span v-if="harf.acildi">{{harf.harf}}</span>
            <span v-else></span>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <div class="d-flex">
          <div class="mr-4">Harf puan {{harfPuan}}</div>
          <div class="mr-4">Toplam puan {{puan}}</div>
          <div class="mr-4">Kalan süreniz <kbd>{{kalanSure}}</kbd></div>
        </div>
      </div>
      <div class="card-footer" :class="mesajClass" v-if="mesaj">{{mesaj}}</div>
      <div class="card-footer">
        <div class="input-group mb-3">
           <input
            class="form-control"
            type="text"
            placeholder="Cevap giriniz"
            v-model="yarismaciCevap"
          />
          <div class="input-group-append">
                  <button class="btn btn-success" @click="cevapVer">Cevap Ver</button>
          </div>
        </div>
 
      </div>
      <div class="card-footer">
        <button class="btn btn-secondary" @click="harfVer">Harf ver</button>
      </div>
    </div>
  </div>
</template>

<script>
import { setInterval, clearInterval, setTimeout } from 'timers';



export default {
  name: "app",

  components: {},
  data() {
    return {
      sorular: [
        {
          soru: "Siyah ile aynı anlama gelen bir renk",
          cevap: "Kara",
          soruldu: false
        },
        {
          soru: "Sık kullanılan bir isim",
          cevap: "Ahmet",
          soruldu: false
        },
        {
          soru: "Türkiye'nin başkenti",
          cevap: "Ankara",
          soruldu: false
        },
        {
          soru: "Karadenizde bir ilimiz",
          cevap: "Giresun",
          soruldu: false
        }
      ],
      mesaj:null,
      mesajClass:"",
      mesajSure:null,
      mevcutSoru: null,
      harfler: [],
      puan: 0,
      harfPuan: 0,
      yarismaciCevap: "",
      tamamlandi:false,
      sure :null,
      kalanSure: 0
    };
  },
  methods: {
    mesajGoster(mesaj, tur){
      this.mesaj = mesaj;
      if (tur==="hata") {
        this.mesajClass ="bg-danger text-white";
      } else if (tur ==="basarili") {
        this.mesajClass ="bg-success text-white";
      } else {
        this.mesajClass ="bg-dark text-white";
      }
      if( this.mesajSure) {
        clearTimeout(this.mesajSure);
        this.mesajSure=null;
      }
      this.mesajSure = setTimeout(()=>this.mesaj=null,3000);
    },
    basla() {
      this.tamamlandi =false;
      this.mevcutSoru =null;
      this.puan =0;
      this.sorular.map(x=>{
      x.soruldu =false});
      this.kalanSure =60;
      this.sure = setInterval(() => {
          this.kalanSure--;
          if (this.kalanSure === 0) {
            this.bitir();
          }
      } ,1000);

      this.soruVer();
    },
    bitir() {
      this.tamamlandi=true;
      mevcutSoru=null;
      clearInterval(this.sure);
    },
    soruVer() {
      this.yarismaciCevap ='';
      this.mevcutSoru = this.sorular.find(x => !x.soruldu);

      if (!this.mevcutSoru) {
        this.bitir();
        return;
      }

      this.harfler = [];
      this.mevcutSoru.cevap.split("").map(x => {
        this.harfler.push({
          harf: x,
          acildi: false
        });
      });
      this.harfPuan = this.harfler.length * 100;
      this.mevcutSoru.soruldu = true;
    },
    harfVer() {
      let rastgeleHarfIndex = Math.floor(this.harfler.length * Math.random());

      if (this.harfPuan <= 100) {
        return;
      }

      let harf = this.harfler[rastgeleHarfIndex];
      while (harf.acildi) {
        rastgeleHarfIndex = Math.floor(this.harfler.length * Math.random());
        harf = this.harfler[rastgeleHarfIndex];
      }
      harf.acildi = true;
      this.harfPuan -= 100;
    },
    cevapVer() {
      let cevap = this.yarismaciCevap.toLocaleUpperCase("tr");
      this.yarismaciCevap = cevap;
      if (
        this.mevcutSoru.cevap.toLocaleUpperCase("tr") ===
        cevap.toLocaleUpperCase("tr")
      ) {
        this.puan += this.harfPuan;
      } 
      else {
       this.puan -= this.harfPuan;
      }

      this.soruVer();
    }
  }
};
</script>

<style>
.harf {
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30pt;
}
</style>
