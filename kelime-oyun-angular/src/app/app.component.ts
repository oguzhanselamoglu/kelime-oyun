import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kelime-oyun-angular';


   sorular = [
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
  ];
  
  mesaj =  null;
  mesajClass = "";
  mesajSure = null;
  mevcutSoru = null;
  harfler = new Array();
  puan= 0;
  harfPuan= 0;
  yarismaciCevap = "";
  tamamlandi = false;
  sure = null;
  kalanSure= 0;
   ages = [3, 10, 18, 20];
   
   checkAdult(age:any) {
    return age >= 18;
  }

  basla() {

    this.tamamlandi =false;
    this.mevcutSoru =null;
    this.puan =0;
    
    this.kalanSure =60;
    this.sure = setInterval(() => {
        this.kalanSure--;
//        console.log(this.kalanSure);

        if (this.kalanSure === 0) {
          this.bitir();
        }
    } ,1000);
        

    this.soruVer();
  }

 bitir() {
      this.tamamlandi=true;
      this.mevcutSoru =null;
      clearInterval(this.sure);
    }

    soruVer() {
      this.yarismaciCevap ='';
      this.mevcutSoru = this.sorular.find(x => !x.soruldu);

      if (!this.mevcutSoru) {
        
        this.bitir();
        return;
      }

      this.harfler = new Array();
      
      this.mevcutSoru.cevap.split("").map(x => {
        
        this.harfler.push({
          harf: x,
          acildi: false
        });
      });
      this.harfPuan = this.harfler.length * 100;
      this.mevcutSoru.soruldu = true;
    }

    cevapVer() {
      let cevap = this.yarismaciCevap.toLocaleUpperCase();
      this.yarismaciCevap = cevap;
        
      if (
        this.mevcutSoru.cevap.toLocaleUpperCase() ===
        cevap.toLocaleUpperCase()
      ) {
        this.puan += this.harfPuan;
      } 
      else {
       this.puan -= this.harfPuan;
      }

      this.soruVer();
    }

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
    }
}
